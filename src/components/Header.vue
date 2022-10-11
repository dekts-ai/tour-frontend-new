<template>
  <header class="header-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 text-center text-sm-center text-md-start">
          <a :href="`${basUrl}`">
            <img class="max-width" :src="TourPkgDetails[0].TourPackageLogo">
          </a>
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
      basUrl: process.env.VUE_APP_BASE_URL,
    }
  }
}
</script>

<style>
img.max-width {
  max-width: 150px;
}
</style>