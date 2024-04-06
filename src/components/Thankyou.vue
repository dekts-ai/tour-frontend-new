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

  <section class="inner-content-section">
    <div :class="[iframeStatus ? 'no-container' : 'container', '']">
      <div class="background-color-sec">
        <div class="row">
          <div class="col-12">
            <div class="row bradcumb-row" v-if="iframeStatus == false">
              <div class="col-12">
                <div class="bradcumb-main">
                  <ul>
                    <li class="home">
                      <a v-if="iframeStatus && data.package_id && affiliate_id" :href="`${baseUrl}?tid=${data.tenant_id}&oid=${data.tour_operator_id}&pid=${data.package_id}&aid=${affiliate_id}&iframe=${iframeStatus}`">
                          Home
                      </a>
                      <a v-else-if="iframeStatus && data.package_id" :href="`${baseUrl}?tid=${data.tenant_id}&oid=${data.tour_operator_id}&pid=${data.package_id}&iframe=${iframeStatus}`">
                          Home
                      </a>
                      <a v-else :href="`${baseUrl}`">
                          Home
                      </a>
                    </li>
                    <li>Lower Antelope Canyon Hiking Tour</li>
                  </ul>
                </div>
                <hr class="sep1" />
              </div>
            </div>
            <div :class="[iframeStatus ? 'row thankyou-main-row iframe-row' : 'row thankyou-main-row', '']">
              <div class="col-12">
                <div class="row status-bar-row">
                  <div class="col-12">
                    <div class="sucessmsg">
                      <div class="images">
                        <img src="../assets/images/thank-check.png" />
                      </div>
                      <div class="content">
                        <h2>Your booking has been successfully confirmed!</h2>
                        <p>
                          Thank you for your booking. Please check your below
                          booking confirmation details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row invoice-row" v-if="tourBooking.data">
                  <div class="col-12">
                    <div class="invoice">
                      <div class="row top-row">
                        <div class="col-12 content2 mb-2">
                          <h2>Hello {{ customer.name }},</h2>
                          <p>
                            Thank you for your booking.
                          </p>
                        </div>
                        <div class="col-12 content-detail-wrap">
                          <div class="invoice-details">
                            <h2>Your Contact Details:</h2>
                            <div class="row">
                              <div class="col-lg-4 col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingname">Your Full Name:</h3>
                                  <p>{{ customer.name }}</p>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingcontact">
                                    Your Phone Number:
                                  </h3>
                                  <p>{{ customer.phone_number }}</p>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingemail">
                                    Your Email Address:
                                  </h3>
                                  <p>{{ customer.email }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="booking-summery-title mt-3 mb-3">Your Booking Summary:</div>

                        <div class="booking-summery">
                          <div class="booking-summery-package-wrap">
                            <div class="accordion" id="accordion-parent">
                              <div class="accordion-item" v-for="(tourBooking, index) in tourBooking.data">
                                <h2 class="accordion-header" :id="'heading-' + tourBooking.id">
                                  <button :class="'accordion-button ' + (index > 0 ? 'collapsed' : '')" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + tourBooking.id" :aria-expanded="(index == 0 ? true : false)" :aria-controls="'collapse-' + tourBooking.id">
                                    Booking ID # {{ tourBooking.id }}
                                    <span class="tour-name">{{ tourBooking.package_name }}</span>
                                  </button>
                                </h2>
                                <div :id="'collapse-' + tourBooking.id" :class="'accordion-collapse collapse show'" :aria-labelledby="'heading-' + tourBooking.id" >
                                  <div class="accordion-body">
                                    <div class="row">
                                      <div class="col-md-6">
                                        <div class="details-box">
                                          <h3 class="bookingdate">Booking Date:</h3>
                                          <p>{{ tourBooking.date }}</p>
                                        </div>
                                      </div>
                                      <div class="col-md-6">
                                        <div class="details-box">
                                          <h3 class="bookingtime">Booking Time:</h3>
                                          <p>{{ tourBooking.time }}</p>
                                        </div>
                                      </div>
                                      <div class="col-md-12" v-if="tourBooking.hotel_id">
                                        <div class="details-box">
                                          <h3 class="bookinghotel">Your Hotel Pickup Address:</h3>
                                          <p>{{ tourBooking.hotel_name }}</p>
                                          <p>{{ tourBooking.hotel_address  }}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12">
                                        <div class="table-responsive">
                                          <table class="table table-bordered">
                                            <thead>
                                              <tr>
                                                <th scope="col"> Total Booked <br>People ({{ tourBooking.tourists }}) </th>
                                                <th scope="col">Price (Per Person)</th>
                                                <th scope="col">Fees and Taxes</th>
                                                <th scope="col">Cost</th>
                                              </tr>
                                            </thead>
                                            <tbody v-for="item in tourBooking.tourPackageRates" :key="item">
                                              <tr>
                                                <td>{{ item.tourists }}</td>
                                                <td>${{ item.rate }}</td>
                                                <td>{{ item.fees }}</td>
                                                <td>${{ item.total }}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>

                                        <div class="grand-total">
                                          <div class="subtotal-item">
                                            <div v-if="tourBooking.discount2_value > 0" class="subtotal-item-title">Ticket Cost:</div>
                                            <div v-else class="subtotal-item-title">Subtotal:</div>
                                            <div class="subtotal-item-price">${{ Number(tourBooking.subtotal).toFixed(2) }}</div>
                                          </div>
                                          <div v-if="tourBooking.discount2_value > 0" class="subtotal-item">
                                            <div class="subtotal-item-title">Discount:</div>
                                            <div class="subtotal-item-price">
                                              <span v-if="tourBooking.discount2_percentage > 0">({{ tourBooking.discount2_percentage }}%)</span> ${{tourBooking.discount2_value}}
                                            </div>
                                          </div>
                                          <div v-if="tourBooking.discount2_value > 0" class="subtotal-item">
                                            <div class="subtotal-item-title">Subtotal:</div>
                                            <div class="subtotal-item-price">
                                              ${{ Number(tourBooking.subtotal - tourBooking.discount2_value).toFixed(2) }}
                                            </div>
                                          </div>
                                          <div class="subtotal-item">
                                            <div class="subtotal-item-title">Booking Fees:</div>
                                            <div class="subtotal-item-price">${{ Number(tourBooking.service_commission).toFixed(2) }}</div>
                                          </div>
                                          <div class="subtotal-item">
                                            <div class="subtotal-item-title">Booking Total:</div>
                                            <div class="subtotal-item-price">${{ ((Number(tourBooking.subtotal) - Number(tourBooking.discount2_value)) + Number(tourBooking.service_commission)).toFixed(2) }} <span>(inclusive all taxes)</span></div>
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
                        <div class="col-12 cta p-0">
                          <div class="cta-box">
                            <div class="content" v-if="tourBooking?.data[0]?.company_number">
                              <h3>Need Help?</h3>
                              <p>
                                Please give us a call for any query or help at:
                                <a :href="'tel:' + tourBooking.data[0].company_number">{{ tourBooking.data[0].company_number }}</a>
                              </p>
                            </div>
                            <ul v-if="iframeStatus == false">
                              <li>
                                <a class="mind-change" @click="mindChange()">
                                  Home Page
                                </a>
                              </li>
                            </ul>
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

export default {
  name: "Thankyou",
  data() {
    return {
      id: {},
      idLength: 0,
      tourBooking: [],
      iframeStatus: false,
      details: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      data: [],
      customer: [],
      affiliate_id: 0,
      with_rate_groups: 1,
      hotel_id: 0,
      selectedHotel: null
    };
  },
  created() {
    this.$store.dispatch('storeCartItem', {});
    this.iframeStatus = this.$store.state.iframeStatus;
    this.customer = this.$store.state.customer;
    this.id = this.$store.state.bookingIds;
    this.idLength = Object.values(this.id).length;
    if (this.idLength) {
      this.booking();
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    booking() {
      let self = this;
      var loader = this.$loading.show();
      const payload = { ...this.id };

      axios.post("/package-booking-confirmed", { ids: payload }).then((response) => {
        this.tourBooking = response.data;
        this.processLoader(loader);
      }).catch(function (error) {
        console.log(error);
        self.processLoader(loader);
      });
    },
    mindChange() {
      var routeData = this.tourBooking?.data ? this.tourBooking?.data[0] : null;

      if (this.iframeStatus && routeData && routeData.is_affiliate == 'Yes') {
        this.$store.dispatch('storePackageId', routeData.package_id)
        this.$store.dispatch('storeAffiliateId', routeData.customer_id)

        this.$router.push({
          name: 'Init',
          query: {
            iframe: this.iframeStatus,
            tid: routeData.tenant_id,
            oid: routeData.tour_operator_id,
            pid: routeData.package_id,
            aid: routeData.customer_id
          }
        });
      } else if (this.iframeStatus && routeData && routeData?.tenant_id) {
        this.$store.dispatch('storePackageId', routeData.package_id)

        this.$router.push({
          name: 'Init',
          query: {
            iframe: this.iframeStatus,
            tid: routeData.tenant_id,
            oid: routeData.tour_operator_id,
            pid: routeData.package_id
          }
        });
      }
    },
    processLoader(loader) {
        loader.hide();
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/style.css");
</style>
