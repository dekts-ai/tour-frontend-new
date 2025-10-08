<template>
    <section class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>

    <section class="addons-section">
        <div class="addons-container">
            <div class="addons-content">
                <div class="addons-left">
                    <h2 class="section-title">Additional Options</h2>
                    
                    <!-- Custom Fields Integration -->
                    <div v-if="packageId && serviceCommission !== null">
                        <CustomFields
                            ref="CustomFieldsRef"
                            :values="customFieldValues"
                            :enabled="true"
                            :display_errors="true"
                            :display_submit="false"
                            :display_height="500"
                            :service_commission="serviceCommission"
                            @customformexists="handleCustomFormExists"
                            :endpoint="`/package/custom/form/${packageId}`" />
                    </div>

                    <!-- Fallback message if no custom fields -->
                    <div v-if="!hasCustomFields && !loadingCustomFields" class="no-addons-message">
                        <p>No additional options available for this tour package.</p>
                    </div>
                </div>

                <div class="addons-right">
                    <h2 class="section-title">Booking Summary</h2>
                    
                    <!-- Cart Items Summary -->
                    <div class="booking-summary">
                        <div v-if="cartItemLength > 0" class="cart-summary-list">
                            <div v-for="(item, slotId) in cartItem" :key="slotId" class="cart-summary-item">
                                <div class="item-name">{{ item.package_name }}</div>
                                <div class="item-details">
                                    <span class="item-date">{{ formatDate(item.date) }}</span>
                                    <span class="item-price">{{ currencyFormat(Number(item.total || 0) + Number(item.addons_fee || 0) + Number(item.addons_total || 0)) }}</span>
                                </div>
                            </div>
                        </div>
                        <p v-else class="summary-placeholder">No tours selected</p>
                    </div>
                    
                    <!-- Totals -->
                    <div class="summary-totals">
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>{{ currencyFormat(calculateSubtotal) }}</span>
                        </div>
                        <div class="summary-row" v-if="addonsTotal > 0">
                            <span>Add-ons</span>
                            <span>{{ currencyFormat(addonsTotal) }}</span>
                        </div>
                        <div class="summary-row">
                            <span>Taxes & Fees</span>
                            <span>{{ currencyFormat(calculateFees) }}</span>
                        </div>
                        <div class="summary-total">
                            <span>Total</span>
                            <span>{{ currencyFormat(calculateGrandTotal) }}</span>
                        </div>
                    </div>

                    <button class="continue-button" @click="continueToCheckout">
                        Continue to Checkout →
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavBtns from './Nav/NavBtns.vue';
import CustomFields from './Forms/CustomFields.vue';
import { formatCurrencyIntl } from '../utils/currency';
import { getMomentTimezone } from '../utils/dateUtils';
import Swal from 'sweetalert2';

export default {
    name: 'Addons',
    title: 'Native American Tours',
    components: {
        NavBtns,
        CustomFields
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: true,
            tenantId: null,
            tourOperatorId: 0,
            comboIds: 0,
            packageId: 0,
            affiliateId: 0,
            cartItem: {},
            cartItemLength: 0,
            tabs: 4,
            checkPackageIds: [],
            hasCustomFields: false,
            loadingCustomFields: true,
            customFieldValues: [],
            addonsTotal: 0,
            addonsFee: 0,
            serviceCommission: 0
        };
    },
    computed: {
        calculateSubtotal() {
            return Object.values(this.cartItem).reduce((sum, item) => {
                return sum + (Number(item.subtotal) || 0);
            }, 0);
        },
        calculateFees() {
            return Object.values(this.cartItem).reduce((sum, item) => {
                return sum + (Number(item.fees) || 0) + (Number(item.addons_fee) || 0);
            }, 0) + this.addonsFee;
        },
        calculateGrandTotal() {
            return this.calculateSubtotal + this.calculateFees + this.addonsTotal;
        }
    },
    async created() {
        this.initializeState();
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        initializeState() {
            this.tenantId = this.$store.state.tenantId;
            this.tourOperatorId = this.$store.state.tourOperatorId;
            this.packageId = this.$store.state.packageId;
            this.affiliateId = this.$store.state.affiliateId;
            this.iframeStatus = this.$store.state.iframeStatus;
            this.comboIds = this.$store.state.comboIds;
            this.cartItem = this.$store.state.cartItem;
            this.cartItemLength = Object.values(this.cartItem).length;

            if (this.cartItemLength) {
                this.checkPackageIds = Object.values(this.cartItem).map(item => parseInt(item.package_id));
                
                // Get service commission from first cart item
                const firstItem = Object.values(this.cartItem)[0];
                if (firstItem) {
                    this.serviceCommission = firstItem.service_commission || 0;
                    this.customFieldValues = firstItem.custom_fields || [];
                }
            }
        },
        handleCustomFormExists(exists) {
            this.hasCustomFields = exists;
            this.loadingCustomFields = false;
        },
        navigateToTab(tab, destination) {
            if ([1, 2, 3, 4, 5, 6].includes(tab)) {
                if (tab === 2) {
                    this.$store.dispatch('storeFormData', null);
                }
                this.$store.dispatch('storeMindChange', 1);
                this.$router.push({ name: destination });
            }
        },
        async continueToCheckout() {
            // Validate and save custom fields if they exist
            if (this.hasCustomFields && this.$refs.CustomFieldsRef) {
                try {
                    const customFormData = await this.$refs.CustomFieldsRef.submitForm(false);
                    
                    if (customFormData.errors.length) {
                        Swal.fire({
                            toast: true,
                            html: 'Please fill in all required fields.',
                            icon: 'warning',
                            timer: 3000,
                            showConfirmButton: false,
                        });
                        return;
                    }
                    
                    // Update cart items with custom fields
                    this.addonsTotal = this.$refs.CustomFieldsRef.sumTotal(customFormData.fields);
                    this.addonsFee = this.roundout(this.$refs.CustomFieldsRef.feeTotal(customFormData.fields));
                    
                    // Update each cart item with custom fields
                    const updatedCart = { ...this.cartItem };
                    for (const slotId in updatedCart) {
                        updatedCart[slotId].custom_fields = customFormData.fields;
                        updatedCart[slotId].addons_total = this.addonsTotal;
                        updatedCart[slotId].addons_fee = this.addonsFee;
                    }
                    
                    this.$store.dispatch('storeCartItem', updatedCart);
                } catch (error) {
                    console.error('Error processing custom fields:', error);
                }
            }
            
            this.$router.push({ name: 'Checkout' });
        },
        formatDate(date) {
            return getMomentTimezone(this.$store.state.timezone, date).format('MMM D, YYYY');
        },
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
        roundout(amount, places = 2) {
            if (places < 0) places = 0;
            let factor = Math.pow(10, places);
            return Math.round(amount * factor) / factor;
        },
        processLoader(loader) {
            loader.hide();
        },
    },
};
</script>

<style scoped>
.addons-section {
    padding: var(--space-8) var(--space-6);
    background: var(--neutral-50);
    min-height: calc(100vh - 200px);
}

.addons-container {
    max-width: 1400px;
    margin: 0 auto;
}

.addons-content {
    display: grid;
    grid-template-columns: 1fr 440px;
    gap: var(--space-6);
}

.section-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    margin: 0 0 var(--space-6) 0;
    color: var(--neutral-900);
}

.addon-item {
    margin-bottom: var(--space-5);
    padding: var(--space-4);
    background: white;
    border-radius: var(--radius-lg);
    border: 2px solid var(--neutral-200);
    transition: all var(--transition-base);
}

.addon-item:hover {
    border-color: var(--primary-teal-light);
    box-shadow: var(--shadow-sm);
}

.addon-checkbox {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    position: relative;
}

.addon-checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkmark {
    width: 24px;
    height: 24px;
    border: 2px solid var(--neutral-300);
    border-radius: var(--radius-md);
    margin-right: var(--space-3);
    flex-shrink: 0;
    position: relative;
    background: white;
    transition: all var(--transition-base);
}

.addon-checkbox input:checked ~ .checkmark {
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-light));
    border-color: var(--primary-teal);
}

.addon-checkbox input:checked ~ .checkmark::after {
    content: '';
    position: absolute;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.addon-info {
    display: flex;
    flex-direction: column;
}

.addon-name {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
    margin-bottom: var(--space-1);
}

.addon-price {
    font-size: var(--text-sm);
    color: var(--primary-terracotta);
    font-weight: var(--font-medium);
}

.addon-field {
    margin-bottom: var(--space-5);
}

.addon-field-label {
    display: block;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
    margin-bottom: var(--space-2);
}

.addon-select {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    color: var(--neutral-700);
    background: white;
    transition: all var(--transition-base);
}

.addon-select:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.addon-textarea {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    color: var(--neutral-700);
    resize: vertical;
    font-family: var(--font-body);
    transition: all var(--transition-base);
}

.addon-textarea:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.addons-right {
    background: white;
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    border: 1px solid var(--neutral-200);
    height: fit-content;
    box-shadow: var(--shadow-sm);
}

.booking-summary {
    margin-bottom: var(--space-5);
}

.cart-summary-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.cart-summary-item {
    padding: var(--space-4);
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
    border: 1px solid var(--neutral-200);
}

.item-name {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
    margin-bottom: var(--space-2);
}

.item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-date {
    font-size: var(--text-sm);
    color: var(--neutral-600);
}

.item-price {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    color: var(--primary-teal);
}

.summary-placeholder {
    color: var(--neutral-500);
    font-size: var(--text-sm);
    text-align: center;
    padding: var(--space-6);
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
}

.no-addons-message {
    padding: var(--space-8);
    text-align: center;
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
    color: var(--neutral-600);
}

.summary-totals {
    border-top: 2px solid var(--neutral-200);
    padding-top: var(--space-4);
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-3);
    font-size: var(--text-sm);
    color: var(--neutral-600);
}

.summary-total {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 2px solid var(--neutral-200);
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
}

.continue-button {
    width: 100%;
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    cursor: pointer;
    margin-top: var(--space-5);
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
}

.continue-button:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
    .addons-content {
        grid-template-columns: 1fr;
    }
    
    .addons-right {
        order: -1;
    }
}

@media (max-width: 768px) {
    .addons-section {
        padding: var(--space-6) var(--space-4);
    }
}
</style>