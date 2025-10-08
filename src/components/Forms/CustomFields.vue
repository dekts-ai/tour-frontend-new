<template>
    <div v-if="display_form" class="custom-fields-container">
        <div v-if="loading_form" class="loading-state">
            <p>Loading options...</p>
        </div>

        <div v-else class="custom-fields-content">
            <div class="form-header">
                <h3 class="form-title">{{ form.form_name }}</h3>
                <p v-if="form.description" class="form-description">{{ form.description }}</p>
            </div>

            <div v-if="display_errors && errors.length > 0" class="errors-container">
                <div class="error-alert">
                    <p v-for="(err, idx) in errors" :key="`error-${idx}`" class="error-message">{{ err }}</p>
                </div>
            </div>

            <div class="fields-list">
                <div v-for="(field, key) in fields" :key="field.id" class="field-group">
                    <!-- Text Input -->
                    <div v-if="field.type === 'text'" class="field-item">
                        <label :for="str.toId(field.id)" class="field-label">
                            <CustomFieldLabel :field="field" />
                        </label>
                        <input 
                            :ref="field.id" 
                            :class="['field-input', { 'field-error': field.error }]"
                            :id="str.toId(field.id)" 
                            :type="field.type" 
                            v-model="field.value" />
                    </div>

                    <!-- Textarea -->
                    <div v-if="field.type === 'textarea'" class="field-item">
                        <label :for="str.toId(field.id)" class="field-label">
                            <CustomFieldLabel :field="field" />
                        </label>
                        <textarea 
                            :ref="field.id" 
                            :class="['field-textarea', { 'field-error': field.error }]"
                            :id="str.toId(field.id)" 
                            v-model="field.value"
                            rows="3"></textarea>
                    </div>

                    <!-- Number Input -->
                    <div v-if="field.type === 'number'" class="field-item">
                        <label :for="str.toId(field.id)" class="field-label">
                            <CustomFieldLabel :field="field" />
                        </label>
                        <input 
                            :ref="field.id" 
                            :class="['field-input', { 'field-error': field.error }]"
                            :id="str.toId(field.id)" 
                            type="number"
                            :min="field.attrs.min"
                            :max="field.attrs.max" 
                            v-model="field.value" />
                    </div>

                    <!-- Checkbox -->
                    <div v-if="field.type === 'checkbox'" class="field-item checkbox-item">
                        <label class="checkbox-label">
                            <input 
                                :ref="field.id" 
                                :id="str.toId(field.id)" 
                                type="checkbox"
                                v-model="field.value"
                                :value="field.default"
                                class="checkbox-input" />
                            <span class="checkbox-checkmark"></span>
                            <span class="checkbox-text">
                                <CustomFieldLabel :field="field" />
                            </span>
                        </label>
                        <span v-if="field.priceInfo?.enabled && field.priceInfo?.price > 0" class="field-price">
                            +{{ formatPrice(field.priceInfo.price) }}
                        </span>
                    </div>

                    <!-- Radio -->
                    <div v-if="field.type === 'radio'" class="field-item">
                        <div :class="['field-label', { 'field-error': field.error }]">
                            <CustomFieldLabel :field="field" />
                        </div>
                        <div class="radio-options">
                            <label v-for="(option, idx) in field.attrs.options" :key="`radio-${key}-${idx}`" class="radio-label">
                                <input 
                                    :ref="option.id" 
                                    :value="option.value" 
                                    :id="option.id"
                                    :name="field.id" 
                                    type="radio"
                                    v-model="field.value"
                                    class="radio-input" />
                                <span class="radio-checkmark"></span>
                                <span class="radio-text">{{ str.toTitle(option.name) }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Select -->
                    <div v-if="field.type === 'select'" class="field-item">
                        <label :for="str.toId(field.id)" :class="['field-label', { 'field-error': field.error }]">
                            <CustomFieldLabel :field="field" />
                        </label>
                        <select 
                            :ref="field.id" 
                            :id="str.toId(field.id)" 
                            v-model="field.value"
                            class="field-select">
                            <option v-for="option in field.attrs.options" :key="option.value" :value="option.value">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div v-if="display_submit" class="submit-section">
                <button class="submit-button" type="button" @click="submitForm">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Native Journey Design System for Custom Fields */
.custom-fields-container {
    width: 100%;
}

.loading-state {
    text-align: center;
    padding: var(--space-8);
    color: var(--neutral-600);
}

.custom-fields-content {
    width: 100%;
}

.form-header {
    margin-bottom: var(--space-6);
}

.form-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-2) 0;
}

.form-description {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    margin: 0;
}

/* Errors */
.errors-container {
    margin-bottom: var(--space-5);
}

.error-alert {
    background: linear-gradient(135deg, rgba(224, 120, 86, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
    border-left: 4px solid var(--primary-terracotta);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
}

.error-message {
    color: var(--primary-terracotta);
    font-size: var(--text-sm);
    margin: var(--space-1) 0;
}

/* Fields */
.fields-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
}

.field-group {
    width: 100%;
}

.field-item {
    width: 100%;
}

.field-label {
    display: block;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
    margin-bottom: var(--space-2);
}

.field-label.field-error {
    color: var(--primary-terracotta);
}

.field-input,
.field-textarea,
.field-select {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    color: var(--neutral-700);
    background: white;
    transition: all var(--transition-base);
    font-family: var(--font-body);
}

.field-input:focus,
.field-textarea:focus,
.field-select:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.field-input.field-error,
.field-textarea.field-error,
.field-select.field-error {
    border-color: var(--primary-terracotta);
}

.field-textarea {
    resize: vertical;
    min-height: 80px;
}

/* Checkbox */
.checkbox-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4);
    background: white;
    border-radius: var(--radius-lg);
    border: 2px solid var(--neutral-200);
    transition: all var(--transition-base);
}

.checkbox-item:hover {
    border-color: var(--primary-teal-light);
    box-shadow: var(--shadow-sm);
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex: 1;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkbox-checkmark {
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

.checkbox-input:checked ~ .checkbox-checkmark {
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-light));
    border-color: var(--primary-teal);
}

.checkbox-input:checked ~ .checkbox-checkmark::after {
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

.checkbox-text {
    font-size: var(--text-base);
    color: var(--neutral-900);
}

.field-price {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--primary-terracotta);
}

/* Radio */
.radio-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.radio-label {
    display: flex;
    align-items: center;
    padding: var(--space-3);
    background: white;
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
}

.radio-label:hover {
    border-color: var(--primary-teal-light);
}

.radio-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.radio-checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid var(--neutral-300);
    border-radius: 50%;
    margin-right: var(--space-3);
    flex-shrink: 0;
    position: relative;
    background: white;
    transition: all var(--transition-base);
}

.radio-input:checked ~ .radio-checkmark {
    border-color: var(--primary-teal);
}

.radio-input:checked ~ .radio-checkmark::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    width: 8px;
    height: 8px;
    background: var(--primary-teal);
    border-radius: 50%;
}

.radio-text {
    font-size: var(--text-sm);
    color: var(--neutral-900);
}

/* Submit Button */
.submit-section {
    margin-top: var(--space-6);
    padding-top: var(--space-6);
    border-top: 2px solid var(--neutral-200);
}

.submit-button {
    width: 100%;
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    cursor: pointer;
    transition: all var(--transition-base);
}

.submit-button:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
    .form-title {
        font-size: var(--text-lg);
    }
}
</style>

<script>
import axios from "axios";
import CustomFieldLabel from './CustomFieldLabel';
import { StringUtils } from "../../utils/stringUtils";
import { FormUtils } from "../../utils/formUtils";
import { formatCurrencyIntl } from '../../utils/currency';

export default {
    name: "CustomFields",
    props: {
        enabled: { type: Boolean, default: false },
        endpoint: { type: String, default: "" },
        values: { type: Array, default: () => [] },
        display_height: { type: Number, default: 400 },
        display_errors: { type: Boolean, default: true },
        display_submit: { type: Boolean, default: true },
        service_commission: { type: Number, default: 0 },
    },
    components: {
        CustomFieldLabel
    },
    created() {
        this.getData();
    },
    data: () => {
        return {
            form: null,
            fields: [],
            errors: [],
            loading_form: false,
            display_form: false,
            str: StringUtils,
            frm: FormUtils
        }
    },

    methods: {

        /**
         * fetch data from api endpoint 
         * if no form do not display this component 
         * @returns void
         */
        async getData() {
            if (!this.enabled) { return false; }
            try {
                this.loading_form = true;
                const resp = await axios.get(this.endpoint);
                const { data } = resp;
                this.renderForm(data);
            } catch (err) {
                console.log(err);
            } finally {
                this.loading_form = false;
            }
        },

        /**
         * loop over the custom form object and display the fields 
         * @param data custom form field data object 
         * @returns void
         */
        renderForm(data) {
            try {
                this.$emit('customformexists', data.isset);
                if (data.isset) {
                    this.form = data.form;
                    let fields = JSON.parse(this.form.form_fields);

                    // Filter out 'backend' fields
                    fields = fields.filter(field => field.visibility !== 'backend');

                    // Process remaining fields
                    fields.forEach((field) => {
                        field.value = this.getValueFromProps(field.id);
                        field.error = false;
                        field.form_id = this.form.id;
                        field.priceInfo.enabled = this.str.toBool(field.priceInfo.enabled);
                        field.priceInfo.price = this.str.toFloat(field.priceInfo.price);
                        field.priceInfo.fee = this.str.toFloat(this.roundout(field.priceInfo.price * this.service_commission / 100));
                    });

                    this.fields = fields;
                    this.display_form = true;
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * if prop values is set and is an array 
         * search the values array for an id that matchs the field id
         * return the users form value
         * @param id stirng unique field id 
         * @return any
         */
        getValueFromProps(id) {
            let value = "";
            if (this.values && Array.isArray(this.values)) {
                let field = this.values.filter(f => f.id === id);
                if (field.length > 0) {
                    value = this.str.stripTags(field[0].value);
                }
            }
            return value;
        },

        /**
         * add error class to input 
         * @param msg string
         * @param idx field index to this.fields index
         * @return void
         */
        renderError(msg, idx) {
            this.errors.push(msg);
            this.fields[idx].error = true;
        },

        /**
         * validate number if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateNumber(field, idx) {
            if (isNaN(field.value)) {
                this.renderError(`${field.name} must be a number`, idx);
            } else if (this.frm.isBlank(field.value)) {
                this.renderError(`${field.name} can not be blank`, idx);
            } else if (parseInt(field.attrs.min) > -1) {
                if (parseFloat(field.value) < parseFloat(field.attrs.min)) {
                    this.renderError(`${field.name} must be grater then or equal to ${field.attrs.min}`, idx);
                }
            } else if (parseInt(field.attrs.max) > -1) {
                if (parseFloat(field.value) < parseFloat(field.attrs.max)) {
                    this.renderError(`${field.name} must be less then or equal to ${field.attrs.max}`, idx);
                }
            }
        },

        /**
         * validate text input if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateText(field, idx) {
            if (this.frm.isBlank(field.value)) {
                this.renderError(`${field.name} can not be blank`, idx);
            }
        },

        /**
         * validate text checkbox is checked if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateCheckbox(field, idx) {
            if (!this.frm.isSet(field.value)) {
                this.renderError(`${field.name} must be selected`, idx);
            }
        },
        /**
         * validate Radio input make sure one value checked if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateRadio(field, idx) {
            if (!this.frm.isSet(field.value)) {
                this.renderError(`${field.name} option must be selected`, idx);
            }
        },
        /**
         * validate select input make sure one value is selected if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateSelect(field, idx) {
            if (this.frm.isBlank(field.value)) {
                this.renderError(`${field.name} option must be selected`, idx);
            }
        },

        /**
         * loop over the fields and check if its required 
         * and if its blank
         */
        async validateForm() {
            //reset all errors 
            this.errors = [];
            // for each field valid input
            for (let i = 0; i < this.fields.length; i++) {
                // reset error for field 
                this.fields[i].error = false;
                // get the field 
                let field = this.fields[i];
                // check if the field is required 
                let req = this.str.toBool(field.required);
                if (req) {

                    if (field.type === "text" || field.type === "textarea") {
                        this.validateText(field, i);
                    }

                    if (field.type === 'number') {
                        this.validateNumber(field, i);
                    }

                    if (field.type === 'checkbox') {
                        this.validateCheckbox(field, i);
                    }

                    if (field.type === 'radio') {
                        this.validateRadio(field, i)
                    }

                    if (field.type === 'select') {
                        this.validateSelect(field, i)
                    }
                }
            }

            // if error return valid false 
            return (this.errors.length === 0) ? true : false;
        },

        async sanitizeForm() {
            for (let key in this.fields) {
                this.fields[key].value = this.str.stripTags(this.fields[key].value);
            }
        },

        async submitForm(emit = true) {
            await this.validateForm();
            await this.sanitizeForm();
            const data = { form: this.form, fields: this.submittedFields(), errors: this.errors }

            if (emit) {
                this.$emit('submitcustomform', data);
            } else {
                return data;
            }
        },

        submittedFields() {
            return this.fields.filter((f) => this.frm.isSet(f.value));
        },

        sumTotal(fields) {
            let sum = 0;
            for (let key in fields) {
                let field = fields[key];
                if (this.str.toBool(field.priceInfo.enabled)) {
                    sum += this.str.toFloat(field.priceInfo.price);
                }
            }
            return sum;
        },

        feeTotal(fields) {
            let fee = 0;
            for (let key in fields) {
                let field = fields[key];
                if (this.str.toBool(field.priceInfo.enabled)) {
                    fee += this.str.toFloat(field.priceInfo.fee);
                }
            }
            return fee;
        },

        roundout(amount, places = 2) {
            if (places < 0) places = 0;
            let factor = Math.pow(10, places);
            return Math.round(amount * factor) / factor;
        },

        formatPrice(amount) {
            return formatCurrencyIntl(amount, this.$store?.state?.currency || 'USD');
        }
    }
}
</script>
