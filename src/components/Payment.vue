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
            <!-- <div class="row bradcumb-row" v-if="iframeStatus == false">
              <div class="col-12">
                <div class="bradcumb-main">
                  <ul>
                    <li class="home">
                      <a v-if="iframeStatus && data.package_id && form.affiliate_id" :href="`${baseUrl}?tid=${data.tenant_id}&oid=${data.tour_operator_id}&pid=${data.package_id}&aid=${form.affiliate_id}&iframe=${iframeStatus}`">
                          Home
                      </a>
                      <a v-else-if="iframeStatus && data.package_id" :href="`${baseUrl}?tid=${data.tenant_id}&oid=${data.tour_operator_id}&pid=${data.package_id}&iframe=${iframeStatus}`">
                          Home
                      </a>
                      <a v-else :href="`${baseUrl}`">
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
            </div> -->
            <!-- <div class="row innerbanner-row"
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
                          title=""><img src="../assets/images/info.png" /></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> -->
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
                        title="">
                        Secured
                      </button>
                      <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top"
                        title="">
                        Health & Safety
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row m-2">
	                <h4 class="mx-auto my-2">Your tour packages details</h4>
                  <div class="col-12">
                    <div class="tour-packages-wrap">
                      <div class="tour-packages-item" v-for="item in cartItem" :key="item.tour_slot_id">
                        <div class="tour-packages-inner-wrap">
                          <div class="tour-packages-inner">
                            <div class="tour-packages-detail">
                              <div class="tour-packages-image"><img :src="item.package_image" alt="package-item-image"></div>
                              <div class="tour-packages-title-wrap">
                                <div class="tour-packages-title-top">{{ dateFormat(item.date) }} @ {{ item.time_date }}</div>
                                <div class="tour-packages-title">{{ item.package_name }}</div>
                                <div class="cancelling-policy-wrap">
                                  <div class="cancelling-policy-title">Cancelling policy</div>
                                  <div class="cancelling-policy-detail">Up to 2 days before tour date</div>
                                </div>
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
                                    <div class="tour-packages-selected-people-count"><input type="text" name="count" :value="pax"></div>
                                  </div>
                                </div>
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
                              <div class="tour-packages-action-btn">
                                <a class="action-btn action-btn-edit" href="javascript.void(0)">Coupon code</a>
                              </div>
                            </div>
                            <div class="tour-packages-couponcode-wrap">
                              <div class="tour-packages-couponcode">
                                <input type="text" name="couponcode" placeholder="Enter Code">
                                <button class="couponcode-apply-btn ms-1">Apply</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="tour-packages-totalcost">
                          <div class="tour-packages-costcount-title">Tour cost:</div>
                          <div class="tour-packages-costcount-subitem">
                            <div class="tour-packages-costcount-subitem-title">Subtotal:</div>
                            <div class="tour-packages-costcount-subitem-cost">${{ item.subtotal.toFixed(2) }}</div>
                          </div>
                          <div class="tour-packages-costcount-subitem">
                            <div class="tour-packages-costcount-subitem-title">Booking fees:</div>
                            <div class="tour-packages-costcount-subitem-cost">${{ item.fees.toFixed(2) }}</div>
                          </div>
                          <div class="tour-packages-costcount-total">
                            <div class="tour-packages-costcount-total-title">Tour Cost:</div>
                            <div class="tour-packages-costcount-total-cost">${{ item.total.toFixed(2) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="row booking-dt-sec">
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
                          {{ dateFormat(data.date) }} @ {{ data.time_date }}
                        </div>
                        <div class="booking-dt-detail-btn">
                          <a @click="mindChange">
                            <i class="fa fa-angle-left" aria-hidden="true"> Select a Different
                              Time & Date
                            </i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
                <!-- / Package List -->
                <!-- <div class="row starttime-row border-0">
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
                                  <p v-if="form.tour_package_id >= 12 && form.tour_package_id <= 15">
                                      {{ tour.description }}
                                  </p>
                                  <p v-else>
                                      Navajo Nation: Permit Fee ${{ tour.PermitFee
                                      }} & Tax ${{ tour.Tax}}
                                  </p>
                                </td>
                                <td class="group" data-label="Select Group Of People">
                                  <input type="text" :value="form.touristsArr[index]" class="form-select noarrow" />
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
                </div> -->

                <div class="row payment-form-sec">
                  <div class="col-12">

                    <div class="row">
                      <!-- <div class="col-12">
                        <span class="payment-form-notice">
                          Please fill all fields marked with <span>*</span> to
                          complete your booking
                        </span>
                      </div>
                      <div class="col-12 mb-2">
                        <div class="row">
                          <div class="col-12">
                            <div class="form-field-title">Contact</div>
                            <div class="form-field-wrp contact-form-field">
                              <div class="col-md-12">
                                <div class="form-group col-md-4">
                                  <label for="fullname" class="col-form-label">Full Name<span class="required-star">*</span></label>
                                  <div class="field-icon-wrp">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                  </div>
                                  <input type="text" id="name" name="name" v-model="form.name" class="form-control" placeholder="Your Name" />
                                </div>
                                <div class="form-group col-md-4">
                                  <div class="phone-wrap">
                                    <label for="phonenumber" class="col-form-label">Phone Number<span class="required-star">*</span></label>
                                    <div class="field-icon-wrp">
                                      <i class="fa fa-phone" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" id="phonenumber" name="phone_number" v-model="form.phone_number" v-mask="'###############'" class="form-control" placeholder="Your Contact Number" />
                                  </div>
                                </div>
                                <div class="form-group col-md-4">
                                  <label for="Email" class="col-form-label">Email Address<span class="required-star">*</span></label>
                                  <div class="field-icon-wrp">
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                  </div>
                                  <input type="email" id="emailaddress" name="email" v-model="form.email" class="form-control" placeholder="Your Email Address" />
                                </div>
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
                              Terms of Service
                            </div>
                            <div class="form-field-wrp contact-form-field">
                              <div class="form-group col-12">
                                <div class="policy-item-wrp">
                                  <h5 class="card-label-text-left mb-2">
                                    Cancellation policy
                                  </h5>
                                  <ul>
                                    <li>
                                      We offer cancellations on purchases made of the services offered on our Website. We offer cancellations only prior to performance of the service. You may cancel your order by contacting us via email or phone.
                                    </li>
                                    <li>
                                      We reserve the right to cancel your purchase for any reason, at our sole discretion, including but not limited to fraud, inaccuracies, and unavailability of the items or services purchased. We will let you know immediately if we plan on canceling your purchase.
                                    </li>
                                    <li>
                                      We will issue a partial refund of the purchase price that you paid if we cancel your purchase.
                                    </li>
                                  </ul>

                                  <h5 class="card-label-text-left mb-2">
                                    Refund policy
                                  </h5>
                                  <ul>
                                    <li>
                                      We offer full refunds of ticket price (not booking fees) made of the services offered on our Website. Booking Fees are non-refundable. To qualify for a full refund of the ticket price, you must submit your request to us via phone or email 48 hours prior to the day you booked for. If your booking is canceled within the 48 hour timeframe of your tour, you may be eligible for a 50% refund. If you miss your tour for any reason, you will not be given a refund.
                                    </li>
                                    <li>
                                      In the event that tours are canceled due to weather or unforeseen circumstances, you will receive a full refund.
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
                      <div v-if="selectedHotel" class="col-12 mb-4 hotel-section">
                        <div class="col-12">
                          <div class="hotel-wrapper d-flex">
                            <div class="hotel-image">
                              <img :src="selectedHotel.image" :alt="selectedHotel.name">
                            </div>
                            <div class="hotel-detail w-100">
                              <div class="hotel-title">Hotel Pickup Location:</div>
                              <div class="hotel-name">{{ selectedHotel.name }}</div>
                              <div class="hotel-detail-address">{{ selectedHotel.address }}</div>
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
                        <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif"
                          alt="processing..." />
                      </div> -->

                      <div class="col-12 total-cost-col">
                        <!-- <div class="row mb-2">
                          <div class="col-6 text-start"></div>
                          <div class="form-group col-6 text-end d-flex align-items-center justify-content-end">
                            <input @keyup="addCouponCode" class="form-control form-control-sm me-1 pe-0" type="text" id="couponCode" placeholder="Coupon Code" style="max-width: 180px;">
                            <button type="button" @click="applyCoupon" id="applyCouponButton" class="btn btn-sm btn-primary" style="padding: 2px 7px 5px 7px;">Apply</button>
                          </div>
                          <p class="text-end" v-if="couponSuccess.length">
                            <ul>
                              <li v-for="success in couponSuccess" :key="success" v-bind:class="{'text-success': success }">{{ success }}</li>
                            </ul>
                          </p>
                          <p class="text-end" v-if="couponErrors.length">
                            <ul>
                              <li v-for="error in couponErrors" :key="error" v-bind:class="{'text-danger': error }">{{ error }}</li>
                            </ul>
                          </p>
                        </div> -->

                        <div class="row subtotal" v-if="subtotal">
                          <div class="col-6 text-start">Ticket Cost:</div>
                          <div class="col-6 text-end">
                            $<label class="ticket_cost">{{ subtotal.toFixed(2) }}</label>
                          </div>
                        </div>

                        <div class="row subtotal" v-if="1">
                          <div class="col-6 text-start">Discount:</div>
                          <div class="col-6 text-end">
                            <span v-if="0">({{ 0 }}%)</span>
                            $<label class="discount2_value">{{ 0 }}</label>
                          </div>
                        </div>

                        <div class="row fees">
                          <div class="col-6 text-start">Booking Fees:</div>
                          <div class="col-6 text-end">
                            ${{ fees.toFixed(2) }}
                          </div>
                        </div>
                        <div class="row totalcost">
                          <div class="col-6 text-start">
                            Total Cost:
                          </div>
                          <div class="col-6 text-end">
                            $<label class="grandtotalfinal">{{ total.toFixed(2) }}</label>
                          </div>
                        </div>
                      </div>

                      <!-- <div class="col-12 mb-3">
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
                      </div> -->
                      <div class="addmore-package-wrap p-0">
                        <div class="addmore-package-btn-wrap">
                          <button class="btn addmore-package-btn" @click="mindChange()" type="button">+ Add more packages</button>
                          <div class="checkout-btn-wrap">
                            <button class="btn checkout-btn" type="button">Proceed to Checkout</button>						
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
import Swal from 'sweetalert2'
import { loadStripe } from '@stripe/stripe-js';
import { mask } from 'vue-the-mask';
import { getUTCDateFromTimeZone } from '../utils/dateUtils';
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
      iframeStatus: false,
      // TourPkgName: '',
      // data: [],
      details: [],
      // hotels: [],
      // selectedHotel: null,
      // with_rate_groups: 1,
      cartItem: {},
      cartItemLength: 0,
      // form: {
      //   name: "",
      //   phone_number: "",
      //   email: "",
      //   getemailupdates: "",
      //   cancellations_policy: "",
      //   comment: "",
      //   cardnumber: "",
      //   nameoncard: "",
      //   expiration: "",
      //   cvv: "",
        // tour_operator_id: "",
        // tour_package_id: "",
        // affiliate_id: "",
        // hotel_id: "",
        // total: "",
        // touristsArr: "",
        // tourists: "",
        // cost: [],
        // tour_slot_id: "",
        // calucation: "",
        // service_commission: "",
        // date: "",
        // time: "",
        // code: "",
        // tour_promotion_id: "",
        // discount2_value: 0,
        // discount2_percentage: 0,
      // },
      errors: [],
      // couponErrors: [],
      // couponSuccess: [],
      // price: "",
      // ticket_cost: 0,
      subtotal: 0,
      fees: 0,
      total: 0,
      // softwarefee: "",
      message: "",
      stripe: "",
      elements: "",
      cardElement: null,
      stripeValidationError: "",
      state: 'initial'
    };
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
    this.createAndMountFormElements();
  },
  created() {
    this.cartItem = this.$store.state.cartItem;
    this.cartItemLength = Object.values(this.cartItem).length;
    if (this.cartItemLength) {
      for (var key in this.cartItem) {
        this.subtotal = this.subtotal + this.cartItem[key].subtotal;
        this.fees = this.fees + this.cartItem[key].fees;
        this.total = this.total + this.cartItem[key].total;
      }
    } else {
      window.location.href = '/';
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
              window.location.href = '/';
            }
          });

          this.subtotal = 0;
          this.fees = 0;
          this.total = 0;
          for (var key in this.cartItem) {
            this.subtotal = this.subtotal + this.cartItem[key].subtotal;
            this.fees = this.fees + this.cartItem[key].fees;
            this.total = this.total + this.cartItem[key].total;
          }
        }
      });
    },
    submit(e) {
      e.preventDefault();
      // if an async request is processing
      if (this.processing === true) {
        return;
      }
      // set the async state
      this.processing = true;
      var loader = this.$loading.show();
      this.errors = [];
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
        this.$store.state.slotId &&
        this.form.name &&
        this.form.phone_number &&
        this.form.email &&
        this.form.cancellations_policy &&
        this.form.cardnumber &&
        this.form.expiration &&
        this.form.cvv
      ) {
        let checkSlotarr = {
          'tour_slot_id': this.$store.state.slotId,
          'package_id': this.form.tour_package_id,
          'affiliate_id': this.form.affiliate_id,
          'tourists': this.form.touristsArr,
          'tour_slot_time': this.form.time
        };
        axios.post("/available-seats", checkSlotarr).then((response) => {
          if (response.data.success == "false") {
            this.processLoader(loader);
            this.message = response.data.message;
            return true;
          } else {
            let self = this;
            let router = this.$router;
            axios.post("/booking-tour", this.form).then((response) => {
              this.$store.dispatch('storeCustomer', this.form);
              if (response.data.success == "false") {
                self.processLoader(loader);
                this.message = response.data.message;
                return true;
              } else if (response.data.clientSecret) {
                this.stripe
                  .confirmCardPayment(response.data.clientSecret)
                  .then(function () {
                    self.bookingId = response.data.bookingId;
                    self.$store.dispatch('storeBookingId', self.bookingId)
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
                this.$store.dispatch('storeBookingId', this.bookingId);
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
    addCouponCode() {
      this.state = 'initial';
      this.ticket_cost = 0;
      this.form.tour_promotion_id = "";
      this.form.discount2_value = 0;
      this.form.discount2_percentage = 0;
      this.couponSuccess = [];
      this.couponErrors = [];
      $('#applyCouponButton').text('Apply').removeClass('btn-success').addClass('btn-primary').attr('disabled', false);
    },
    applyCoupon() {
      this.processing = true;
      var loader = this.$loading.show();
      this.form.code = document.querySelector("#couponCode").value;

      this.couponSuccess = [];
      this.couponErrors = [];
      if (!this.form.code) {
        this.couponErrors.push("To receive a discount, please enter the promo code.");
        this.processLoader(loader);
      } else {
        let self = this;
        axios.get("/apply-coupon/" + this.form.tour_package_id + "/" + this.form.code).then((response) => {
          this.state = 'changed';

          var promocode = response.data.data;
          var ticketCost = this.subtotal;
          var subtotal = this.subtotal;
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
            this.form.discount2_percentage = discount2Percentage;
            this.subtotal = subtotal;
            this.ticket_cost = ticketCost;
            this.form.tour_promotion_id = promocode.id;
            this.form.discount2_value = Number(discountedAmount).toFixed(2);
            this.softwarefee = this.roundout(this.subtotal * this.fees / 100, 2);
            this.form.service_commission = this.softwarefee;
            var total = Number(this.subtotal) + Number(this.softwarefee);
            this.total = Number(total).toFixed(2);
            this.form.total = this.total;

            $('#applyCouponButton').text('Applied').removeClass('btn-primary').addClass('btn-success').attr('disabled', true);
            this.couponSuccess.push(response.data.message);
          }

          this.processLoader(loader);
        }).catch(function (error) {
          self.state = 'initial';
          self.ticket_cost = 0;
          self.form.tour_promotion_id = "";
          self.form.discount2_value = 0;
          self.form.discount2_percentage = 0;
          self.processLoader(loader);
          if (error.response) {
            self.couponErrors.push(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
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