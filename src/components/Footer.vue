<template>
  <div class="row footer-row align-items-center">
    <div class="col-md-6 text-start col-start">
      <p>© {{ new Date().getFullYear() }}. All Right Reserved</p>
    </div>
    <div class="col-md-6 text-end col-end">
      <p>Powered by Native American Tours </p>
      <img class="max-width" v-if="TourPackageLogo" :src="TourPackageLogo" style="max-width: 130px;">
    </div>
  </div>
</template>

<script>
import { localForageService } from "@/store/localforage";

export default {
  name: "Footer",
  data() {
    return {
      TourPkgDetails: [],
      TourPackageLogo: null,
    }
  },
  async created() {
    const lookup = await localForageService.getItem("TourPkgDetails");
    this.TourPkgDetails = JSON.parse(lookup);
    if (this.TourPkgDetails.length) {
      this.TourPackageLogo = this.TourPkgDetails[0].TourPackageLogo;
    }
  }
};
</script>
