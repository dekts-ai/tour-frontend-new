<template>
  <Header :iframeStatus="iframeStatus" :TourPackageLogo="TourPackageLogo"></Header>
  <router-view></router-view>
  <Footer :iframeStatus="iframeStatus" :TourPackageLogo="TourPackageLogo"></Footer>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {
        baseUrl: process.env.VUE_APP_BASE_URL,
        iframeStatus: false,
        TourPkgDetails: [],
        TourPackageLogo: null,
        packageId: 1,
        affiliateId: 0,
        year: null
    }
  },
  async created() {
    let uri = window.location.search.substring(1);
    if (uri != '') {
        let params = new URLSearchParams(uri);
        this.iframeStatus = params.get("iframe") !== null ? params.get("iframe") : false;
        this.packageId = params.get("pkg") !== null ? params.get("pkg") : 1;
        this.affiliateId = params.get("aid") !== null ? params.get("aid") : 0;
    } else {
      this.iframeStatus = false;
    }

    this.$store.dispatch('storePackageId', this.packageId);
    this.$store.dispatch('storeAffiliateId', this.affiliateId);
    this.$store.dispatch('storeIframeStatus', this.iframeStatus);

    var date = new Date();
    if (this.$store.state.date) {
      date = new Date(this.$store.state.date);
    } else if (localStorage.getItem("date") !== null) {
      date = new Date(localStorage.getItem('date'));
    }

    date = date.toLocaleString('en-US', {timeZone: 'US/Arizona'})
    this.year = date.split(',')[0].split('/')[2];
    this.$store.dispatch('storeYear', this.year);

    axios.get("/tour-package/" + this.year + "/" + this.packageId + "/" + this.affiliateId).then((response) => {
      this.$store.dispatch('storeTourPackage', response.data.TourPkgDetails);
      this.TourPkgDetails = response.data.TourPkgDetails;
      this.TourPackageLogo = this.TourPkgDetails[0].TourPackageLogo;
    });
  }
};
</script>

<style>
#app {
 font-family: dovetail-mvb,serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-style: normal;
}
</style>
