<template>
    <div class="form-group">
        <label for="phonenumber" class="col-form-label">
            {{ label }} <span v-if="required" class="required-star">*</span>
        </label>
        <div class="phone-wrap">
            <IntPhoneNumber :current_phone_number="value" :current_phone_code="phoneCode"
                @onphoneupdate="$emit('update', $event)" />
            <input type="hidden" id="phonenumber" :value="value" />
            <input type="hidden" id="phonecode" :value="phoneCode" />
        </div>
    </div>
</template>

<script>
import IntPhoneNumber from './../Forms/IntPhoneNumber.vue'; // Adjust path as needed

export default {
    name: 'FormPhone',
    components: { IntPhoneNumber },
    props: {
        label: { type: String, required: true },
        value: { type: String, default: '' },
        phoneCode: { type: String, default: '+1' },
        required: { type: Boolean, default: false }
    }
};
</script>