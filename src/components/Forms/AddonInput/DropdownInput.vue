<template>
    <div class="dropdown-input-wrapper">
        <div class="select-container">
            <select 
                :id="id" 
                v-model="internalValue" 
                :disabled="!enabled" 
                :required="field.required" 
                class="select-input"
                :class="{ 'input-error': display_errors && error, 'input-disabled': !enabled, 'has-value': internalValue }"
                @change="$emit('update:value', internalValue); $emit('validate')" 
                :aria-describedby="errorId"
            >
                <option value="" disabled>{{ field.placeholder || 'Select an option' }}</option>
                <option v-for="option in field.options" :key="option.id" :value="option.value">
                    {{ option.label }}
                    <template v-if="option.additional_fee && option.price"> (+${{ option.price }})</template>
                </option>
            </select>
            <div class="select-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </div>
        </div>
        <div v-if="display_errors && error" class="error-message" :id="errorId">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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
        id() { return `field-${this.field.id}${this.idSuffix}`; },
        errorId() { return `error-field-${this.field.id}${this.idSuffix}`; },
        internalValue: {
            get() { return this.value; },
            set(newValue) { this.$emit('update:value', newValue); }
        }
    }
};
</script>

<style scoped>
.dropdown-input-wrapper {
    margin-top: var(--space-3);
}

.select-container {
    position: relative;
    display: flex;
    align-items: center;
}

.select-input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    padding-right: var(--space-12);
    font-size: var(--text-base);
    font-family: var(--font-body);
    color: var(--neutral-500);
    background: white;
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-md);
    appearance: none;
    cursor: pointer;
    transition: all var(--transition-base);
}

.select-input.has-value {
    color: var(--neutral-800);
}

.select-input:hover:not(:disabled) {
    border-color: var(--neutral-300);
    background: var(--neutral-50);
}

.select-input:focus {
    outline: none;
    border-color: var(--primary-teal);
    background: white;
    color: var(--neutral-800);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.select-input:disabled,
.input-disabled {
    background: var(--neutral-100);
    color: var(--neutral-400);
    cursor: not-allowed;
    border-color: var(--neutral-200);
}

.select-icon {
    position: absolute;
    right: var(--space-4);
    width: 20px;
    height: 20px;
    color: var(--neutral-400);
    pointer-events: none;
    transition: all var(--transition-fast);
}

.select-input:focus ~ .select-icon {
    color: var(--primary-teal);
    transform: rotate(180deg);
}

.input-error {
    border-color: var(--error);
}

.input-error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-2);
    color: var(--error);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
}

.error-message svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

/* Custom option styling */
.select-input option {
    padding: var(--space-2);
    color: var(--neutral-800);
}

.select-input option:disabled {
    color: var(--neutral-400);
}
</style>
