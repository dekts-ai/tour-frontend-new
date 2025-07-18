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
                :class="{
                    disabled: isDisabled(day),
                    selected: isSelected(day),
                    today: isToday(day),
                    [getColorClass(day)]: true
                }"
                @click="selectDate(day)"
            >
                {{ day }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CustomCalendar',
    props: ['modelValue', 'form'],
    emits: ['update:modelValue', 'selected'],
    data() {
        const today = new Date();
        return {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
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
            return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        },
        blanks() {
            return new Date(this.currentYear, this.currentMonth, 1).getDay();
        },
        weekDays() {
            return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        },
        monthName() {
            return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
        },
        isPrevDisabled() {
            const today = new Date();
            return (
                this.currentYear === today.getFullYear() &&
                this.currentMonth === today.getMonth()
            );
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
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: this.form.timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            const parts = formatter.formatToParts(new Date());
            const dateParts = Object.fromEntries(parts.map(p => [p.type, p.value]));

            const tzYear = parseInt(dateParts.year);
            const tzMonth = parseInt(dateParts.month) - 1;
            const tzDay = parseInt(dateParts.day);

            const cellDate = new Date(this.currentYear, this.currentMonth, day);
            const todayDate = new Date(tzYear, tzMonth, tzDay);

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
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: this.form.timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            const parts = formatter.formatToParts(new Date());
            const dateParts = Object.fromEntries(parts.map(p => [p.type, p.value]));

            const tzYear = parseInt(dateParts.year);
            const tzMonth = parseInt(dateParts.month) - 1; // month is zero-based
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
    background: #4caf50 !important;
    color: white;
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

.calendar-cell.bg-light-green {
  background-color: #C8E6C9;
}

.calendar-cell.bg-orange {
  background-color: #FFE082;
}

.calendar-cell.bg-red {
  background-color: #FF8A80;
}

.calendar-cell.bg-green {
  background-color: #7fdc82;
}
</style>