<template>
    <section :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']"
        v-for="TourPkgDetails in details.TourPkgDetails" :key="TourPkgDetails.pkg_rate_id" class="banner-section"
        v-bind:style="{ 'background-image': 'url(' + TourPkgDetails.HeaderOne + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>

	<section class="tabs-section" v-if="iframeStatus">
        <NavBtns @navigatetotab="navigateToTab" :comboIds="comboIds" :tabs="tabs" />
	</section>

    <section class="inner-content-section">
        <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
            <div class="background-color-sec row">
                <div :class="[iframeStatus ? 'row payment-row iframe-row' : 'row payment-row', '']">
                    <div class="col-12">

                        <div class="row booking-row" v-if="iframeStatus == false">
                            <BookWithConfidence @navigatetotab="navigateToTab" />
                        </div>

                        <div class="row payment-form-sec">
                            <CheckoutForm  @onsubmit="submit" :items="cartItem" :paymentTotal="globalTotal" :tenantId="tenantId" :iframeStatus="iframeStatus" :errors="errors" @updateSeatErrors="handleSeatErrorsUpdate" />
                            <div class="col-lg-5 order-1 order-md-2">	
                                <ItemizedList :items="cartItem" :globalTotalItem="globalTotal" :seatErrors="seatErrors" :iframeStatus="iframeStatus" />
                                <ItemTotalSummary :globalTotal="globalTotal" />
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
import { loadStripe } from '@stripe/stripe-js';
import { stripeCardStyle, stripeEleStyle } from '../utils/stripeUtils';
import { CountryCodes }  from '../utils/geoUtils';
import NavBtns from './Nav/NavBtns';
import CheckoutForm from "./Checkout/CheckoutForm.vue";
import ItemizedList from "./Checkout/ItemizedList";
import ItemTotalSummary from "./Checkout/ItemTotalSummary";
import BookWithConfidence from "./Checkout/BookWithConfidence";

export default {
    name: "Checkout",
    title: "Native American Tours",
    components:{
        NavBtns,
        CheckoutForm,
        ItemizedList,
        ItemTotalSummary,
        BookWithConfidence
    },
    data() {
        return {
            processing: false,
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            tenantId: null,
            tabs: 5,
            comboIds: 0,
            bookingIds: {},
            details: [],
            hotels: [],
            cartItem: {},
            cartItemLength: 0,
            errors: [],
            seatErrors: [],
            seatErrorsLength: 0,
            globalTotal: {
                subtotal: 0,
                discount: 0,
                fees: 0,
                addons_total: 0,
                addons_fee: 0,
                total: 0,
            },
            message: "",
            stripe: "",
            elements: "",
            cardElement: null,
            stripeValidationError: "",
            toast: null,
            name: null,
            phone_number: null,
            phone_code: "+1",
            email: null,
            getemailupdates: 0,
            cancellations_policy: 0,
            comment: null,
            paymentIntentId: null,
        };
    },
    async mounted() {
        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
        this.createAndMountFormElements();
    },
    created() {
        this.iframeStatus = this.$store.state.iframeStatus;
        this.tenantId = this.$store.state.tenantId;
        this.hotels = this.$store.state.tourPackage?.hotels;
        this.comboIds = this.$store.state.comboIds;
        this.cartItem = this.$store.state.cartItem;
        this.cartItemLength = Object.values(this.cartItem).length;
        if (this.cartItemLength) {
            for (var key in this.cartItem) {
                this.globalTotal.subtotal = Number(this.globalTotal.subtotal) + Number(this.cartItem[key].subtotal);
                this.globalTotal.discount = Number(this.globalTotal.discount) + Number(this.cartItem[key].discount2_value);
                this.globalTotal.fees = Number(this.globalTotal.fees) + Number(this.cartItem[key].fees);
                this.globalTotal.addons_total = Number(this.globalTotal.addons_total) + Number(this.cartItem[key].addons_total);
                this.globalTotal.addons_fee = Number(this.globalTotal.addons_fee) + Number(this.cartItem[key].addons_fee);
                this.globalTotal.total = Number(this.globalTotal.total) + Number(this.cartItem[key].total);
                this.cartItem[key].couponErrors = [];
                this.cartItem[key].couponSuccess = [];
            }
        }
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        createAndMountFormElements() {
            this.elements = this.stripe.elements(stripeEleStyle);
            this.cardElement = this.elements.create("card", stripeCardStyle);
        },
        submit(props) {
           //map props to current data from checkoutForm component
           for(let key in props){ this[key] = props[key]; }

            // if an async request is processing
            if (this.processing === true) {
                return;
            }

            this.cartItem = this.$store.state.cartItem;
            this.cartItemLength = Object.values(this.cartItem).length;

            // set the async state
            this.processing = true;
            var loader = this.$loading.show();
            this.errors = [];
            if (this.comboIds.length && this.cartItemLength === 1) {
                this.errors.push("To proceed, please ensure you have selected at least two packages.");
            }
            if (!this.paymentIntentId) {
                this.errors.push("Please enter your card information.");
            }
            if (this.errors.length === 0) {
                // append the country code to phone number
                let phone_number = CountryCodes.formatPhoneNumber(this.phone_code, this.phone_number);

                let payload = {
                    items: this.cartItem,
                    name: this.name,
                    email: this.email,
                    phone_number: phone_number,
                    comment: this.comment,
                    getemailupdates: this.getemailupdates,
                    cancellations_policy: this.cancellations_policy,
                    payment_intent_id: this.paymentIntentId,
                    subtotal: this.globalTotal.subtotal,
                    discount: this.globalTotal.discount,
                    fees: this.globalTotal.fees,
                    addons_total: this.globalTotal.addons_total,
                    addons_fee: this.globalTotal.addons_fee,
                    total: this.globalTotal.total
                };

                let self = this;
                let router = this.$router;
                axios.post("/package-booking-tour", payload).then((response) => {
                    this.$store.dispatch('storeCustomer', payload);
                    if (response.data.success == "false") {
                        self.processLoader(loader);
                        this.message = response.data.message;
                        return true;
                    } else if (response.data.clientSecret) {
                        this.stripe
                            .confirmCardPayment(response.data.clientSecret)
                            .then(function () {
                                self.bookingIds = response.data.bookingIds;
                                self.$store.dispatch('storeBookingIds', self.bookingIds)
                                var stripeObject = {
                                    booking_ids: response.data.bookingIds,
                                    affiliate_id: response.data.affiliateId,
                                    payment_intent: response.data.intentId,
                                    payment_intent_client_secret: response.data.clientSecret
                                };
                                axios.post("/package-booking-3ds-payment", stripeObject).then(() => {
                                    self.processLoader(loader);
                                    router.push("/thankyou");
                                }).catch(function (error) {
                                    self.processLoader(loader);
                                    if (error.response) {
                                        // Request made and server responded
                                        self.errors.push(error.response.data.message)
                                    } else if (error.request) {
                                        // The request was made but no response was received
                                        console.log(error.request);
                                    } else {
                                        // Something happened in setting up the request that triggered an Error
                                        console.log('Error', error.message);
                                    }
                                });
                            });
                    } else {
                        self.processLoader(loader);
                        this.bookingIds = response.data.BookingIds;
                        this.$store.dispatch('storeBookingIds', this.bookingIds);
                        this.$router.push("/thankyou");
                    }
                }).catch(function (error) {
                    self.processLoader(loader);
                    if (error.response) {
                        // Request made and server responded
                        self.errors.push(error.response.data.message)
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                });
            } else {            
                this.processLoader(loader);
            }
        },
        navigateToTab(tab, destination) {
            if (tab === 1 || tab === 2 || tab === 3 || tab === 4) {
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
        dateFormat(date) {
            this.$store.dispatch('storeDate', date);
            var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString("en-US", options)
        },
        processLoader(loader) {
            // reset the state
            this.processing = false;
            loader.hide();
        },
        roundout(amount, places = 2) {
            if (places < 0) {
                places = 0;
            }

            let x = Math.pow(10, places);
            let formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        },
        handleSeatErrorsUpdate(errors) {            
            this.seatErrors = errors;
        },
    }
};
</script>

<style scoped>
.card-element {
    margin-top: 5px;
}
.card-label-text-left {
    text-align: left;
}
.error {
    color: #dc3545;
}
</style>