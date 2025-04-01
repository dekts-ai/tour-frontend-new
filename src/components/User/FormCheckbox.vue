<template>
    <div class="form-group mb-0">
        <div class="form-check text-start">
            <input class="form-check-input" type="checkbox" :id="id" :checked="value"
                @change="$emit('update:modelValue', $event.target.checked)">
            <label class="form-check-label ms-2" :for="id">
                <span v-if="required" class="required-star">*</span>
                <button v-if="showPolicy" class="cancelling-policy-title" @click="$emit('click-policy')">Terms and
                    conditions</button>
                {{ label }}
            </label>
        </div>
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