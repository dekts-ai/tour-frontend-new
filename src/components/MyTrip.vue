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
                <div class="col-12">
                    <div class="dropdown text-start d-md-none">
                        <a class="hamburger-menu dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><button @click="navigateToTab(1, 'Index')" :class="'tabs tab1 dropdown-item ' + (tabs == 1 ? 'active' : '')">Tours</button></li>
                            <li><button @click="navigateToTab(2, 'Init')" :class="'tabs tab2 dropdown-item ' + (tabs == 2 ? 'active' : '')">Schedule</button></li>
                            <li><button :class="'tabs tab3 dropdown-item ' + (tabs == 3 ? 'active' : '')">My Trip</button></li>
                            <li><button @click="navigateToTab(4, 'Maps')" :class="'tabs tab4 dropdown-item ' + (tabs == 4 ? 'active' : '')">Maps</button></li>
                            <li><button @click="navigateToTab(5, 'Checkout')" :class="'tabs tab5 dropdown-item ' + (tabs == 5 ? 'active' : '')">Checkout</button></li>
                        </ul>
                    </div>
                    <div class="tabs-wrap d-flex align-items-center w-100">
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
                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item" v-for="(value, key, index) in bookings" :key="key">
                                            <h2 class="accordion-header" :id="'heading-'+index">
                                                <button class="accordion-button" :class="index ? 'collapsed' : ''" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-'+index" aria-expanded="true" :aria-controls="'collapse-'+index">
                                                    {{ formatDate(key) }}
                                                </button>
                                            </h2>
                                            <div :id="'collapse-'+index" class="accordion-collapse collapse show" :aria-labelledby="'heading-'+index" data-bs-parent="#accordionExample">
                                                <div class="accordion-body p-0">
                                                    <div class="timeline">
                                                        <ul>
                                                            <li v-for="item in value" :class="{ 'booking': item.booking, 'no-booking': !item.booking }">
                                                                <div v-if="item.data.package_has_slots" class="left_content">
                                                                    <h3>{{ item.slot_time }}</h3>
                                                                </div>
                                                                <div v-if="item.booking" class="right_content">
                                                                    <div class="d-lg-flex justify-content-between align-items-center">
                                                                        <p class="mb-lg-0 mb-2">{{ item.data.package_name }}</p>
                                                                        <p><span v-if="item.data.package_has_slots">{{ item.data.duration }}</span> {{ item.data.category }}</p>
                                                                    </div>
                                                                    <div class="d-md-flex mt-2">
                                                                        <img :src="item.data.package_image" width="100" height="100" alt="">
                                                                        <div class="content-box">
                                                                            <p class="mb-2">{{ dateFormat(item.data.date) }} <span v-if="item.data.package_has_slots">@ {{ item.data.time_date }}</span></p>
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
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { format } from 'date-fns';
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
                name: "Init"
            });
        },
        generateTimeSlots() {
            const startTime = '05:45:00';
            const endTime = '21:45:00';
            const interval = 15; // in minutes

            // Initialize an empty object to hold bookings by date
            const bookingsByDate = {};

            // Extract unique dates from cart items and sort them
            const dates = Object.values(this.cartItem)
                .map(item => format(item.date, 'yyyy-MM-dd'))
                .filter((date, index, self) => self.indexOf(date) === index)
                .sort();

            // Initialize bookings array for each sorted date
            dates.forEach(date => {
                bookingsByDate[date] = [];
            });

            // Loop through each cart item
            for (const key in this.cartItem) {
                const currentItem = this.cartItem[key];
                const currentDate = format(currentItem.date, 'yyyy-MM-dd');

                // Loop through time slots within the date range
                let currentTime = startTime;
                while (currentTime <= endTime) {
                    const [hours, minutes] = currentTime.split(':').map(Number);
                    const totalMinutes = hours * 60 + minutes;
                    const slotTime = `${Math.floor(totalMinutes / 60)
                        .toString()
                        .padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}:00`;

                    // Check if the current time slot matches the cart item's time
                    if (currentItem.slot_time === slotTime) {
                        // Push the booking into the array for the current date
                        bookingsByDate[currentDate].push({
                            time: slotTime,
                            slot_time: this.formatTime(slotTime),
                            booking: true,
                            data: currentItem
                        });
                    }

                    // Increment time by interval
                    const nextTime = new Date(`2000-01-01T${currentTime}`);
                    nextTime.setMinutes(nextTime.getMinutes() + interval);
                    currentTime = nextTime.toTimeString().slice(0, 8);
                }
            }

            for (const date in bookingsByDate) {
                // Sort the bookings array by time
                bookingsByDate[date].sort((a, b) => {
                    // Sort based on time
                    const timeA = new Date(`2000-01-01T${a.time}`);
                    const timeB = new Date(`2000-01-01T${b.time}`);
                    return timeA - timeB;
                });
            }

            this.bookings = bookingsByDate;

            return this.bookings;
        },
        formatDate(dateString) {
            var date = new Date(dateString);
            return format(date, 'EEE, MMMM d, yyyy');
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
