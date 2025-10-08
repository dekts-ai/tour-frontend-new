<template>
    <div class="modern-checkbox-group">
        <label class="checkbox-container" :for="id">
            <input 
                type="checkbox" 
                :id="id" 
                :checked="value"
                class="checkbox-input"
                @change="$emit('update:modelValue', $event.target.checked)"
            >
            <span class="checkbox-checkmark"></span>
            <span class="checkbox-label-text">
                <span v-if="required" class="required-indicator">*</span>
                <button v-if="showPolicy" type="button" class="policy-button" @click="$emit('click-policy')">
                    Terms and conditions
                </button>
                {{ label }}
            </span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'FormCheckbox',
    props: {
        label: { type: String, required: true },
        value: { type: Boolean, default: false },
        id: { type: String, required: true },
        required: { type: Boolean, default: false },
        showPolicy: { type: Boolean, default: false }
    }
};
</script>

<style scoped>
.modern-checkbox-group {
    margin-bottom: var(--space-3);
}

.checkbox-container {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    cursor: pointer;
    user-select: none;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkbox-checkmark {
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid var(--neutral-300);
    border-radius: var(--radius-md);
    background: white;
    transition: all var(--transition-base);
    flex-shrink: 0;
}

.checkbox-input:checked ~ .checkbox-checkmark {
    background: var(--primary-teal);
    border-color: var(--primary-teal);
}

.checkbox-input:checked ~ .checkbox-checkmark:after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox-input:focus ~ .checkbox-checkmark {
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.checkbox-label-text {
    font-size: var(--text-sm);
    color: var(--neutral-700);
}

.required-indicator {
    color: var(--primary-terracotta);
    margin-right: var(--space-1);
}

.policy-button {
    background: none;
    border: none;
    color: var(--primary-teal);
    text-decoration: underline;
    cursor: pointer;
    font-size: inherit;
    padding: 0;
    margin: 0 var(--space-1);
}

.policy-button:hover {
    color: var(--primary-teal-light);
}
</style>