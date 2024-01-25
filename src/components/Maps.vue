<template>
    <section :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']" class="banner-section"
        v-bind:style="{ 'background-image': 'url(' + banner + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>

    <section class="tabs-section" v-if="iframeStatus">
        <div class="no-container">
            <div class="row">
                <div class="col-10">
                    <div class="tabs-wrap d-flex align-items-center">
                        <button @click="navigateToTab(1, 'Index')" :class="'tabs tab1 ' + (tabs == 1 ? 'active' : '')">Tours</button>
                        <button @click="navigateToTab(2, 'Init')" :class="'tabs tab2 ' + (tabs == 2 ? 'active' : '')">Schedule</button>
                        <button @click="navigateToTab(3, 'MyTrip')" :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')">My Trip</button>
						<button :class="'tabs tab4 ' + (tabs == 4 ? 'active' : '')">Maps</button>
						<button @click="navigateToTab(5, 'Checkout')" :class="'tabs tab5 ' + (tabs == 5 ? 'active' : '')">Checkout</button>
                    </div>
                </div>
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
                                <div class="row booking-row" v-if="iframeStatus == false">
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
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top" title="">Secured</button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top" title="">Health & Safety</button>
                                            <button @click="navigateToTab(5, 'Checkout')" class="btn btn-warning mt-2"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="tourlist-packages-wrap">
                                    <GMapMap
                                        :center="center"
                                        ref="mmm"
                                        :zoom="12"
                                        style="width: 100%; height: 400px"
                                    >
                                        <GMapMarker
                                            :key="index"
                                            v-for="(m, index) in markers"
                                            :ref="`marker${index}`"
                                            :position="m.position"
                                            :clickable="true"
                                            :icon="m.icon"
                                        />
                                    </GMapMap>

                                    <div class="tour-details-wrap">
                                        <div class="tour-details-title">Your Day:</div>
                                        <div class="d-lg-flex border-bottom pb-4 mb-4" v-for="item in cartItem" :key="item.tour_slot_id">
                                            <div class="details-box mb-3 mb-lg-0">
                                                <div class="title-wrap d-flex justify-content-between align-items-center">
                                                    <div class="tour-title">{{ item.package_name }}</div>
                                                    <div class="tour-time">{{ item.duration }} Tour</div>
                                                </div>
                                                <p class="date-time">{{ dateFormat(item.date) }} @ {{ item.time_date }}</p>
                                                <p class="details-text">{{ item.long_description }}</p>
                                            </div>
                                            <div class="tourselected-image">
                                                <img :src="item.package_image" :alt="item.package_name">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Datepicker from 'vuejs3-datepicker';
import { format } from 'date-fns';

export default {
    name: "GoogleMap",
    title: "Native American Tours",
    components: {
        Datepicker
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            banner: "",
            tenantId: "dixies",
            tourOperatorId: 1,
            cartItem: {},
            cartItemLength: 0,
            tabs: 4,
            center: {},
            markers: []
        };
    },
    async created() {
        this.date = format(this.$store.state.date, 'yyyy-MM-dd');
        this.tenantId = this.$store.state.tenantId;
        this.tourOperatorId = this.$store.state.tourOperatorId;
        this.iframeStatus = this.$store.state.iframeStatus;
        this.cartItem = this.$store.state.cartItem;
        this.cartItemLength = Object.values(this.cartItem).length;

        if (this.cartItemLength) {
            var k = 0;
            for (var key in this.cartItem) {
                var pId = parseInt(this.cartItem[key].package_id);
                this.checkPackageIds.push(pId);
                if (this.cartItem[key].latitude && this.cartItem[key].longitude) {
                    if (k == 0) {
                        this.center = { lat: Number(this.cartItem[key].latitude), lng: Number(this.cartItem[key].longitude) };
                    }
                    this.markers.push({
                        position: {
                            lat: Number(this.cartItem[key].latitude), lng: Number(this.cartItem[key].longitude)
                        }
                    });
                }
                k++;
            }
        }

        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        processLoader(loader) {
            loader.hide();
        },
        dateFormat(date) {
            this.$store.dispatch('storeDate', date);
            var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString("en-US", options)
        },
        navigateToTab(tab, destination) {
            if (tab === 1 || tab === 2 || tab === 3 || tab === 5) {
                this.handleTab(tab, destination);
            }
        },
        handleTab(tab, destination) {
            if (tab === 2) {
                this.$store.dispatch('storeFormData', null);
            }
            this.$store.dispatch('storeMindChange', 1);
            this.$router.push({ name: destination });
        }
    }
};
</script>
