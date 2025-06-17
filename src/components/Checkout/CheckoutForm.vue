<template>
    <div class="col-lg-7 mt-lg-0 mt-md-5 mt-4 order-2 order-md-1">
        <div class="contact-wrap">
            <!-- Contact Form -->
            <div class="form-field-wrp contact-form-field mb-2">
                <FormInput label="Full Name" id="name" v-model="form.name" required icon="fa-user"
                    placeholder="Your Name" />
                <FormPhone label="Phone Number" v-model="form.phone_number" required :phone-code="form.phone_code"
                    @update="updatePhoneNumber" />
                <FormInput label="Email Address" id="email" v-model="form.email" required icon="fa-envelope"
                    type="email" placeholder="Your Email Address" />
                <FormTextarea label="Comments" id="comment" v-model="form.comment" placeholder="Please type here ..." />

                <FormCheckbox id="cancellations_policy" v-model="form.cancellations_policy" :showPolicy="true" required
                    label="I have read and accept all cancellations terms" @click-policy="openPolicy" />
                <FormCheckbox id="getemailupdates" v-model="form.getemailupdates"
                    :label="`Get future email updates from ${company_name}`" />
            </div>

            <!-- Payment Section -->
            <div class="payment-box text-start mb-2">
                <PaymentHeader />
                <div class="card-detail-main">
                    <div class="card-detail-wrp card-form-field">
                        <div id="payment-element"></div>
                        <ErrorList :errors="localErrors" />
                        <button class="makeapayment-btn mt-3" @click="handleSubmit">Make a Payment</button>
                        <PolicyFooter />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import FormInput from '../User/FormInput.vue';
import FormPhone from '../User/FormPhone.vue';
import FormTextarea from '../User/FormTextarea.vue';
import FormCheckbox from '../User/FormCheckbox.vue';
import PaymentHeader from '../Layout/PaymentHeader.vue';
import ErrorList from '../Error/ErrorList.vue';
import PolicyFooter from '../Layout/PolicyFooter.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getPolicyByTenant } from './../../utils/policyUtils';

export default {
    name: "CheckoutForm",
    components: { FormInput, FormPhone, FormTextarea, FormCheckbox, PaymentHeader, ErrorList, PolicyFooter },
    props: ["items", "tenantId", "errors"],
    data: () => ({
        form: {
            name: '',
            phone_number: '',
            phone_code: '+1',
            email: '',
            getemailupdates: false,
            cancellations_policy: false,
            comment: '',
            paymentIntentId: null,
            stripeCustomerId: null
        },
        company_name: '',
        receipt_email: null,
        stripe: null,
        elements: null,
        localErrors: [],
        loaderInstance: null
    }),
    async created() {
        this.company_name = this.$store.state.tourPackage?.tourPackageData[0]?.company_name;
        this.localErrors = this.errors ? [...this.errors] : [];
    },
    async mounted() {
        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
        this.initializePayment();
    },
    computed: {
        itemTotal() {
            return Object.values(this.items).map(item => item.total);
        }
    },
    watch: {
        itemTotal: {
            handler(newValues, oldValues) {
                if (oldValues && JSON.stringify(newValues) !== JSON.stringify(oldValues)) {
                    this.initializePayment();
                }
            },
            deep: true
        }
    },
    methods: {
        async initializePayment() {
            if (this.itemTotal.length === 0) {
                this.$router.push('/initialize');
                return;
            }

            this.showLoader();
            try {
                const { clientSecret, paymentIntentId } = await this.createPaymentIntent();
                this.form.paymentIntentId = paymentIntentId;
                this.setupStripeElements(clientSecret);
            } catch (error) {
                this.handleError('Payment initialization failed', error);
            } finally {
                this.hideLoader();
            }
        },

        async createPaymentIntent() {
            try {
                const response = await axios.post('/create-payment-intent', {
                    items: this.items
                });

                const data = response.data;
                if (data.error) throw new Error(data.error.message);
                return data;
            } catch (error) {
                this.handleError(error);
            }
        },

        setupStripeElements(clientSecret) {
            const appearance = {
                theme: 'stripe', // Change to 'stripe', 'night', 'flat', or 'none'
            };

            const options = {
                layout: { type: 'auto' }, // Change to 'accordion', 'tabs', 'inline', or 'auto'
                paymentMethodOrder: ['apple_pay', 'google_pay', 'card'], // Prioritize payment methods
                business: { name: 'Native American Tours' },
                wallets: { applePay: 'auto', googlePay: 'auto' },
                defaultValues: { billingDetails: { address: { country: this.$store.state.countryCode } } }
            };

            this.elements = this.stripe.elements({ clientSecret, appearance });
            const paymentElement = this.elements.create('payment', options);
            paymentElement.mount('#payment-element');
        },

        async handleSubmit() {
            this.showLoader();
            this.localErrors = [];

            if (!this.validateForm()) {
                this.hideLoader();
                return;
            }

            try {
                const isAvailable = await this.checkAvailability();
                if (!isAvailable) return;

                const { paymentIntent, error } = await this.confirmPayment();

                if (error) throw new Error(error.message);

                this.form.paymentIntentId = paymentIntent.id;
                this.$emit('onsubmit', this.form);
            } catch (error) {
                this.handleError('Payment processing failed', error);
            } finally {
                this.hideLoader();
            }
        },

        validateForm() {
            const validations = [
                [!this.form.name, 'Your name is required'],
                [!this.form.phone_number, 'Your phone number is required'],
                [!this.form.email, 'Your email address is required'],
                [!this.form.cancellations_policy, 'Please accept terms and conditions']
            ];

            this.localErrors = validations.filter(([condition]) => condition).map(([, message]) => message);
            return !this.localErrors.length;
        },

        async checkAvailability() {
            if (this.receipt_email && this.receipt_email !== this.form.email) {
                Swal.fire({
                    toast: true,
                    title: 'Error',
                    html: 'Email cannot be changed after payment setup.',
                    icon: 'error'
                });

                return false;
            }

            this.receipt_email = this.form.email;

            const cartItem = this.$store.state.cartItem;

            const payload = {
                name: this.form.name,
                email: this.form.email,
                phone_number: this.form.phone_number,
                payment_intent_id: this.form.paymentIntentId
            };

            this.$store.dispatch('storeCustomer', payload);

            const saveCard = await axios.post('/prepare-to-save-card-on-payment-intent', payload);

            this.form.stripeCustomerId = saveCard.data.stripeCustomerId;

            const response = await axios.post('/bulk-check-available-seats', { items: cartItem });

            const errors = Object.entries(response.data)
                .filter(([, value]) => value.success === 'false')
                .map(([, value]) => value.message);

            if (errors.length) {
                this.handleAvailabilityError(errors);
                return false;
            }
            return true;
        },

        async confirmPayment() {
            return this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                    payment_method_data: {
                        billing_details: {
                            name: this.form.name,
                            email: this.form.email,
                            phone: this.form.phone_number
                        }
                    }
                },
                redirect: 'if_required'
            });
        },

        updatePhoneNumber({ phone_num, phone_ext }) {
            this.form.phone_number = phone_num;
            this.form.phone_code = phone_ext;
        },

        openPolicy() {
            Swal.fire({
                toast: true,
                title: 'Terms and conditions',
                html: getPolicyByTenant(this.tenantId),
                width: '80vw'
            });
        },

        showLoader() {
            this.loaderInstance = this.$loading.show();
        },

        hideLoader() {
            this.loaderInstance?.hide();
            this.loaderInstance = null;
        },

        handleError(message, error) {
            console.error(message, error);
            this.localErrors.push(error.message || message);
        },

        handleAvailabilityError(errors) {
            Swal.fire({
                toast: true,
                title: 'Errors!',
                html: errors[0],
                icon: 'error'
            });
            this.$emit('updateSeatErrors', errors);
        }
    }
};
</script>