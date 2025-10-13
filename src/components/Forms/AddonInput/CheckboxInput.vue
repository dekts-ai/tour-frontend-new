<template>
    <div class="input-wrapper">
        <input type="checkbox" :id="id" v-model="internalValue" :disabled="!enabled" :required="field.required"
            class="checkbox-input" :class="{ 'input-error': display_errors && error }"
            @change="$emit('update:value', internalValue); $emit('validate')"
            :aria-invalid="display_errors && error ? 'true' : 'false'" :aria-describedby="errorId" />
        <div v-if="display_errors && error" class="error-message" :id="errorId">
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
.checkbox-input {
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    accent-color: var(--color-primary);
    cursor: pointer;
}
.checkbox-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}
.input-error { border-color: var(--color-terracotta); }
.error-message {
    margin-top: 0.25rem;
    color: var(--color-terracotta);
    font-size: 0.875rem;
}
</style>
