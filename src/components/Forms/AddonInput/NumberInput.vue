<template>
    <div class="number-input-wrapper">
        <div class="input-container">
            <input 
                type="number" 
                :id="id" 
                v-model.number="internalValue" 
                :min="field.min" 
                :max="field.max"
                :disabled="!enabled" 
                :required="field.required" 
                class="number-input"
                :class="{ 'input-error': display_errors && error, 'input-disabled': !enabled }"
                @input="$emit('update:value', internalValue); $emit('validate')" 
                :aria-describedby="errorId"
                :placeholder="field.placeholder || 'Enter number'" 
            />
            <div class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
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
        value: { type: [Number, String, null], default: null },
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
.number-input-wrapper {
    margin-top: var(--space-3);
}

.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.number-input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    padding-right: var(--space-12);
    font-size: var(--text-base);
    font-family: var(--font-body);
    color: var(--neutral-800);
    background: white;
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-md);
    transition: all var(--transition-base);
}

.number-input:hover:not(:disabled) {
    border-color: var(--neutral-300);
    background: var(--neutral-50);
}

.number-input:focus {
    outline: none;
    border-color: var(--primary-teal);
    background: white;
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.number-input:disabled,
.input-disabled {
    background: var(--neutral-100);
    color: var(--neutral-400);
    cursor: not-allowed;
    border-color: var(--neutral-200);
}

.input-icon {
    position: absolute;
    right: var(--space-4);
    width: 20px;
    height: 20px;
    color: var(--neutral-400);
    pointer-events: none;
    transition: color var(--transition-fast);
}

.number-input:focus ~ .input-icon {
    color: var(--primary-teal);
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
</style>
