<template>
	<section class="inner-content-section">
		<div :class="['no-container']">
			<div class="background-color-sec">
				<div class="row">
					<div class="col-12">
						<div :class="['row thankyou-main-row iframe-row']">
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
													<h2>Hello <span>{{ customer.name }}</span>,</h2>
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
															<div class="accordion-item"
																v-for="(tourBooking, index) in tourBooking.data">
																<h2 class="accordion-header"
																	:id="'heading-' + tourBooking.id">
																	<button
																		:class="'accordion-button ' + (index > 0 ? 'collapsed' : '')"
																		type="button" data-bs-toggle="collapse"
																		:data-bs-target="'#collapse-' + tourBooking.id"
																		:aria-expanded="(index == 0 ? true : false)"
																		:aria-controls="'collapse-' + tourBooking.id">
																		Booking ID # {{ tourBooking.id }}
																		<span class="tour-name">{{
																			tourBooking.package_name }}</span>
																	</button>
																</h2>
																<div :id="'collapse-' + tourBooking.id"
																	:class="'accordion-collapse collapse show'"
																	:aria-labelledby="'heading-' + tourBooking.id">
																	<div class="accordion-body">
																		<div class="row">
																			<div class="col-md-6">
																				<div class="details-box">
																					<h3 class="bookingdate">Booking
																						Date:</h3>
																					<p>{{ tourBooking.date }}</p>
																				</div>
																			</div>
																			<div v-if="tourBooking.package_has_slots"
																				class="col-md-6">
																				<div class="details-box">
																					<h3 class="bookingtime">Booking
																						Time:</h3>
																					<p>{{ tourBooking.time }}</p>
																				</div>
																			</div>
																			<div class="col-md-12"
																				v-if="tourBooking.hotel_id">
																				<div class="details-box">
																					<h3 class="bookinghotel">Your Hotel
																						Pickup Address:</h3>
																					<p>{{ tourBooking.hotel_name }}</p>
																					<p>{{ tourBooking.hotel_address }}
																					</p>
																				</div>
																			</div>
																		</div>
																		<div class="row">
																			<div class="col-md-12">
																				<div class="table-responsive">
																					<table class="table table-bordered">
																						<thead>
																							<tr>
																								<th scope="col"> Total
																									Booked <br>People
																									({{
																										tourBooking.tourists
																									}})
																								</th>
																								<th scope="col">Price
																									<span
																										v-if="tourBooking.is_group_rate_enabled == 0">(Per
																										Person)</span>
																								</th>
																								<th scope="col"
																									v-if="tourBooking.package_has_slots">
																									Fees and Taxes</th>
																								<th scope="col">Cost
																								</th>
																							</tr>
																						</thead>
																						<tbody
																							v-for="item in tourBooking.tourPackageRates"
																							:key="item">
																							<tr>
																								<td>{{ item.tourists }}
																								</td>
																								<td>{{
																									currencyFormat(item.rate)
																								}}
																								</td>
																								<td
																									v-if="tourBooking.package_has_slots">
																									{{ item.fees }}</td>
																								<td>{{
																									currencyFormat(item.total)
																								}}
																								</td>
																							</tr>
																						</tbody>
																					</table>
																				</div>

																				<div class="grand-total">
																					<div class="subtotal-item">
																						<div v-if="tourBooking.discount2_value > 0"
																							class="subtotal-item-title">
																							Ticket Cost:</div>
																						<div v-else
																							class="subtotal-item-title">
																							Subtotal:</div>
																						<div
																							class="subtotal-item-price">
																							{{
																								currencyFormat(tourBooking.subtotal)
																							}}</div>
																					</div>
																					<div v-if="tourBooking.discount2_value > 0"
																						class="subtotal-item">
																						<div
																							class="subtotal-item-title">
																							Discount:</div>
																						<div
																							class="subtotal-item-price">
																							<span
																								v-if="tourBooking.discount2_percentage > 0">({{
																									tourBooking.discount2_percentage
																								}}%)</span>
																							{{
																								currencyFormat(tourBooking.discount2_value)
																							}}
																						</div>
																					</div>
																					<div v-if="tourBooking.discount2_value > 0"
																						class="subtotal-item">
																						<div
																							class="subtotal-item-title">
																							Subtotal:</div>
																						<div
																							class="subtotal-item-price">
																							{{
																								currencyFormat(tourBooking.subtotal
																									-
																									tourBooking.discount2_value)
																							}}
																						</div>
																					</div>
																					<div
																						v-if="tourBooking?.tourBookingAddons?.length">
																						<div v-for="addons in tourBooking.tourBookingAddons"
																							:key="addons.id"
																							class="subtotal-item">
																							<div
																								class="subtotal-item-title">
																								{{ addons.name }}:</div>
																							<div
																								class="subtotal-item-price">
																								{{
																									currencyFormat(addons.price)
																								}}
																							</div>
																						</div>
																					</div>
																					<div class="subtotal-item">
																						<div
																							class="subtotal-item-title">
																							Booking Fees:</div>
																						<div
																							class="subtotal-item-price">
																							{{
																								currencyFormat(Number(tourBooking.service_commission)
																									+
																									Number(tourBooking.addons_fee))
																							}}</div>
																					</div>
																					<div class="subtotal-item">
																						<div
																							class="subtotal-item-title">
																							Booking Total:</div>
																						<div
																							class="subtotal-item-price">
																							{{
																								currencyFormat((Number(tourBooking.subtotal)
																									-
																									Number(tourBooking.discount2_value))
																									+
																									Number(tourBooking.service_commission)
																									+
																									Number(tourBooking.addons_total)
																									+
																									Number(tourBooking.addons_fee))
																							}} <span>(inclusive all
																								taxes)</span></div>
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
														<div class="content"
															v-if="tourBooking?.data[0]?.company_number">
															<h3>Need Help?</h3>
															<p>
																Please give us a call for any query or help at:
																<a :href="'tel:' + tourBooking.data[0].company_number">{{
																	tourBooking.data[0].company_number }}</a>
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
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import axios from "axios";
import { formatCurrencyIntl } from '../utils/currency';

export default {
	name: "Thankyou",
	data() {
		return {
			id: {},
			idLength: 0,
			tenantId: null,
			tourBooking: [],
			iframeStatus: true,
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
		this.tenantId = this.$store.state.tenantId;
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
				// 🔥 Push booking success event to GTM
				if (window.dataLayer) {
					const bookingData = this.tourBooking.data[0]; // assuming multiple but taking first
					window.dataLayer.push({
						event: "thankyou",
						booking_id: bookingData.id,
						customer_name: this.customer.name,
						customer_email: this.customer.email,
						customer_phone: this.customer.phone_number,
						tid: this.$store.state.tenantId || null,
						oid: this.$store.state.tourOperatorId || 0,
						pid: this.$store.state.packageId || 0,
						aid: this.$store.state.affiliateId || 0,
						cids: this.$store.state.comboIds || 0
					});
				}
				this.$store.dispatch('storeBookingIds', {});
				this.processLoader(loader);
			}).catch(function (error) {
				console.log(error);
				self.processLoader(loader);
			});
		},
		processLoader(loader) {
			loader.hide();
		},
		currencyFormat(amount) {
			return formatCurrencyIntl(amount, this.$store.state.currency);
		},
	},
};
</script>

<style scoped>
@import url("../assets/css/style.css");
</style>
