<template>
	<router-view></router-view>
	<Footer></Footer>
</template>

<script>
import axios from "axios";
import Footer from "@/components/Footer.vue";
import { getUTCDateFromTimeZone } from './utils/dateUtils';

export default {
	name: "App",
	title: "Native American Tours",
	components: {
		Footer
	},
	data() {
		return {
			iframeStatus: true,
			tenantId: null,
			tourOperatorId: 0,
			packageId: 0,
			affiliateId: 0,
			comboIds: 0,
			date: null,
			timezone: "America/Phoenix"
		}
	},
	async created() {
		// Parse URL parameters
		let uri = window.location.search.substring(1);
		let params = new URLSearchParams(uri);

		// Load stored parameters from localStorage
		const storedParams = JSON.parse(localStorage.getItem('urlParams') || '{}');

		// Determine if URL specifies a single package (pid) or combo (cids)
		const hasPid = params.get("pid") !== null;
		const hasCids = params.get("cids") !== null;

		// Use URL parameters if present, otherwise fall back to stored parameters or defaults
		this.tenantId = params.get("tid") !== null ? params.get("tid") : (storedParams.tenantId ?? null);
		this.tourOperatorId = params.get("oid") !== null ? parseInt(params.get("oid")) : (storedParams.tourOperatorId ?? 0);
		this.packageId = hasPid ? parseInt(params.get("pid")) : (hasCids ? 0 : (storedParams.packageId ?? 0));
		this.affiliateId = params.get("aid") !== null ? parseInt(params.get("aid")) : (storedParams.affiliateId ?? 0);
		this.comboIds = hasCids ? params.get("cids") : (hasPid ? 0 : (storedParams.comboIds ?? 0));

		axios.get("/tour-operator-logo/" + this.tourOperatorId).then((response) => {
			this.timezone = response.data.timezone;
		});

		// Determine date: use stored date if not in the past, otherwise use current date
		const storedDate = storedParams.date ? new Date(storedParams.date) : null;
		const currentDate = getUTCDateFromTimeZone(this.timezone);
		this.date = (storedDate && storedDate >= currentDate) ? storedDate : currentDate;

		// Save parameters to localStorage
		localStorage.setItem('urlParams', JSON.stringify({
			tenantId: this.tenantId,
			tourOperatorId: this.tourOperatorId,
			packageId: this.packageId,
			affiliateId: this.affiliateId,
			comboIds: this.comboIds,
			date: this.date
		}));

		// Store parameters in Vuex
		this.$store.dispatch('storeTenantId', this.tenantId);
		this.$store.dispatch('storeTourOperatorId', this.tourOperatorId);
		this.$store.dispatch('storePackageId', this.packageId);
		this.$store.dispatch('storeAffiliateId', this.affiliateId);
		this.$store.dispatch('storeComboIds', this.comboIds);
		this.$store.dispatch('storeIframeStatus', this.iframeStatus);
		this.$store.dispatch('storeDate', this.date);
		this.$store.dispatch('storeTimezone', this.timezone);

		// Reset cartItem for non-combo URLs
		if (hasPid && !hasCids) {
			this.$store.dispatch('storeCartItem', {});
		}
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
