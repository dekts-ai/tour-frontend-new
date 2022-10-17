<template>
  <header class="header-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 text-center text-sm-center text-md-start">
          <a :href="`${baseUrl}`">
            <img v-if="TourPackageLogo" class="max-width" :src="TourPackageLogo">
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ["TourPackageLogo"],
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