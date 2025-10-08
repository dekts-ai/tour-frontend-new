<template>
    <div class="modern-textarea-group">
        <label :for="id" class="modern-textarea-label">{{ label }}</label>
        <textarea 
            :id="id" 
            :name="id" 
            :value="modelValue" 
            :placeholder="placeholder"
            class="modern-textarea"
            @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: 'FormTextarea',
    props: {
        label: { type: String, required: true },
        modelValue: { type: String, default: '' },
        id: { type: String, default: 'textarea' },
        placeholder: { type: String, default: '' }
    }
};
</script>

<style scoped>
.modern-textarea-group {
    margin-bottom: var(--space-4);
}

.modern-textarea-label {
    display: block;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--neutral-700);
    margin-bottom: var(--space-2);
}

.modern-textarea {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
    transition: all var(--transition-base);
}

.modern-textarea:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}
</style>