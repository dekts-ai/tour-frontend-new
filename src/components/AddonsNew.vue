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
                            <!-- Total Cost Summary -->
                            <div class="total-cost-summary">
                                <span class="total-cost-label">Total Add-on Cost:</span>
                                <span class="total-cost-amount">{{ currencyFormat(totalCost) }}</span>
                            </div>

                            <div v-for="field in sortedFields" :key="field.id" class="field-card">
                                <div v-if="shouldShowField(field)">
                                    <div class="field-header">
                                        <label :for="`field-${field.id}`" class="field-label">
                                            {{ field.label }}
                                            <span v-if="field.required" class="required-indicator">*</span>
                                        </label>
                                        <span v-if="field.additional_fee && field.price && !['radio', 'dropdown'].includes(field.type)" class="price-tag">
                                            {{ currencyFormat(field.price) }} ({{ field.unit_type }})
                                        </span>
                                    </div>

                                    <!-- Dynamic Input Component -->
                                    <component 
                                        :is="getInputComponent(field.type)" 
                                        :field="field" 
                                        :value="getFieldValue(field)"
                                        :enabled="true" 
                                        :display-errors="display_errors" 
                                        :error="errors[field.id]"
                                        @update:value="updateValue(field, $event)" 
                                        @validate="validateField(field)" />

                                    <!-- Nested/Conditional Children -->
                                    <div v-if="shouldShowChildren(field)" class="nested-fields">
                                        <div v-for="child in sortedChildren(field.children)" :key="child.id" class="child-field-card">
                                            <div class="field-header">
                                                <label :for="`field-${child.id}`" class="field-label">
                                                    {{ child.label }}
                                                    <span v-if="child.required" class="required-indicator">*</span>
                                                </label>
                                                <span v-if="child.additional_fee && child.price && !['radio', 'dropdown'].includes(child.type)" class="price-tag">
                                                    {{ currencyFormat(child.price) }} ({{ child.unit_type || 'N/A' }})
                                                </span>
                                            </div>

                                            <!-- Repeated child fields for Price per pax -->
                                            <template v-if="field.unit_type === 'Price per pax' && totalPeople > 0">
                                                <div v-for="personIndex in totalPeople" :key="personIndex" class="person-input">
                                                    <div class="person-header">Person {{ personIndex }}</div>
                                                    <component 
                                                        :is="getInputComponent(child.type)" 
                                                        :field="child"
                                                        :value="getChildValue(child, personIndex - 1)" 
                                                        :enabled="true"
                                                        :display-errors="display_errors" 
                                                        :error="errors[`${child.id}-${personIndex}`]"
                                                        :id-suffix="`-${personIndex}`"
                                                        @update:value="updateChildValue(child, personIndex - 1, $event)"
                                                        @validate="validateField(child, `${personIndex}`)" />
                                                </div>
                                            </template>

                                            <!-- Repeated child fields for Price per unit -->
                                            <template v-else-if="field.unit_type === 'Price per unit'">
                                                <div v-for="unitIndex in getRepeatCount(field)" :key="unitIndex" class="unit-input">
                                                    <div class="unit-header">Unit {{ unitIndex }}</div>
                                                    <component 
                                                        :is="getInputComponent(child.type)" 
                                                        :field="child"
                                                        :value="getChildValue(child, unitIndex - 1)" 
                                                        :enabled="true"
                                                        :display-errors="display_errors" 
                                                        :error="errors[`${child.id}-${unitIndex}`]"
                                                        :id-suffix="`-${unitIndex}`"
                                                        @update:value="updateChildValue(child, unitIndex - 1, $event)"
                                                        @validate="validateField(child, `${unitIndex}`)" />
                                                </div>
                                            </template>

                                            <!-- Regular child (not repeated) -->
                                            <template v-else>
                                                <component 
                                                    :is="getInputComponent(child.type)" 
                                                    :field="child"
                                                    :value="getFieldValue(child)" 
                                                    :enabled="true"
                                                    :display-errors="display_errors" 
                                                    :error="errors[child.id]"
                                                    @update:value="updateValue(child, $event)"
                                                    @validate="validateField(child)" />
                                            </template>
                                        </div>
                                    </div>

                                    <!-- Field Subtotal Display -->
                                    <div v-if="!field.parent_field_id && safeValues[field.id]?.subtotal > 0" class="subtotal-tag">
                                        Subtotal: {{ currencyFormat(safeValues[field.id].subtotal) }} 
                                        (Fee: {{ currencyFormat(safeValues[field.id].fee) }})
                                    </div>
                                </div>
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
                                    <span>{{ currencyFormat(addon.subtotal) }}</span>
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
import { reactive, computed } from 'vue';
import NavBtns from './Nav/NavBtns.vue';
import NumberInput from './Forms/AddonInput/NumberInput.vue';
import RadioInput from './Forms/AddonInput/RadioInput.vue';
import CheckboxInput from './Forms/AddonInput/CheckboxInput.vue';
import DropdownInput from './Forms/AddonInput/DropdownInput.vue';
import TextInput from './Forms/AddonInput/TextInput.vue';
import TextboxInput from './Forms/AddonInput/TextboxInput.vue';
import { formatCurrencyIntl } from '../utils/currency';
import { getMomentTimezone } from '../utils/dateUtils';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'AddonsNew',
    title: 'Native American Tours',
    components: {
        NavBtns,
        NumberInput,
        RadioInput,
        CheckboxInput,
        DropdownInput,
        TextInput,
        TextboxInput
    },
    setup() {
        const internalValues = reactive({});
        
        const totalCost = computed(() => {
            let total = 0;
            if (internalValues && typeof internalValues === 'object') {
                Object.values(internalValues).forEach(item => {
                    total += (item.subtotal || 0) + (item.fee || 0);
                });
            }
            return total;
        });
        
        return { internalValues, totalCost };
    },
    data() {
        return {
            loading: true,
            display_errors: false,
            errors: {},
            tenantId: null,
            tourOperatorId: 0,
            comboIds: 0,
            packageId: 0,
            affiliateId: 0,
            cartItem: {},
            cartItemLength: 0,
            form: null,
            addonFields: [],
            currency: 'USD',
            serviceCommission: 0,
            totalPeople: 0
        };
    },
    computed: {
        tabs() { return 3; },
        hasAddons() { return this.addonFields.length > 0; },
        nextStepName() {
            if (this.comboIds && this.comboIds.toString().split(',').length > 1) {
                return 'My Trip';
            }
            return 'Checkout';
        },
        sortedFields() {
            if (!this.form || !this.form.fields) return [];
            return [...this.form.fields]
                .filter(f => !f.parent_field_id)
                .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        },
        safeValues() {
            return this.internalValues && typeof this.internalValues === 'object' && this.internalValues !== null 
                ? this.internalValues 
                : {};
        },
        calculateSubtotal() {
            return Object.values(this.cartItem).reduce((sum, item) => {
                return sum + (Number(item.subtotal) || 0);
            }, 0);
        },
        addonsWithPricing() {
            const addons = [];
            this.getAllFields().forEach(field => {
                const entry = this.safeValues[field.id];
                if (entry && entry.subtotal > 0) {
                    addons.push({
                        id: field.id,
                        label: field.label,
                        subtotal: entry.subtotal,
                        fee: entry.fee
                    });
                }
            });
            return addons;
        },
        calculateFees() {
            const baseFees = Object.values(this.cartItem).reduce((sum, item) => {
                return sum + (Number(item.fees) || 0);
            }, 0);
            const addonsFee = this.addonsWithPricing.reduce((sum, addon) => sum + addon.fee, 0);
            return baseFees + addonsFee;
        },
        calculateGrandTotal() {
            return this.calculateSubtotal + this.calculateFees + this.totalCost;
        }
    },
    watch: {
        totalPeople() {
            if (this.form && this.form.fields) {
                this.updateAllFees();
            }
        },
        serviceCommission() {
            if (this.form && this.form.fields) {
                this.updateAllFees();
            }
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
            
            // Calculate total people from cart
            const firstItem = Object.values(this.cartItem)[0];
            if (firstItem && firstItem.people_group) {
                this.totalPeople = firstItem.people_group.reduce((sum, count) => sum + Number(count || 0), 0);
            }
        },
        async fetchAddonForm() {
            this.loading = true;
            try {
                const response = await axios.get(`/package/get-addon-form/${this.packageId}`);
                
                if (response.data.success && response.data.form) {
                    this.form = response.data.form;
                    this.addonFields = response.data.form.fields || [];
                    this.initializeValues(this.addonFields);
                    this.updateAllFees();
                }
            } catch (error) {
                console.error('Failed to fetch addon form:', error);
                this.addonFields = [];
                
                if (error?.response?.status !== 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Load Add-ons',
                        text: 'Could not load additional options. Please try again.',
                        confirmButtonColor: '#0D9488'
                    });
                }
            } finally {
                this.loading = false;
            }
        },
        getInputComponent(type) {
            switch (type) {
                case 'number': return 'NumberInput';
                case 'radio': return 'RadioInput';
                case 'checkbox': return 'CheckboxInput';
                case 'dropdown': return 'DropdownInput';
                case 'text': return 'TextInput';
                case 'textbox': return 'TextboxInput';
                default: return null;
            }
        },
        initializeValues(fields) {
            if (!fields) return;
            fields.forEach(field => {
                if (!(field.id in this.safeValues)) {
                    this.safeValues[field.id] = {
                        value: this.defaultForType(field.type),
                        price: 0,
                        subtotal: 0,
                        fee: 0,
                        isRepeated: ['Price per unit', 'Price per pax'].includes(field.unit_type),
                        values: ['Price per unit', 'Price per pax'].includes(field.unit_type) ? [] : null
                    };
                }
                if (field.children && field.children.length) {
                    this.initializeValues(field.children);
                }
            });
        },
        defaultForType(type) {
            switch (type) {
                case 'checkbox': return false;
                case 'number': return 0;
                case 'radio':
                case 'dropdown': return '';
                case 'text':
                case 'textbox': return '';
                default: return '';
            }
        },
        getFieldValue(field) {
            return this.safeValues[field.id]?.value ?? this.defaultForType(field.type);
        },
        getChildValue(child, index) {
            return this.safeValues[child.id]?.values?.[index] ?? this.defaultForType(child.type);
        },
        getRepeatCount(field) {
            return this.safeValues[field.id]?.value || 0;
        },
        shouldShowField(field) {
            if (!field.visibility || field.visibility === 'Both') return true;
            if (field.visibility === 'Backend') return false;
            return true;
        },
        shouldShowChildren(field) {
            if (!field.children || field.children.length === 0) return false;
            if (!field.rules || field.rules.length === 0) return true;
            
            const rule = field.rules[0];
            const value = this.safeValues[field.id]?.value ?? null;
            
            if (value === undefined || value === null) return false;
            
            switch (rule.operator) {
                case 'checked': return !!value;
                case 'equals':
                case '==': return value == rule.value;
                case '!=': return value != rule.value;
                case '>': return Number(value) > Number(rule.value);
                case '<': return Number(value) < Number(rule.value);
                case '>=': return Number(value) >= Number(rule.value);
                case '<=': return Number(value) <= Number(rule.value);
                default: return false;
            }
        },
        sortedChildren(children) {
            if (!children) return [];
            return [...children].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        },
        updateValue(field, newValue) {
            if (!this.safeValues[field.id]) {
                this.safeValues[field.id] = {
                    value: newValue,
                    price: 0,
                    subtotal: 0,
                    fee: 0,
                    isRepeated: ['Price per unit', 'Price per pax'].includes(field.unit_type),
                    values: ['Price per unit', 'Price per pax'].includes(field.unit_type) ? [] : null
                };
            } else {
                this.safeValues[field.id].value = newValue;
            }
            this.initializeValues(this.form.fields);
            this.updateAllFees();
        },
        updateChildValue(child, index, newValue) {
            if (!this.safeValues[child.id]) {
                this.safeValues[child.id] = {
                    value: this.defaultForType(child.type),
                    price: 0,
                    subtotal: 0,
                    fee: 0,
                    isRepeated: false,
                    values: []
                };
            }
            if (!this.safeValues[child.id].values) {
                this.safeValues[child.id].values = [];
            }
            this.safeValues[child.id].values[index] = newValue;
            this.updateAllFees();
        },
        resizeChildValues(child, parent, commissionRate) {
            const item = this.safeValues[child.id];
            if (!item) return;

            let count = 0;
            if (parent.unit_type === 'Price per unit') {
                count = this.safeValues[parent.id]?.value || 0;
            } else if (parent.unit_type === 'Price per pax') {
                count = Number(this.totalPeople) || 0;
            }

            let values = item.values || [];
            while (values.length < count) {
                values.push(this.defaultForType(child.type));
            }
            if (values.length > count) {
                values.length = count;
            }
            item.values = values;

            // Calculate subtotal for child
            let subtotal = 0;
            values.forEach(val => {
                let instanceCost = 0;
                if (child.type === 'radio' || child.type === 'dropdown') {
                    const selectedOption = child.options?.find(opt => opt.value === val) || {};
                    if (selectedOption.additional_fee && selectedOption.price) {
                        instanceCost = Number(selectedOption.price) || 0;
                    }
                } else if (child.type === 'number') {
                    if (child.additional_fee && child.price) {
                        instanceCost = Number(child.price) * Number(val || 0);
                    }
                } else if (child.type === 'checkbox') {
                    if (child.additional_fee && child.price && val === true) {
                        instanceCost = Number(child.price) || 0;
                    }
                } else if (child.additional_fee && child.price) {
                    instanceCost = Number(child.price) || 0;
                }
                subtotal += instanceCost;
            });

            const fee = subtotal * commissionRate;
            item.subtotal = subtotal;
            item.fee = fee;
        },
        updateAllFees() {
            const commissionRate = Number(this.serviceCommission) / 100 || 0;
            const allFields = this.getAllFields();
            
            allFields.forEach(field => {
                const entry = this.safeValues[field.id];
                if (!entry) return;

                let price = 0;
                let subtotal = 0;
                const value = entry.value;

                if (field.type === 'radio' || field.type === 'dropdown') {
                    if (value && field.options) {
                        const selectedOption = field.options.find(option => option.value === value);
                        if (selectedOption && selectedOption.additional_fee && selectedOption.price) {
                            price = Number(selectedOption.price) || 0;
                            subtotal = price;
                        }
                    }
                } else if (field.type === 'number') {
                    if (field.additional_fee && field.price) {
                        price = Number(field.price) || 0;
                        subtotal = price * (Number(value) || 0);
                    }
                } else if (field.type === 'checkbox') {
                    if (field.additional_fee && field.price && value === true) {
                        price = Number(field.price) || 0;
                        if (field.unit_type === 'Price per pax' && Number(this.totalPeople) > 0) {
                            subtotal = price * Number(this.totalPeople);
                        } else {
                            subtotal = price;
                        }
                    }
                } else if (field.additional_fee && field.price) {
                    price = Number(field.price) || 0;
                    subtotal = price;
                }

                const fee = subtotal * commissionRate;
                entry.price = price;
                entry.subtotal = subtotal;
                entry.fee = fee;
            });

            // Update children
            this.getAllFields().forEach(field => {
                if (field.children) {
                    field.children.forEach(child => {
                        if (['Price per unit', 'Price per pax'].includes(field.unit_type)) {
                            this.resizeChildValues(child, field, commissionRate);
                        }
                    });
                }
            });
        },
        getAllFields(fields = this.form?.fields, allFields = []) {
            if (!fields) return allFields;
            fields.forEach(field => {
                allFields.push(field);
                if (field.children) {
                    this.getAllFields(field.children, allFields);
                }
            });
            return allFields;
        },
        validateField(field) {
            // Validation logic here
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
            // Store addon values
            this.$store.dispatch('storeAddonValues', this.safeValues);
            
            // Navigate to next step
            if (this.comboIds && this.comboIds.toString().split(',').length > 1) {
                this.$router.push({ name: 'my-trip' });
            } else {
                this.$router.push({ name: 'checkout' });
            }
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
    gap: 1rem;
}

.total-cost-summary {
    background: linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(13, 148, 136, 0.05) 100%);
    padding: 1rem;
    border-radius: var(--border-radius-md);
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.total-cost-label {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-primary);
}

.total-cost-amount {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-primary);
}

.field-card {
    background: var(--color-background);
    border-radius: var(--border-radius-md);
    padding: 1.25rem;
    border: 1px solid var(--color-border);
}

.field-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
    gap: 1rem;
}

.field-label {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-primary);
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.required-indicator {
    color: var(--color-terracotta);
    font-size: 1rem;
}

.price-tag {
    font-size: 0.875rem;
    color: var(--color-amber);
    font-weight: 600;
    white-space: nowrap;
}

.subtotal-tag {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px dashed var(--color-border);
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    font-weight: 500;
}

.nested-fields {
    margin-top: 1rem;
    margin-left: 1rem;
    border-left: 3px solid var(--color-primary);
    padding-left: 1rem;
}

.child-field-card {
    background: white;
    border-radius: var(--border-radius-sm);
    padding: 1rem;
    margin-top: 0.75rem;
}

.person-input,
.unit-input {
    margin-top: 1rem;
}

.person-header,
.unit-header {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
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
