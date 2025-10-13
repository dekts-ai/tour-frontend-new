<template>
    <div class="input-wrapper">
        <input type="number" :id="id" v-model.number="internalValue" :min="field.min" :max="field.max"
            :disabled="!enabled" :required="field.required" class="input-number"
            :class="{ 'input-error': display_errors && error }"
            @input="$emit('update:value', internalValue); $emit('validate')" :aria-describedby="errorId"
            placeholder="Enter number" />
        <div v-if="display_errors && error" class="error-message" :id="errorId">
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
.input-wrapper { margin-top: 0.5rem; }
.input-number {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.9375rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: white;
    color: var(--color-text-primary);
    transition: border-color 0.2s, box-shadow 0.2s;
}
.input-number:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}
.input-error { border-color: var(--color-terracotta); }
.error-message {
    margin-top: 0.25rem;
    color: var(--color-terracotta);
    font-size: 0.875rem;
}
</style>
