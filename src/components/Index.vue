<template>
    <section :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']"
        class="banner-section"
        v-bind:style="{ 'background-image': 'url(' + banner + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>
    <section class="inner-content-section">
        <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
            <div class="background-color-sec">
                <div class="row payment-row">
                    <div class="col-12">
                        <div class="row booking-row">
                            <div class="col-lg-6 col-md-12">
                                <div class="booking">
                                    <h2>Book Online</h2>
                                    <div class="confirmation">
                                        <img src="../assets/images/confirmation.png">
                                        <p>Get Instant Confirmation</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                <div class="info">
                                    <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top"
                                        title="">Secured</button>
                                    <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top"
                                        title="">Health &
                                        Safety</button>
                                </div>
                            </div>
                        </div>
                        <form @submit.prevent="submit">
                            <div class="row starttime-row">
                                <div v-for="tourPackage in TourPkgDetails" :key="TourPkgDetails.id" class="col-lg-4 col-md-4 col-sm-6 col-xs-12 deal deal-block">
                                    <div class="item-slide">
                                        <div class="box-img">
                                            <img :src="tourPackage.FrontendPackageImage"
                                                :alt="tourPackage.TourPkgName" />
                                            <div class="text-wrap">
                                                <h4>{{ tourPackage.TourPkgName }}</h4>
                                                <div class="desc">
                                                    <span>{{ tourPackage.TourPkgDuration }}</span>
                                                </div>
                                                <div class="book-now-c">
                                                    <button @click="bookNow(tourOperatorId, tourPackage.TourPackageId)">Book Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Datepicker from 'vuejs3-datepicker';

export default {
    name: "Index",
    title: "Native American Tours",
    components: {
        Datepicker
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            TourPkgDetails: [],
            banner: "",
            tourOperatorId: 1,
            packageId: 0,
            affiliateId: 0,
            year: null
        };
    },
    async created() {
        this.year = this.$store.state.year;
        this.tourOperatorId = this.$store.state.tourOperatorId;
        this.packageId = this.$store.state.packageId;
        if (this.packageId > 0) {
            this.$router.push("/initialize");
        }
        this.affiliateId = this.$store.state.affiliateId;

        axios.get("/tour-package/" + this.year + "/" + this.tourOperatorId + "/" + this.packageId + "/" + this.affiliateId).then((response) => {
            var self = this;
            self.TourPkgDetails = response.data.TourPkgDetails;
            self.banner = self.TourPkgDetails[0].HeaderOne;
        });
    },
    methods: {
        bookNow(oid, pid) {
            this.$store.dispatch('storeTourOperatorId', oid);
            this.$store.dispatch('storePackageId', pid);
            this.$router.push("/initialize");
        },
    }
};
</script>