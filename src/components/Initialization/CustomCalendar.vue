<template>
    <div class="custom-calendar">
        <div class="calendar-header">
            <button type="button" class="nav-btn" @click="prevMonth" :disabled="isPrevDisabled">‹</button>
            <div class="calendar-title">
                {{ monthName }} {{ currentYear }}
            </div>
            <button type="button" class="nav-btn" @click="nextMonth">›</button>
        </div>

        <div class="calendar-grid">
            <div class="calendar-day" v-for="day in weekDays" :key="day">{{ day }}</div>
            <div v-for="blank in blanks" :key="'b' + blank" class="calendar-cell blank"></div>
            <div v-for="day in daysInMonth" :key="'d' + day" class="calendar-cell" :class="[
                getColorClass(day),
                { disabled: isDisabled(day) },
                { selected: isSelected(day) },
                { today: isToday(day) }
            ]" @click="selectDate(day)">
                {{ day }}
            </div>
        </div>

        <div class="calendar-footer">
            <div class="selected-date">
                <strong>Selected Date:</strong>
                <div>{{ formattedSelectedDate }}</div>
            </div>
            <div class="color-legend">
                <div class="legend-item">
                    <span class="legend-box bg-light-green"></span> Low Booking (≤ 30%)
                </div>
                <div class="legend-item">
                    <span class="legend-box bg-orange"></span> Medium Booking (31–70%)
                </div>
                <div class="legend-item">
                    <span class="legend-box bg-red"></span> High Booking (> 70%)
                </div>
                <div class="legend-item">
                    <span class="legend-box bg-green"></span> Available (0% booked)
                </div>
                <div class="legend-item">
                    <span class="legend-box" style="outline: 2px solid black; background: white;"></span> Selected Date
                </div>
                <div class="legend-item">
                    <span class="legend-box disabled-box"></span> Not Available
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getMomentTimezone } from '../../utils/dateUtils';

export default {
    name: 'CustomCalendar',
    props: ['modelValue', 'form'],
    emits: ['update:modelValue', 'selected'],
    data() {
        const today = getMomentTimezone(this.$store.state.timezone);
        const isDixies = this.$store.state.tenantId === 'dixies' && today.year() === 2025;

        return {
            currentMonth: isDixies ? 0 : today.month(),  // Jan if Dixies
            currentYear: isDixies ? 2026 : today.year(), // 2026 if Dixies
            selected: this.modelValue,
            colorDates: {},
            minYear: isDixies ? 2026 : today.year(),
            minMonth: isDixies ? 0 : today.month()
        };
    },
    mounted() {
        this.fetchColorDates();
    },
    watch: {
        currentMonth() {
            this.fetchColorDates();
        },
        currentYear() {
            this.fetchColorDates();
        }
    },
    computed: {
        daysInMonth() {
            return getMomentTimezone(this.$store.state.timezone, [this.currentYear, this.currentMonth]).daysInMonth();
        },
        blanks() {
            return getMomentTimezone(this.$store.state.timezone, [this.currentYear, this.currentMonth, 1]).day(); // day of week (0-6)
        },
        weekDays() {
            return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        },
        monthName() {
            return getMomentTimezone(this.$store.state.timezone, [this.currentYear, this.currentMonth]).format('MMMM');
        },
        isPrevDisabled() {
            const today = getMomentTimezone(this.$store.state.timezone);

            if (this.$store.state.tenantId === 'dixies' && today.year() === 2025) {
                return (
                    (this.currentYear < this.minYear) ||
                    (this.currentYear === this.minYear && this.currentMonth <= this.minMonth)
                );
            }

            // default logic for others
            return (
                this.currentYear === today.year() &&
                this.currentMonth === today.month()
            );
        },
        formattedSelectedDate() {
            return getMomentTimezone(this.$store.state.timezone, this.form.date).format('dddd, MMMM D, YYYY');
        }
    },
    methods: {
        async fetchColorDates() {
            const month = this.currentMonth + 1;
            const year = this.currentYear;
            const { package_id, affiliate_id } = this.form;

            try {
                const response = await axios.get(`/get-color-date/${month}/${year}/${package_id}/${affiliate_id}`);
                const data = response.data;
                const colored = {};

                for (const [date, info] of Object.entries(data)) {
                    if (info.seats === 0 || info.booked >= info.seats) {
                        colored[date] = { color: null, disabled: true };
                    } else {
                        const percent = (info.booked / info.seats) * 100;

                        let colorClass = 'bg-light-green';
                        if (percent > 70) colorClass = 'bg-red';
                        else if (percent > 30) colorClass = 'bg-orange';
                        else if (percent === 0) colorClass = 'bg-green';

                        colored[date] = { color: colorClass, disabled: false };
                    }
                }

                this.colorDates = colored;
            } catch (err) {
                console.error('Failed to fetch color dates:', err);
            }
        },
        dateKey(day) {
            return `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        },
        isDisabled(day) {
            const dateKey = this.dateKey(day);
            const data = this.colorDates[dateKey];

            if (data?.disabled) return true;

            const today = getMomentTimezone(this.$store.state.timezone);
            const cellDate = getMomentTimezone(this.$store.state.timezone, [this.currentYear, this.currentMonth, day]);

            if (this.$store.state.tenantId === 'dixies' && today.year() === 2025) {
                // Block all before Jan 2026
                const minDate = getMomentTimezone(this.$store.state.timezone, [this.minYear, this.minMonth, 1]);
                return cellDate < minDate;
            } else {
                // Existing past-date logic
                const dateParts = this.getDateParts();
                const tzYear = parseInt(dateParts.year);
                const tzMonth = parseInt(dateParts.month) - 1;
                const tzDay = parseInt(dateParts.day);
                const todayDate = getMomentTimezone(this.$store.state.timezone, [tzYear, tzMonth, tzDay]);
                return cellDate < todayDate;
            }
        },
        isSelected(day) {
            return this.modelValue === this.dateKey(day);
        },
        getColorClass(day) {
            const data = this.colorDates[this.dateKey(day)];
            return data?.color || '';
        },
        isToday(day) {
            const dateParts = this.getDateParts();

            const tzYear = parseInt(dateParts.year);
            const tzMonth = parseInt(dateParts.month) - 1;
            const tzDay = parseInt(dateParts.day);

            return (
                day === tzDay &&
                this.currentMonth === tzMonth &&
                this.currentYear === tzYear
            );
        },
        selectDate(day) {
            const date = this.dateKey(day);
            if (!this.isDisabled(day)) {
                this.$emit('update:modelValue', date);
                this.$emit('selected', date);
            }
        },
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
        },
        getDateParts() {
            const m = getMomentTimezone(this.$store.state.timezone);

            return {
                year: m.format('YYYY'),
                month: m.format('MM'),
                day: m.format('DD')
            };
        }
    }
};
</script>

<style scoped>
.custom-calendar {
    border: 1px solid var(--neutral-200);
    border-radius: var(--radius-xl);
    padding: var(--space-4);
    margin-top: var(--space-2);
    background: white;
    box-shadow: var(--shadow-sm);
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--space-2);
    padding: 0 var(--space-1);
}

.calendar-day {
    font-weight: var(--font-semibold);
    text-align: center;
    font-size: var(--text-xs);
    color: var(--neutral-600);
    padding: var(--space-2) 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.calendar-cell {
    text-align: center;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    cursor: pointer;
    background: var(--neutral-50);
    font-weight: var(--font-medium);
    transition: all var(--transition-base);
    border: none;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-sm);
}

.calendar-cell:hover:not(.disabled) {
    background: var(--primary-teal-light);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.calendar-cell.disabled {
    pointer-events: none;
    background: var(--neutral-100);
    color: var(--neutral-400);
    opacity: 0.5;
}

.calendar-cell.selected {
    outline: 3px solid var(--primary-teal);
    outline-offset: -3px;
    font-weight: var(--font-bold);
    background-color: white !important;
    color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.calendar-cell.today {
    outline: 2px solid var(--amber);
    outline-offset: -2px;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.1);
}

.blank {
    background: transparent;
    pointer-events: none;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-4) var(--space-5);
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-dark) 100%);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
    box-shadow: var(--shadow-md);
}

.calendar-title {
    flex: 1;
    text-align: center;
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: white;
}

.nav-btn {
    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-xl);
    color: white;
    cursor: pointer;
    transition: all var(--transition-base);
    font-weight: var(--font-bold);
    min-width: 36px;
}

.nav-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
}

.nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

/* Booking status colors using Native Journey palette */
.bg-light-green {
    background-color: rgba(245, 158, 11, 0.15);
    color: var(--amber-dark);
}

.bg-orange {
    background-color: rgba(224, 120, 86, 0.25);
    color: var(--terracotta-dark);
}

.bg-red {
    background-color: rgba(224, 120, 86, 0.5);
    color: var(--terracotta-dark);
}

.bg-green {
    background-color: rgba(13, 148, 136, 0.2);
    color: var(--primary-teal-dark);
}

.calendar-footer {
    margin-top: var(--space-6);
    padding: var(--space-5);
    background: linear-gradient(135deg, var(--neutral-50) 0%, white 100%);
    border: 1px solid var(--neutral-200);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
}

.selected-date {
    margin-bottom: var(--space-4);
    font-size: var(--text-base);
    color: var(--neutral-800);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--neutral-200);
}

.selected-date strong {
    color: var(--primary-teal);
    display: block;
    margin-bottom: var(--space-2);
    font-weight: var(--font-bold);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.color-legend {
    font-size: var(--text-sm);
    color: var(--neutral-700);
}

.legend-item {
    display: flex;
    align-items: center;
    margin: var(--space-2) 0;
    padding: var(--space-1) 0;
}

.legend-box {
    width: 20px;
    height: 20px;
    margin-right: var(--space-3);
    border-radius: var(--radius-sm);
    border: 1px solid var(--neutral-300);
    flex-shrink: 0;
    box-shadow: var(--shadow-xs);
}

.disabled-box {
    background-color: var(--neutral-100) !important;
    border: 1px dashed var(--neutral-400);
}
</style>