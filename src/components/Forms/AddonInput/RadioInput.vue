<template>
    <div class="radio-input-wrapper">
        <div class="radio-group">
            <label 
                v-for="option in field.options" 
                :key="option.id" 
                class="radio-container"
                :class="{ 'radio-disabled': !enabled, 'radio-selected': internalValue === option.value }"
            >
                <input 
                    type="radio" 
                    :id="`option-${option.id}${idSuffix}`" 
                    :value="option.value" 
                    v-model="internalValue"
                    :disabled="!enabled" 
                    :required="field.required" 
                    class="radio-native"
                    :class="{ 'input-error': display_errors && error }"
                    @change="$emit('update:value', internalValue); $emit('validate')"
                    :aria-invalid="display_errors && error ? 'true' : 'false'" 
                    :aria-describedby="errorId" 
                />
                <span class="radio-custom">
                    <span class="radio-dot"></span>
                </span>
                <span class="radio-content">
                    <span class="radio-label">{{ option.label }}</span>
                    <span v-if="option.additional_fee && option.price" class="price-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${{ option.price }}
                    </span>
                </span>
            </label>
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
        errorId() { return `error-field-${this.field.id}${this.idSuffix}`; },
        internalValue: {
            get() { return this.value; },
            set(newValue) { this.$emit('update:value', newValue); }
        }
    }
};
</script>

<style scoped>
.radio-input-wrapper {
    margin-top: var(--space-3);
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.radio-container {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: white;
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-base);
}

.radio-container:hover:not(.radio-disabled) {
    border-color: var(--primary-teal-light);
    background: var(--neutral-50);
    transform: translateX(2px);
}

.radio-selected {
    border-color: var(--primary-teal);
    background: linear-gradient(135deg, rgba(13, 148, 136, 0.05) 0%, rgba(13, 148, 136, 0.02) 100%);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.radio-disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.radio-native {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.radio-custom {
    position: relative;
    width: 22px;
    height: 22px;
    background: white;
    border: 2px solid var(--neutral-300);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    flex-shrink: 0;
}

.radio-dot {
    width: 10px;
    height: 10px;
    background: var(--primary-teal);
    border-radius: var(--radius-full);
    opacity: 0;
    transform: scale(0);
    transition: all var(--transition-fast);
}

.radio-native:checked ~ .radio-custom {
    border-color: var(--primary-teal);
    background: white;
}

.radio-native:checked ~ .radio-custom .radio-dot {
    opacity: 1;
    transform: scale(1);
}

.radio-native:focus ~ .radio-custom {
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.radio-native.input-error ~ .radio-custom {
    border-color: var(--error);
}

.radio-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    gap: var(--space-3);
}

.radio-label {
    font-size: var(--text-base);
    color: var(--neutral-700);
    font-weight: var(--font-medium);
}

.price-badge {
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
}

.price-badge svg {
    width: 14px;
    height: 14px;
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
