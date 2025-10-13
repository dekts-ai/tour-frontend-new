<template>
    <div class="input-wrapper">
        <select :id="id" v-model="internalValue" :disabled="!enabled" :required="field.required" class="select-input"
            :class="{ 'input-error': display_errors && error }"
            @change="$emit('update:value', internalValue); $emit('validate')" :aria-describedby="errorId">
            <option value="" disabled>Select an option</option>
            <option v-for="option in field.options" :key="option.id" :value="option.value">
                {{ option.label }}
                <template v-if="option.additional_fee && option.price"> - ${{ option.price }} ({{ field.unit_type ||
                    'N/A' }})</template>
            </option>
        </select>
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
.select-input {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.9375rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: white;
    color: var(--color-text-primary);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    padding-right: 2.5rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.select-input:focus {
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
