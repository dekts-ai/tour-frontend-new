<template>
    <label :for="id" :class="className">
        {{ (req) ? " * " : " "}}
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: "FormLabel",
    props: {
        className: { type: String, default:" "  },
        id: { type: String, default:""  },
        req: { type: Boolean, default: false }
    }
}
</script>