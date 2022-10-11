<template>
  <div class="row footer-row align-items-center">
    <div class="col-md-6 text-start col-start">
      <p>© {{ new Date().getFullYear() }}. All Right Reserved</p>
    </div>
    <div class="col-md-6 text-end col-end">
      <p>Powered by Native American Tours </p>
      <img class="max-width" :src="TourPkgDetails[0].TourPackageLogo" style="max-width: 130px;">
    </div>
  </div>
</template>

<script>
var TourPkgDetailsData = localStorage.getItem("TourPkgDetails");
const unwrapped = JSON.parse(TourPkgDetailsData);
export default {
  name: "Footer",
  data() {
    return {
      TourPkgDetails: unwrapped,
    }
  },
};
</script>
