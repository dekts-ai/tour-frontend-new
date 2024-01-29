<template>
    <section :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']" class="banner-section"
        v-bind:style="{ 'background-image': 'url(' + banner + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>

    <section class="tabs-section" v-if="iframeStatus">
        <div class="no-container">
            <div class="row">
                <div class="col-10">
                    <div class="tabs-wrap d-flex align-items-center">
                        <button @click="navigateToTab(1, 'Index')" :class="'tabs tab1 ' + (tabs == 1 ? 'active' : '')">Tours</button>
                        <button @click="navigateToTab(2, 'Init')" :class="'tabs tab2 ' + (tabs == 2 ? 'active' : '')">Schedule</button>
                        <button :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')">My Trip</button>
						<button @click="navigateToTab(4, 'Maps')" :class="'tabs tab4 ' + (tabs == 4 ? 'active' : '')">Maps</button>
						<button @click="navigateToTab(5, 'Checkout')" :class="'tabs tab5 ' + (tabs == 5 ? 'active' : '')">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="inner-content-section">
        <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div :class="[iframeStatus ? 'row payment-row iframe-row pb-5' : 'row payment-row', '']">
                            <div class="col-12">
                                <div class="row booking-row pb-5" v-if="iframeStatus == false">
                                    <div class="col-lg-6 col-md-12">
                                        <div class="booking">
                                            <h2>Book Online</h2>
                                            <div class="confirmation">
                                                <img src="../assets/images/confirmation.png">
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top" title="">Secured</button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top" title="">Health & Safety</button>
                                            <button @click="navigateToTab(5, 'Checkout')" class="btn btn-warning mt-2"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="tourlist-packages-wrap h-100">
                                    <div class="timeline">
                                        <ul>
                                            <li v-for="item in bookings" :class="{ 'booking': item.booking, 'no-booking': !item.booking }">
                                                <div class="left_content">
                                                    <h3>{{ item.time }}</h3>
                                                </div>
                                                <div v-if="item.booking" class="right_content">
                                                    <div class="d-lg-flex justify-content-between align-items-center">
                                                        <p class="mb-lg-0 mb-2">{{ item.data.package_name }}</p>
                                                        <p>{{ item.data.duration }} Tour</p>
                                                    </div>
                                                    <div class="d-md-flex mt-2">
                                                        <img :src="item.data.package_image" width="100" height="100" alt="">
                                                        <div class="content-box">
                                                            <p class="mb-2">{{ dateFormat(item.data.date) }} @ {{ item.data.time_date }}</p>
                                                            <p class="mb-2" v-for="(pax, key) in item.data.people_group" :key="key">
                                                                <span v-if="pax > 0">{{ pax }} {{ item.data.rate_group[key] }}</span>
                                                            </p>
                                                            <small class="text-muted">{{ item.data.short_description }}</small>
                                                        </div>
                                                    </div>
                                                    <a role="button" @click="editPackage(item.data)" class="update">Update</a>
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
    </section>
</template>

<script>
export default {
    name: "MyTrip",
    title: "Native American Tours",
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            banner: "",
            tenantId: "dixies",
            tourOperatorId: 1,
            packageId: 0,
            affiliateId: 0,
            cartItem: {},
            cartItemLength: 0,
            tabs: 3,
            checkPackageIds: [],
            bookings: []
        };
    },
    async created() {
        this.tenantId = this.$store.state.tenantId;
        this.tourOperatorId = this.$store.state.tourOperatorId;
        this.packageId = this.$store.state.packageId;
        this.affiliateId = this.$store.state.affiliateId;
        this.iframeStatus = this.$store.state.iframeStatus;
        this.cartItem = this.$store.state.cartItem;
        this.cartItemLength = Object.values(this.cartItem).length;

        if (this.cartItemLength) {
            for (var key in this.cartItem) {
                var pId = parseInt(this.cartItem[key].package_id);
                this.checkPackageIds.push(pId);
            }
        }
        this.bookings = [];
        this.bookings = this.generateTimeSlots();

        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        editPackage(formData) {
            if (formData.affiliate_id) {
                this.$store.dispatch('storeAffiliateId', formData.affiliate_id)
            }

            this.$store.dispatch('storeFormData', formData)
            this.$store.dispatch('storePackageId', formData.package_id)
            this.$store.dispatch('storeDate', formData.date)

            this.$router.push({
                name: 'Init',
            });
        },
        generateTimeSlots() {
            const startTime = '05:45:00';
            const endTime = '19:45:00';
            const interval = 15; // in minutes

            this.bookings = [];
            let currentTime = startTime;

            while (currentTime <= endTime) {
                const [hours, minutes] = currentTime.split(':').map(Number);
                const totalMinutes = hours * 60 + minutes + interval;
                currentTime = `${Math.floor(totalMinutes / 60)
                    .toString()
                    .padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}:00`;

                let bookingNotExists = 0;
                if (this.cartItemLength) {
                    for (var key in this.cartItem) {
                        if (this.cartItem[key].slot_time == currentTime) {
                            this.bookings.push({
                                time: this.formatTime(currentTime),
                                booking: true,
                                data: this.cartItem[key]
                            });
                            bookingNotExists = 0;
                            break;
                        } else {
                            bookingNotExists = 1;
                        }
                    }
                } else {
                    this.bookings.push({
                        time: this.formatTime(currentTime),
                        booking: false,
                        data: null
                    });
                }

                if (bookingNotExists) {
                    this.bookings.push({
                        time: this.formatTime(currentTime),
                        booking: false,
                        data: null
                    });
                }
            }

            return this.bookings;
        },
        formatTime(timeString) {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);

            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes.toString().padStart(2, '0');

            return `${formattedHours}:${formattedMinutes} ${period}`;
        },
        dateFormat(date) {
            this.$store.dispatch('storeDate', date);
            var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString("en-US", options)
        },
        navigateToTab(tab, destination) {
            if (tab === 1 || tab === 2 || tab === 4 || tab === 5) {
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
        }
    }
};
</script>
