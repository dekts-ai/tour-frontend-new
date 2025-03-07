<template>

<div class="col-lg-7 mt-lg-0 mt-md-5 mt-4 order-2 order-md-1">
    <div class="contact-wrap">
        <div class="form-field-title" v-if="iframeStatus == false">Contact:</div>
        <div class="form-field-wrp contact-form-field mb-2">
            <div class="form-group">
                <label for="fullname" class="col-form-label">Full Name <span class="required-star">*</span></label>
                <div class="field-icon-wrp"> <i class="fa fa-user" aria-hidden="true"></i> </div>
                <input type="text" v-model="form.name" id="name" name="name" class="form-control" placeholder="Your Name">
            </div>
            <div class="form-group">
                <div class="phone-wrap">
                    <label for="phonenumber" class="col-form-label">Phone Number <span class="required-star">*</span> </label>
                    <IntPhoneNumber :current_phone_number="form.phone_number" 
                        :current_phone_code="form.phone_code"
                        @onphoneupdate="updatePhoneNumber" /> 
                    <input type="hidden" id="phonenumber" name="phone_number" v-model="form.phone_number" />
                    <input type="hidden" id="phonecode" name="phone_code" v-model="form.phone_code" />
                </div>
            </div>
            <div class="form-group">
                <label for="Email" class="col-form-label">Email Address <span class="required-star">*</span> </label>
                <div class="field-icon-wrp"> <i class="fa fa-envelope" aria-hidden="true"></i> </div>
                <input type="email" v-model="form.email" id="emailaddress" name="email" class="form-control" placeholder="Your Email Address">
            </div>
            <div class="form-group form-textarea-wrap">
                <label for="comment" class="col-form-label">Comments</label>
                <textarea v-model="form.comment" id="comment" name="comment" placeholder="Please type here ..."></textarea>
            </div>
            <div class="form-group mb-0">
                <div class="form-check text-start">
                    <input class="form-check-input" type="checkbox" v-model="form.cancellations_policy" id="cancellations_policy">
                    <label class="form-check-label ms-2" for="cancellations_policy">
                        <span class="required-star"> * </span> 
                        <button class="cancelling-policy-title" @click="openPolicy"> Terms and conditions</button>
                        I have read and accept all cancellations terms. 
                    </label>
                </div>
            </div>
            <div class="form-group mb-0">
                <div class="form-check text-start">
                    <input class="form-check-input" type="checkbox" v-model="form.getemailupdates" id="getemailupdates">
                    <label class="form-check-label ms-2" for="getemailupdates">
                        Get future email updates from {{ company_name }}.
                    </label>
                </div>
            </div>
        </div>
        <div class="payment-box text-start mb-2">
            <div class="payment-text card-label-text-left">
                <img src="../../assets/images/payment.png"> Payment
            </div>
            <div class="secured-encryption card-label-text-left">
                <img src="../../assets/images/lock-white.png" alt="lock"> Secured with 2048-bit encryption
            </div>
            <div class="card-detail-main">
                <div class="card-detail-wrp card-form-field">
                    <div id="payment-request-button"></div>
                    <!-- <div id="link-authentication-element"></div> -->
                    <div id="payment-element" class="mt-2"></div>
                    <p class="text-start mb-3 pe-3" v-if="localErrors.length">
                        <b>Please correct the following error(s):</b>
                        <ul class="following-error">
                            <li v-for="error in localErrors" :key="error"
                                v-bind:class="{ 'text-danger': error }">{{ error }}
                            </li>
                        </ul>
                    </p>
                    <div class="form-group col-12 mt-3 text-start">
                        <input type="submit" @click="handleSubmit" name="makeaayment" id="makeaayment" class="makeaayment-btn" value="Make a Payment">
                    </div>
                    <div class="form-group col-12 mb-0">
                        <div class="booking-you-text card-label-text-left"> By booking you also agree to our <a href="https://nativeamericantours.com/privacy-policy.html">policies</a>, and Stripe <a href="https://stripe.com/legal/end-users">terms of service</a>. </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
import { mask } from 'vue-the-mask';
import IntPhoneNumber from '../Forms/IntPhoneNumber';
import { eggshellPolicy, ahbbPolicy, apmPolicy, kensPolicy, standardPolicy } from '../../data/staticData';
import { loadStripe } from '@stripe/stripe-js';

export default {
    name: "CheckoutForm",
    props: ["items", "paymentTotal", "tenantId", "iframeStatus", "errors"],
    components: {
        IntPhoneNumber,
    },
    directives: {
        mask
    },
    data() {
        return {
            form: {
                name: null,
                phone_number: null,
                phone_code: "+1",
                email: null,
                getemailupdates: 0,
                cancellations_policy: 0,
                comment: null,
                paymentIntentId: null,
            },
            company_name: this.$store.state.tourPackage?.tourPackageData[0]?.company_name,
            stripe: null,
            elements: null,
            paymentRequest: null,  // Store payment request instance
            comboIds: 0,
            cartItem: [],
            cartItemLength: 0,
            localErrors: [...(this.errors || [])],
            loaderInstance: null,
        }
    },
    async mounted() {
        if (this.loaderInstance) {
            this.loaderInstance.hide();
        }

        // ✅ Show loader before initializing Stripe
        this.loaderInstance = this.$loading.show();

        try {
            // ✅ Load Stripe instance
            this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
            if (!this.stripe) {
                throw new Error("Stripe failed to initialize.");
            }

            const apiBaseUrl = process.env.VUE_APP_API_URL;

            // ✅ Fetch Payment Intent from the server
            const intentResponse = await fetch(`https://${this.tenantId}.${apiBaseUrl}/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: this.items }),
            });

            const { clientSecret, error: backendError } = await intentResponse.json();
            if (backendError) throw new Error(backendError.message);

            const appearance = { theme: 'stripe' };
            this.elements = this.stripe.elements({ clientSecret, appearance });

            // ✅ Setup Payment Request API (Google Pay & Apple Pay)
            this.paymentRequest = this.stripe.paymentRequest({
                country: "US",
                currency: "usd",
                total: {
                    label: "Native American Tours",
                    amount: this.calculateTotalAmount(),
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            // ✅ Listen for payment method event
            this.paymentRequest.on("paymentmethod", async (event) => {
                try {
                    const { paymentIntent, error } = await this.stripe.confirmPayment({
                        elements: this.elements,
                        confirmParams: {
                            payment_method: event.paymentMethod.id,
                            return_url: `${window.location.origin}/payment-success`,
                        },
                        redirect: "if_required",
                    });

                    if (error) {
                        event.complete("fail");
                        this.localErrors.push(error.message);
                    } else {
                        event.complete("success");
                        this.form.paymentIntentId = paymentIntent.id;
                        this.$emit("onsubmit", this.form);
                    }
                } catch (error) {
                    console.error("Payment Request Error:", error);
                    event.complete("fail");
                }
            });

            // ✅ Check if Payment Request is available
            const canMakePayment = await this.paymentRequest.canMakePayment();
            if (canMakePayment) {
                const paymentRequestButton = this.elements.create("paymentRequestButton", {
                    paymentRequest: this.paymentRequest,
                    style: {
                        paymentRequestButton: {
                            type: "default",
                            theme: "light",
                            height: "40px",
                        },
                    },
                });

                // ✅ Mount the button and wait until it's rendered before proceeding
                await new Promise((resolve) => {
                    paymentRequestButton.mount("#payment-request-button");
                    paymentRequestButton.on("ready", resolve);
                });
            } else {
                console.warn("Payment Request (Google Pay / Apple Pay) is not available.");
            }

            // ✅ Setup Standard Payment Element (For Cards)
            const paymentElement = this.elements.create("payment");

            // ✅ Mount and wait for it to render before hiding loader
            await new Promise((resolve) => {
                paymentElement.mount("#payment-element");
                paymentElement.on("ready", resolve);
            });
        } catch (error) {
            console.error("Error initializing Stripe elements:", error);
            this.localErrors.push(error.message);
        } finally {
            // ✅ Hide loader once everything is ready
            this.processLoader();
        }
    },
    methods: {
        async handleSubmit() {
            this.localErrors = [];

            // Ensure previous loader is destroyed before showing a new one
            if (this.loaderInstance) {
                this.loaderInstance.hide();
            }

            // Show the new loader
            this.loaderInstance = this.$loading.show();

            try {
                // Validate form fields
                const requiredFields = {
                    name: "Your name is required.",
                    phone_number: "Your phone number is required.",
                    email: "Your email address is required.",
                    cancellations_policy: "Please accept the terms and conditions."
                };

                Object.keys(requiredFields).forEach((field) => {
                    if (!this.form[field]) {
                        this.localErrors.push(requiredFields[field]);
                    }
                });

                if (this.localErrors.length) {
                    this.processLoader(); // Hide loader if validation fails
                    return;
                }

                this.comboIds = this.$store.state.comboIds;
                this.cartItem = this.$store.state.cartItem;
                this.cartItemLength = Object.values(this.cartItem).length;

                const response = await axios.post("/bulk-check-available-seats", { items: this.cartItem });

                // Create a local variable to store seat errors
                let tempSeatErrors = [];

                for (var key in this.cartItem) {
                    if (response.data[key]?.success === "false") {
                        tempSeatErrors.push(response.data);
                    }
                }

                if (tempSeatErrors.length) {
                    tempSeatErrors = tempSeatErrors.filter((value, index, array) => 
                        array.indexOf(value) === index
                    );

                    Swal.fire({
                        toast: true,
                        title: "Errors!",
                        html: this.comboIds === 0 || this.cartItemLength === 1
                            ? response.data[key]?.message || "An error occurred."
                            : "Please look over the tour cost section for any errors!",
                        icon: "error"
                    });

                    // Emit updated seat errors to the parent component
                    this.$emit("updateSeatErrors", tempSeatErrors);
                    return;
                }

                // Define the return URL (redirects back to your app)
                const returnUrl = `${window.location.origin}/payment-success`;

                // Confirm payment with Stripe
                const { paymentIntent, error } = await this.stripe.confirmPayment({
                    elements: this.elements,
                    confirmParams: {
                        return_url: returnUrl,  // This will redirect the user after payment
                        payment_method_data: {
                            billing_details: {
                                name: this.form.name,
                                email: this.form.email,
                                phone: this.form.phone_number,
                                // address: {
                                //     postal_code: 'never'
                                // },
                            }
                        },
                    },
                    redirect: "if_required",
                });

                if (error) {
                    this.localErrors.push(error.message);
                } else {
                    this.form.paymentIntentId = paymentIntent.id;
                    this.$emit("onsubmit", this.form);
                }
            } catch (apiError) {
                console.error("API Error:", apiError);
                this.localErrors.push("Failed to complete booking.");
            } finally {
                this.processLoader(); // Hide the loader after completion (success or failure)
            }
        },
        calculateTotalAmount() {
            return parseFloat(
                ((Number(this.paymentTotal.total) +
                    Number(this.paymentTotal.addons_total) +
                    Number(this.paymentTotal.addons_fee)
                ).toFixed(2)) * 100 // Convert to cents
            );
        },
        updatePhoneNumber(props) {
            this.form.phone_number = props.phone_num;
            this.form.phone_code = props.phone_ext;
        },
        openPolicy() {
            const policy = this.getPolicy();
            Swal.fire({
                toast: true,
                title: "Terms and conditions",
                html: policy,
                width: '80vw',
            });
        },
        getPolicy() {
            if (this.tenantId == 'kens') {
                return kensPolicy();
            } else if (this.tenantId == 'apm') {
                return apmPolicy();
            } else if (this.tenantId == 'ahbb') {
                return ahbbPolicy();
            } else if (this.tenantId == 'eggshell') {
                return eggshellPolicy();
            } else {
                return standardPolicy();
            }
        },
        processLoader() {
            if (this.loaderInstance) {
                this.loaderInstance.hide();
                this.loaderInstance = null; // Reset after hiding
            }
        }
    }
}
</script>