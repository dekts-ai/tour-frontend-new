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
                    <div class="form-group col-12 card-label-text-left">
                        <label for="cardnumber" class="col-form-label">Card Number <span class="required-star">*</span></label>
                        <div class="field-icon-wrp"><i class="fa fa-lock" aria-hidden="true"></i></div>
                        <input type="text" id="cardnumber" name="cardnumber" class="form-control" v-model="form.cardnumber" v-mask="'#### #### #### ####'" placeholder="CARD NUMBER">
                        <div class="validation-icon-wrp"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                    </div>
                    <div class="form-group col-12">
                        <div class="phone-wrap card-label-text-left">
                            <label for="nameoncard" class="col-form-label">Name on Card <span class="required-star">*</span></label>
                            <div class="field-icon-wrp"><i class="fa fa-user" aria-hidden="true"></i></div>
                            <input type="text" id="nameoncard" name="nameoncard" class="form-control" v-model="form.nameoncard" placeholder="CARDHOLDER NAME">
                            <div class="validation-icon-wrp"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                        </div>
                    </div>
                    <div class="form-group col-12 mb-0">
                        <div class="row">
                            <div class="form-group col-7 card-label-text-left small">
                                <label for="expiration" class="col-form-label">Expiration Date <span class="required-star">*</span></label>
                                <div class="field-icon-wrp"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                <input type="text" id="expiration" name="expiration" class="form-control" v-model="form.expiration" v-mask="'##/##'" placeholder="MM/YY">
                                <div class="validation-icon-wrp"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                            </div>
                            <div class="form-group col-5 card-label-text-left small">
                                <label for="cvv" class="col-form-label">Security Code <span class="required-star">*</span>
                                    <img src="data:image/png;base64,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" data-toggle="tooltip" data-placement="top" title="Card Verification Code">
                                </label>
                                <div class="field-icon-wrp"><i class="fa fa-lock" aria-hidden="true"></i></div>
                                <input type="text" id="cvv" name="cvv" class="form-control" v-model="form.cvv" v-mask="'####'" placeholder="CVC">
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
                        <input type="submit" @click="submit" name="makeaayment" id="makeaayment" class="makeaayment-btn" value="Make a Payment">
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
import { ahbbPolicy, apmPolicy, kensPolicy, standardPolicy } from '../../data/staticData';

export default {
    name: "CheckoutForm",
    props: ["tenantId", "iframeStatus", "errors"],
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
                cardnumber: null,
                nameoncard: null,
                expiration: null,
                cvv: null
            },
            company_name: this.$store.state.tourPackage?.tourPackageData[0]?.company_name
        }
    },
    methods: {
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
            } else {
                return standardPolicy();
            }
        },
        submit() {
            this.$emit('onsubmit', this.form);
        }
    }
}
</script>