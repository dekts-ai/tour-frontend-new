<template>
    <div class="form-group form-textarea-wrap">
        <label :for="id" class="col-form-label">{{ label }}</label>
        <textarea :id="id" :name="id" :value="modelValue" :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"></textarea>
    </div>
</template>

<script>
export default {
    name: 'FormTextarea',
    props: {
        label: { type: String, required: true },
        modelValue: { type: String, default: '' }, // Use modelValue instead of value
        id: { type: String, default: 'textarea' },
        placeholder: { type: String, default: '' }
    }
};
</script>