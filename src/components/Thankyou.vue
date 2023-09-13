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
    <div class="container">
      <div class="background-color-sec">
        <div class="row">
          <div class="col-12">
            <div class="row bradcumb-row">
              <div class="col-12">
                <div class="bradcumb-main">
                  <ul>
                    <li class="home">
                      <a v-if="iframeStatus && data.package_id && affiliate_id" :href="`${baseUrl}?pkg=${data.package_id}&aid=${affiliate_id}&iframe=${iframeStatus}`">
                          Home
                      </a>
                      <a v-else-if="iframeStatus && data.package_id" :href="`${baseUrl}?pkg=${data.package_id}&iframe=${iframeStatus}`">
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
            <div class="row thankyou-main-row">
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
                        <div class="col-12 content1 text-end">
                          <h2>Booking Confirmation</h2>

                          <h3>Booking ID # <a href="#">{{tourBooking.data[0].TourBookingID}}</a></h3>

                        </div>
                        <div class="col-12 content2">
                          <h2>Hello {{customer.name}},</h2>
                          <p>
                            Thank you for your booking.
                          </p>
                        </div>
                        <div class="col-12 booking-details-inner">
                          <div class="invoice-details">
                            <h2>Your Booking Details:</h2>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingdate">Booking Date:</h3>
                                  <p>{{tourBooking.data[0].BookingDate}}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookedtour">Booked Tour:</h3>
                                  <p>{{tourBooking.data[0].TourPkgName}}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingtime">Booking Time:</h3>
                                  <p>{{tourBooking.data[0].BookingTime}}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingname">Your Full Name:</h3>
                                  <p>{{customer.name}}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingcontact">
                                    Your Contact Number:
                                  </h3>
                                  <p>+{{customer.phone_number}}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingemail">
                                    Your Email Address:
                                  </h3>
                                  <p>{{customer.email}}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 booking-summery">
                          <h3>Your Booking Summary:</h3>

                          <h2>Booking ID # <a href="#">{{tourBooking.data[0].TourBookingID}}</a></h2>

                          <div class="booking-tbl">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">
                                    Total Booked <br />People ({{tourBooking.data[0].TotalBookedPeople}})
                                  </th>
                                  <th scope="col">Price (Per Person)</th>
                                  <th scope="col">Fees and Taxes</th>
                                  <th scope="col">Cost</th>
                                </tr>
                              </thead>
                              <tbody v-for="item in tourBooking.data[0].TourPkgRates" :key="item">
                                <tr>
                                  <td>{{item.Age}}</td>
                                  <td>${{item.Price}}</td>
                                  <td>{{item.FeesAndTaxes}}</td>
                                  <td>${{item.Cost}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="grand-total">
                            <div class="tsub">
                              <div v-if="tourBooking.data[0].discount2_value > 0">Ticket Cost:</div>
                              <div v-else>Subtotal:</div>
                              <div>${{ Number(tourBooking.data[0].SubTotal).toFixed(2) }}</div>
                            </div>
                            <div class="tsub" v-if="tourBooking.data[0].discount2_value > 0">
                              <div>Discount:</div>
                              <div>
                                <span v-if="tourBooking.data[0].discount2_percentage > 0">({{ tourBooking.data[0].discount2_percentage }}%)</span> ${{tourBooking.data[0].discount2_value}}</div>
                            </div>
                            <div class="tsub" v-if="tourBooking.data[0].discount2_value > 0">
                              <div>Subtotal:</div>
                              <div>${{ Number(tourBooking.data[0].SubTotal - tourBooking.data[0].discount2_value).toFixed(2) }}</div>
                            </div>
                            <div class="tfee">
                              <div>Booking Fees:</div>
                              <div>${{ Number(tourBooking.data[0].Fees).toFixed(2) }}</div>
                            </div>
                            <div class="tbooking">
                              <div>Booking Total:</div>
                              <div>
                                ${{ Number(tourBooking.data[0].BookingTotal).toFixed(2) }} <span>(inclusive all taxes)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-12 cta">
                          <div class="cta-box">
                            <div class="content">
                              <h3>Need Help?</h3>
                              <p>
                                Please give us a call for any query or help at:
                                <a href="tel:928-640-1761">928-640-1761</a>
                              </p>
                            </div>
                            <ul>
                              <li>
                                <a :href="`${baseUrl}`">
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
      id: null,
      tourBooking: [],
      iframeStatus: false,
      details: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      data: [],
      customer: [],
      affiliate_id: 0,
      with_rate_groups: 1,
    };
  },
  mounted() {
    this.checkId();
  },
  created() {
    this.affiliate_id = this.$store.state.affiliateId;
    this.data = this.$store.state.formData;
    this.customer = this.$store.state.customer;
    this.id = this.$store.state.bookingId;
    if (this.id) {
      if (this.data.iframeStatusInfo != null && this.data.iframeStatusInfo == 'true') {
        this.iframeStatus = this.data.iframeStatusInfo;
      } else {
        this.iframeStatus = false;
      }

      var year = this.$store.state.year;
      axios.get("/tour-package/" + year + "/" + this.data.tour_operator_id + "/" + this.data.package_id + "/" + this.affiliate_id + "/" + this.with_rate_groups).then((response) => {
        this.details = response.data;
        this.booking();
      });
    }
  },
  methods: {
    booking() {
      axios
        .get("/tour-booking-confirmed/" + this.id)
        .then((response) => {
          this.tourBooking = response.data;
        });
    },
    checkId() {
      if (this.id == null) {
        window.location.href = '/';
      }
    }
  },
};
</script>

<style scoped>
@import url("../assets/css/style.css");
</style>