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
    <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
      <div class="background-color-sec">
        <div class="row">
          <div class="col-12">
            <div class="row bradcumb-row" v-if="iframeStatus == false">
              <div class="col-12">
                <div class="bradcumb-main">
                  <ul>
                    <li class="home">
                      <a :href="`${baseUrl}`">
                        Home
                      </a>
                    </li>
                    <li>{{ TourPkgName }}</li>
                  </ul>
                  <div class="cloasedbtn">
                    <img src="../assets/images/cross.png" />
                  </div>
                </div>
                <hr class="sep1" />
              </div>
            </div>
            <div class="row innerbanner-row"
              :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']"
              v-for="TourPkgDetails in details.TourPkgDetails" :key="TourPkgDetails.pkg_rate_id"
              v-bind:style="{ 'background-image': 'url(' + TourPkgDetails.HeaderTwo + ')' }">
              <div class="col-12"
                :class="[(iframeStatus == false) ? 'noiframe-zero-padding' : 'iframe-zero-padding', '']">
                <div class="title-box">
                  <h1>{{ TourPkgName }}</h1>
                  <div class="rating" v-if="data.package_id == 1">
                    <ul>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li class="rate">4.5</li>
                      <li class="info">
                        <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                          title="What is Lorem Ipsum?"><img src="../assets/images/info.png" /></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row payment-row">
              <div class="col-12">
                <div class="row booking-row">
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
                        title="What is Lorem Ipsum?">
                        Secured
                      </button>
                      <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top"
                        title="What is Lorem Ipsum?">
                        Health & Safety
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row booking-dt-sec">
                  <div class="col-12">
                    <div class="booking-dt-title">
                      You're booking date and time:
                    </div>
                    <div class="booking-dt-wrp d-flex">
                      <div class="booking-dt-img" v-for="TourPkgDetails in details.TourPkgDetails"
                        :key="TourPkgDetails.pkg_rate_id">
                        <img style="height: 210px; width: 220px;" :src="TourPkgDetails.PaymentPageDateTimeSectionImage"
                          alt="">
                      </div>
                      <div class="booking-dt-detail w-100">
                        <div class="booking-dt-detail-title">
                          {{ TourPkgName }}
                        </div>
                        <div class="booking-dt-detail-time">

                          {{ data.day }}, {{ data.calendarmonth }} {{ data.dateselect }}th {{ data.calendaryear }} @ {{
                          data.timedate }}
                        </div>
                        <div class="booking-dt-detail-btn">
                          <a :href="`${baseUrl}`">
                            <i class="fa fa-angle-left" aria-hidden="true"> Select a Different
                              Time & Date
                            </i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form @submit.prevent="submit" id="myForm" method="post">
                  <input type="hidden" id="bookingID" name="bookingID">
                  <div class="row starttime-row border-0">
                    <div class="col-12">
                      <div class="row groupofpeople">
                        <div class="col-12">
                          <h2>Select your group of people for the tour:</h2>
                          <div class="scroll-table">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">Age</th>
                                  <th scope="col">Fees and Taxes</th>
                                  <th scope="col">
                                    Select Group <br />Of People
                                  </th>
                                  <th scope="col">Price</th>
                                </tr>
                              </thead>
                              <tbody v-for="(tour, index) in details.TourPkgRates" :key="index">
                                <tr>
                                  <td class="age pay" data-label="Age">
                                    <img src="../assets/images/aduct.png" />
                                    {{ tour.Age }}
                                  </td>
                                  <td class="taxes" data-label="Fees and Taxes">
                                    <p>
                                      Navajo Nation: Permit Fee ${{ tour.PermitFee }} & Tax ${{ tour.Tax}}, Processing
                                      Fee: {{ tour.ProcessingFee }}%
                                    </p>
                                  </td>
                                  <td class="group" data-label="Select Group Of People">
                                    <input type="text" :value="form.tourists1[index]" class="form-select noarrow" />
                                  </td>
                                  <td class="final" data-label="Price">
                                    $<span class="finalprice1"><input type="hidden"
                                        :name="'grpt'+ tour.pkg_rate_id + ''" :id="tour.pkg_rate_id"
                                        :value="form.calucation[index]">{{ form.calucation[index]}}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row payment-form-sec">
                    <div class="col-12">

                      <div class="row">
                        <div class="col-12">
                          <span class="payment-form-notice">
                            Please fill all fields marked with <span>*</span> to
                            complete your booking
                          </span>
                        </div>
                        <div class="col-12">
                          <div class="masks-mandatory-wrp d-flex">
                            <div class="masks-mandatory-img">
                              <img src="../assets/images/masks-mandatory.png" alt="masks-mandatory-img" />
                            </div>
                            <div class="masks-mandatory-detail w-100">
                              <label class="checkbox-wrap">Masks Mandatory<span class="required-star">*</span>
                                <img src="../assets/images/radio-info.png" data-toggle="tooltip" data-placement="top"
                                  title="Please select Number of Adults (Ages 13 & Up) want to go the tour" />
                                <input type="checkbox" name="masks_mandatory" v-model="form.masks_mandatory"
                                  id="masksmandatory" value="masks_mandatory" />
                                <span class="checkmark"></span>
                              </label>
                              <div class="masks-mandatory-notice">
                                By checking this box, I adhere to obey the mask
                                mandate; any conflict will result in
                                cancellation without refund.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 mb-4">
                          <div class="row">
                            <div class="col-12 col-md-6">
                              <div class="form-field-title">Contact</div>
                              <div class="form-field-wrp contact-form-field">
                                <div class="form-group col-12">
                                  <label for="fullname" class="col-form-label">Full Name<span
                                      class="required-star">*</span></label>
                                  <div class="field-icon-wrp">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                  </div>
                                  <input type="text" id="name" name="name" v-model="form.name" class="form-control"
                                    placeholder="Your Name" />
                                </div>
                                <div class="form-group col-12">
                                  <div class="phone-wrap">
                                    <label for="phonenumber" class="col-form-label">Phone Number<span
                                        class="required-star">*</span></label>
                                    <div class="field-icon-wrp">
                                      <i class="fa fa-phone" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" id="phonenumber" name="phone_number" v-model="form.phone_number"
                                      class="form-control" placeholder="Your Contact Number" />
                                  </div>
                                </div>
                                <div class="form-group col-12">
                                  <label for="Email" class="col-form-label">Email Address<span
                                      class="required-star">*</span></label>
                                  <div class="field-icon-wrp">
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                  </div>
                                  <input type="email" id="emailaddress" name="email" v-model="form.email"
                                    class="form-control" placeholder="Your Email Address" />
                                </div>
                                <div class="form-group col-12">
                                  <hr />
                                </div>
                                <div class="form-group col-12 mb-0">
                                  <label class="checkbox-wrap get-email-updates mb-0">Get future email updates from {{
                                  TourPkgName }}
                                    <input type="checkbox" name="getemailupdates" v-model="form.getemailupdates"
                                      id="getemailupdates" value="getemailupdates" />
                                    <span class="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="col-12 col-md-6">
                              <div class="form-field-title">
                                Cancellations Policy
                              </div>
                              <div class="form-field-wrp contact-form-field">
                                <div class="form-group col-12">
                                  <div class="policy-item-wrp">
                                    <ul>
                                      <li>
                                        Due to limited seating, we request that
                                        you cancel 24 hours prior to the tour
                                        departure to receive a Full Refund Minus Booking Fees.
                                      </li>
                                      <li>
                                        Cancellations made within 24 hours of
                                        tour departure will incur a 50% fee.
                                      </li>
                                      <li>
                                        All cancellations must be made by phone
                                        or email.
                                      </li>
                                      <li>
                                        We will do our best to accommodate your
                                        needs.
                                      </li>
                                      <li>
                                        Cancellations made within 24 hours of
                                        tour departure will incur a 50% fee.
                                      </li>
                                      <li>
                                        All cancellations must be made by phone
                                        or email.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div class="form-group col-12">
                                  <hr />
                                </div>
                                <div class="form-group col-12 mb-0">
                                  <label class="
                                        checkbox-wrap
                                        get-email-updates
                                        mb-0
                                        cancellationsterms
                                      "><span class="required-star">*</span> I have
                                    read and accept above all cancellations
                                    terms.
                                    <input type="checkbox" name="cancellations_policy"
                                      v-model="form.cancellations_policy" id="cancellations_policy" />
                                    <span class="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <span class="payment-form-notice important-note w-100">
                            <span class="notice-title">Important Note:</span>
                            All guests must arrive 45 minutes prior to their
                            reserved tour time. All guests must stay with their
                            guides.
                          </span>
                        </div>
                        <div class="form-group form-textarea-wrap col-12">
                          <label for="comment" class="col-form-label">Comments</label>
                          <textarea id="comment" name="comment" v-model="form.comment"
                            placeholder="Please type here ..."></textarea>
                        </div>
                        <ul>
                          <li class="text-danger" style="font-size:25px">
                            {{message}}
                          </li>
                        </ul>
                        <div class="col-12">
                          <div class="row">
                            <div class="col-12 col-md-6 text-center text-md-start">
                              <div class="additional-notes-text">
                                Any additional notes or special requests?
                              </div>
                            </div>
                            <div class="col-12 col-md-6 text-center text-md-end">
                              <div class="accommodate-your-request">
                                We will do our best to accommodate your request.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="pageloader">
                          <img src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif"
                            alt="processing..." />
                        </div>

                        <div class="col-12 total-cost-col">
                          <div class="row subtotal">
                            <div class="col-6 text-start">Subtotal:</div>
                            <div class="col-6 text-end">
                              $<label class="subgrandtotal">{{ subtotal }}</label>
                              <input type="hidden" id="subtotal" name="subtotal" :value="subtotal">
                            </div>
                          </div>
                          <div class="row fees">
                            <div class="col-6 text-start">Fees:</div>
                            <div class="col-6 text-end">
                              ${{ softwarefee }}
                              <input type="hidden" id="fees" name="softwarefee" :value="softwarefee" />
                            </div>
                          </div>
                          <div class="row totalcost">
                            <div class="col-6 text-start">
                              Total Cost:
                            </div>
                            <div class="col-6 text-end">
                              $<label class="grandtotalfinal">{{ form.total }}</label>
                              <input type="hidden" name="total" :value="form.total">
                            </div>
                          </div>
                        </div>

                        <div class="col-12 mb-3">
                          <div class="row">
                            <div class="col-12">
                              <div class="payment-text card-label-text-left"><img src="../assets/images/shield.png"
                                  alt="shield"> Payment</div>
                            </div>
                            <div class="col-12">
                              <div class="secured-encryption card-label-text-left"><img
                                  src="../assets/images/lock-white.png" alt="lock"> Secured with 2048-bit encryption
                              </div>
                            </div>
                          </div>
                          <div class="row mt-3">
                            <div class="col-12">
                              <div class="card-detail-main">
                                <div class="row align-items-center">
                                  <div class="col-12 col-md-5 border-right">
                                    <div class="card-detail-wrp card-form-field">
                                      <div class="form-group col-12 card-label-text-left">
                                        <label for="cardnumber" class="col-form-label">Card Number<span
                                            class="required-star">*</span></label>
                                        <div class="field-icon-wrp">
                                          <i class="fa fa-lock" aria-hidden="true"></i>
                                        </div>
                                        <input type="text" id="cardnumber" name="cardnumber" class="form-control"
                                          v-model="form.cardnumber" v-mask="'#### #### #### ####'"
                                          placeholder="1234 1234 1234 1234">
                                        <div class="validation-icon-wrp">
                                          <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        </div>
                                      </div>
                                      <div class="form-group col-12">
                                        <div class="phone-wrap card-label-text-left">
                                          <label for="nameoncard" class="col-form-label">Name on Card<span
                                              class="required-star">*</span></label>
                                          <div class="field-icon-wrp">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                          </div>
                                          <input type="text" id="nameoncard" name="nameoncard" class="form-control"
                                            v-model="form.nameoncard" placeholder="">
                                          <div class="validation-icon-wrp">
                                            <i class="fa fa-check-circle" aria-hidden="true"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="form-group col-12 mb-0">
                                        <div class="row">
                                          <div class="form-group col-7 card-label-text-left">
                                            <label for="expiration" class="col-form-label">Expiration<span
                                                class="required-star">*</span></label>
                                            <div class="field-icon-wrp">
                                              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                                            </div>
                                            <input type="text" id="expiration" name="expiration" class="form-control"
                                              v-model="form.expiration" v-mask="'##/##'" placeholder="MM/YY">
                                            <div class="validation-icon-wrp">
                                              <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                          </div>
                                          <div class="form-group col-5 card-label-text-left">
                                            <label for="cvv" class="col-form-label">CVC<span
                                                class="required-star">*</span><img src="../assets/images/radio-info.png"
                                                data-toggle="tooltip" data-placement="top"
                                                title="Please select Number of Adults (Ages 13 & Up) want to go the tour"></label>
                                            <div class="field-icon-wrp">
                                              <i class="fa fa-lock" aria-hidden="true"></i>
                                            </div>
                                            <input type="text" id="cvv" name="cvv" class="form-control"
                                              v-model="form.cvv" v-mask="'####'" placeholder="CVC">
                                            <div class="validation-icon-wrp">
                                              <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-12 col-md-7">
                                    <div class="makeaayment-wrap">
                                      <div class="form-group col-12">
                                        <div class="makeaayment-detail-title card-label-text-left">
                                          We accept all major credit and debit cards:
                                        </div>
                                        <div class="makeaayment-detail-wrp">
                                          <img src="../assets/images/card-name.png" alt="card-name">
                                        </div>
                                      </div>
                                      <div class="form-group col-12">
                                        <hr>
                                      </div>
                                      <div class="form-group col-12 mb-0">
                                        <input type="submit" name="makeaayment" id="makeaayment" value="Make a Payment"
                                          class="makeaayment-btn">
                                      </div>
                                      <div class="form-group col-12 mb-0">
                                        <div class="booking-you-text card-label-text-left">By booking you also agree to
                                          our <a
                                            href="https://nativeamericantours.com/privacy-policy.html">policies</a>, and
                                          Stripe <a href="https://stripe.com/legal/end-users">terms of
                                            service</a>.</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
import { loadStripe } from '@stripe/stripe-js';
import { mask } from 'vue-the-mask'
export default {
  name: "Payment",
  directives: {
    mask
  },
  data() {
    return {
      processing: false,
      bookingId: null,
      baseUrl: process.env.VUE_APP_BASE_URL,
      iframeStatus: '',
      TourPkgName: '',
      data: [],
      details: [],
      selectgrouppeoples: [],
      form: {
        masks_mandatory: "",
        name: "",
        phone_number: "",
        email: "",
        getemailupdates: "",
        cancellations_policy: "",
        comment: "",
        cardnumber: "",
        nameoncard: "",
        expiration: "",
        cvv: "",
        countryregion: "",
        tour_package_id: "",
        total: "",
        tourists1: "",
        tourists: "",
        cost1: [],
        cost: [],
        tour_slot_id: "",
        calucation: "",
        service_commission: "",
        date: "",
        day: "",
        month: "",
        year: "",
        time: "",
      },
      errors: [],
      price: "",
      grpt: [],
      subtotal: "",
      fees: "",
      total: "",
      softwarefee: "",
      message: "",
      stripe: "",
      elements: "",
      cardElement: null,
      stripeValidationError: "",
    };
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
    this.createAndMountFormElements();
  },
  async created() {
    this.data = this.$store.state.formData;
    if (this.data == null) {
      window.location.href = '/';
    }
    if (this.data.iframeStatusInfo != null && this.data.iframeStatusInfo == 'true') {
      this.iframeStatus = this.data.iframeStatusInfo;
    } else {
      this.iframeStatus = false;
    }

    await axios.get("/tour-package/" + this.data.package_id + "").then((response) => {
      this.TourPkgName = response.data.TourPkgDetails[0].TourPkgName;
      this.details = response.data;
      this.PermitFee = response.data.TourPkgRates[0].PermitFee;
      this.ProcessingFee = response.data.TourPkgRates[0].ProcessingFee;
      this.Tax = response.data.TourPkgRates[0].Tax;
      this.fees = response.data.TourPkgDetails[0].ServiceCommission;
      this.form.date = this.data.dateselect;
      this.form.day = this.data.day;
      this.form.month = this.data.calendarmonth;
      this.form.year = this.data.calendaryear;
      this.form.time = this.data.timedate;
    });
    this.form.tourists1 = this.data.peoplegroup;
    this.form.calucation = this.data.calucation;
    var ts = this.data.peoplegroup_;
    this.form.tourists = ts.join();
    this.form.tour_slot_id = this.data.tour_slot_id;
  },
  async updated() {
    const n = this.details.TourPkgRates;
    const field1 = 0;
    let costStoreArr = [];
    if (n) {
      n.forEach(number => {
        let names_field = 'grpt' + number.pkg_rate_id;
        const field1 = document.querySelector("input[name=" + names_field + "]").value;
        costStoreArr.push(field1);
      });
      this.form.tour_package_id = this.details.TourPkgDetails[0].TourPackageId;
      this.form.cost1 = [field1];
      var ct = [field1];
      this.form.cost = ct.join();
      const sum = costStoreArr.reduce((a, b) => Number(a) + Number(b), 0);
      this.subtotal = sum.toFixed(2);
      var softwarefee = Number(this.subtotal * this.fees) / 100;
      this.softwarefee = softwarefee.toFixed(2);
      this.form.service_commission = this.softwarefee;
      var totals = Number(softwarefee) + Number(sum);
      this.form.total = totals.toFixed(2);
    }
  },
  methods: {
    createAndMountFormElements() {
      this.elements = this.stripe.elements({
        fonts: [{
          cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        }]
      });

      this.cardElement = this.elements.create("card", {
        style: {
          base: {
            color: "#464646",
            fontFamily: 'Inter, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "14px",
            "::placeholder": {
              color: "#32325d"
            },
            backgroundColor: 'transparent',
            lineHeight: '26px'
          },
          invalid: {
            fontFamily: 'Inter, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      });
    },
    async submit(e) {
      e.preventDefault();
      // if an async request is processing
      if (this.processing === true) {
        return;
      }
      // set the async state
      this.processing = true;
      var loader = this.$loading.show();
      this.errors = [];
      if (!this.form.masks_mandatory) {
        this.errors.push("Masks mandatory is required.");
      }
      if (!this.form.name) {
        this.errors.push("Name is required on contact section.");
      }
      if (!this.form.phone_number) {
        this.errors.push("Phone number is required on contact section.");
      }
      if (!this.form.email) {
        this.errors.push("Email is required on contact section.");
      }
      if (!this.form.cancellations_policy) {
        this.errors.push("Cancellations policy checkbox is required.");
      }
      if (!this.form.cardnumber || !this.form.expiration || !this.form.cvv) {
        this.errors.push("Please add card information.");
      }
      if (
        this.form.masks_mandatory &&
        this.form.name &&
        this.form.phone_number &&
        this.form.email &&
        this.form.cancellations_policy &&
        this.form.cardnumber &&
        this.form.expiration &&
        this.form.cvv
      ) {
        let checkSlotarr = {
          'tour_slot_id': this.form.tour_slot_id,
          'package_id': this.form.tour_package_id,
          'tourists': this.form.tourists1,
          'tour_slot_time': this.form.time,
          'tour_slot_fulldate': this.selected_fulldate,
        };
        axios.post("/available-seats", checkSlotarr).then((response) => {
          if (response.data.success == "false") {
            this.message = response.data.message;
            return true;
          } else {
            let self = this;
            let router = this.$router;
            axios.post("/booking-tour", this.form).then((response) => {
              if (response.data.success == "false") {
                self.processLoader(loader);
                this.message = response.data.message;
                return true;
              } else if (response.data.clientSecret) {
                this.stripe
                  .confirmCardPayment(response.data.clientSecret)
                  .then(function () {
                    self.bookingId = response.data.bookingId;
                    this.$store.dispatch('storeBookingId', self.bookingId)
                    var stripeObject = {
                      booking_id: response.data.bookingId,
                      payment_intent: response.data.intentId,
                      payment_intent_client_secret: response.data.clientSecret
                    };
                    axios.post("/booking-3ds-payment", stripeObject).then(() => {
                      self.processLoader(loader);
                      router.push("/Thankyou");
                    }).catch(function (error) {
                      self.processLoader(loader);
                      if (error.response) {
                        // Request made and server responded
                        self.errors.push(error.response.data.message)
                      } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                      }
                    });
                  });
              } else {
                self.processLoader(loader);
                this.bookingId = response.data.BookingId;
                this.$store.dispatch('storeBookingId', this.bookingId)
                this.$router.push("/Thankyou");
              }
            }).catch(function (error) {
              self.processLoader(loader);
              if (error.response) {
                // Request made and server responded
                self.errors.push(error.response.data.message)
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
            });
          }
        });
      } else {
        this.processLoader(loader);
      }
    },
    processLoader(loader) {
      // reset the state
      this.processing = false;
      loader.hide();
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