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
                            <li><button v-if="comboIds" @click="navigateToTab(3, 'MyTrip')" :class="'tabs tab3 dropdown-item ' + (tabs == 3 ? 'active' : '')">My Trip</button></li>
                            <li><button v-if="comboIds" @click="navigateToTab(4, 'Maps')" :class="'tabs tab4 dropdown-item ' + (tabs == 4 ? 'active' : '')">Maps</button></li>
                            <li><button :class="'tabs tab5 dropdown-item ' + (tabs == 5 ? 'active' : '')">Checkout</button></li>
                        </ul>
                    </div>
                    <div class="tabs-wrap d-flex align-items-center w-100">
                        <button @click="navigateToTab(1, 'Index')" :class="'tabs tab1 ' + (tabs == 1 ? 'active' : '')">Tours</button>
                        <button @click="navigateToTab(2, 'Init')" :class="'tabs tab2 ' + (tabs == 2 ? 'active' : '')">Schedule</button>
                        <button v-if="comboIds" @click="navigateToTab(3, 'MyTrip')" :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')">My Trip</button>
                        <button v-if="comboIds" @click="navigateToTab(4, 'Maps')" :class="'tabs tab4 ' + (tabs == 4 ? 'active' : '')">Maps</button>
                        <button :class="'tabs tab5 ' + (tabs == 5 ? 'active' : '')">Checkout</button>
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
                                    <div class="col-lg-5 col-md-12">
                                        <div class="booking">
                                            <h2>Book Online</h2>
                                            <div class="confirmation">
                                                <img src="../assets/images/confirmation.png" />
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-7 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top">
                                                Secured
                                            </button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top">
                                                Health & Safety
                                            </button>
                                            <button @click="navigateToTab(1, 'Index')" class="btn btn-primary mt-2"><i class="fa fa-arrow-left" aria-hidden="true"></i> Home</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row payment-form-sec">
                                	<div class="col-lg-7 mt-lg-0 mt-md-5 mt-4 order-2 order-md-1">
                                		<div class="contact-wrap">
	                                		<div class="form-field-title" v-if="iframeStatus == false">Contact:</div>
	                                        <div class="form-field-wrp contact-form-field mb-2">
			                                    <div class="form-group">
                                                    <label for="fullname" class="col-form-label">Full Name <span class="required-star">*</span></label>
                                                    <div class="field-icon-wrp"> <i class="fa fa-user" aria-hidden="true"></i> </div>
                                                    <input type="text" v-model="name" id="name" name="name" class="form-control" placeholder="Your Name">
                                                </div>
                                                <div class="form-group">
                                                    <div class="phone-wrap">
                                                        <label for="phonenumber" class="col-form-label">Phone Number <span class="required-star">*</span> </label>
                                                        <!-- <div class="field-icon-wrp"> <i class="fa fa-phone" aria-hidden="true"></i> </div> -->
                                                        <!-- <input type="text" v-model="phone_number" id="phonenumber" name="phone_number" class="form-control" placeholder="Your Contact Number"> -->

                                                    <IntPhoneNumber :current_phone_number="phone_number" 
                                                     :current_phone_code="phone_code"
                                                     @onphoneupdate="updatePhoneNumber" /> 

                                                     <input type="hidden" id="phonenumber" name="phone_number" v-model="phone_number"  />
                                                    <input type="hidden" id="phonecode" name="phone_code" v-model="phone_code"  />

                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="Email" class="col-form-label">Email Address <span class="required-star">*</span> </label>
                                                    <div class="field-icon-wrp"> <i class="fa fa-envelope" aria-hidden="true"></i> </div>
                                                    <input type="email" v-model="email" id="emailaddress" name="email" class="form-control" placeholder="Your Email Address">
                                                </div>
                                                <div class="form-group form-textarea-wrap">
                                                    <label for="comment" class="col-form-label">Comments</label>
                                                    <textarea v-model="comment" id="comment" name="comment" placeholder="Please type here ..."></textarea>
                                                </div>
			                                    <div class="form-group mb-0">
			                                    	<div class="form-check text-start">
  														<input class="form-check-input" type="checkbox" v-model="cancellations_policy" id="cancellations_policy">
  														<label class="form-check-label ms-2" for="cancellations_policy">
                                                            <span class="required-star"> * </span> 
                                                            <button class="cancelling-policy-title" @click="openPolicy()"> Terms and conditions</button>
                                                            I have read and accept all cancellations terms. 
                                                        </label>
													</div>
												</div>
			                                    <div class="form-group mb-0">
			                                    	<div class="form-check text-start">
  														<input class="form-check-input" type="checkbox" v-model="getemailupdates" id="getemailupdates">
  														<label class="form-check-label ms-2" for="getemailupdates">
                                                            Get future email updates from Lower Antelope Canyon Hiking Tour.
                                                        </label>
													</div>
												</div>
			                                </div>
			                                <div class="payment-box mb-2">
			                                	<div class="payment-text card-label-text-left">
                                                    <img src="../assets/images/payment.png"> Payment
                                                </div>
			                                	<div class="secured-encryption card-label-text-left">
                                                    <img src="../assets/images/lock-white.png" alt="lock"> Secured with 2048-bit encryption
                                                </div>
			                                	<div class="card-detail-main">
	    											<div class="card-detail-wrp card-form-field">
										                <div class="form-group col-12 card-label-text-left">
										                    <label for="cardnumber" class="col-form-label">Card Number <span class="required-star">*</span></label>
										                    <div class="field-icon-wrp"><i class="fa fa-lock" aria-hidden="true"></i></div>
										                    <input type="text" id="cardnumber" name="cardnumber" class="form-control" v-model="cardnumber" v-mask="'#### #### #### ####'" placeholder="CARD NUMBER">
										                    <div class="validation-icon-wrp"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
										                </div>
										                <div class="form-group col-12">
										                    <div class="phone-wrap card-label-text-left">
										                        <label for="nameoncard" class="col-form-label">Name on Card <span class="required-star">*</span></label>
										                        <div class="field-icon-wrp"><i class="fa fa-user" aria-hidden="true"></i></div>
										                        <input type="text" id="nameoncard" name="nameoncard" class="form-control" v-model="nameoncard" placeholder="CARDHOLDER NAME">
										                        <div class="validation-icon-wrp"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
										                    </div>
										                </div>
										                <div class="form-group col-12 mb-0">
										                    <div class="row">
										                        <div class="form-group col-7 card-label-text-left small">
										                            <label for="expiration" class="col-form-label">Expiration Date <span class="required-star">*</span></label>
										                            <div class="field-icon-wrp"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
										                            <input type="text" id="expiration" name="expiration" class="form-control" v-model="expiration" v-mask="'##/##'" placeholder="MM/YY">
										                            <div class="validation-icon-wrp"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
										                        </div>
										                        <div class="form-group col-5 card-label-text-left small">
										                            <label for="cvv" class="col-form-label">Security Code <span class="required-star">*</span>
										                                <img src="data:image/png;base64,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" data-toggle="tooltip" data-placement="top" title="Card Verification Code">
										                            </label>
										                            <div class="field-icon-wrp"><i class="fa fa-lock" aria-hidden="true"></i></div>
										                            <input type="text" id="cvv" name="cvv" class="form-control" v-model="cvv" v-mask="'####'" placeholder="CVC">
										                            <div class="validation-icon-wrp"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
										                        </div>
										                    </div>
										                </div>
                                                        <p class="text-start mb-3 pe-3" v-if="errors.length">
                                                            <b>Please correct the following error(s):</b>
                                                            <ul class="following-error">
                                                                <li v-for="error in errors" :key="error"
                                                                    v-bind:class="{ 'text-danger': error }">{{ error }}
                                                                </li>
                                                            </ul>
                                                        </p>
										                <div class="form-group col-12 mb-0 text-start">
										                    <input type="submit" @click="submit()" name="makeaayment" id="makeaayment" class="makeaayment-btn" value="Make a Payment">
										                </div>
										               	<div class="form-group col-12 mb-0">
										                    <div class="booking-you-text card-label-text-left"> By booking you also agree to our <a href="https://nativeamericantours.com/privacy-policy.html">policies</a>, and Stripe <a href="https://stripe.com/legal/end-users">terms of service</a>. </div>
										                </div>
					            					</div>
	        									</div>
	        								</div>
	        							</div>
        							</div>
		                            <div class="col-lg-5 order-1 order-md-2">
		                            	<div class="form-field-title mt-md-0 mt-3" v-if="iframeStatus == false">Tour Cost:</div>	
		                            	<div class="total-cost-wrap" v-for="item in cartItem" :key="item.tour_slot_id">


		                            		<div class="title-wrap">
		                            			<div class="title">{{ item.package_name }}</div>
		                            			<div class="time">{{ dateFormat(item.date) }} @ {{ item.time_date }}</div>
		                            		</div>
                                            <div v-for="(pax, key) in item.people_group" :key="key">
                                                <div v-if="pax > 0" class="ages-wrap d-flex justify-content-between align-items-center">
                                                    <div class="title">{{ item.rate_group[key] }}</div>
                                                    <div class="number">{{ pax }}</div>	
                                                </div>
                                            </div>
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center">
		                            			<div class="title">Ticket Cost</div>
						                       	<div class="amount">${{ Number(item.subtotal).toFixed(2) }}</div>	
		                            		</div>
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center" v-if="item?.discount2_value > 0">
		                            			<div class="title">Discount</div>
						                       	<div class="amount"><span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span> ${{ item?.discount2_value ? Number(item?.discount2_value).toFixed(2) : Number(0).toFixed(2) }}</div>	
		                            		</div>

                                        
                                            <div v-if="item.custom_fields">
                                                <div v-for="(option, idx) in item.custom_fields" :key="`custom-option-${idx}`">
                                                    <div v-if="option.priceInfo.enabled" class="other-details-wrap d-flex justify-content-between align-items-center">
                                                        <div class="title">{{ option.name }}</div>
                                                        <div class="amount" > {{ Number(option.priceInfo.price ).toFixed(2) }} </div>
                                                    </div>
                                                </div>
                                            </div>

		                            		<!-- <div class="other-details-wrap d-flex justify-content-between align-items-center" v-if="item?.discount2_value > 0">
		                            			<div class="title">Subtotal</div>
						                       	<div class="amount">${{ Number(item.fees).toFixed(2) }}</div>	
		                            		</div> -->
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center">
		                            			<div class="title">Booking Fees</div>
						                       	<div class="amount">${{ Number(item.fees).toFixed(2) }}</div>	
		                            		</div>
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center">
		                            			<div class="title"><strong>Total Cost</strong></div>
                                                <div class="amount">${{ Number(item.total).toFixed(2) }}</div>
		                            		</div>
                                            <p class="text-start tour-packages-detail ms-4 mt-2 mb-2" v-if="seatErrors?.length">
                                                <ul><li v-for="(error, index) in seatErrors" :key="index" v-bind:class="{'text-danger': error[item.tour_slot_id]?.success }"><small>{{ error[item.tour_slot_id]?.message }}</small></li></ul>
                                            </p>
		                            	</div>
		                            	<div class="total-cost-wrap third">
		                            		<div class="title-wrap">
		                            			<div class="title mb-0">Total Cost</div>
		                            		</div>
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center mt-0">
		                            			<div class="title">Ticket Cost</div>
						                       	<div class="amount">${{ Number(subtotal).toFixed(2) }}</div>	
		                            		</div>
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center" v-if="discount > 0">
		                            			<div class="title">Discount</div>
						                       	<div class="amount">${{ Number(discount).toFixed(2) }}</div>	
		                            		</div>
		                            		<!-- <div class="other-details-wrap d-flex justify-content-between align-items-center">
		                            			<div class="title">Subtotal</div>
						                       	<div class="amount">$132.60</div>	
		                            		</div> -->
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center">
		                            			<div class="title">Booking Fees</div>
						                       	<div class="amount">${{ Number(fees).toFixed(2) }}</div>	
		                            		</div>
		                            		<div class="other-details-wrap d-flex justify-content-between align-items-center last">
		                            			<div class="title"><strong>Total Cost</strong></div>
						                       	<div class="amount"><strong>${{ Number(total).toFixed(2) }}</strong></div>	
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
import axios from "axios";
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { mask } from 'vue-the-mask';
import IntPhoneNumber from './Forms/IntPhoneNumber';
import CountryCodes from "../utils/countryCode";

export default {
    name: "Checkout",
    title: "Native American Tours",
    components:{
        IntPhoneNumber
    },
    directives: {
        mask
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
        updatePhoneNumber(props){
            this.phone_number = props.phone_num;
            this.phone_code = props.phone_ext;
        },
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
            if (this.tenantId == 'kens') {
                var policy = `<div class="form-group col-12">
                    <div class="policy-item-wrp">
                        <h6 class="card-label-text-left mb-2">
                            <i>Cancellation policy</i>
                        </h6>
                        <ul>
                            <li class="ms-2">
                                Please check-in 30 minutes prior from your confirmed tour time. General tours line up 10 minutes before departure. All Groups who have NOT checked-in and received their tour ticket 10 minutes prior to the scheduled departure of the tour, forfeit their reservation and those spaces will be filled with walk-ins. NO REFUNDS will be given in this situation.
                            </li>
                        </ul>
                        <br>
                        <h6 class="card-label-text-left mb-2">
                            <i>Refund policy</i>
                        </h6>
                        <ul>
                            <li class="ms-2">
                                By checking this box, I have read, understand, and agree to the Cancellation Policy: Cancellations must be made 72 hours prior to tour departure date / time for a refund. We offer full refunds of ticket price (not booking fees) made of the services offered on our Website. Booking Fees are non-refundable. There is no refund for cancellations within 72 hours of the scheduled time of tour departure.
                            </li>
                        </ul>
                        <br>
                        <h6 class="card-label-text-left mb-2">
                            Weather
                        </h6>
                        <ul>
                            <li class="ms-2">
                                Ken’s Tours reserves the right to cancel tours due to inclement weather for the safety of our guests and employees. During rain/weather cancellations, if your scheduled tour has departed, you will forfeit your tour and fees. NO REFUNDS will be given in this situation. If Ken’s Tours cancels tours due to weather prior to your tour’s departure, you will receive a full refund.
                            </li>
                        </ul>
                    </div>
                </div>`;
            } else {
                var policy = `<div class="form-group col-12">
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
                </div>`;
            }

            Swal.fire({
                toast: true,
                title: "Terms and conditions",
                html: policy,
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
                this.errors.push("Your name is required.");
            }
            if (!this.phone_number) {
                this.errors.push("Your phone number is required.");
            }
            if (!CountryCodes.validatePhoneNumber(this.phone_number)) {
                this.errors.push("Your phone number is invalid.");
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

<style>
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