<template>
    <div class="form-group">
        <label :for="id" class="col-form-label">
            {{ label }} <span v-if="required" class="required-star">*</span>
        </label>
        <div class="field-icon-wrp" v-if="icon">
            <i :class="`fa ${icon}`" aria-hidden="true"></i>
        </div>
        <input :type="type" :id="id" :name="id" :value="modelValue" :placeholder="placeholder" class="form-control"
            @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        label: { type: String, required: true },
        modelValue: { type: String, default: '' }, // Use modelValue instead of value for v-model
        id: { type: String, required: true },
        type: { type: String, default: 'text' },
        placeholder: { type: String, default: '' },
        icon: { type: String, default: '' },
        required: { type: Boolean, default: false }
    }
};
</script>