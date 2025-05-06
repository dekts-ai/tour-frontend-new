<template>
    <section :class="['banner-section', iframeStatus ? 'iframe-inner-banner' : 'noiframe-inner-banner']"
        :style="{ backgroundImage: `url(${banner})` }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>

    <section class="tabs-section" v-if="iframeStatus">
        <div class="no-container">
            <div class="row">
                <div class="col-12">
                    <div class="dropdown text-start d-md-none">
                        <a class="hamburger-menu dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li v-for="tab in tabsConfig" :key="`mobile-${tab.id}`">
                                <button :class="['tabs', `tab${tab.id}`, 'dropdown-item', { active: tabs === tab.id }]"
                                    @click="navigateToTab(tab.id, tab.route)">
                                    {{ tab.label }}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="tabs-wrap d-flex align-items-center w-100">
                        <button v-for="tab in tabsConfig" :key="tab.id"
                            :class="['tabs', `tab${tab.id}`, { active: tabs === tab.id }]"
                            @click="navigateToTab(tab.id, tab.route)">
                            {{ tab.label }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="inner-content-section">
        <div :class="[iframeStatus ? 'no-container' : 'container']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div :class="['row', 'payment-row', { 'iframe-row pb-5': iframeStatus }]">
                            <div class="col-12">
                                <div class="row booking-row pb-5" v-if="!iframeStatus">
                                    <div class="col-lg-6 col-md-12">
                                        <div class="booking">
                                            <h2>Book Online</h2>
                                            <div class="confirmation">
                                                <img src="../assets/images/confirmation.png" alt="Confirmation" />
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-lg-6 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip"
                                                data-placement="top" title="">
                                                Secured
                                            </button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip"
                                                data-placement="top" title="">
                                                Health & Safety
                                            </button>
                                            <button @click="navigateToTab(5, 'Checkout')" class="btn btn-warning mt-2">
                                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="tourlist-packages-wrap h-100">
                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item" v-for="(value, date, index) in bookings"
                                            :key="date">
                                            <h2 class="accordion-header" :id="`heading-${formatDate(date)}`">
                                                <button class="accordion-button" :class="{ collapsed: index !== 0 }"
                                                    type="button" data-bs-toggle="collapse"
                                                    :data-bs-target="`#collapse-${formatDate(date)}`" :aria-expanded="index === 0"
                                                    :aria-controls="`collapse-${formatDate(date)}`">
                                                    {{ formatDate(date) }}
                                                </button>
                                            </h2>
                                            <div :id="`collapse-${formatDate(date)}`" class="accordion-collapse collapse"
                                                :class="{ show: index === 0 }" :aria-labelledby="`heading-${formatDate(date)}`"
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
import { format } from 'date-fns';

export default {
    name: 'MyTrip',
    title: 'Native American Tours',
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: true,
            banner: '',
            tenantId: null,
            tourOperatorId: 0,
            packageId: 0,
            affiliateId: 0,
            cartItem: {},
            cartItemLength: 0,
            tabs: 3,
            checkPackageIds: [],
            bookings: {},
            tabsConfig: [
                { id: 1, label: 'Tours', route: 'Index' },
                { id: 2, label: 'Schedule', route: 'Init' },
                { id: 3, label: 'My Trip', route: '' },
                { id: 4, label: 'Maps', route: 'Maps' },
                { id: 5, label: 'Checkout', route: 'Checkout' },
            ],
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
            this.$store.dispatch('storeDate', new Date(formData.date));
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
        formatDate(dateString) {
            return format(new Date(dateString), 'EEE, MMMM d, yyyy');
        },
        formatTime(timeString) {
            const [hours, minutes] = timeString.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
        },
        navigateToTab(tab, destination) {
            if ([1, 2, 4, 5].includes(tab)) {
                this.handleTab(tab, destination);
            }
        },
        handleTab(tab, destination) {
            if (tab === 2) {
                this.$store.dispatch('storeFormData', null);
            }
            this.$store.dispatch('storeMindChange', 1);
            this.$router.push({ name: destination });
        },
        processLoader(loader) {
            loader.hide();
        },
    },
};
</script>