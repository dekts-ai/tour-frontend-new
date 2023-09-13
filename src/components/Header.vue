<template>
  <header v-if="iframeStatus == false" class="header-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 text-center text-sm-center text-md-start">
          <a :href="`${baseUrl}`">
            <img v-if="TourOperatorLogo" class="max-width" :src="TourOperatorLogo">
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ["iframeStatus", "TourOperatorLogo"],
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  }
}
</script>

<style>
img.max-width {
  max-width: 150px;
}
</style>