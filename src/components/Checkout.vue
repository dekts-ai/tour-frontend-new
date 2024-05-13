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
                            <CheckoutForm  @onsubmit="submit" :tenantId="tenantId" :iframeStatus="iframeStatus" :errors="errors"  />
                            <div class="col-lg-5 order-1 order-md-2">	
                                <ItemizedList :items="cartItem" :seatErrors="seatErrors" :iframeStatus="iframeStatus" />
                                <ItemTotalSummary :subtotal="subtotal" :total="total" :fees="fees" :discount="discount" />
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
            subtotal: 0,
            discount: 0,
            fees: 0,
            total: 0,
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
            cardnumber: null,
            nameoncard: null,
            expiration: null,
            cvv: null
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
                this.subtotal = Number(this.subtotal) + Number(this.cartItem[key].subtotal);
                this.discount = Number(this.discount) + Number(this.cartItem[key].discount2_value);
                this.fees = Number(this.fees) + Number(this.cartItem[key].fees);
                this.total = Number(this.total) + Number(this.cartItem[key].total);
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
            if (!this.name) {
                this.errors.push("Your name is required.");
            }
            if (!this.phone_number) {
                this.errors.push("Your phone number is required.");
            }
            if (!this.email) {
                this.errors.push("Your email address is required.");
            }
            if (!this.cancellations_policy) {
                this.errors.push("Please read and accept the terms and conditions.");
            }
            if (!this.cardnumber || !this.expiration || !this.cvv) {
                this.errors.push("Please enter your card information.");
            }
            if (this.cartItemLength &&
                this.name &&
                this.phone_number &&
                this.email &&
                this.cancellations_policy &&
                this.cardnumber &&
                this.expiration &&
                this.cvv &&
                this.errors.length === 0
            ) {
                this.seatErrors = [];
                axios.post("/bulk-check-available-seats", {
                    'items': this.cartItem,
                }).then((response) => {
                    for (var key in this.cartItem) {
                        if (response.data[key]?.success == "false") {
                            this.seatErrors.push(response.data);
                            this.seatErrorsLength = 1;
                        }
                    }

                    if (this.seatErrorsLength) {
                        this.seatErrors = this.seatErrors.filter((value, index, array) => 
                            array.indexOf(value) === index
                        )

                        if (this.comboIds == 0 || this.cartItemLength == 1) {
                            Swal.fire({
                                toast: true,
                                title: "Errors!",
                                html: response.data[key].message,
                                icon: "error"
                            });
                        } else {
                            Swal.fire({
                                toast: true,
                                title: "Errors!",
                                html: "Please look over the tour cost section for any errors!",
                                icon: "error"
                            });
                        }

                        this.processLoader(loader);
                        return true;
                    }

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
                        cardnumber: this.cardnumber,
                        expiration: this.expiration,
                        cvv: this.cvv,
                        subtotal: this.subtotal,
                        discount: this.discount,
                        fees: this.fees,
                        total: this.total
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
        roundout(amount, places = 0) {
            if (places < 0) {
                places = 0;
            }

            let x = Math.pow(10, places);
            let formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        }
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