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

	<section class="tabs-section" v-if="iframeStatus">
		<div class="no-container">
			<div class="row">
				<div class="col-12">
					<div class="tabs-wrap d-flex align-items-center">
						<button @click="mindChange(1)" :class="'tabs tab1 ' + (tabs == 1 ? 'active' : '')">Tours</button>
						<button @click="mindChange(2)" :class="'tabs tab2 ' + (tabs == 2 ? 'active' : '')">Schedule</button>
						<button @click="mindChange(3)" :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')">Checkout</button>
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
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top"
                                                title="">Secured</button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top"
                                                title="">Health &
                                                Safety</button>
                                            <button v-if="Object.keys(cartItem).length && cartView == 1" @click="checkout" class="btn btn-warning mt-2"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout</button>
                                        </div>
                                    </div>
                                </div>
                                
			                    <div class="tourlist-packages-wrap">
                                    <div class="tourselected-packages-item" v-for="item in cartItem" :key="item.tour_slot_id">
                                        <div class="tourselected-inner-wrap">
                                            <div class="tourselected-inner">
                                                <div class="tourselected-detail">
                                                    <div class="tourselected-image">
                                                        <img :src="item.package_image" alt="package-item-image">
                                                    </div>
                                                    <div class="tourselected-title-wrap">
                                                        <div class="tourselected-title">{{ item.package_name }}</div>
                                                        <div class="tourselected-title-top">{{ dateFormat(item.date) }} @ {{ item.time_date }}</div>
                                                        <div class="what-bring-wrap">
                                                            <div class="what-bring-title">What to bring</div>
                                                            <ul>
                                                                <li>Bring water for hot days</li>
                                                                <li>Closed Toes Shoes</li>
                                                                <li>Ladder like staircases inside canyon</li>
                                                                <li>Dress appropriate for terrain and weather</li>
                                                                <li>Check the weather before tour</li>
                                                                <li>Know signs of dehydration</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tourselected-totalcost">
                                            <div class="tourselected-group-wrap">
                                                <div class="tourselected-group-title">Your selected group of people:</div>
                                                <div class="tourselected-group-people">
                                                    <div v-for="(pax, key) in item.people_group" :key="key">
                                                        <div class="tourselected-people" v-if="pax > 0">
                                                            <div class="tourselected-people-icon">
                                                                <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.07976 5.3184C5.3978 5.3184 6.46628 4.24991 6.46628 2.93187C6.46628 1.61383 5.3978 0.545349 4.07976 0.545349C2.76172 0.545349 1.69324 1.61383 1.69324 2.93187C1.69324 4.24991 2.76172 5.3184 4.07976 5.3184Z" fill="#4C76B2"/><path d="M5.6879 6.11444H2.47167C1.94894 6.11507 1.44781 6.323 1.07819 6.69263C0.708563 7.06225 0.500632 7.56338 0.5 8.08611L0.5 10.092H7.65957V8.08611C7.65894 7.56338 7.45101 7.06225 7.08139 6.69263C6.71176 6.323 6.21063 6.11507 5.6879 6.11444V6.11444Z" fill="#4C76B2"/></svg>
                                                            </div>
                                                            <div class="tourselected-people-title">{{ item.rate_group[key] }}</div>
                                                            <div class="tourselected-people-count"><input type="text" name="count" :disabled="true" :value="pax"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="tourselected-costcount-title">Tour cost:</div>
                                            <div class="tourselected-costcount-subitem">
                                                <div class="tourselected-costcount-subitem-title">Subtotal:</div>
                                                <div class="tourselected-costcount-subitem-cost">${{ Number(item.subtotal).toFixed(2) }}</div>
                                            </div>
                                            <div class="tourselected-costcount-subitem" v-if="item?.discount2_value > 0">
                                                <div class="tourselected-costcount-subitem-title">Discount:</div>
                                                <div class="tourselected-costcount-subitem-cost">
                                                    <span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span>
                                                    ${{ item?.discount2_value ? Number(item?.discount2_value).toFixed(2) : Number(0).toFixed(2) }}
                                                </div>
                                            </div>
                                            <div class="tourselected-costcount-subitem">
                                                <div class="tourselected-costcount-subitem-title">Booking Fees:</div>
                                                <div class="tourselected-costcount-subitem-cost">${{ Number(item.fees).toFixed(2) }}</div>
                                            </div>
                                            <div class="tourselected-costcount-total">
                                                <div class="tourselected-costcount-total-title">Tour Cost:</div>
                                                <div class="tourselected-costcount-total-cost">${{ Number(item.total).toFixed(2) }}</div>
                                            </div>

                                            <div class="tourselected-edit-wrap">
                                                <div class="tourselected-action-wrap">
                                                    <div class="tourselected-action-btn">
                                                        <a class="action-btn action-btn-edit" @click="editPackage(item)">Edit</a>
                                                    </div>
                                                    <div class="tourselected-action-btn">
                                                        <a class="action-btn action-btn-delete" @click="removeFromCart(item)">Delete</a>
                                                    </div>
                                                    <div class="tourselected-action-btn">
                                                        <a class="action-btn action-btn-checkout" @click="checkout(item)">Checkout</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-for="tourPackage in TourPkgDetails" :key="TourPkgDetails.id">
                                        <div class="tourselected-packages-item remaining-packages-list" v-if="checkPackageIds.includes(tourPackage.TourPackageId) == false">
                                            <div class="tourselected-inner-wrap">
                                                <div class="tourselected-inner">
                                                    <div class="tourselected-detail">
                                                        <div class="tourselected-image"><img :src="tourPackage.FrontendPackageImage" :alt="tourPackage.TourPkgName"></div>
                                                        <div class="tourselected-title-wrap">
                                                            <div class="tourselected-title">{{ tourPackage.TourPkgName }}</div>
                                                            <div class="tourselected-title-top">{{ tourPackage.TourPkgDuration }}</div>
                                                            
                                                            <div class="what-bring-wrap">
                                                                <p>{{ tourPackage.TourPkgShortDesc }}</p>
                                                            </div>

                                                            <div class="tourselected-action-btn">
                                                                <button class="action-btn action-btn-addmore" @click="bookNow(tourPackage.tenant_id, tourPackage.TourOperatorId, tourPackage.TourPackageId)">+ Add more packages</button>
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
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
import { format } from 'date-fns';

export default {
    name: "Index",
    title: "Native American Tours",
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            cartView: 0,
            TourPkgDetails: [],
            banner: "",
            tenantId: "dixies",
            tourOperatorId: 1,
            packageId: 0,
            affiliateId: 0,
            date: null,
            cartItem: {},
            cartItemLength: 0,
            subtotal: 0,
            discount: 0,
            fees: 0,
            total: 0,
            tabs: 1,
            checkPackageIds: []
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
        this.cartView = this.$store.state.tourPackage?.cartView;
        this.cartItem = this.$store.state.cartItem;
        this.cartItemLength = Object.values(this.cartItem).length;

        if (this.cartItemLength) {
            for (var key in this.cartItem) {
                var pId = parseInt(this.cartItem[key].package_id);
                this.checkPackageIds.push(pId);
            }
        }

        if (this.packageId > 0 && this.$store.state.mindChange == 0) {
            this.processLoader(loader);

            this.$router.push({
                name: "Init"
            });

            return;
        }

        if (this.$store.state.mindChange == 1) {
            this.packageId = 0;
            this.affiliateId = 0;
        }

        axios.get("/tour-package/" + this.date + "/" + this.tourOperatorId + "/" + this.packageId + "/" + this.affiliateId).then((response) => {
            this.$store.dispatch('storeTourPackage', response.data)
            var self = this;
            self.TourPkgDetails = response.data.TourPkgDetails;
            self.banner = self.TourPkgDetails[0].HeaderOne;
            self.processLoader(loader);
        });

        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        bookNow(tid, oid, pid) {
            this.$store.dispatch('storeTenantId', tid);
            this.$store.dispatch('storeTourOperatorId', oid);
            this.$store.dispatch('storePackageId', pid);
            this.$store.dispatch('storeFormData', null);

            this.$router.push({
                name: 'Init'
            });
        },
        mindChange(tab) {
            if (tab == 1) {
                return;
            }

            if (tab == 2) {
                this.$store.dispatch('storeMindChange', 1);
                this.$store.dispatch('storeFormData', null);
                this.$router.push({
                    name: 'Init'
                });

                return;
            }

            if (tab == 3 && Object.keys(this.cartItem).length) {
                this.$store.dispatch('storeMindChange', 1);
                this.$router.push({
                    name: 'Checkout'
                });

                return;
            } else {
                Swal.fire({
                    toast: true,
                    title: "Info!",
                    html: "In order to proceed with checkout, please select package.",
                    icon: "info"
                });
            }
        },
        editPackage(formData) {
            if (formData.affiliate_id) {
                this.$store.dispatch('storeAffiliateId', formData.affiliate_id)
            }

            this.$store.dispatch('storeFormData', formData)
            this.$store.dispatch('storePackageId', formData.package_id)
            this.$store.dispatch('storeDate', formData.date)

            this.$router.push({
                name: 'Init',
            });
        },
        removeFromCart(formData) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.checkPackageIds = [];
                    delete this.cartItem[formData.tour_slot_id];
                    this.cartItemLength = Object.values(this.cartItem).length;

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your package has been deleted.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed && this.cartItemLength == 0) {
                            this.$store.dispatch('storeCartItem', {});
                        }
                    });

                    this.subtotal = 0;
                    this.discount = 0;
                    this.fees = 0;
                    this.total = 0;
                    if (this.cartItemLength) {
                        for (var key in this.cartItem) {
                            this.subtotal = Number(this.subtotal) + Number(this.cartItem[key].subtotal);
                            this.discount = Number(this.discount) + Number(this.cartItem[key].discount2_value);
                            this.fees = Number(this.fees) + Number(this.cartItem[key].fees);
                            this.total = Number(this.total) + Number(this.cartItem[key].total);

                            var pId = parseInt(this.cartItem[key].package_id);
                            this.checkPackageIds.push(pId);
                        }
                    }
                }
            });
        },
        checkout() {
            this.$router.push({
                name: 'Checkout'
            });

            return;
        },
        processLoader(loader) {
            loader.hide();
        },
        dateFormat(date) {
            this.$store.dispatch('storeDate', date);
            var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString("en-US", options)
        },
        roundout(amount, places = 0) {
            if (places < 0) {
                places = 0;
            }

            let x = Math.pow(10, places);
            let formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        }
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