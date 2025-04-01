<template>
    <p class="text-start mb-3 pe-3" v-if="errors.length">
        <b>Please correct the following error(s):</b>
    <ul class="following-error">
        <li v-for="(error, index) in errors" :key="index" class="text-danger">{{ error }}</li>
    </ul>
    </p>
</template>

<script>
export default {
    name: 'ErrorList',
    props: {
        errors: { type: Array, default: () => [] }
    }
};
</script>