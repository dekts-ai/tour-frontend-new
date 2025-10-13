<template>
    <div>
        <section class="tabs-section">
            <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
        </section>

        <section class="addons-section">
            <div class="addons-container">
                <div class="addons-content">
                    <div class="addons-left">
                        <h2 class="section-title">Additional Options</h2>
                        
                        <!-- Loading State -->
                        <div v-if="loading" class="loading-state">
                            <div class="spinner"></div>
                            <p>Loading add-ons...</p>
                        </div>

                        <!-- Addons Fields -->
                        <div v-else-if="hasAddons" class="addons-form">
                            <div v-for="field in addonFields" :key="field.id">
                                <template v-if="shouldShowField(field)">
                                    <!-- Price Per Pax Field -->
                                    <PricePerPaxField
                                        v-if="field.unit_type === 'Price per pax' && field.additional_fee"
                                        :field="field"
                                        :value="fieldValues[field.id] || {}"
                                        :rateGroups="rateGroups"
                                        :rateGroupCounts="rateGroupCounts"
                                        :currency="currency"
                                        @update="handleFieldUpdate" />

                                    <!-- Regular Field -->
                                    <AddonField
                                        v-else
                                        :field="field"
                                        :value="fieldValues[field.id] || getDefaultValue(field)"
                                        @update="handleFieldUpdate" />

                                    <!-- Render Children if Condition Met -->
                                    <div v-if="shouldShowChildren(field)" class="children-container">
                                        <div v-for="child in field.children" :key="child.id">
                                            <!-- Price Per Pax Child -->
                                            <PricePerPaxField
                                                v-if="child.unit_type === 'Price per pax' && child.additional_fee"
                                                :field="child"
                                                :value="fieldValues[child.id] || {}"
                                                :rateGroups="rateGroups"
                                                :rateGroupCounts="rateGroupCounts"
                                                :currency="currency"
                                                :isNested="true"
                                                @update="handleFieldUpdate" />

                                            <!-- Regular Child -->
                                            <AddonField
                                                v-else
                                                :field="child"
                                                :value="fieldValues[child.id] || getDefaultValue(child)"
                                                :isNested="true"
                                                @update="handleFieldUpdate" />
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- No Addons Message -->
                        <div v-else class="no-addons-message">
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
                                        <span class="item-date">
                                            {{ formatDate(item.date) }}
                                            <span v-if="item.package_has_slots">@ {{ item.time_date }}</span>
                                        </span>
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
                            
                            <!-- Itemized Add-ons -->
                            <div v-if="addonsWithPricing.length > 0" class="addons-breakdown">
                                <div class="addons-header">Add-ons:</div>
                                <div v-for="(addon, idx) in addonsWithPricing" :key="`addon-${idx}`" class="summary-row addon-item">
                                    <span>{{ addon.label }}</span>
                                    <span>{{ currencyFormat(addon.price) }}</span>
                                </div>
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
                            Continue to {{ nextStepName }} →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NavBtns from './Nav/NavBtns.vue';
import AddonField from './Forms/AddonField.vue';
import PricePerPaxField from './Forms/PricePerPaxField.vue';
import { formatCurrencyIntl } from '../utils/currency';
import { getMomentTimezone } from '../utils/dateUtils';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'AddonsNew',
    title: 'Native American Tours',
    components: {
        NavBtns,
        AddonField,
        PricePerPaxField
    },
    data() {
        return {
            loading: true,
            tenantId: null,
            tourOperatorId: 0,
            comboIds: 0,
            packageId: 0,
            affiliateId: 0,
            cartItem: {},
            cartItemLength: 0,
            addonForm: null,
            addonFields: [],
            fieldValues: {},
            selectedOptions: {},
            rateGroups: [],
            rateGroupCounts: [],
            currency: 'USD',
            serviceCommission: 0
        };
    },
    computed: {
        tabs() {
            return 3;
        },
        hasAddons() {
            return this.addonFields.length > 0;
        },
        nextStepName() {
            if (this.comboIds && this.comboIds.toString().split(',').length > 1) {
                return 'My Trip';
            }
            return 'Checkout';
        },
        calculateSubtotal() {
            return Object.values(this.cartItem).reduce((sum, item) => {
                return sum + (Number(item.subtotal) || 0);
            }, 0);
        },
        addonsWithPricing() {
            const addons = [];
            
            this.addonFields.forEach(field => {
                if (field.additional_fee && this.fieldHasValue(field)) {
                    const price = this.calculateFieldPrice(field);
                    if (price > 0) {
                        addons.push({
                            id: field.id,
                            label: field.label,
                            price: price
                        });
                    }
                }
                
                // Check children
                if (field.children && this.shouldShowChildren(field)) {
                    field.children.forEach(child => {
                        if (child.additional_fee && this.fieldHasValue(child)) {
                            const childPrice = this.calculateFieldPrice(child);
                            if (childPrice > 0) {
                                addons.push({
                                    id: child.id,
                                    label: child.label,
                                    price: childPrice
                                });
                            }
                        }
                    });
                }
            });
            
            return addons;
        },
        addonsTotal() {
            return this.addonsWithPricing.reduce((sum, addon) => sum + addon.price, 0);
        },
        calculateFees() {
            const baseFees = Object.values(this.cartItem).reduce((sum, item) => {
                return sum + (Number(item.fees) || 0);
            }, 0);
            const addonsFee = this.roundout((this.addonsTotal * this.serviceCommission) / 100);
            return baseFees + addonsFee;
        },
        calculateGrandTotal() {
            return this.calculateSubtotal + this.calculateFees + this.addonsTotal;
        }
    },
    async created() {
        this.initializeState();
        await this.fetchAddonForm();
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        initializeState() {
            this.tenantId = this.$store.state.tenantId;
            this.tourOperatorId = this.$store.state.tourOperatorId;
            this.packageId = this.$store.state.packageId;
            this.affiliateId = this.$store.state.affiliateId;
            this.comboIds = this.$store.state.comboIds;
            this.cartItem = this.$store.state.cartItem;
            this.cartItemLength = Object.keys(this.cartItem).length;
            this.currency = this.$store.state.currency || 'USD';
            this.serviceCommission = this.$store.state.serviceCommission || 0;
            
            // Extract rate groups from first cart item
            const firstItem = Object.values(this.cartItem)[0];
            if (firstItem) {
                this.rateGroups = firstItem.rate_group || [];
                this.rateGroupCounts = firstItem.people_group || [];
            }
        },
        async fetchAddonForm() {
            this.loading = true;
            try {
                const response = await axios.get(`/package/get-addon-form/${this.packageId}`);
                
                if (response.data.success && response.data.form) {
                    this.addonForm = response.data.form;
                    this.addonFields = response.data.form.fields.filter(f => f.parent_field_id === null);
                }
            } catch (error) {
                console.error('Failed to fetch addon form:', error);
            } finally {
                this.loading = false;
            }
        },
        getDefaultValue(field) {
            if (field.type === 'checkbox') return false;
            if (field.type === 'number') return 0;
            return '';
        },
        shouldShowField(field) {
            // Always show if visibility is "Both" or "Frontend" (or not specified)
            if (!field.visibility || field.visibility === 'Both') return true;
            if (field.visibility === 'Backend') return false;
            return true;
        },
        shouldShowChildren(field) {
            if (!field.children || field.children.length === 0) return false;
            if (!field.rules || field.rules.length === 0) return false;
            
            // Check if any rule is satisfied
            return field.rules.some(rule => this.checkRule(rule, field));
        },
        checkRule(rule, field) {
            const value = this.fieldValues[field.id];
            
            if (rule.operator === 'checked') {
                return value === true;
            }
            
            if (rule.operator === 'equals') {
                if (rule.option_id) {
                    const selectedOption = this.selectedOptions[field.id];
                    return selectedOption && selectedOption.id === rule.option_id;
                }
                return value == rule.value;
            }
            
            return false;
        },
        fieldHasValue(field) {
            const value = this.fieldValues[field.id];
            
            if (field.type === 'checkbox') {
                return value === true;
            }
            
            if (field.type === 'number') {
                return Number(value) > 0;
            }
            
            if (field.type === 'radio' || field.type === 'dropdown') {
                return value !== '' && value !== null && value !== undefined;
            }
            
            if (field.unit_type === 'Price per pax') {
                return Object.values(value || {}).some(v => Number(v) > 0);
            }
            
            return !!value;
        },
        calculateFieldPrice(field) {
            const value = this.fieldValues[field.id];
            
            // One time pricing
            if (field.unit_type === 'One time') {
                if (field.type === 'checkbox' && value === true) {
                    return Number(field.price || 0);
                }
                
                if ((field.type === 'radio' || field.type === 'dropdown') && value) {
                    const selectedOption = this.selectedOptions[field.id];
                    if (selectedOption && selectedOption.additional_fee) {
                        return Number(selectedOption.price || 0);
                    }
                }
                
                return Number(field.price || 0);
            }
            
            // Price per unit
            if (field.unit_type === 'Price per unit') {
                if (field.type === 'number') {
                    return Number(value || 0) * Number(field.price || 0);
                }
                
                if (field.type === 'checkbox' && value === true) {
                    return Number(field.price || 0);
                }
                
                if ((field.type === 'radio' || field.type === 'dropdown') && value) {
                    return Number(field.price || 0);
                }
            }
            
            // Price per pax
            if (field.unit_type === 'Price per pax') {
                const totalPax = Object.values(value || {}).reduce((sum, count) => sum + Number(count || 0), 0);
                return totalPax * Number(field.price || 0);
            }
            
            return 0;
        },
        handleFieldUpdate(data) {
            this.fieldValues[data.fieldId] = data.value;
            
            if (data.option) {
                this.selectedOptions[data.fieldId] = data.option;
            }
            
            // Force reactivity update
            this.fieldValues = { ...this.fieldValues };
        },
        roundout(num) {
            return Math.round(num * 100) / 100;
        },
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.currency);
        },
        formatDate(date) {
            const moment = getMomentTimezone();
            return moment(date).format('ddd, MMM D, YYYY');
        },
        navigateToTab(tab) {
            const routes = ['index', 'tour-form', 'addons', 'my-trip', 'maps', 'checkout'];
            this.$router.push({ name: routes[tab - 1] });
        },
        async continueToCheckout() {
            // Validate required fields
            const invalidFields = this.validateFields();
            if (invalidFields.length > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Required Fields Missing',
                    text: `Please fill in: ${invalidFields.join(', ')}`,
                    confirmButtonColor: '#0D9488'
                });
                return;
            }
            
            // Store addon values
            this.$store.dispatch('storeAddonValues', this.fieldValues);
            this.$store.dispatch('storeAddonOptions', this.selectedOptions);
            
            // Navigate to next step
            if (this.comboIds && this.comboIds.toString().split(',').length > 1) {
                this.$router.push({ name: 'my-trip' });
            } else {
                this.$router.push({ name: 'checkout' });
            }
        },
        validateFields() {
            const invalid = [];
            
            const validateField = (field) => {
                if (field.required && this.shouldShowField(field)) {
                    if (!this.fieldHasValue(field)) {
                        invalid.push(field.label);
                    }
                }
                
                // Validate children
                if (this.shouldShowChildren(field)) {
                    field.children.forEach(child => {
                        if (child.required && !this.fieldHasValue(child)) {
                            invalid.push(child.label);
                        }
                    });
                }
            };
            
            this.addonFields.forEach(validateField);
            return invalid;
        }
    }
};
</script>

<style scoped>
.addons-section {
    padding: 2rem 0;
    background: var(--color-background-alt);
    min-height: calc(100vh - 280px);
}

.addons-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.addons-content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
}

.addons-left {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
}

.addons-right {
    position: sticky;
    top: 2rem;
    height: fit-content;
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 1.5rem;
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 1rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.addons-form {
    display: flex;
    flex-direction: column;
}

.children-container {
    margin-top: 1rem;
    padding-left: 1rem;
}

.no-addons-message {
    text-align: center;
    padding: 3rem;
    color: var(--color-text-secondary);
}

.booking-summary {
    margin-bottom: 1.5rem;
}

.cart-summary-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.cart-summary-item {
    padding: 1rem;
    background: var(--color-background);
    border-radius: var(--border-radius-md);
}

.item-name {
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
}

.item-date {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.summary-placeholder {
    text-align: center;
    color: var(--color-text-secondary);
    padding: 2rem;
}

.summary-totals {
    border-top: 2px solid var(--color-border);
    padding-top: 1rem;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    font-size: 0.9375rem;
}

.addons-breakdown {
    margin: 0.5rem 0;
    padding: 0.5rem 0;
    border-top: 1px dashed var(--color-border);
}

.addons-header {
    font-weight: 600;
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.addon-item {
    padding-left: 1rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 2px solid var(--color-border);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text-primary);
}

.continue-button {
    width: 100%;
    padding: 1rem;
    margin-top: 1.5rem;
    background: linear-gradient(135deg, var(--color-amber) 0%, #f97316 100%);
    color: white;
    border: none;
    border-radius: var(--border-radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
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
        position: relative;
        top: 0;
    }
}
</style>
