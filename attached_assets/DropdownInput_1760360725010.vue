<template>
    <div class="input-wrapper">
        <select :id="id" v-model="internalValue" :disabled="!enabled" :required="field.required" class="select-input"
            :class="{ 'input-error': display_errors && error }"
            @change="$emit('update:value', internalValue); $emit('validate')" :aria-describedby="errorId">
            <option value="" disabled>Select an option</option>
            <option v-for="option in field.options" :key="option.id" :value="option.value">
                {{ option.label }}
                <template v-if="option.additional_fee && option.price"> - ${{ option.price }} ({{ field.unit_type ||
                    'N/A' }})</template>
            </option>
        </select>
        <div v-if="display_errors && error" class="error-message" :id="errorId">
            {{ error }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        field: {
            type: Object,
            required: true
        },
        value: {
            type: [String, null],
            default: null
        },
        enabled: {
            type: Boolean,
            default: true
        },
        display_errors: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ''
        },
        idSuffix: {
            type: String,
            default: ''
        }
    },
    computed: {
        id() {
            return `field-${this.field.id}${this.idSuffix}`;
        },
        errorId() {
            return `error-field-${this.field.id}${this.idSuffix}`;
        },
        internalValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('update:value', newValue);
            }
        }
    }
};
</script>

<style scoped>
/* Fallback Scoped CSS */
.input-wrapper {
    margin-top: 8px;
}

.select-input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: #ffffff;
    color: #1f2937;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 14px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.select-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
}

.input-error {
    border-color: #ef4444;
}

.error-message {
    margin-top: 4px;
    color: #ef4444;
    font-size: 12px;
}
</style>