<template>
  <header class="header-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 text-center text-sm-center text-md-start">
          <img class="max-width" :src="TourPkgDetails[0].TourPackageLogo">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
var TourPkgDetailsData = localStorage.getItem("TourPkgDetails");
const unwrapped = JSON.parse(TourPkgDetailsData);

export default {
  name: 'Header',
  data() {
    return {
      TourPkgDetails: unwrapped,
      CurrentURL: '',
    }
  },
  beforeMount() {
    var CurrentURL = localStorage.getItem("CurrentURL");
    this.CurrentURL = CurrentURL;
  },
}
</script>

<style>
img.max-width {
  max-width: 150px;
}
</style>