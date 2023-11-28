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

    <section class="inner-content-section">
        <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div class="row payment-row">
                            <div class="col-12">
                                <div class="row booking-row">
                                    <div class="col-lg-6 col-md-12">
                                        <div class="booking">
                                            <h2>Book Online</h2>
                                            <div class="confirmation">
                                                <img src="../assets/images/confirmation.png" />
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top">
                                                Secured
                                            </button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top">
                                                Health & Safety
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="tour-packages-wrap">
                                        <div class="tour-packages-item" v-for="item in cartItem" :key="item.tour_slot_id">
                                            <div class="tour-packages-inner-wrap">
                                                <div class="tour-packages-inner">
                                                    <div class="tour-packages-detail">
                                                        <div class="tour-packages-image">
                                                            <img :src="item.package_image" alt="package-item-image">
                                                        </div>
                                                        <div class="tour-packages-title-wrap">
                                                            <div class="tour-packages-title-top">{{ dateFormat(item.date) }} @ {{ item.time_date }}</div>
                                                            <div class="tour-packages-title">{{ item.package_name }}
                                                            </div>
                                                            <div class="cancelling-policy-wrap">
                                                                <button class="cancelling-policy-title" @click="openPolicy()">Terms and conditions</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tour-packages-group-wrap">
                                                        <div class="tour-packages-group-title">Your selected group of people:</div>
                                                        <div class="tour-packages-group-people">
                                                            <div v-for="(pax, key) in item.people_group" :key="key">
                                                                <div class="tour-packages-selected-people" v-if="pax > 0">
                                                                    <div class="tour-packages-selected-people-icon">
                                                                        <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M4.07976 5.3184C5.3978 5.3184 6.46628 4.24991 6.46628 2.93187C6.46628 1.61383 5.3978 0.545349 4.07976 0.545349C2.76172 0.545349 1.69324 1.61383 1.69324 2.93187C1.69324 4.24991 2.76172 5.3184 4.07976 5.3184Z" fill="#4C76B2" />
                                                                            <path d="M5.6879 6.11444H2.47167C1.94894 6.11507 1.44781 6.323 1.07819 6.69263C0.708563 7.06225 0.500632 7.56338 0.5 8.08611L0.5 10.092H7.65957V8.08611C7.65894 7.56338 7.45101 7.06225 7.08139 6.69263C6.71176 6.323 6.21063 6.11507 5.6879 6.11444V6.11444Z" fill="#4C76B2" />
                                                                        </svg>
                                                                    </div>
                                                                    <div class="tour-packages-selected-people-title">{{ item.rate_group[key] }}</div>
                                                                    <div class="tour-packages-selected-people-count">
                                                                        <input type="text" name="count" :disabled="true" :value="pax">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="item.hotel_id" class="col-12 mb-4 hotel-section" style="font-size: 12px;">
                                                    <div class="hotel-wrapper d-flex">
                                                        <div class="hotel-image">
                                                            <img :src="item.hotel_image" :alt="item.hotel_name">
                                                        </div>
                                                        <div class="hotel-detail w-100">
                                                            <div class="hotel-title">Hotel Pickup Location:</div>
                                                            <div class="hotel-name">{{ item.hotel_name }}</div>
                                                            <div class="hotel-detail-address">{{ item.hotel_address }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p class="text-start tour-packages-detail" v-if="seatErrors?.length">
                                                    <ul><li v-for="(error, index) in seatErrors" :key="index" v-bind:class="{'text-danger': error[item.tour_slot_id]?.success }"><small>{{ error[item.tour_slot_id]?.message }}</small></li></ul>
                                                </p>
                                            </div>
                                            <div class="tour-packages-totalcost">
                                                <div class="tour-packages-costcount-title">Tour Cost:</div>
                                                <div class="tour-packages-costcount-subitem">
                                                    <div class="tour-packages-costcount-subitem-title">Subtotal:</div>
                                                    <div class="tour-packages-costcount-subitem-cost">${{ Number(item.subtotal).toFixed(2) }}</div>
                                                </div>
                                                <div class="tour-packages-costcount-subitem">
                                                    <div class="tour-packages-costcount-subitem-title">Discount:</div>
                                                    <div class="tour-packages-costcount-subitem-cost">
                                                        <span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span> ${{ item?.discount2_value ? Number(item?.discount2_value).toFixed(2) : Number(0).toFixed(2) }}
                                                    </div>
                                                </div>
                                                <div class="tour-packages-costcount-subitem">
                                                    <div class="tour-packages-costcount-subitem-title">Booking Fees:</div>
                                                    <div class="tour-packages-costcount-subitem-cost">${{ Number(item.fees).toFixed(2) }}</div>
                                                </div>
                                                <div class="tour-packages-costcount-total">
                                                    <div class="tour-packages-costcount-total-title">Tour Cost:</div>
                                                    <div class="tour-packages-costcount-total-cost">${{ Number(item.total).toFixed(2) }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 total-cost-col mt-0 mb-2">
                                    <div class="row subtotal">
                                        <div class="col-6 text-start">Ticket Cost:</div>
                                        <div class="col-6 text-end">${{ Number(subtotal).toFixed(2) }}</div>
                                    </div>

                                    <div class="row subtotal" v-if="1">
                                        <div class="col-6 text-start">Discount:</div>
                                        <div class="col-6 text-end">${{ Number(discount).toFixed(2) }}</div>
                                    </div>

                                    <div class="row fees">
                                        <div class="col-6 text-start">Booking Fees:</div>
                                        <div class="col-6 text-end">${{ Number(fees).toFixed(2) }}</div>
                                    </div>

                                    <div class="row totalcost">
                                        <div class="col-6 text-start">Total Cost:</div>
                                        <div class="col-6 text-end">${{ Number(total).toFixed(2) }}</div>
                                    </div>
                                </div>

                                <div class="row payment-form-sec">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12">
                                                <span class="payment-form-notice">
                                                    Please fill all fields marked with <span>*</span> to
                                                    complete your booking
                                                </span>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-field-title">Contact</div>
                                                <div class="col-md-12 form-field-wrp contact-form-field mb-2">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="fullname"
                                                                class="col-form-label">Full Name<span
                                                                    class="required-star">*</span></label>
                                                            <div class="field-icon-wrp">
                                                                <i class="fa fa-user"
                                                                    aria-hidden="true"></i>
                                                            </div>
                                                            <input type="text" id="name" name="name"
                                                                v-model="name" class="form-control"
                                                                placeholder="Your Name" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <div class="phone-wrap">
                                                                <label for="phonenumber"
                                                                    class="col-form-label">Phone Number<span
                                                                        class="required-star">*</span></label>
                                                                <div class="field-icon-wrp">
                                                                    <i class="fa fa-phone"
                                                                        aria-hidden="true"></i>
                                                                </div>
                                                                <input type="text" id="phonenumber"
                                                                    name="phone_number"
                                                                    v-model="phone_number"
                                                                    v-mask="'###############'"
                                                                    class="form-control"
                                                                    placeholder="Your Contact Number" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="Email" class="col-form-label">Email
                                                                Address<span
                                                                    class="required-star">*</span></label>
                                                            <div class="field-icon-wrp">
                                                                <i class="fa fa-envelope"
                                                                    aria-hidden="true"></i>
                                                            </div>
                                                            <input type="email" id="emailaddress"
                                                                name="email" v-model="email"
                                                                class="form-control"
                                                                placeholder="Your Email Address" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <span class="payment-form-notice important-note w-100">
                                                    <span class="notice-title">Important Note:</span>
                                                    All guests must arrive 45 minutes prior to their
                                                    reserved tour time. All guests must stay with their
                                                    guides.
                                                </span>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group form-textarea-wrap">
                                                    <label for="comment" class="col-form-label">Comments</label>
                                                    <textarea id="comment" name="comment" v-model="comment"
                                                        placeholder="Please type here ..."></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="row">
                                                    <div class="col-12 col-md-6 text-center text-md-start">
                                                        <div class="additional-notes-text">
                                                            Any additional notes or special requests?
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6 text-center text-md-end">
                                                        <div class="accommodate-your-request">
                                                            We will do our best to accommodate your request.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="payment-text card-label-text-left"><img
                                                                src="../assets/images/shield.png" alt="shield"> Payment
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="secured-encryption card-label-text-left"><img
                                                                src="../assets/images/lock-white.png" alt="lock"> Secured
                                                            with 2048-bit encryption
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-12">
                                                        <div class="card-detail-main">
                                                            <div class="row align-items-center">
                                                                <div class="col-12 col-md-5 border-right">
                                                                    <div class="card-detail-wrp card-form-field">
                                                                        <div class="form-group col-12 card-label-text-left">
                                                                            <label for="cardnumber"
                                                                                class="col-form-label">Card Number<span
                                                                                    class="required-star">*</span></label>
                                                                            <div class="field-icon-wrp">
                                                                                <i class="fa fa-lock"
                                                                                    aria-hidden="true"></i>
                                                                            </div>
                                                                            <input type="text" id="cardnumber"
                                                                                name="cardnumber" class="form-control"
                                                                                v-model="cardnumber"
                                                                                v-mask="'#### #### #### ####'"
                                                                                placeholder="1234 1234 1234 1234">
                                                                            <div class="validation-icon-wrp">
                                                                                <i class="fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group col-12">
                                                                            <div class="phone-wrap card-label-text-left">
                                                                                <label for="nameoncard"
                                                                                    class="col-form-label">Name on Card<span
                                                                                        class="required-star">*</span></label>
                                                                                <div class="field-icon-wrp">
                                                                                    <i class="fa fa-user"
                                                                                        aria-hidden="true"></i>
                                                                                </div>
                                                                                <input type="text" id="nameoncard"
                                                                                    name="nameoncard" class="form-control"
                                                                                    v-model="nameoncard" placeholder="">
                                                                                <div class="validation-icon-wrp">
                                                                                    <i class="fa fa-check-circle"
                                                                                        aria-hidden="true"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group col-12 mb-0">
                                                                            <div class="row">
                                                                                <div
                                                                                    class="form-group col-7 card-label-text-left">
                                                                                    <label for="expiration"
                                                                                        class="col-form-label">Expiration<span
                                                                                            class="required-star">*</span></label>
                                                                                    <div class="field-icon-wrp">
                                                                                        <i class="fa fa-calendar-check-o"
                                                                                            aria-hidden="true"></i>
                                                                                    </div>
                                                                                    <input type="text" id="expiration"
                                                                                        name="expiration"
                                                                                        class="form-control"
                                                                                        v-model="expiration"
                                                                                        v-mask="'##/##'"
                                                                                        placeholder="MM/YY">
                                                                                    <div class="validation-icon-wrp">
                                                                                        <i class="fa fa-check-circle"
                                                                                            aria-hidden="true"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    class="form-group col-5 card-label-text-left">
                                                                                    <label for="cvv"
                                                                                        class="col-form-label">CVC<span
                                                                                            class="required-star">*</span><img
                                                                                            src="../assets/images/radio-info.png"
                                                                                            data-toggle="tooltip"
                                                                                            data-placement="top"
                                                                                            title="Card Verification Code"></label>
                                                                                    <div class="field-icon-wrp">
                                                                                        <i class="fa fa-lock"
                                                                                            aria-hidden="true"></i>
                                                                                    </div>
                                                                                    <input type="text" id="cvv" name="cvv"
                                                                                        class="form-control" v-model="cvv"
                                                                                        v-mask="'####'" placeholder="CVC">
                                                                                    <div class="validation-icon-wrp">
                                                                                        <i class="fa fa-check-circle"
                                                                                            aria-hidden="true"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 col-md-7">
                                                                    <div class="makeaayment-wrap">
                                                                        <div class="form-group col-12">
                                                                            <div
                                                                                class="makeaayment-detail-title card-label-text-left">
                                                                                We accept all major credit and debit cards:
                                                                            </div>
                                                                            <div class="makeaayment-detail-wrp">
                                                                                <img src="../assets/images/card-name.png"
                                                                                    alt="card-name">
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group col-12">
                                                                            <hr>
                                                                        </div>
                                                                        <div class="form-group col-12 mb-0">
                                                                            <input type="submit" name="makeaayment"
                                                                                id="makeaayment" @click="submit()" value="Make a Payment"
                                                                                class="makeaayment-btn">
                                                                        </div>
                                                                        <div class="form-group col-12 mb-0">
                                                                            <div
                                                                                class="booking-you-text card-label-text-left">
                                                                                By booking you also agree to
                                                                                our <a
                                                                                    href="https://nativeamericantours.com/privacy-policy.html">policies</a>,
                                                                                and
                                                                                Stripe <a
                                                                                    href="https://stripe.com/legal/end-users">terms
                                                                                    of
                                                                                    service</a>.</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <p class="mb-3" v-if="errors.length">
                                                <b>Please correct the following error(s):</b>
                                                <ul>
                                                    <li v-for="error in errors" :key="error"
                                                        v-bind:class="{ 'text-danger': error }">{{ error }}
                                                    </li>
                                                </ul>
                                            </p>
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
import axios from "axios";
import Swal from 'sweetalert2'
import { loadStripe } from '@stripe/stripe-js';
import { mask } from 'vue-the-mask';
import { getUTCDateFromTimeZone } from '../utils/dateUtils';
export default {
    name: "Payment",
    directives: {
        mask
    },
    data() {
        return {
            processing: false,
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
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

        this.toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    },
    created() {
        this.hotels = this.$store.state.tourPackage?.hotels;
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
        } else {
            window.location.href = '/';
        }
    },
    methods: {
        createAndMountFormElements() {
            this.elements = this.stripe.elements({
                fonts: [{
                    cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
                }]
            });

            this.cardElement = this.elements.create("card", {
                style: {
                    base: {
                        color: "#464646",
                        fontFamily: 'Inter, sans-serif',
                        fontSmoothing: "antialiased",
                        fontSize: "14px",
                        "::placeholder": {
                            color: "#32325d"
                        },
                        backgroundColor: 'transparent',
                        lineHeight: '26px'
                    },
                    invalid: {
                        fontFamily: 'Inter, sans-serif',
                        color: "#fa755a",
                        iconColor: "#fa755a"
                    }
                }
            });
        },
        openPolicy() {
            Swal.fire({
                toast: true,
                title: "Terms and conditions",
                html: `<div class="form-group col-12">
                    <div class="policy-item-wrp">
                        <h6 class="card-label-text-left mb-2">
                            <i>Cancellation policy</i>
                        </h6>
                        <ul>
                            <li class="ms-2">
                                We offer cancellations on purchases made of the services offered on our Website. We offer cancellations only prior to performance of the service. You may cancel your order by contacting us via email or phone.
                            </li>
                            <li class="ms-2">
                                We reserve the right to cancel your purchase for any reason, at our sole discretion, including but not limited to fraud, inaccuracies, and unavailability of the items or services purchased. We will let you know immediately if we plan on canceling your purchase.
                            </li>
                            <li class="ms-2">
                                We will issue a partial refund of the purchase price that you paid if we cancel your purchase.
                            </li>
                        </ul>
                        <br>
                        <h6 class="card-label-text-left mb-2">
                            <i>Refund policy</i>
                        </h6>
                        <ul>
                            <li class="ms-2">
                                We offer full refunds of ticket price (not booking fees) made of the services offered on our Website. Booking Fees are non-refundable. To qualify for a full refund of the ticket price, you must submit your request to us via phone or email 48 hours prior to the day you booked for. If your booking is canceled within the 48 hour timeframe of your tour, you may be eligible for a 50% refund. If you miss your tour for any reason, you will not be given a refund.
                            </li>
                            <li class="ms-2">
                                In the event that tours are canceled due to weather or unforeseen circumstances, you will receive a full refund.
                            </li>
                        </ul>
                    </div>
                </div>`,
            });
        },
        submit() {
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
                this.errors.push("Name is required on contact section.");
            }
            if (!this.phone_number) {
                this.errors.push("Phone number is required on contact section.");
            }
            if (!this.email) {
                this.errors.push("Email is required on contact section.");
            }
            if (!this.cardnumber || !this.expiration || !this.cvv) {
                this.errors.push("Please add card information.");
            }
            if (this.cartItemLength &&
                this.name &&
                this.phone_number &&
                this.email &&
                this.cardnumber &&
                this.expiration &&
                this.cvv
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

                        Swal.fire({
                            toast: true,
                            title: "Errors!",
                            html: "Please look over the package section above for any errors!",
                            icon: "error"
                        });

                        this.processLoader(loader);
                        return true;
                    }

                    let payload = {
                        items: this.cartItem,
                        name: this.name,
                        email: this.email,
                        phone_number: this.phone_number,
                        comment: this.comment,
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
                        // this.$store.dispatch('storeCustomer', this.form);
                        if (response.data.success == "false") {
                            self.processLoader(loader);
                            this.message = response.data.message;
                            return true;
                        } else if (response.data.clientSecret) {
                            this.stripe
                                .confirmCardPayment(response.data.clientSecret)
                                .then(function () {
                                    self.bookingId = response.data.bookingId;
                                    // self.$store.dispatch('storeBookingId', self.bookingId)
                                    var stripeObject = {
                                        booking_id: response.data.bookingId,
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
                            this.bookingIds = response.data.BookingId;
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
        mindChange(formData = null) {
            if (formData && formData.tenant_id && formData.tour_operator_id && formData.package_id && formData.affiliate_id) {
                this.$store.dispatch('storeFormData', formData)
                this.$store.dispatch('storePackageId', formData.package_id)
                this.$store.dispatch('storeAffiliateId', formData.affiliate_id)
                this.$store.dispatch('storeDate', formData.date)

                this.$router.push({
                    name: 'Init',
                    query: {
                        tid: formData.tenant_id,
                        oid: formData.tour_operator_id,
                        pid: formData.package_id,
                        aid: formData.affiliate_id,
                        iframe: formData.iframeStatusInfo
                    }
                });
            } else if (formData && formData.tenant_id && formData.tour_operator_id && formData.package_id) {
                this.$store.dispatch('storeFormData', formData)
                this.$store.dispatch('storePackageId', formData.package_id)
                this.$store.dispatch('storeDate', formData.date)

                this.$router.push({
                    name: 'Init',
                    query: {
                        tid: formData.tenant_id,
                        oid: formData.tour_operator_id,
                        pid: formData.package_id,
                        iframe: formData.iframeStatusInfo
                    }
                });
            } else {
                this.$store.dispatch('storePackageId', 0)
                this.$store.dispatch('storeDate', getUTCDateFromTimeZone())
                this.$router.push({
                    name: 'Index'
                });
            }
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
            return (amount >= 0 ? Math.ceil(amount * x) : Math.floor(amount * x)) / x;
        },
    }
};
</script>
  
<style>
.card-element {
    margin-top: 5px;
}

.card-label-text-left {
    text-align: left;
}

.error {
    color: #dc3545;
}</style>