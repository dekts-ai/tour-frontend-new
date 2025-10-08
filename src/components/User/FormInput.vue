<template>
    <div class="modern-form-group">
        <label :for="id" class="modern-form-label">
            {{ label }} <span v-if="required" class="required-indicator">*</span>
        </label>
        <div class="input-wrapper">
            <div v-if="icon" class="input-icon">
                <i :class="`fa ${icon}`" aria-hidden="true"></i>
            </div>
            <input 
                :type="type" 
                :id="id" 
                :name="id" 
                :value="modelValue" 
                :placeholder="placeholder" 
                class="modern-form-input"
                @input="$emit('update:modelValue', $event.target.value)"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        label: { type: String, required: true },
        modelValue: { type: String, default: '' },
        id: { type: String, required: true },
        type: { type: String, default: 'text' },
        placeholder: { type: String, default: '' },
        icon: { type: String, default: '' },
        required: { type: Boolean, default: false }
    }
};
</script>

<style scoped>
.modern-form-group {
    margin-bottom: var(--space-4);
}

.modern-form-label {
    display: block;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--neutral-700);
    margin-bottom: var(--space-2);
}

.required-indicator {
    color: var(--primary-terracotta);
    margin-left: var(--space-1);
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--neutral-500);
}

.modern-form-input {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    transition: all var(--transition-base);
}

.input-wrapper:has(.input-icon) .modern-form-input {
    padding-left: var(--space-10);
}

.modern-form-input:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}
</style>