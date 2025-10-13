<template>
    <div class="addon-field-wrapper" :class="{ 'nested-field': isNested }">
        <div v-if="field.type === 'number'" class="form-group">
            <label :class="{ 'required': field.required }">
                {{ field.label }}
                <span v-if="field.description" class="field-description">{{ field.description }}</span>
            </label>
            <input 
                type="number" 
                :min="field.min || 0"
                :max="field.max"
                :value="value"
                @input="handleInput($event.target.value)"
                :required="field.required"
                class="form-control" />
        </div>

        <div v-else-if="field.type === 'text'" class="form-group">
            <label :class="{ 'required': field.required }">
                {{ field.label }}
                <span v-if="field.description" class="field-description">{{ field.description }}</span>
            </label>
            <input 
                type="text" 
                :value="value"
                @input="handleInput($event.target.value)"
                :required="field.required"
                class="form-control" />
        </div>

        <div v-else-if="field.type === 'textbox'" class="form-group">
            <label :class="{ 'required': field.required }">
                {{ field.label }}
                <span v-if="field.description" class="field-description">{{ field.description }}</span>
            </label>
            <textarea 
                :value="value"
                @input="handleInput($event.target.value)"
                :required="field.required"
                rows="4"
                class="form-control"></textarea>
        </div>

        <div v-else-if="field.type === 'checkbox'" class="form-group checkbox-group">
            <label class="checkbox-label">
                <input 
                    type="checkbox" 
                    :checked="value"
                    @change="handleInput($event.target.checked)"
                    :required="field.required" />
                <span>{{ field.label }}</span>
                <span v-if="field.description" class="field-description">{{ field.description }}</span>
            </label>
        </div>

        <div v-else-if="field.type === 'radio'" class="form-group radio-group">
            <label :class="{ 'required': field.required }">
                {{ field.label }}
                <span v-if="field.description" class="field-description">{{ field.description }}</span>
            </label>
            <div class="radio-options">
                <label v-for="option in field.options" :key="option.id" class="radio-option">
                    <input 
                        type="radio" 
                        :name="`field-${field.id}`"
                        :value="option.value"
                        :checked="value === option.value"
                        @change="handleInput(option.value, option)"
                        :required="field.required" />
                    <span>{{ option.label }}</span>
                </label>
            </div>
        </div>

        <div v-else-if="field.type === 'dropdown'" class="form-group">
            <label :class="{ 'required': field.required }">
                {{ field.label }}
                <span v-if="field.description" class="field-description">{{ field.description }}</span>
            </label>
            <select 
                :value="value"
                @change="handleInput($event.target.value, field.options.find(o => o.value === $event.target.value))"
                :required="field.required"
                class="form-control">
                <option value="">Select an option</option>
                <option v-for="option in field.options" :key="option.id" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddonField',
    props: {
        field: {
            type: Object,
            required: true
        },
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        isNested: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleInput(newValue, option = null) {
            this.$emit('update', {
                fieldId: this.field.id,
                value: newValue,
                option: option,
                field: this.field
            });
        }
    }
};
</script>

<style scoped>
.addon-field-wrapper {
    margin-bottom: 1.5rem;
}

.nested-field {
    margin-left: 2rem;
    padding-left: 1rem;
    border-left: 3px solid var(--color-primary);
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
}

.form-group label.required::after {
    content: ' *';
    color: var(--color-terracotta);
}

.field-description {
    display: block;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
}

.form-control {
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    font-size: 0.9375rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.checkbox-group {
    padding: 0.5rem 0;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
    margin-top: 0.25rem;
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
}

.radio-group .radio-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    transition: background-color 0.2s;
}

.radio-option:hover {
    background-color: var(--color-background);
}

.radio-option input[type="radio"] {
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
}
</style>
