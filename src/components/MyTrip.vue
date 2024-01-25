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

                                <div class="tourlist-packages-wrap h-100">
                                    <div class="timeline">
                                        <ul>
                                            <li class="booking">
                                                <div class="right_content">
                                                    <div class="d-lg-flex justify-content-between align-items-center">
                                                        <p class="mb-lg-0 mb-2">Lower Antelope Canyon</p>
                                                        <div>
                                                            <p>2 Hour Tour</p>
                                                            <div class="star text-start">
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-md-flex align-items-center mt-2">
                                                        <img src="https://nat-admin.s3.us-east-1.amazonaws.com/images/tour-operator/dixies/package/1/lacht-frontend-list-image-66.png"
                                                            width="100" height="100" alt="">
                                                        <div class="content-box">
                                                            <p class="mb-2">Sep. 30th 2023</p>
                                                            <p class="mb-md-3 mb-2">Monday 2:00PM</p>
                                                            <p class="mb-2">2 Adults</p>
                                                            <p>1 Child</p>
                                                        </div>
                                                    </div>
                                                    <a href="#" class="update">Update</a>
                                                </div>
                                                <div class="left_content">
                                                    <h3>6:00 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>6:15 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>6:30 AM</h3>
                                                </div>
                                            </li>
                                            <li class="booking">
                                                <div class="right_content">
                                                    <div class="d-lg-flex justify-content-between align-items-center">
                                                        <p class="mb-lg-0 mb-2">Lower Antelope Canyon</p>
                                                        <div>
                                                            <p>2 Hour Tour</p>
                                                            <div class="star text-start">
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                                <span><svg width="18" height="17" viewBox="0 0 18 17"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"
                                                                            fill="#2C9CF1" />
                                                                    </svg></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-md-flex align-items-center mt-2">
                                                        <img src="https://nat-admin.s3.us-east-1.amazonaws.com/images/tour-operator/dixies/package/1/lacht-frontend-list-image-66.png"
                                                            width="100" height="100" alt="">
                                                        <div class="content-box">
                                                            <p class="mb-2">Sep. 30th 2023</p>
                                                            <p class="mb-md-3 mb-2">Monday 2:00PM</p>
                                                            <p class="mb-2">2 Adults</p>
                                                            <p>1 Child</p>
                                                        </div>
                                                    </div>
                                                    <a href="#" class="update">Update</a>
                                                </div>
                                                <div class="left_content">
                                                    <h3>6:45 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>7:00 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>7:15 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>7:30 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>7:45 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>8:00 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>8:15 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>8:30 AM</h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="left_content no-booking">
                                                    <h3>8:45 AM</h3>
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
import axios from "axios";
import Swal from 'sweetalert2';
import Datepicker from 'vuejs3-datepicker';
import { format } from 'date-fns';
import { getUTCDateFromTimeZone } from '../utils/dateUtils';

export default {
    name: "MyTrip",
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
            tabs: 3,
            checkPackageIds: []
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
    }
};
</script>
