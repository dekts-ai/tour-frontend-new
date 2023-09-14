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
    <section class="inner-content-section mt-0">
        <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
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
        this.iframeStatus = this.$store.state.iframeStatus;
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

<style>
.deal-block .item-slide {margin-bottom: 24px;}
.item-slide .box-img {position: relative;height: 225px;}
.item-slide .box-img:before {content: ""; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); position: absolute;}
.item-slide .box-img img {width: 100%; height: 100%; object-fit: cover; object-position: center center;}
.item-slide .box-img .text-wrap {position: absolute; bottom: 0; z-index: 2; width: 100%; left: 0; text-align: left; padding: 10px 10px 15px;}
.item-slide .box-img .text-wrap h4 {font-size: 17px; color: #ffffff; line-height: 1.2; margin-bottom: 4px;}
.item-slide .box-img .text-wrap .desc {font-size: 14px; color: #fff; font-weight: 300; margin-bottom: 8px;}
.item-slide .box-img .text-wrap button {background: transparent; color: #ffffff; border: 1px solid #fff; border-radius: 3px; line-height: 1; vertical-align: middle; padding: 5px 12px; font-weight: 400;}
.item-slide .box-img .text-wrap button:hover, .item-slide .box-img .text-wrap button:focus {background: #fff; color: #000000;}
</style>