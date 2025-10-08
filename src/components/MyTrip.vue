<template>
    <section class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>

    <section class="inner-content-section">
        <div :class="['no-container']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div :class="['row', 'payment-row', 'iframe-row pb-5']">
                            <div class="col-12">
                                <div class="tourlist-packages-wrap h-100">
                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item" v-for="(value, date, index) in bookings"
                                            :key="date">
                                            <h2 class="accordion-header" :id="`heading-${formatDate(date, true)}`">
                                                <button class="accordion-button" :class="{ collapsed: index !== 0 }"
                                                    type="button" data-bs-toggle="collapse"
                                                    :data-bs-target="`#collapse-${formatDate(date, true)}`"
                                                    :aria-expanded="index === 0"
                                                    :aria-controls="`collapse-${formatDate(date, true)}`">
                                                    {{ formatDate(date) }}
                                                </button>
                                            </h2>
                                            <div :id="`collapse-${formatDate(date, true)}`"
                                                class="accordion-collapse collapse" :class="{ show: index === 0 }"
                                                :aria-labelledby="`heading-${formatDate(date, true)}`"
                                                data-bs-parent="#accordionExample">
                                                <div class="accordion-body p-0">
                                                    <div class="timeline">
                                                        <ul>
                                                            <li v-for="(item, idx) in value" :key="idx"
                                                                :class="{ booking: item.booking, 'no-booking': !item.booking }">
                                                                <div v-if="item.data.package_has_slots"
                                                                    class="left_content">
                                                                    <h3>{{ item.slot_time }}</h3>
                                                                </div>
                                                                <div v-if="item.booking" class="right_content">
                                                                    <div
                                                                        class="d-lg-flex justify-content-between align-items-center">
                                                                        <p class="mb-lg-0 mb-2">{{
                                                                            item.data.package_name }}</p>
                                                                        <p>
                                                                            <span v-if="item.data.package_has_slots">{{
                                                                                item.data.duration }}</span>
                                                                            {{ item.data.type }}
                                                                        </p>
                                                                    </div>
                                                                    <div class="d-md-flex mt-2">
                                                                        <img :src="item.data.package_image" width="100"
                                                                            height="100" alt="" />
                                                                        <div class="content-box">
                                                                            <p class="mb-2">
                                                                                {{ formatDate(item.data.date) }}
                                                                                <span
                                                                                    v-if="item.data.package_has_slots">@
                                                                                    {{ item.data.time_date }}</span>
                                                                            </p>
                                                                            <p class="mb-2"
                                                                                v-for="(pax, key) in item.data.people_group"
                                                                                :key="key">
                                                                                <span v-if="pax > 0">{{ pax }} {{
                                                                                    item.data.rate_group[key] }}</span>
                                                                            </p>
                                                                            <small class="text-muted">{{
                                                                                item.data.short_description }}</small>
                                                                        </div>
                                                                    </div>
                                                                    <a role="button" @click="editPackage(item.data)"
                                                                        class="update">Update</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            tabs: 3,
            checkPackageIds: [],
            bookings: {}
        };
    },
    async created() {
        this.initializeState();
        this.bookings = this.generateTimeSlots();
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
            if ([1, 2, 3, 5, 6].includes(tab)) {
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