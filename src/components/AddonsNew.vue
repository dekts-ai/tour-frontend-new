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
                            <div v-if="calculateAddonsSubtotal > 0" class="total-cost-summary">
                                <span class="total-cost-label">Total Add-on Cost:</span>
                                <span class="total-cost-amount">{{ currencyFormat(calculateAddonsSubtotal + calculateAddonsFees) }}</span>
                            </div>

                            <div v-for="field in sortedFields" :key="field.id">
                                <div v-if="shouldShowField(field)" class="field-card">
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
        calculateAddonsSubtotal() {
            return this.addonsWithPricing.reduce((sum, addon) => sum + addon.subtotal, 0);
        },
        calculateAddonsFees() {
            return this.addonsWithPricing.reduce((sum, addon) => sum + addon.fee, 0);
        },
        calculateFees() {
            const baseFees = Object.values(this.cartItem).reduce((sum, item) => {
                return sum + (Number(item.fees) || 0);
            }, 0);
            return baseFees + this.calculateAddonsFees;
        },
        calculateGrandTotal() {
            return this.calculateSubtotal + this.calculateAddonsSubtotal + this.calculateFees;
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
            
            // Calculate total people from cart
            const firstItem = Object.values(this.cartItem)[0];
            if (firstItem && firstItem.people_group) {
                this.serviceCommission = firstItem.service_commission || 0;
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
                    
                    // Set hasCustomFields in Vuex so navigation shows "Add Extras"
                    const hasFields = this.addonFields.length > 0;
                    this.$store.dispatch('storeHasCustomFields', hasFields);
                    
                    this.initializeValues(this.addonFields);
                    
                    // Restore custom_fields if user is returning to this page
                    const firstSlotId = Object.keys(this.cartItem)[0];
                    if (firstSlotId && this.cartItem[firstSlotId]?.custom_fields) {
                        this.restoreCustomFields(this.cartItem[firstSlotId].custom_fields);
                    }
                    
                    this.updateAllFees();
                } else {
                    // No form data returned, hide Add Extras navigation
                    this.addonFields = [];
                    this.$store.dispatch('storeHasCustomFields', false);
                }
            } catch (error) {
                console.error('Failed to fetch addon form:', error);
                this.addonFields = [];
                this.$store.dispatch('storeHasCustomFields', false);
                
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
            // Only show fields with visibility 'Both' or 'Frontend'
            // Hide 'Backend' visibility type
            if (!field.visibility || field.visibility === 'Both' || field.visibility === 'Frontend') {
                return true;
            }
            if (field.visibility === 'Backend') {
                return false;
            }
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
        hasValidFieldValue(field) {
            const value = this.safeValues[field.id]?.value;
            
            switch (field.type) {
                case 'checkbox':
                    return value === true;
                case 'number':
                    return Number(value) > 0;
                case 'radio':
                case 'dropdown':
                    return value !== '' && value !== null && value !== undefined;
                case 'text':
                case 'textbox':
                    return value && value.trim() !== '';
                default:
                    return false;
            }
        },
        hasValidChildValue(child, index) {
            const value = this.safeValues[child.id]?.values?.[index];
            
            switch (child.type) {
                case 'checkbox':
                    return value === true;
                case 'number':
                    return Number(value) > 0;
                case 'radio':
                case 'dropdown':
                    return value !== '' && value !== null && value !== undefined;
                case 'text':
                case 'textbox':
                    return value && value.trim() !== '';
                default:
                    return false;
            }
        },
        validateField(field, suffix = '') {
            const fieldKey = suffix ? `${field.id}-${suffix}` : field.id;
            
            if (!field.required) {
                delete this.errors[fieldKey];
                return true;
            }
            
            // For repeated children, validate the specific index
            if (suffix) {
                const index = parseInt(suffix) - 1;
                if (!this.hasValidChildValue(field, index)) {
                    this.errors[fieldKey] = `${field.label} is required for Person/Unit ${suffix}`;
                    return false;
                }
            } else {
                // Validate parent field
                if (!this.hasValidFieldValue(field)) {
                    this.errors[fieldKey] = `${field.label} is required`;
                    return false;
                }
            }
            
            delete this.errors[fieldKey];
            return true;
        },
        validateAllFields() {
            this.errors = {};
            let isValid = true;
            
            const allFields = this.getAllFields();
            console.log('All fields for validation:', allFields.map(f => ({ id: f.id, label: f.label, visibility: f.visibility, required: f.required })));
            
            allFields.forEach(field => {
                if (!field.required) return;
                
                // Skip validation for backend visibility fields
                const shouldShow = this.shouldShowField(field);
                console.log(`Field ${field.id} (${field.label}): visibility=${field.visibility}, shouldShow=${shouldShow}`);
                
                if (!shouldShow) {
                    console.log(`Skipping field ${field.id} due to visibility`);
                    return;
                }
                
                // Check if field should be shown based on parent rules
                const parent = allFields.find(f => f.children?.some(c => c.id === field.id));
                if (parent && !this.shouldShowChildren(parent)) {
                    return; // Skip validation if parent condition not met
                }
                
                // Validate parent fields
                if (!field.parent_field_id) {
                    if (!this.hasValidFieldValue(field)) {
                        this.errors[field.id] = `${field.label} is required`;
                        isValid = false;
                    } else if (field.children && field.children.length > 0 && this.shouldShowChildren(field)) {
                        // If parent is filled and has children, validate children
                        field.children.forEach(child => {
                            if (!child.required) return;
                            
                            // For repeated children
                            if (field.unit_type === 'Price per pax') {
                                for (let i = 0; i < this.totalPeople; i++) {
                                    if (!this.hasValidChildValue(child, i)) {
                                        this.errors[`${child.id}-${i + 1}`] = `${child.label} is required for Person ${i + 1}`;
                                        isValid = false;
                                    }
                                }
                            } else if (field.unit_type === 'Price per unit') {
                                const count = this.safeValues[field.id]?.value || 0;
                                for (let i = 0; i < count; i++) {
                                    if (!this.hasValidChildValue(child, i)) {
                                        this.errors[`${child.id}-${i + 1}`] = `${child.label} is required for Unit ${i + 1}`;
                                        isValid = false;
                                    }
                                }
                            } else {
                                // Regular child (not repeated)
                                if (!this.hasValidFieldValue(child)) {
                                    this.errors[child.id] = `${child.label} is required`;
                                    isValid = false;
                                }
                            }
                        });
                    }
                }
            });
            
            return isValid;
        },
        roundout(num) {
            return Math.round(num * 100) / 100;
        },
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.currency);
        },
        formatDate(date) {
            return getMomentTimezone(this.$store.state.timezone, date).format('ddd, MMM D, YYYY');
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
        buildCustomFields() {
            const customFields = [];
            const allFields = this.getAllFields();
            
            allFields.forEach(field => {
                const entry = this.safeValues[field.id];
                if (!entry) return;
                
                // Check if field has a valid value
                if (this.hasValidFieldValue(field)) {
                    const customField = {
                        id: field.id,
                        name: field.label,
                        type: field.type,
                        value: entry.value,
                        priceInfo: {
                            enabled: field.additional_fee || false,
                            price: entry.price || 0,
                            subtotal: entry.subtotal || 0,
                            fee: entry.fee || 0
                        }
                    };
                    
                    // Add child values if repeated
                    if (entry.isRepeated && entry.values && entry.values.length > 0) {
                        customField.values = entry.values;
                    }
                    
                    customFields.push(customField);
                }
            });
            
            return customFields;
        },
        restoreCustomFields(customFields) {
            if (!customFields || !Array.isArray(customFields)) return;
            
            customFields.forEach(savedField => {
                if (this.safeValues[savedField.id]) {
                    this.safeValues[savedField.id].value = savedField.value;
                    
                    // Restore repeated values if present
                    if (savedField.values && Array.isArray(savedField.values)) {
                        this.safeValues[savedField.id].values = [...savedField.values];
                    }
                }
            });
            
            // Recalculate fees after restoration
            this.updateAllFees();
        },
        async continueToCheckout() {
            console.log('=== Continue to Checkout clicked ===');
            
            // Validate all fields
            const isValid = this.validateAllFields();
            console.log('Validation result:', isValid);
            console.log('Errors:', this.errors);
            
            if (!isValid) {
                console.log('Validation failed, showing errors');
                this.display_errors = true;
                
                // Scroll to first error (no popup, just show inline errors)
                this.$nextTick(() => {
                    const firstError = document.querySelector('.input-error');
                    console.log('First error element:', firstError);
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstError.focus();
                    }
                });
                
                return;
            }
            
            console.log('Validation passed, saving custom fields');
            
            // Build and save custom_fields to the first cart item's form
            const customFields = this.buildCustomFields();
            const firstSlotId = Object.keys(this.cartItem)[0];
            
            if (firstSlotId && this.cartItem[firstSlotId]) {
                // Update the cart item with custom_fields
                const updatedCartItem = { ...this.cartItem };
                updatedCartItem[firstSlotId] = {
                    ...updatedCartItem[firstSlotId],
                    custom_fields: customFields
                };
                
                // Store updated cart
                this.$store.dispatch('storeCartItem', updatedCartItem);
            }
            
            // Store addon values
            this.$store.dispatch('storeAddonValues', this.safeValues);
            
            // Navigate to next step
            const destination = (this.comboIds && this.comboIds.toString().split(',').length > 1) ? 'MyTrip' : 'Checkout';
            console.log('Navigating to:', destination);
            
            if (destination === 'MyTrip') {
                this.$router.push({ name: 'MyTrip' });
            } else {
                this.$router.push({ name: 'Checkout' });
            }
        }
    }
};
</script>

<style scoped>
.addons-section {
    padding: var(--space-8) 0;
    background: var(--neutral-50);
    min-height: calc(100vh - 280px);
}

.addons-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-6);
}

.addons-content {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: var(--space-8);
}

.addons-left {
    background: white;
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--neutral-200);
}

.addons-right {
    position: sticky;
    top: var(--space-8);
    height: fit-content;
    background: white;
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--neutral-200);
}

.section-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin-bottom: var(--space-6);
    display: flex;
    align-items: center;
    gap: var(--space-3);
}

.section-title::before {
    content: '';
    width: 4px;
    height: 28px;
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-dark) 100%);
    border-radius: var(--radius-full);
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-12);
    gap: var(--space-4);
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--neutral-200);
    border-top-color: var(--primary-teal);
    border-radius: var(--radius-full);
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.addons-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
}

.total-cost-summary {
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-dark) 100%);
    padding: var(--space-5);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-md);
}

.total-cost-label {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: white;
}

.total-cost-amount {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: white;
}

.field-card {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    border: 2px solid var(--neutral-200);
    transition: all var(--transition-base);
    position: relative;
}

.field-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary-teal) 0%, var(--primary-teal-dark) 100%);
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.field-card:hover {
    border-color: var(--primary-teal-light);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
}

.field-card:hover::before {
    opacity: 1;
}

.field-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-4);
    gap: var(--space-4);
}

.field-label {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--neutral-800);
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.required-indicator {
    color: var(--secondary-terracotta);
    font-size: var(--text-lg);
}

.price-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1) var(--space-3);
    background: linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-amber-dark) 100%);
    color: white;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    border-radius: var(--radius-full);
    white-space: nowrap;
    box-shadow: var(--shadow-sm);
}

.subtotal-tag {
    margin-top: var(--space-5);
    padding-top: var(--space-4);
    border-top: 2px dashed var(--neutral-200);
    font-size: var(--text-base);
    color: var(--neutral-700);
    font-weight: var(--font-semibold);
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.nested-fields {
    margin-top: var(--space-5);
    margin-left: var(--space-4);
    border-left: 3px solid var(--primary-teal);
    padding-left: var(--space-5);
    position: relative;
}

.nested-fields::before {
    content: '';
    position: absolute;
    left: -3px;
    top: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
}

.child-field-card {
    background: linear-gradient(135deg, rgba(13, 148, 136, 0.02) 0%, rgba(13, 148, 136, 0.01) 100%);
    border-radius: var(--radius-md);
    padding: var(--space-5);
    margin-top: var(--space-4);
    border: 1px solid var(--neutral-200);
    transition: all var(--transition-base);
}

.child-field-card:hover {
    border-color: var(--primary-teal-light);
    box-shadow: var(--shadow-sm);
}

.person-input,
.unit-input {
    margin-top: var(--space-4);
    padding: var(--space-4);
    background: white;
    border-radius: var(--radius-md);
    border: 1px solid var(--neutral-200);
}

.person-header,
.unit-header {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--primary-teal);
    margin-bottom: var(--space-3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.person-header::before,
.unit-header::before {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--primary-teal);
    border-radius: var(--radius-full);
}

.no-addons-message {
    text-align: center;
    padding: var(--space-12);
    color: var(--neutral-500);
    font-size: var(--text-lg);
}

.booking-summary {
    margin-bottom: var(--space-6);
}

.cart-summary-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.cart-summary-item {
    padding: var(--space-4);
    background: linear-gradient(135deg, var(--neutral-50) 0%, white 100%);
    border-radius: var(--radius-md);
    border: 1px solid var(--neutral-200);
    transition: all var(--transition-base);
}

.cart-summary-item:hover {
    border-color: var(--primary-teal-light);
    transform: translateX(2px);
}

.item-name {
    font-weight: var(--font-semibold);
    color: var(--neutral-800);
    margin-bottom: var(--space-2);
    font-size: var(--text-base);
}

.item-date {
    font-size: var(--text-sm);
    color: var(--neutral-500);
}

.summary-placeholder {
    text-align: center;
    color: var(--neutral-400);
    padding: var(--space-8);
    font-size: var(--text-base);
}

.summary-totals {
    border-top: 2px solid var(--neutral-200);
    padding-top: var(--space-5);
    margin-top: var(--space-5);
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3) 0;
    font-size: var(--text-base);
    color: var(--neutral-700);
}

.addons-breakdown {
    margin: var(--space-3) 0;
    padding: var(--space-3) 0;
    border-top: 1px dashed var(--neutral-300);
}

.addons-header {
    font-weight: var(--font-semibold);
    color: var(--neutral-600);
    font-size: var(--text-sm);
    margin-bottom: var(--space-3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.addon-item {
    padding-left: var(--space-4);
    font-size: var(--text-sm);
    color: var(--neutral-600);
}

.summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-5);
    margin-top: var(--space-4);
    border-top: 3px solid var(--primary-teal);
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
}

.continue-button {
    width: 100%;
    padding: var(--space-4) var(--space-6);
    margin-top: var(--space-6);
    background: linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-amber-dark) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
}

.continue-button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    background: linear-gradient(135deg, var(--accent-amber-dark) 0%, #C9643E 100%);
}

.continue-button:active {
    transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .addons-content {
        grid-template-columns: 1fr;
        gap: var(--space-6);
    }
    
    .addons-right {
        position: relative;
        top: 0;
    }
    
    .addons-left,
    .addons-right {
        padding: var(--space-6);
    }
}

@media (max-width: 768px) {
    .addons-section {
        padding: var(--space-6) 0;
    }
    
    .addons-container {
        padding: 0 var(--space-4);
    }
    
    .addons-left,
    .addons-right {
        padding: var(--space-5);
    }
    
    .section-title {
        font-size: var(--text-xl);
    }
    
    .field-card {
        padding: var(--space-5);
    }
    
    .nested-fields {
        margin-left: var(--space-2);
        padding-left: var(--space-3);
    }
}
</style>
