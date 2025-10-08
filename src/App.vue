<template>
        <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                        <component :is="Component" />
                </transition>
        </router-view>
        <Footer></Footer>
</template>

<script>
import axios from "axios";
import Footer from "@/components/Footer.vue";
import { getMomentTimezone } from './utils/dateUtils';

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

                // Check if any URL parameters exist
                const hasUrlParams = params.size > 0;

                // Load stored parameters from localStorage
                const storedParams = JSON.parse(localStorage.getItem('urlParams') || '{}');

                // Determine if URL specifies a single package (pid) or combo (cids)
                const hasPid = params.get("pid") !== null;
                const hasCids = params.get("cids") !== null;
                const hasAid = params.get("aid") !== null;

                // Use URL parameters if present, otherwise fall back to stored parameters or defaults
                this.tenantId = params.get("tid") !== null ? params.get("tid") : (storedParams.tenantId ?? null);
                this.$store.dispatch('storeTenantId', this.tenantId);

                this.tourOperatorId = params.get("oid") !== null ? parseInt(params.get("oid")) : (storedParams.tourOperatorId ?? 0);
                this.$store.dispatch('storeTourOperatorId', this.tourOperatorId);

                this.packageId = hasPid ? parseInt(params.get("pid")) : (hasCids ? 0 : (storedParams.packageId ?? 0));
                this.$store.dispatch('storePackageId', this.packageId);

                this.affiliateId = hasAid ? parseInt(params.get("aid")) : (hasUrlParams ? 0 : (storedParams.affiliateId ?? 0));
                this.$store.dispatch('storeAffiliateId', this.affiliateId);

                this.comboIds = hasCids ? params.get("cids") : (hasPid ? 0 : (storedParams.comboIds ?? 0));
                this.$store.dispatch('storeComboIds', this.comboIds);

                const response = await axios.get("/tour-operator-logo/" + this.tourOperatorId);
                this.timezone = response.data.timezone;
                this.$store.dispatch('storeTimezone', this.timezone);
                
                // Store tour operator logo and company name
                this.$store.dispatch('storeTourPackageLogo', {
                        logo: response.data.TourOperatorLogo,
                        name: response.data.name
                });

                // Determine date: use stored date if not in the past, otherwise use current date
                const today = getMomentTimezone(this.$store.state.timezone);
                const isDixies = this.$store.state.tenantId === 'dixies' && today.year() === 2025;
                const storedDate = storedParams.date ? storedParams.date : null;
                const currentDate = isDixies ? getMomentTimezone(this.$store.state.timezone, [2026, 0, 1]).format('YYYY-MM-DD') : getMomentTimezone(this.$store.state.timezone).format('YYYY-MM-DD');
                this.date = (storedDate && storedDate >= currentDate) ? storedDate : currentDate;
                this.$store.dispatch('storeDate', this.date);

                // Save parameters to localStorage
                localStorage.setItem('urlParams', JSON.stringify({
                        tenantId: this.tenantId,
                        tourOperatorId: this.tourOperatorId,
                        packageId: this.packageId,
                        affiliateId: this.affiliateId,
                        comboIds: this.comboIds,
                        date: this.date
                }));

                // Reset cartItem for non-combo URLs
                if (hasPid && !hasCids) {
                        this.$store.dispatch('storeCartItem', {});
                }
        }
};
</script>

<style>
@import './assets/css/design-system.css';
@import './assets/css/style.css';

#app {
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: var(--neutral-800);
        background: var(--neutral-50);
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
        transition: opacity var(--transition-base), transform var(--transition-base);
}

.fade-enter-from {
        opacity: 0;
        transform: translateY(10px);
}

.fade-leave-to {
        opacity: 0;
        transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
        opacity: 1;
        transform: translateY(0);
}
</style>
