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
        field: {
            type: Object,
            required: true
        },
        value: {
            type: [Number, String, null],
            default: null
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

.input-number {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: #ffffff;
    color: #1f2937;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-number:focus {
    outline: none;
    border-color: #3b82f6;
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