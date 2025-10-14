<template>
    <div class="checkbox-input-wrapper">
        <label class="checkbox-container" :class="{ 'checkbox-disabled': !enabled }">
            <input 
                type="checkbox" 
                :id="id" 
                v-model="internalValue" 
                :disabled="!enabled" 
                :required="field.required"
                class="checkbox-native" 
                :class="{ 'input-error': display_errors && error }"
                @change="$emit('update:value', internalValue); $emit('validate')"
                :aria-invalid="display_errors && error ? 'true' : 'false'" 
                :aria-describedby="errorId" 
            />
            <span class="checkbox-custom">
                <svg class="checkbox-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </span>
            <span class="checkbox-label" v-if="field.label">{{ field.label }}</span>
        </label>
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
        value: { type: Boolean, default: false },
        enabled: { type: Boolean, default: true },
        display_errors: { type: Boolean, default: false },
        error: { type: String, default: '' },
        idSuffix: { type: String, default: '' }
    },
    mounted() {
        console.log(`CheckboxInput ${this.field.id} mounted - display_errors:`, this.display_errors, 'error:', this.error);
    },
    updated() {
        console.log(`CheckboxInput ${this.field.id} updated - display_errors:`, this.display_errors, 'error:', this.error);
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
.checkbox-input-wrapper {
    margin-top: var(--space-3);
}

.checkbox-container {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    cursor: pointer;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    transition: background var(--transition-fast);
}

.checkbox-container:hover:not(.checkbox-disabled) {
    background: var(--neutral-50);
}

.checkbox-disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.checkbox-native {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.checkbox-custom {
    position: relative;
    width: 22px;
    height: 22px;
    background: white;
    border: 2px solid var(--neutral-300);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    flex-shrink: 0;
}

.checkbox-icon {
    width: 16px;
    height: 16px;
    color: white;
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--transition-fast);
}

.checkbox-native:checked ~ .checkbox-custom {
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-dark) 100%);
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.checkbox-native:checked ~ .checkbox-custom .checkbox-icon {
    opacity: 1;
    transform: scale(1);
}

.checkbox-native:focus ~ .checkbox-custom {
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.checkbox-native.input-error ~ .checkbox-custom {
    border-color: var(--error);
}

.checkbox-native.input-error:focus ~ .checkbox-custom {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.checkbox-label {
    font-size: var(--text-base);
    color: var(--neutral-700);
    font-weight: var(--font-medium);
    user-select: none;
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
