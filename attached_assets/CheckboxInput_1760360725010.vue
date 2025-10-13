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
        field: {
            type: Object,
            required: true
        },
        value: {
            type: Boolean,
            default: false
        },
        enabled: {
            type: Boolean,
            default: true
        },
        display_errors: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ''
        },
        idSuffix: {
            type: String,
            default: ''
        }
    },
    computed: {
        id() {
            return `field-${this.field.id}${this.idSuffix}`;
        },
        errorId() {
            return `error-field-${this.field.id}${this.idSuffix}`;
        },
        internalValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('update:value', newValue);
            }
        }
    }
};
</script>

<style scoped>
/* Fallback Scoped CSS */
.input-wrapper {
    margin-top: 8px;
}

.checkbox-input {
    width: 20px;
    height: 20px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    accent-color: #3b82f6;
    cursor: pointer;
}

.checkbox-input:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
}

.input-error {
    border-color: #ef4444;
}

.error-message {
    margin-top: 4px;
    color: #ef4444;
    font-size: 12px;
}
</style>