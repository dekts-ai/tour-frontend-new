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
        field: { type: Object, required: true },
        value: { type: [String, null], default: null },
        enabled: { type: Boolean, default: true },
        display_errors: { type: Boolean, default: false },
        error: { type: String, default: '' },
        idSuffix: { type: String, default: '' }
    },
    computed: {
        errorId() { return `error-field-${this.field.id}${this.idSuffix}`; },
        internalValue: {
            get() { return this.value; },
            set(newValue) { this.$emit('update:value', newValue); }
        }
    }
};
</script>

<style scoped>
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
}
.radio-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.radio-input {
    width: 1.125rem;
    height: 1.125rem;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    accent-color: var(--color-primary);
    cursor: pointer;
}
.radio-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}
.radio-label {
    font-size: 0.9375rem;
    color: var(--color-text-primary);
}
.price-tag {
    font-size: 0.875rem;
    color: var(--color-amber);
    font-weight: 500;
}
.input-error { border-color: var(--color-terracotta); }
.error-message {
    margin-top: 0.25rem;
    color: var(--color-terracotta);
    font-size: 0.875rem;
}
</style>
