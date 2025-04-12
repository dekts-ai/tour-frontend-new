<template>
    <p class="text-start mb-3 pe-3" v-if="errors.length">
        <b>Please correct the following error(s):</b>
    </p>
    <ul class="following-error">
        <li v-for="error in errors" :key="error" v-bind:class="{ 'text-danger': error }">
            {{ error }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ErrorList',
    props: {
        errors: { type: Array, default: () => [] }
    }
};
</script>