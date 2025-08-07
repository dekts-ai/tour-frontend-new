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
            <div
                v-for="day in daysInMonth"
                :key="'d' + day"
                class="calendar-cell"
                :class="[
                    getColorClass(day),
                    { disabled: isDisabled(day) },
                    { selected: isSelected(day) },
                    { today: isToday(day) }
                ]"
                @click="selectDate(day)"
            >
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
        return {
            currentMonth: today.month(),
            currentYear: today.year(),
            selected: this.modelValue,
            colorDates: {}
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
            const { package_id, affiliate_id } = this.form;

            try {
                const response = await axios.get(`/get-color-date/${month}/${package_id}/${affiliate_id}`);
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

            // Disable due to backend data
            if (data?.disabled) return true;

            // Disable due to timezone/past
            const dateParts = this.getDateParts();

            const tzYear = parseInt(dateParts.year);
            const tzMonth = parseInt(dateParts.month) - 1;
            const tzDay = parseInt(dateParts.day);

            const cellDate = getMomentTimezone(this.$store.state.timezone, [this.currentYear, this.currentMonth, day]);
            const todayDate = getMomentTimezone(this.$store.state.timezone, [tzYear, tzMonth, tzDay]);

            return cellDate < todayDate;
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
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 4px;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
}

.calendar-day {
    font-weight: bold;
    text-align: center;
}

.calendar-cell {
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    background: #f0f0f0;
}

.calendar-cell:hover {
    background: #d0ffd0;
}

.calendar-cell.disabled {
    pointer-events: none;
    background: #eee;
    color: #aaa;
}

.calendar-cell.selected {
    outline: 2px solid #000;
    font-weight: bold;
    background-color: #ffffff !important;
    color: #000;
}

.calendar-cell.today {
    border: 2px solid #2196f3;
}

.blank {
    background: transparent;
    pointer-events: none;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
}

.calendar-title {
    flex: 1;
    text-align: center;
    font-size: 1.1rem;
    color: #333;
}

.nav-btn {
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 3px 10px 6px 10px;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
    background-color: #eee;
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.bg-light-green {
    background-color: #C8E6C9;
}

.bg-orange {
    background-color: #FFE082;
}

.bg-red {
    background-color: #FF8A80;
}

.bg-green {
    background-color: #7fdc82;
}

.calendar-footer {
    margin-top: 24px;
    padding: 16px;
    background-color: #f5faff;
    border: 1px solid #d0e7ff;
    border-radius: 12px;
    /* font-family: system-ui, sans-serif; */
}

.selected-date {
    margin-bottom: 12px;
    font-size: 15px;
    color: #333;
}

.selected-date strong {
    color: #0074cc;
    display: block;
    margin-bottom: 4px;
}

.color-legend {
    font-size: 14px;
    color: #444;
}

.legend-item {
    display: flex;
    align-items: center;
    margin: 4px 0;
}

.legend-box {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid #bbb;
    flex-shrink: 0;
}

.disabled-box {
    background-color: #eee !important;
    border: 1px dashed #999;
}
</style>