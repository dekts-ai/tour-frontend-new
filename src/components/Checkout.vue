<template>
    <section :class="{ 'noiframe-inner-banner': !iframeStatus, 'iframe-inner-banner': iframeStatus }"
        class="banner-section" :style="{ backgroundImage: `url(${bannerImage})` }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>

    <section v-if="iframeStatus" class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>

    <section class="inner-content-section">
        <div :class="{ container: !iframeStatus, 'no-container': iframeStatus }">
            <div class="background-color-sec row">
                <div :class="{ 'row payment-row': true, 'iframe-row': iframeStatus }">
                    <div class="col-12">
                        <div v-if="!iframeStatus" class="row booking-row">
                            <BookWithConfidence @navigatetotab="navigateToTab" />
                        </div>

                        <div class="row payment-form-sec">
                            <CheckoutForm @onsubmit="submit" :items="cartItem" :tenant-id="tenantId"
                                :iframe-status="iframeStatus" :errors="errors"
                                @update-seat-errors="handleSeatErrorsUpdate" />
                            <div class="col-lg-5 order-1 order-md-2">
                                <ItemizedList :items="cartItem" :global-total-item="globalTotal"
                                    :seat-errors="seatErrors" :iframe-status="iframeStatus"
                                    @update-items="updateItems" />
                                <ItemTotalSummary :global-total="globalTotal" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { stripeCardStyle, stripeEleStyle } from '../utils/stripeUtils';
import { CountryCodes } from '../utils/geoUtils';
import NavBtns from './Nav/NavBtns.vue';
import CheckoutForm from './Checkout/CheckoutForm.vue';
import ItemizedList from './Checkout/ItemizedList.vue';
import ItemTotalSummary from './Checkout/ItemTotalSummary.vue';
import BookWithConfidence from './Checkout/BookWithConfidence.vue';

export default {
    name: 'Checkout',
    title: 'Native American Tours',
    components: {
        NavBtns,
        CheckoutForm,
        ItemizedList,
        ItemTotalSummary,
        BookWithConfidence
    },
    props: {
        // Add props if passed from parent, none currently inferred
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
            globalTotal: {
                subtotal: 0,
                discount: 0,
                fees: 0,
                addons_total: 0,
                addons_fee: 0,
                total: 0
            },
            message: '',
            stripe: null,
            elements: null,
            cardElement: null,
            stripeValidationError: '',
            name: null,
            phone_number: null,
            phone_code: '+1',
            email: null,
            getemailupdates: 0,
            cancellations_policy: 0,
            comment: null,
            paymentIntentId: null
        };
    },
    computed: {
        bannerImage() {
            const tourPkgDetails = this.details.TourPkgDetails?.[0];
            return tourPkgDetails?.HeaderOne || '';
        }
    },
    async mounted() {
        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
        this.createAndMountFormElements();
    },
    created() {
        this.initializeFromStore();
        this.calculateGlobalTotal();
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        initializeFromStore() {
            this.iframeStatus = this.$store.state.iframeStatus;
            this.tenantId = this.$store.state.tenantId;
            this.hotels = this.$store.state.tourPackage?.hotels || [];
            this.comboIds = this.$store.state.comboIds;
            this.cartItem = this.$store.state.cartItem || {};
            this.cartItemLength = Object.keys(this.cartItem).length;
        },
        calculateGlobalTotal() {
            if (!this.cartItemLength) return;

            this.globalTotal = Object.values(this.cartItem).reduce(
                (totals, item) => ({
                    subtotal: totals.subtotal + Number(item.subtotal),
                    discount: totals.discount + Number(item.discount2_value),
                    fees: totals.fees + Number(item.fees),
                    addons_total: totals.addons_total + Number(item.addons_total),
                    addons_fee: totals.addons_fee + Number(item.addons_fee),
                    total: totals.total + Number(item.total)
                }),
                {
                    subtotal: 0,
                    discount: 0,
                    fees: 0,
                    addons_total: 0,
                    addons_fee: 0,
                    total: 0
                }
            );

            Object.values(this.cartItem).forEach(item => {
                item.couponErrors = item.couponErrors || [];
                item.couponSuccess = item.couponSuccess || [];
            });
        },
        createAndMountFormElements() {
            if (!this.stripe) return;
            this.elements = this.stripe.elements(stripeEleStyle);
            this.cardElement = this.elements.create('card', stripeCardStyle);
        },
        updateItems(updatedItems) {
            this.cartItem = updatedItems;
            this.cartItemLength = Object.keys(updatedItems).length;
            this.calculateGlobalTotal();
        },
        async submit(props) {
            if (this.processing) return;

            this.processing = true;
            const loader = this.$loading.show();
            this.errors = [];

            // Map props to data
            Object.assign(this, props);

            // Validate inputs
            this.cartItem = this.$store.state.cartItem || {};
            this.cartItemLength = Object.keys(this.cartItem).length;

            if (this.comboIds?.length && this.cartItemLength === 1) {
                this.errors.push('To proceed, please ensure you have selected at least two packages.');
            }
            if (!this.paymentIntentId) {
                this.errors.push('Please enter your card information.');
            }

            if (this.errors.length) {
                this.processLoader(loader);
                return;
            }

            try {
                const phone_number = CountryCodes.formatPhoneNumber(this.phone_code, this.phone_number);
                const payload = {
                    items: this.cartItem,
                    name: this.name,
                    email: this.email,
                    phone_number,
                    comment: this.comment,
                    getemailupdates: this.getemailupdates,
                    cancellations_policy: this.cancellations_policy,
                    payment_intent_id: this.paymentIntentId,
                    ...this.globalTotal
                };

                const response = await axios.post('/package-booking-tour', payload);
                this.$store.dispatch('storeCustomer', payload);

                if (response.data.success === 'false') {
                    this.message = response.data.message;
                    this.processLoader(loader);
                    return;
                }

                this.bookingIds = response.data.bookingIds || response.data.BookingIds;
                this.$store.dispatch('storeBookingIds', this.bookingIds);

                if (response.data.clientSecret) {
                    await this.handleStripePayment(response.data, payload);
                } else {
                    this.processLoader(loader);
                    this.$router.push('/thankyou');
                }
            } catch (error) {
                this.handleError(error);
            } finally {
                this.processLoader(loader);
            }
        },
        async handleStripePayment(data, payload) {
            const loader = this.$loading.show();
            try {
                await this.stripe.confirmCardPayment(data.clientSecret);
                const stripeObject = {
                    booking_ids: data.bookingIds,
                    affiliate_id: data.affiliateId,
                    payment_intent: data.intentId,
                    payment_intent_client_secret: data.clientSecret
                };
                await axios.post('/package-booking-3ds-payment', stripeObject);
                this.processLoader(loader);
                this.$router.push('/thankyou');
            } catch (error) {
                this.handleError(error);
                this.processLoader(loader);
            }
        },
        handleError(error) {
            if (error.response) {
                this.errors.push(error.response.data.message);
            } else {
                console.error('Error:', error.message);
            }
        },
        navigateToTab(tab, destination) {
            if ([1, 2, 3, 4].includes(tab)) {
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
        processLoader(loader) {
            this.processing = false;
            loader.hide();
        },
        handleSeatErrorsUpdate(errors) {
            this.seatErrors = errors;
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