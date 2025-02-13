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
                    <div id="link-authentication-element"></div>
                    <div id="payment-element"></div>
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
import Swal from 'sweetalert2';
import { mask } from 'vue-the-mask';
import IntPhoneNumber from '../Forms/IntPhoneNumber';
import { eggshellPolicy, ahbbPolicy, apmPolicy, kensPolicy, standardPolicy } from '../../data/staticData';
import { loadStripe } from '@stripe/stripe-js';

export default {
    name: "CheckoutForm",
    props: ["items", "tenantId", "iframeStatus", "errors"],
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
            localErrors: [...(this.errors || [])],
        }
    },
    async mounted() {
        var loader = this.$loading.show();

        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

        const apiBaseUrl = process.env.VUE_APP_API_URL

        const intentResponse = await fetch(`https://${this.tenantId}.${apiBaseUrl}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: this.items
            }),
        });

        const { clientSecret, error: backendError } = await intentResponse.json();

        if (backendError) {
            this.localErrors.push(backendError.message);
        } else {
            this.elements = this.stripe.elements({ clientSecret });
            const paymentElement = this.elements.create("payment");
            paymentElement.mount("#payment-element");
            const linkAuthenticationElement = this.elements.create("linkAuthentication");
            linkAuthenticationElement.mount("#link-authentication-element");
        }

        this.processLoader(loader);
    },
    methods: {
        async handleSubmit() {
            this.localErrors = [];

            if (!this.form.name) {
                this.localErrors.push("Your name is required.");
            }
            if (!this.form.phone_number) {
                this.localErrors.push("Your phone number is required.");
            }
            if (!this.form.email) {
                this.localErrors.push("Your email address is required.");
            }
            if (!this.form.cancellations_policy) {
                this.localErrors.push("Please read and accept the terms and conditions.");
            }

            if (this.localErrors.length === 0) {
                const { paymentIntent, error } = await this.stripe.confirmPayment({
                    elements: this.elements,
                    confirmParams: {}, // No redirection
                    redirect: "if_required", // Prevents automatic redirection
                });

                if (error) {
                    this.localErrors.push(error.message);
                } else {
                    try {
                        this.form.paymentIntentId = paymentIntent.id;
                        console.log("Form Data:", this.form);

                        // Emit event directly
                        this.$emit("onsubmit", this.form);
                    } catch (apiError) {
                        console.log("API Error:", apiError);
                        this.localErrors.push("Failed to complete booking.");
                    }
                }
            }
        },
        processLoader(loader) {
            loader.hide();
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
    }
}
</script>