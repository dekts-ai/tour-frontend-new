<template>
  <Header />
  <section class="banner-section">
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
                    <li class="home"><a href="https://antelopelowercanyon.com/blog">Home</a></li>
                    <li>Lower Antelope Canyon Hiking Tour</li>
                  </ul>
                  <div class="cloasedbtn">
                    <img src="../assets/images/cross.png" />
                  </div>
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
                <div class="row invoice-row"  v-if="tourBooking.data">
                  <div class="col-12">
                    <div class="invoice">
                      <div class="row top-row">
                        <div class="col-12 content1 text-end">
                          <h2>Booking Confirmation</h2>
                        
                            <h3>Booking ID # <a href="#">{{tourBooking.data[0].TourBookingID}}</a></h3>
                            
                          
                        </div>
                        <div class="col-12 content2">
                          <h2>Hello {{tourBooking.data[0].Name}},</h2>
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
                                  <p>{{tourBooking.data[0] .Name}}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingcontact">
                                    Your Contact Number:
                                  </h3>
                                  <p>+{{tourBooking.data[0].ContactNumber}}</p>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="details-box">
                                  <h3 class="bookingemail">
                                    Your Email Address:
                                  </h3>
                                  <p>{{tourBooking.data[0].Email}}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 booking-summery">
                          <h3>Your Booking Summery:</h3>
                          
                           <h2>Booking ID # <a href="#">{{tourBooking.data[0].TourBookingID}}</a></h2> 
                            <!-- <button class="printbtn">
                              <i class="fa fa-print" aria-hidden="true"></i> Get
                              a Print
                            </button> -->
                          
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
                                  <td>{{item.Price}}</td>
                                  <td>{{item.FeesAndTaxes}}</td>
                                  <td>{{item.Cost}}</td>
                                </tr>
                                
                                
                              </tbody>
                            </table>
                          </div>
                          <div class="grand-total">
                            <div class="tsub">
                              <div>Subtotal:</div>
                              <div>${{tourBooking.data[0].SubTotal}}</div>
                            </div>
                            <div class="tfee">
                              <div>Fees:</div>
                              <div>${{tourBooking.data[0].Fees}}</div>
                            </div>
                            <div class="tbooking">
                              <div>Booking Total:</div>
                              <div>
                                ${{tourBooking.data[0].BookingTotal}} <span>(inclusive all taxes)</span>
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
                              <!-- <li><a href="#">Get a Print</a></li> -->
                              <li><a href="https://antelopelowercanyon.com/blog">Home Page</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </section>
 
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
export default {
  name: "Thankyou",
  data() {
    return {
      tourBooking: [],
    };
  },
  components: {
    Header,
    Footer,
  },
 mounted() {
    this.booking();
  },
  methods: {
    booking() {
      const id = this.$store.state.bookingId;
      if (id === null) {
        this.$router.push('/');
      }
      axios
        .get("/tour-booking-confirmed/"+id)
        .then((response) => {
          this.tourBooking = response.data;
        });
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/style.css");
</style>