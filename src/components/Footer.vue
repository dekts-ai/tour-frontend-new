<template>
  <section class="inner-content-section">
    <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
      <div class="background-color-sec">
        <div class="row footer-row align-items-center">
          <div class="col-md-6 text-start col-start">
            <p>© {{ new Date().getFullYear() }}. All Right Reserved</p>
          </div>
          <div class="col-md-6 text-end col-end">
            <p>Powered by Native American Tours </p>
            <img class="max-width" v-if="TourPackageLogo" :src="TourPackageLogo" style="max-width: 130px;">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Footer",
  props: ["iframeStatus", "TourPackageLogo"],
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  }
};
</script>
