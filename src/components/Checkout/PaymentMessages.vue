
<template>
  <div v-if="messages.length > 0" id="messages" class="alert alert-info">
    <p v-for="message in messages" :key="message"> 
        {{ message }} 
    </p>
  </div>
</template>

<script>
export default {
  name: "PaymentMessages",
  props: ["messages"],
  data() {
    return {}
  },
  methods:{ }
};
</script>