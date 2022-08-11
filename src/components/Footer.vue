<template>
  <div class="row footer-row align-items-center">
    <div class="col-md-6 text-start col-start">
      <p>© {{ new Date().getFullYear() }}. All Right Reserved</p>
    </div>
    <div class="col-md-6 text-end col-end">
      <p>Powered by Native American Tours </p>
      <img v-if="TourPkgDetails[0].TourPackageLogo != ''" class="max-width" :src="`https://administrator.nativeamericantours.com/images/tour-operator/logo/${TourPkgDetails[0].TourPackageLogo}`" />
      <img v-else class="max-width" src="../assets/images/footer-logo.png" style="max-width: 130px;" />
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
