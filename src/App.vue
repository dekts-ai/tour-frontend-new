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
    }
  },
  async created() {
    if (this.data != '' && this.data != null) {
      if (this.data.iframeStatusInfo == 'true') {
        this.iframeStatus = true;
      }
    }

    let uri = window.location.search.substring(1);
    if (uri != '') {
        let params = new URLSearchParams(uri);
        if (params.get("iframe") != null && params.get("iframe") == 'true') {
            this.iframeStatus = params.get("iframe");
        } else {
            this.iframeStatus = false;
        }
        var id = typeof params.get("pkg") !== 'undefined' ? params.get("pkg") : 1;

        axios.get("/tour-package/" + id + "").then((response) => {
          this.$store.dispatch('storeTourPkgDetails', response.data.TourPkgDetails);
          this.TourPkgDetails = response.data.TourPkgDetails;
          this.TourPackageLogo = this.TourPkgDetails[0].TourPackageLogo;
        });
    } else {
      this.iframeStatus = false;
      axios.get("/tour-package/" + 1 + "").then((response) => {
        this.$store.dispatch('storeTourPkgDetails', response.data.TourPkgDetails);
        this.TourPkgDetails = response.data.TourPkgDetails;
        this.TourPackageLogo = this.TourPkgDetails[0].TourPackageLogo;
      });
    }
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
