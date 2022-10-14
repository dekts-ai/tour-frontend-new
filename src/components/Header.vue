<template>
  <header class="header-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 text-center text-sm-center text-md-start">
          <a :href="`${basUrl}`">
            <img v-if="TourPackageLogo" class="max-width" :src="TourPackageLogo">
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { localForageService } from "@/store/localforage";

export default {
  name: 'Header',
  data() {
    return {
      TourPkgDetails: [],
      TourPackageLogo: null,
      basUrl: process.env.VUE_APP_BASE_URL,
    }
  },
  async created() {
    const lookup = await localForageService.getItem("TourPkgDetails");
    this.TourPkgDetails = JSON.parse(lookup);
    if (this.TourPkgDetails.length) {
      this.TourPackageLogo = this.TourPkgDetails[0].TourPackageLogo;
    }
  }
}
</script>

<style>
img.max-width {
  max-width: 150px;
}
</style>