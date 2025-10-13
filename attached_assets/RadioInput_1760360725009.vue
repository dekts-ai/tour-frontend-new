<template>
    <div class="radio-group">
        <div v-for="option in field.options" :key="option.id" class="radio-option">
            <input type="radio" :id="`option-${option.id}${idSuffix}`" :value="option.value" v-model="internalValue"
                :disabled="!enabled" :required="field.required" class="radio-input"
                :class="{ 'input-error': display_errors && error }"
                @change="$emit('update:value', internalValue); $emit('validate')"
                :aria-invalid="display_errors && error ? 'true' : 'false'" :aria-describedby="errorId" />
            <label :for="`option-${option.id}${idSuffix}`" class="radio-label">{{ option.label }}</label>
            <span v-if="option.additional_fee && option.price" class="price-tag">
                - ${{ option.price }} ({{ field.unit_type || 'N/A' }})
            </span>
        </div>
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
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 8px;
}

.radio-input {
    width: 16px;
    height: 16px;
    border: 1px solid #d1d5db;
    border-radius: 50%;
    accent-color: #3b82f6;
    cursor: pointer;
}

.radio-input:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
}

.radio-label {
    font-size: 14px;
    color: #374151;
}

.price-tag {
    font-size: 12px;
    color: #16a34a;
    font-weight: 500;
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