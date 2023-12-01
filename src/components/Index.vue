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
                <div class="row">
                    <div class="col-12">
                        <div :class="[iframeStatus ? 'row payment-row iframe-row' : 'row payment-row', '']">
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
                                            <button v-if="Object.keys(cartItem).length" @click="viewCart" class="btn btn-warning mt-2"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart ({{ Object.keys(cartItem).length }})</button>
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
                                                            <button @click="bookNow(tourPackage.tenant_id, tourPackage.TourOperatorId, tourPackage.TourPackageId)">Book Now</button>
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
import { format } from 'date-fns';

export default {
    name: "Index",
    title: "Native American Tours",
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            TourPkgDetails: [],
            banner: "",
            tenantId: "dixies",
            tourOperatorId: 1,
            packageId: 0,
            affiliateId: 0,
            date: null,
            cartItem: []
        };
    },
    async created() {
        var loader = this.$loading.show();
        this.date = format(this.$store.state.date, 'yyyy-MM-dd');
        this.tenantId = this.$store.state.tenantId;
        this.tourOperatorId = this.$store.state.tourOperatorId;
        this.packageId = this.$store.state.packageId;
        this.affiliateId = this.$store.state.affiliateId;
        this.iframeStatus = this.$store.state.iframeStatus;
        this.cartItem = this.$store.state.cartItem;

        if (this.packageId > 0) {
            this.$router.push("/initialize");
        }

        axios.get("/tour-package/" + this.date + "/" + this.tourOperatorId + "/" + this.packageId + "/" + this.affiliateId).then((response) => {
            this.$store.dispatch('storeTourPackage', response.data)
            var self = this;
            self.TourPkgDetails = response.data.TourPkgDetails;
            self.banner = self.TourPkgDetails[0].HeaderOne;
            self.processLoader(loader);
        });
    },
    methods: {
        bookNow(tid, oid, pid) {
            this.$store.dispatch('storeTenantId', tid);
            this.$store.dispatch('storeTourOperatorId', oid);
            this.$store.dispatch('storePackageId', pid);
            this.$router.push("/initialize");
        },
        viewCart() {
            this.$router.push("/payment");
        },
        processLoader: function (loader) {
            loader.hide();
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