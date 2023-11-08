<template>
  <Header :iframeStatus="iframeStatus" :TourOperatorLogo="TourOperatorLogo"></Header>
  <router-view></router-view>
  <Footer :iframeStatus="iframeStatus" :TourOperatorLogo="TourOperatorLogo"></Footer>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {getUTCDateFromTimeZone} from './utils/dateUtils';

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
      TourOperatorLogo: null,
      tenantId: 'dixies',
      tourOperatorId: 1,
      packageId: 0,
      affiliateId: 0,
      date: null
    }
  },
  async created() {
    let uri = window.location.search.substring(1);
    if (uri != '') {
      let params = new URLSearchParams(uri);
      this.iframeStatus = params.get("iframe") !== null ? params.get("iframe") : false;
      this.tenantId = params.get("tid") !== null ? params.get("tid") : 'dixies';
      this.tourOperatorId = params.get("oid") !== null ? params.get("oid") : 1;
      this.packageId = params.get("pid") !== null ? params.get("pid") : 0;
      this.affiliateId = params.get("aid") !== null ? params.get("aid") : 0;
    } else {
      this.iframeStatus = false;
    }

    this.$store.dispatch('storeTenantId', this.tenantId);
    this.$store.dispatch('storeTourOperatorId', this.tourOperatorId);
    this.$store.dispatch('storePackageId', this.packageId);
    this.$store.dispatch('storeAffiliateId', this.affiliateId);
    this.$store.dispatch('storeIframeStatus', this.iframeStatus);

    this.date = getUTCDateFromTimeZone();
    this.$store.dispatch('storeDate', this.date);

    axios.get("/tour-operator-logo/" + this.tourOperatorId).then((response) => {
      this.TourOperatorLogo = response.data.TourOperatorLogo;
    });
  }
};
</script>

<style>
#app {
  font-family: dovetail-mvb, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-style: normal;
}
</style>
