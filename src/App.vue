<template>
  <Header :iframeStatus="iframeStatus" :TourPackageLogo="TourPackageLogo"></Header>
  <router-view></router-view>
  <Footer :iframeStatus="iframeStatus" :TourPackageLogo="TourPackageLogo"></Footer>
</template>

<script>
import { localForageService } from "@/store/localforage";
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
        iframeStatus: '',
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
    } else {
      this.iframeStatus = false;
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
