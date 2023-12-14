<template>
  <section :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']"
    v-for="TourPkgDetails in details.TourPkgDetails" :key="TourPkgDetails.pkg_rate_id" class="banner-section"
    v-bind:style="{ 'background-image': 'url(' + TourPkgDetails.HeaderOne + ')' }">
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
						<button :class="'tabs tab1 ' + (tabs == 1 ? 'active' : '')" :disabled="tabs != 1">Tours</button>
						<button :class="'tabs tab2 ' + (tabs == 2 ? 'active' : '')" :disabled="tabs != 2">Schedule</button>
						<button :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')" :disabled="tabs != 3">My Trip</button>
						<button :class="'tabs tab4 ' + (tabs == 4 ? 'active' : '')" :disabled="tabs != 4">Checkout</button>
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
                        <img src="../assets/images/confirmation.png" />
                        <p>Get Instant Confirmation</p>
                      </div>
                    </div>
                  </div>
                  <div class="
                      col-lg-6 col-md-12
                      text-center text-lg-end text-md-center text-sm-center
                    ">
                    <div class="info">
                      <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top"
                        title="">
                        Secured
                      </button>
                      <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top"
                        title="">
                        Health & Safety
                      </button>
                      <button @click="mindChange" class="btn btn-primary mt-2"><i class="fa fa-arrow-left" aria-hidden="true"></i> Home</button>
                    </div>
                  </div>
                </div>
                <div class="m-2">
	                <h4 class="mx-auto my-2">Your Trip Items</h4>
                  <div class="tour-packages-wrap">
                    <div class="tour-packages-item" v-for="item in cartItem" :key="item.tour_slot_id">
                      <div class="tour-packages-inner-wrap">
                        <div class="tour-packages-inner">
                          <div class="tour-packages-detail">
                            <div class="tour-packages-image"><img :src="item.package_image" alt="package-item-image"></div>
                            <div class="tour-packages-title-wrap">
                              <div class="tour-packages-title-top">{{ dateFormat(item.date) }} @ {{ item.time_date }}</div>
                              <div class="tour-packages-title">{{ item.package_name }}</div>
                              <!-- <div class="cancelling-policy-wrap">
                                <button class="cancelling-policy-title" @click="openPolicy()">Terms and conditions</button>
                              </div> -->
                            </div>
                          </div>
                          <div class="tour-packages-group-wrap">
                            <div class="tour-packages-group-title">Your selected group of people:</div>
                            <div class="tour-packages-group-people">
                              <div v-for="(pax, key) in item.people_group" :key="key">
                                <div class="tour-packages-selected-people" v-if="pax > 0">
                                  <div class="tour-packages-selected-people-icon">
                                    <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.07976 5.3184C5.3978 5.3184 6.46628 4.24991 6.46628 2.93187C6.46628 1.61383 5.3978 0.545349 4.07976 0.545349C2.76172 0.545349 1.69324 1.61383 1.69324 2.93187C1.69324 4.24991 2.76172 5.3184 4.07976 5.3184Z" fill="#4C76B2"/><path d="M5.6879 6.11444H2.47167C1.94894 6.11507 1.44781 6.323 1.07819 6.69263C0.708563 7.06225 0.500632 7.56338 0.5 8.08611L0.5 10.092H7.65957V8.08611C7.65894 7.56338 7.45101 7.06225 7.08139 6.69263C6.71176 6.323 6.21063 6.11507 5.6879 6.11444V6.11444Z" fill="#4C76B2"/></svg>
                                  </div>
                                  <div class="tour-packages-selected-people-title">{{ item.rate_group[key] }}</div>
                                  <div class="tour-packages-selected-people-count"><input type="text" name="count" :disabled="true" :value="pax"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="item.hotel_id" class="col-12 mb-4 hotel-section" style="font-size: 12px;">
                          <div class="hotel-wrapper d-sm-flex">
                            <div class="hotel-image">
                              <img :src="item.hotel_image" :alt="item.hotel_name">
                            </div>
                            <div class="hotel-detail w-100">
                              <div class="hotel-title">Hotel Pickup Location:</div>
                              <div class="hotel-name">{{ item.hotel_name }}</div>
                              <div class="hotel-detail-address">{{ item.hotel_address }}</div>
                            </div>
                          </div>
                        </div>
                        <div class="tour-packages-edit-wrap">
                          <div class="tour-packages-action-wrap">
                            <div class="tour-packages-action-btn">
                              <a class="action-btn action-btn-edit pe-auto" @click="mindChange(item)">Edit</a>
                            </div>
                            <div class="tour-packages-action-btn">
                              <a class="action-btn action-btn-edit pe-auto" @click="removeFromCart(item)">Delete</a>
                            </div>
                          </div>
                          <div class="tour-packages-couponcode-wrap">
                            <div class="tour-packages-couponcode">
                              <input type="text" name="couponcode" placeholder="Promo Code" v-model="item.code" :id="'couponCode-' + item.tour_slot_id" @keyup="addCouponCode(item)">
                              <button class="couponcode-apply-btn ms-1" :class="item?.code ? 'btn-success' : 'btn-primary'" :disabled="item?.code ? true : false" :id="'applyCouponButton-' + item.tour_slot_id" @click="applyCoupon(item)">{{ item?.code ? 'Applied' : 'Apply' }}</button>
                            </div>
                            <p v-if="item?.couponSuccess?.length" v-for="success in item?.couponSuccess" :key="success" v-bind:class="{'text-success': success }">
                              {{ success }}
                            </p>
                            <p v-if="item?.couponErrors?.length" v-for="error in item?.couponErrors" :key="error" v-bind:class="{'text-danger': error }">
                              {{ error }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="tour-packages-totalcost">
                        <div class="tour-packages-costcount-title">Tour Cost:</div><hr>
                        <div class="tour-packages-costcount-subitem">
                          <div class="tour-packages-costcount-subitem-title">Subtotal:</div>
                          <div class="tour-packages-costcount-subitem-cost">${{ Number(item.subtotal).toFixed(2) }}</div>
                        </div>
                        <div class="tour-packages-costcount-subitem" v-if="item?.discount2_value > 0">
                          <div class="tour-packages-costcount-subitem-title">Discount:</div>
                          <div class="tour-packages-costcount-subitem-cost">
                            <span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span>
                            ${{ item?.discount2_value ? Number(item?.discount2_value).toFixed(2) : Number(0).toFixed(2) }}
                          </div>
                        </div>
                        <div class="tour-packages-costcount-subitem">
                          <div class="tour-packages-costcount-subitem-title">Booking Fees:</div>
                          <div class="tour-packages-costcount-subitem-cost">${{ Number(item.fees).toFixed(2) }}</div>
                        </div>
                        <div class="tour-packages-costcount-total">
                          <div class="tour-packages-costcount-total-title">Total Cost:</div>
                          <div class="tour-packages-costcount-total-cost">${{ Number(item.total).toFixed(2) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row payment-form-sec">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-12 total-cost-col">
                        <div class="row subtotal">
                          <div class="col-6 text-start">Ticket Cost:</div>
                          <div class="col-6 text-end">${{ Number(subtotal).toFixed(2) }}</div>
                        </div>

                        <div class="row subtotal" v-if="discount > 0">
                          <div class="col-6 text-start">Discount:</div>
                          <div class="col-6 text-end">${{ Number(discount).toFixed(2) }}</div>
                        </div>

                        <div class="row fees">
                          <div class="col-6 text-start">Booking Fees:</div>
                          <div class="col-6 text-end">${{ Number(fees).toFixed(2) }}</div>
                        </div>

                        <div class="row totalcost">
                          <div class="col-6 text-start">Total Cost:</div>
                          <div class="col-6 text-end">${{ Number(total).toFixed(2) }}</div>
                        </div>
                      </div>

                      <p class="mb-3" v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                          <li v-for="error in errors" :key="error" v-bind:class="{'text-danger': error }">{{ error }}
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="addmore-package-wrap p-0">
              <div class="addmore-package-btn-wrap">
                <button v-if="cartView == 1" class="btn addmore-package-btn" @click="mindChange()" type="button">+ Add more packages</button>
                <div class="checkout-btn-wrap" :style="cartView != 1 ? 'display: flex; flex: auto; justify-content: end;' : ''">
                  <button class="btn checkout-btn" @click="checkout()" type="button">Proceed to Checkout</button>						
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
import { getUTCDateFromTimeZone } from '../utils/dateUtils';

export default {
  name: "Payment",
  data() {
    return {
      processing: false,
      bookingId: null,
      baseUrl: process.env.VUE_APP_BASE_URL,
      iframeStatus: false,
      cartView: 0,
      details: [],
      hotels: [],
      cartItem: {},
      cartItemLength: 0,
      errors: [],
      subtotal: 0,
      discount: 0,
      fees: 0,
      total: 0,
      message: "",
      stripe: "",
      elements: "",
      cardElement: null,
      stripeValidationError: "",
      state: 'initial',
      toast: null,
      tabs: 3
    };
  },
  async mounted() {
    this.toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  },
  created() {
    this.$store.dispatch('storeTabs', this.tabs);
    this.iframeStatus = this.$store.state.iframeStatus;
    this.hotels = this.$store.state.tourPackage?.hotels;
    this.cartView = this.$store.state.tourPackage?.cartView;
    this.cartItem = this.$store.state.cartItem;
    this.cartItemLength = Object.values(this.cartItem).length;
    if (this.cartItemLength) {
      for (var key in this.cartItem) {
        this.subtotal = Number(this.subtotal) + Number(this.cartItem[key].subtotal);
        this.discount = Number(this.discount) + Number(this.cartItem[key].discount2_value);
        this.fees = Number(this.fees) + Number(this.cartItem[key].fees);
        this.total = Number(this.total) + Number(this.cartItem[key].total);

        this.cartItem[key].couponErrors = [];
        this.cartItem[key].couponSuccess = [];
      }
    } else {
      this.$router.push("/");
    }
  },
  methods: {
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
          delete this.cartItem[formData.tour_slot_id];
          this.cartItemLength = Object.values(this.cartItem).length;

          Swal.fire({
            title: "Deleted!",
            text: "Your package has been deleted.",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed && this.cartItemLength == 0) {
              this.$router.push("/");
            }
          });

          this.subtotal = 0;
          this.discount = 0;
          this.fees = 0;
          this.total = 0;
          for (var key in this.cartItem) {
            this.subtotal = Number(this.subtotal) + Number(this.cartItem[key].subtotal);
            this.discount = Number(this.discount) + Number(this.cartItem[key].discount2_value);
            this.fees = Number(this.fees) + Number(this.cartItem[key].fees);
            this.total = Number(this.total) + Number(this.cartItem[key].total);
          }
        }
      });
    },
    mindChange(formData = null) {
      if (formData && formData.tenant_id && formData.tour_operator_id && formData.package_id && formData.affiliate_id) {
        this.$store.dispatch('storeFormData', formData)
        this.$store.dispatch('storePackageId', formData.package_id)
        this.$store.dispatch('storeAffiliateId', formData.affiliate_id)
        this.$store.dispatch('storeDate', formData.date)

        this.$router.push({
          name: 'Init',
          query: {
            tid: formData.tenant_id,
            oid: formData.tour_operator_id,
            pid: formData.package_id,
            aid: formData.affiliate_id,
            iframe: formData.iframeStatusInfo
          }
        });
      } else if (formData && formData.tenant_id && formData.tour_operator_id && formData.package_id) {
        this.$store.dispatch('storeFormData', formData)
        this.$store.dispatch('storePackageId', formData.package_id)
        this.$store.dispatch('storeDate', formData.date)

        this.$router.push({
          name: 'Init',
          query: {
            tid: formData.tenant_id,
            oid: formData.tour_operator_id,
            pid: formData.package_id,
            iframe: formData.iframeStatusInfo
          }
        });
      } else {
        this.$store.dispatch('storePackageId', 0)
        this.$store.dispatch('storeDate', getUTCDateFromTimeZone())
        this.$router.push({
          name: 'Index'
        });
      }
    },
    dateFormat(date) {
      this.$store.dispatch('storeDate', date);
      var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString("en-US", options)
    },
    processLoader(loader) {
      // reset the state
      this.processing = false;
      loader.hide();
    },
    roundout(amount, places = 0) {
      if (places < 0) {
        places = 0;
      }

      let x = Math.pow(10, places);
      return (amount >= 0 ? Math.ceil(amount * x) : Math.floor(amount * x)) / x;
    },
    addCouponCode(formData) {
      console.log('addCouponCode');
      if (this.cartItem[formData.tour_slot_id]?.discount2_value) {
        this.cartItem[formData.tour_slot_id].subtotal = Number(this.cartItem[formData.tour_slot_id].subtotal) + Number(this.cartItem[formData.tour_slot_id].discount2_value);
        this.cartItem[formData.tour_slot_id].fees = this.roundout(Number(this.cartItem[formData.tour_slot_id].subtotal) * Number(this.cartItem[formData.tour_slot_id].service_commission) / 100, 2);
        var total = Number(this.cartItem[formData.tour_slot_id].subtotal) + Number(this.cartItem[formData.tour_slot_id].fees);
        this.cartItem[formData.tour_slot_id].total = Number(total).toFixed(2);

        this.subtotal = 0;
        this.discount = 0;
        this.fees = 0;
        this.total = 0;
        for (var key in this.cartItem) {
          this.subtotal = Number(this.subtotal) + Number(this.cartItem[key].subtotal);
          this.discount = Number(this.discount) + Number(this.cartItem[key].discount2_value);
          this.fees = Number(this.fees) + Number(this.cartItem[key].fees);
          this.total = Number(this.total) + Number(this.cartItem[key].total);
        }
      }

      this.state = 'initial';
      this.cartItem[formData.tour_slot_id].tour_promotion_id = "";
      this.cartItem[formData.tour_slot_id].discount2_value = 0;
      this.cartItem[formData.tour_slot_id].discount2_percentage = 0;
      this.cartItem[formData.tour_slot_id].couponSuccess = [];
      this.cartItem[formData.tour_slot_id].couponErrors = [];

      $('#applyCouponButton-' + formData.tour_slot_id)
        .text('Apply')
        .removeClass('btn-success')
        .addClass('btn-primary')
        .attr('disabled', false);
    },
    applyCoupon(formData) {
      console.log('applyCoupon');
      this.processing = true;
      var loader = this.$loading.show();
      this.cartItem[formData.tour_slot_id].code = document.querySelector("#couponCode-" + formData.tour_slot_id).value;

      this.cartItem[formData.tour_slot_id].couponSuccess = [];
      this.cartItem[formData.tour_slot_id].couponErrors = [];
      if (!this.cartItem[formData.tour_slot_id].code) {
        this.cartItem[formData.tour_slot_id].couponErrors.push("To receive a discount, please enter the promo code.");
        this.processLoader(loader);
      } else {
        let self = this;
        axios.get("/apply-coupon/" + this.cartItem[formData.tour_slot_id].package_id + "/" + this.cartItem[formData.tour_slot_id].code).then((response) => {
          this.state = 'changed';

          var promocode = response.data.data;
          var subtotal = this.cartItem[formData.tour_slot_id].subtotal;
          var discount2Percentage = 0;
          if (promocode.discount_value_type == "Percent") {
            discount2Percentage = Number(promocode.discount_value);
            var discountedAmount = subtotal * discount2Percentage / 100;
            subtotal = Number(subtotal - discountedAmount).toFixed(2);
          } else {
            var discountedAmount = Number(promocode.discount_value).toFixed(2);
            subtotal = Number(subtotal - discountedAmount).toFixed(2);
          }

          if (subtotal <= 0) {
            this.couponErrors.push("Your coupon code is not valid.");
          } else {
            this.cartItem[formData.tour_slot_id].discount2_percentage = discount2Percentage;
            this.cartItem[formData.tour_slot_id].tour_promotion_id = promocode.id;
            this.cartItem[formData.tour_slot_id].discount2_value = Number(discountedAmount).toFixed(2);

            this.cartItem[formData.tour_slot_id].subtotal = Number(subtotal).toFixed(2);
            this.cartItem[formData.tour_slot_id].fees = this.roundout(subtotal * this.cartItem[formData.tour_slot_id].service_commission / 100, 2);

            var total = Number(subtotal) + Number(this.cartItem[formData.tour_slot_id].fees);
            this.cartItem[formData.tour_slot_id].total = Number(total).toFixed(2);

            $('#applyCouponButton-' + formData.tour_slot_id)
              .text('Applied')
              .removeClass('btn-primary')
              .addClass('btn-success')
              .attr('disabled', true);

            this.cartItem[formData.tour_slot_id].couponSuccess.push(response.data.message);

            this.subtotal = 0;
            this.discount = 0;
            this.fees = 0;
            this.total = 0;
            for (var key in this.cartItem) {
              this.subtotal = Number(this.subtotal) + Number(this.cartItem[key].subtotal);
              this.discount = Number(this.discount) + Number(this.cartItem[key].discount2_value);
              this.fees = Number(this.fees) + Number(this.cartItem[key].fees);
              this.total = Number(this.total) + Number(this.cartItem[key].total);
            }
          }

          this.processLoader(loader);
        }).catch(function (error) {
          self.state = 'initial';
          self.cartItem[formData.tour_slot_id].code = "";
          self.cartItem[formData.tour_slot_id].tour_promotion_id = "";
          self.cartItem[formData.tour_slot_id].discount2_value = 0;
          self.cartItem[formData.tour_slot_id].discount2_percentage = 0;
          self.processLoader(loader);
          if (error.response) {
            self.cartItem[formData.tour_slot_id].couponErrors.push(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
      }
    },
    async openPolicy(formData) {
      Swal.bindClickHandler();
      const { value: accept } = await Swal.fire({
        toast: true,
        title: "Terms and conditions",
        html: `<div class="form-group col-12">
          <div class="policy-item-wrp">
            <h6 class="card-label-text-left mb-2">
              <i>Cancellation policy</i>
            </h6>
            <ul>
              <li class="ms-2">
                We offer cancellations on purchases made of the services offered on our Website. We offer cancellations only prior to performance of the service. You may cancel your order by contacting us via email or phone.
              </li>
              <li class="ms-2">
                We reserve the right to cancel your purchase for any reason, at our sole discretion, including but not limited to fraud, inaccuracies, and unavailability of the items or services purchased. We will let you know immediately if we plan on canceling your purchase.
              </li>
              <li class="ms-2">
                We will issue a partial refund of the purchase price that you paid if we cancel your purchase.
              </li>
            </ul>
            <br>
            <h6 class="card-label-text-left mb-2">
              <i>Refund policy</i>
            </h6>
            <ul>
              <li class="ms-2">
                We offer full refunds of ticket price (not booking fees) made of the services offered on our Website. Booking Fees are non-refundable. To qualify for a full refund of the ticket price, you must submit your request to us via phone or email 48 hours prior to the day you booked for. If your booking is canceled within the 48 hour timeframe of your tour, you may be eligible for a 50% refund. If you miss your tour for any reason, you will not be given a refund.
              </li>
              <li class="ms-2">
                In the event that tours are canceled due to weather or unforeseen circumstances, you will receive a full refund.
              </li>
            </ul>
          </div>
        </div>`,
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: `
          I agree with the terms and conditions
        `,
        customClass: {
          input: "tnc-checkbox"
        },
        confirmButtonText: `
          Continue&nbsp;<i class="fa fa-arrow-right"></i>
        `,
        inputValidator: (result) => {
          return !result && "You need to agree with T&C";
        }
      });
      if (accept) {
        this.toast.fire({
          icon: "success",
          title: "You agreed with T&C :)"
        });
      }
    },
    checkout() {
      var loader = this.$loading.show();
      this.cartItemLength = Object.values(this.cartItem).length;
      if (this.cartItemLength) {
        this.$store.dispatch('storeCartItem', this.cartItem);
        this.processLoader(loader);
        this.$router.push({
          name: 'Checkout'
        });
      } else {
        this.processLoader(loader);
        Swal.fire({
          title: "Empty!",
          text: "Please select package to process booking.",
          icon: "info"
        });
      }
    }
  }
};
</script>

<style>
#pageloader {
  background: rgba(255, 255, 255, 0.8);
  display: none;
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 9999;
}

#pageloader img {
  left: 50%;
  margin-left: -32px;
  margin-top: -32px;
  position: absolute;
  top: 50%;
}

.card-element {
  margin-top: 5px;
}

.card-label-text-left {
  text-align: left;
}

.error {
  color: #dc3545;
}
</style>