<template>
       <header class="header-section">
         <div class="container">
            <div class="row align-items-center">
               <div class="col-md-12 text-center text-sm-center text-md-start">
                  <a :href="`${CurrentURL}`">
                      <img v-if="TourPkgDetails[0].TourPackageLogo != ''" class="max-width" :src="`https://administrator.nativeamericantours.com/images/tour-operator/logo/${TourPkgDetails[0].TourPackageLogo}`">
                      <img v-else class="max-width" src="../assets/images/logo.png">
                  </a>
                  <!-- <a type="application/javascript" defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></a>
                  <a type="application/javascript" defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></a>
                  <a type="application/javascript" defer src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></a>
                  <a type="application/javascript" defer src="../assets/js/custom.js"></a> -->
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
        CurrentURL : '',
    }
  },
  beforeMount(){
    var CurrentURL = localStorage.getItem("CurrentURL");
    this.CurrentURL = CurrentURL;                    
  },
}
</script>

<style>
img.max-width{max-width: 150px;}


</style>