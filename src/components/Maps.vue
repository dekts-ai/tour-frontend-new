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
                        <button @click="navigateToTab(3, 'MyTrip')" :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')">My Trip</button>
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
                        <div :class="[iframeStatus ? 'row payment-row iframe-row' : 'row payment-row', '']">
                            <div class="col-12">
                                <div class="row booking-row" v-if="iframeStatus == false">
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
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top"
                                                title="">Secured</button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top"
                                                title="">Health &
                                                Safety</button>
                                            <button v-if="Object.keys(cartItem).length && cartView == 1" @click="checkout"
                                                class="btn btn-warning mt-2"><i class="fa fa-shopping-cart"
                                                    aria-hidden="true"></i> Checkout</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="tourlist-packages-wrap">
                                    <GMapMap
                                        :center="center"
                                        ref="mmm"
                                        :zoom="12"
                                        style="width: 100%; height: 400px"
                                    >
                                        <GMapMarker
                                            :key="index"
                                            v-for="(m, index) in markers"
                                            :ref="`marker${index}`"
                                            :position="m.position"
                                            :clickable="true"
                                            :icon="m.icon"
                                        />
                                    </GMapMap>
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
import axios from "axios";
import Swal from 'sweetalert2';
import Datepicker from 'vuejs3-datepicker';
import { format } from 'date-fns';
import { getUTCDateFromTimeZone } from '../utils/dateUtils';

export default {
    name: "GoogleMap",
    title: "Native American Tours",
    components: {
        Datepicker
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            cartView: 0,
            TourPkgDetails: [],
            banner: "",
            tenantId: "dixies",
            tourOperatorId: 1,
            packageId: 0,
            affiliateId: 0,
            showDatePicker: true,
            date: null,
            disabledDates: {
                to: this.getStartDate(),
                from: this.getEndDate()
            },
            cartItem: {},
            cartItemLength: 0,
            subtotal: 0,
            discount: 0,
            fees: 0,
            total: 0,
            tabs: 4,
            checkPackageIds: [],
            center: {lat: 51.093048, lng: 6.842120},
            markers: [
                {
                    position: {
                        lat: 51.093048, lng: 6.842120
                    },
                    text: 'Hauptgebäude der ETH Zürich'
                },
                {
                    position: {
                        lat: 47.376332, lng: 8.547511
                    },
                    text: 'Hauptgebäude der ETH Zürich'
                }
                , // Along list of clusters
            ]
        };
    },
    async created() {
        this.date = format(this.$store.state.date, 'yyyy-MM-dd');
        this.tenantId = this.$store.state.tenantId;
        this.tourOperatorId = this.$store.state.tourOperatorId;
        this.packageId = this.$store.state.packageId;
        this.affiliateId = this.$store.state.affiliateId;
        this.iframeStatus = this.$store.state.iframeStatus;
        this.cartView = this.$store.state.tourPackage?.cartView;
        this.cartItem = this.$store.state.cartItem;
        this.cartItemLength = Object.values(this.cartItem).length;

        if (this.cartItemLength) {
            for (var key in this.cartItem) {
                var pId = parseInt(this.cartItem[key].package_id);
                this.checkPackageIds.push(pId);
            }
        }

        if (this.$store.state.mindChange == 1) {
            this.packageId = 0;
            this.affiliateId = 0;
        }

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
        removeFromCart(formData) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.checkPackageIds = [];
                    delete this.cartItem[formData.tour_slot_id];
                    this.cartItemLength = Object.values(this.cartItem).length;

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your package has been deleted.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed && this.cartItemLength == 0) {
                            this.$store.dispatch('storeCartItem', {});
                        }
                    });

                    this.subtotal = 0;
                    this.discount = 0;
                    this.fees = 0;
                    this.total = 0;
                    if (this.cartItemLength) {
                        for (var key in this.cartItem) {
                            this.subtotal = Number(this.subtotal) + Number(this.cartItem[key].subtotal);
                            this.discount = Number(this.discount) + Number(this.cartItem[key].discount2_value);
                            this.fees = Number(this.fees) + Number(this.cartItem[key].fees);
                            this.total = Number(this.total) + Number(this.cartItem[key].total);

                            var pId = parseInt(this.cartItem[key].package_id);
                            this.checkPackageIds.push(pId);
                        }
                    }
                }
            });
        },
        checkout() {
            this.$router.push({
                name: 'Checkout'
            });

            return;
        },
        processLoader(loader) {
            loader.hide();
        },
        dateFormat(date) {
            this.$store.dispatch('storeDate', date);
            var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString("en-US", options)
        },
        toggleDatePicker() {
            this.showDatePicker = !this.showDatePicker;
        },
        getStartDate() {
            // See this issues with datepicker 
            // https://github.com/charliekassel/vuejs-datepicker/issues/118
            return getUTCDateFromTimeZone();
        },
        getEndDate() {
            let date = new Date(new Date(new Date().toLocaleString('en-US', { timeZone: 'US/Arizona' })).getFullYear() + 1, 11, 31);
            date.setHours(23, 59, 59, 999);
            return date;
        },
        selectedDate(date) {
            console.log('selectedDate');

            this.date = date;
            this.$store.dispatch('storeDate', this.date)

            var date = format(date, 'yyyy-MM-dd');
        },
        roundout(amount, places = 0) {
            if (places < 0) {
                places = 0;
            }

            let x = Math.pow(10, places);
            let formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        },
        navigateToTab(tab, destination) {
            if (tab === 1 || tab === 2 || tab === 3 || tab === 5) {
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
    }
};
</script>

<style>

</style>