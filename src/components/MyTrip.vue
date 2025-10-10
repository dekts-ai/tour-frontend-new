<template>
    <section class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>

    <section class="inner-content-section">
        <div class="trip-container">
            <!-- Page Header -->
            <div class="trip-header">
                <div class="header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9Z" fill="currentColor" opacity="0.2"/>
                        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="header-content">
                    <h1 class="header-title">My Trip</h1>
                    <p class="header-subtitle">Review and manage your selected packages</p>
                </div>
            </div>

            <!-- Trip Timeline -->
            <div class="trip-timeline">
                <div v-for="(value, date, index) in bookings" :key="date" class="date-section">
                    <!-- Date Header -->
                    <div class="date-header" @click="toggleDate(date)">
                        <div class="date-badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                                <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
                                <path d="M8 3V7M16 3V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span>{{ formatDate(date) }}</span>
                        </div>
                        <svg 
                            class="toggle-icon" 
                            :class="{ 'rotated': expandedDates.includes(date) }"
                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>

                    <!-- Packages Timeline -->
                    <transition name="expand">
                        <div v-show="expandedDates.includes(date)" class="packages-timeline">
                            <div v-for="(item, idx) in value" :key="idx" class="package-card"
                                :class="{ 'is-booking': item.booking }">
                                
                                <!-- Time Indicator (if has slots) -->
                                <div v-if="item.data.package_has_slots" class="time-indicator">
                                    <div class="time-dot"></div>
                                    <div class="time-label">{{ item.slot_time }}</div>
                                </div>
                                
                                <!-- Package Content -->
                                <div v-if="item.booking" class="package-content">
                                    <div class="package-main">
                                        <div class="package-image">
                                            <img :src="item.data.package_image" :alt="item.data.package_name" />
                                            <div class="package-type-badge">{{ item.data.type }}</div>
                                        </div>
                                        
                                        <div class="package-details">
                                            <h3 class="package-name">{{ item.data.package_name }}</h3>
                                            
                                            <div class="package-meta">
                                                <div class="meta-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                        <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
                                                    </svg>
                                                    <span>{{ formatDate(item.data.date) }}
                                                        <span v-if="item.data.package_has_slots">@ {{ item.data.time_date }}</span>
                                                    </span>
                                                </div>
                                                
                                                <div v-if="item.data.package_has_slots" class="meta-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                                    </svg>
                                                    <span>{{ item.data.duration }}</span>
                                                </div>
                                            </div>

                                            <div class="package-guests">
                                                <div v-for="(pax, key) in item.data.people_group" :key="key" class="guest-item">
                                                    <span v-if="pax > 0">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
                                                            <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                                        </svg>
                                                        {{ pax }} {{ item.data.rate_group[key] }}
                                                    </span>
                                                </div>
                                            </div>

                                            <p class="package-description">{{ item.data.short_description }}</p>
                                        </div>
                                    </div>
                                    
                                    <button @click="editPackage(item.data)" class="update-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavBtns from './Nav/NavBtns.vue';
import { getMomentTimezone } from '@/utils/dateUtils';

export default {
    name: 'MyTrip',
    title: 'Native American Tours',
    components: {
        NavBtns
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: true,
            tenantId: null,
            tourOperatorId: 0,
            comboIds: 0,
            packageId: 0,
            affiliateId: 0,
            cartItem: {},
            cartItemLength: 0,
            checkPackageIds: [],
            bookings: {},
            expandedDates: []
        };
    },
    computed: {
        tabs() {
            // MyTrip is always step 1 (only used in combo packages)
            return 1;
        }
    },
    async created() {
        this.initializeState();
        this.bookings = this.generateTimeSlots();
        // Expand first date by default
        if (Object.keys(this.bookings).length > 0) {
            this.expandedDates.push(Object.keys(this.bookings)[0]);
        }
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        initializeState() {
            this.tenantId = this.$store.state.tenantId;
            this.tourOperatorId = this.$store.state.tourOperatorId;
            this.packageId = this.$store.state.packageId;
            this.affiliateId = this.$store.state.affiliateId;
            this.iframeStatus = this.$store.state.iframeStatus;
            this.comboIds = this.$store.state.comboIds;
            this.cartItem = this.$store.state.cartItem;
            this.cartItemLength = Object.values(this.cartItem).length;

            if (this.cartItemLength) {
                this.checkPackageIds = Object.values(this.cartItem).map(item => parseInt(item.package_id));
            }
        },
        toggleDate(date) {
            const index = this.expandedDates.indexOf(date);
            if (index > -1) {
                this.expandedDates.splice(index, 1);
            } else {
                this.expandedDates.push(date);
            }
        },
        editPackage(formData) {
            if (formData.affiliate_id) {
                this.$store.dispatch('storeAffiliateId', formData.affiliate_id);
            }
            this.$store.dispatch('storeFormData', formData);
            this.$store.dispatch('storePackageId', formData.package_id);
            this.$store.dispatch('storeDate', formData.date);
            this.$router.push({ name: 'Init' });
        },
        generateTimeSlots() {
            const bookingsByDate = {};

            // Get unique sorted dates
            const dates = [...new Set(
                Object.values(this.cartItem).map(item => item.date)
            )].sort();

            // Initialize bookings for each date
            dates.forEach(date => {
                bookingsByDate[date] = [];
            });

            // Process cart items
            Object.values(this.cartItem).forEach(item => {
                const currentDate = item.date;
                const slotTime = item.slot_time;

                bookingsByDate[currentDate].push({
                    time: slotTime,
                    slot_time: this.formatTime(slotTime),
                    booking: true,
                    data: item,
                });
            });

            // Sort bookings by time for each date
            Object.keys(bookingsByDate).forEach(date => {
                bookingsByDate[date].sort((a, b) => a.time.localeCompare(b.time));
            });

            return bookingsByDate;
        },
        formatDate(dateString, isClass = false) {
            if (isClass) {
                return getMomentTimezone(this.$store.state.timezone, dateString).format('YYYY-MM-DD');
            }

            return getMomentTimezone(this.$store.state.timezone, dateString).format('dddd, MMMM D, YYYY');
        },
        formatTime(timeString) {
            const [hours, minutes] = timeString.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
        },
        navigateToTab(tab, destination) {
            if ([1, 2, 3, 4, 5, 6].includes(tab)) {
                if (tab === 2) {
                    this.$store.dispatch('storeFormData', null);
                }
                this.$store.dispatch('storeMindChange', 1);
                this.$router.push({ name: destination });
            }
        },
        processLoader(loader) {
            loader.hide();
        },
    },
};
</script>

<style scoped>
.trip-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-6);
}

/* Header */
.trip-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 2px solid var(--neutral-200);
}

.header-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
}

.header-content {
    flex: 1;
}

.header-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin-bottom: var(--space-2);
}

.header-subtitle {
    font-size: var(--text-base);
    color: var(--neutral-600);
    margin: 0;
}

/* Date Section */
.date-section {
    margin-bottom: var(--space-6);
}

.date-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    cursor: pointer;
    transition: all var(--transition-base);
    margin-bottom: var(--space-4);
}

.date-header:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-1px);
}

.date-badge {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--primary-teal);
    font-weight: var(--font-semibold);
    font-size: var(--text-lg);
}

.date-badge svg {
    color: var(--primary-teal);
}

.toggle-icon {
    color: var(--neutral-400);
    transition: transform var(--transition-base);
}

.toggle-icon.rotated {
    transform: rotate(180deg);
}

/* Packages Timeline */
.packages-timeline {
    padding-left: var(--space-4);
    border-left: 3px solid var(--neutral-200);
    margin-left: var(--space-6);
}

.package-card {
    position: relative;
    margin-bottom: var(--space-6);
}

.package-card.is-booking {
    margin-left: var(--space-8);
}

/* Time Indicator */
.time-indicator {
    position: absolute;
    left: -42px;
    top: var(--space-6);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
}

.time-dot {
    width: 16px;
    height: 16px;
    background: var(--primary-teal);
    border-radius: var(--radius-full);
    border: 3px solid white;
    box-shadow: 0 0 0 3px var(--primary-teal-lighter);
}

.time-label {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--primary-teal);
    white-space: nowrap;
}

/* Package Content */
.package-content {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    transition: all var(--transition-base);
}

.package-content:hover {
    box-shadow: var(--shadow-lg);
}

.package-main {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-6);
    padding: var(--space-6);
}

.package-image {
    position: relative;
    width: 200px;
    height: 150px;
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.package-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.package-type-badge {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    padding: var(--space-1) var(--space-3);
    background: linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-amber-light) 100%);
    color: white;
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    border-radius: var(--radius-full);
}

.package-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.package-name {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0;
}

.package-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
}

.meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--neutral-600);
    font-size: var(--text-sm);
}

.meta-item svg {
    color: var(--primary-teal);
    flex-shrink: 0;
}

.package-guests {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
}

.guest-item span {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: var(--neutral-100);
    border-radius: var(--radius-md);
    color: var(--neutral-700);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
}

.guest-item svg {
    color: var(--primary-teal);
}

.package-description {
    color: var(--neutral-600);
    font-size: var(--text-sm);
    line-height: 1.6;
    margin: 0;
}

/* Update Button */
.update-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: linear-gradient(135deg, var(--secondary-terracotta) 0%, var(--secondary-terracotta-light) 100%);
    color: white;
    border: none;
    border-radius: 0 0 var(--radius-xl) var(--radius-xl);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    width: 100%;
}

.update-btn:hover {
    background: linear-gradient(135deg, var(--secondary-terracotta-dark) 0%, var(--secondary-terracotta) 100%);
    transform: translateY(-1px);
}

/* Transitions */
.expand-enter-active,
.expand-leave-active {
    transition: all var(--transition-base);
    max-height: 2000px;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .trip-container {
        padding: var(--space-6) var(--space-4);
    }
    
    .trip-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
    }
    
    .header-icon {
        width: 48px;
        height: 48px;
    }
    
    .header-title {
        font-size: var(--text-2xl);
    }
    
    .package-main {
        grid-template-columns: 1fr;
        gap: var(--space-4);
    }
    
    .package-image {
        width: 100%;
        height: 200px;
    }
    
    .packages-timeline {
        padding-left: 0;
        border-left: none;
        margin-left: 0;
    }
    
    .package-card.is-booking {
        margin-left: 0;
    }
    
    .time-indicator {
        position: static;
        flex-direction: row;
        margin-bottom: var(--space-3);
    }
    
    .date-header {
        padding: var(--space-3) var(--space-4);
    }
    
    .date-badge {
        font-size: var(--text-base);
    }
}
</style>
