<template>
    <div class="thankyou-page">
        <div class="thankyou-container">
            <!-- Success Header -->
            <div class="success-header">
                <div class="success-icon">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="40" fill="url(#successGradient)" />
                        <path d="M25 40L35 50L55 30" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <defs>
                            <linearGradient id="successGradient" x1="0" y1="0" x2="80" y2="80">
                                <stop offset="0%" style="stop-color: var(--primary-teal);" />
                                <stop offset="100%" style="stop-color: var(--primary-teal-light);" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 class="success-title">Booking Confirmed!</h1>
                <p class="success-subtitle">Your adventure awaits! We've sent a confirmation email with all the details.</p>
            </div>

            <div v-if="tourBooking.data" class="confirmation-content">
                <!-- Customer Information Card -->
                <div class="info-card customer-card">
                    <h2 class="card-title">Hello {{ customer.name }}! 👋</h2>
                    <p class="card-subtitle">Thank you for your booking. Here are your contact details:</p>
                    
                    <div class="contact-grid">
                        <div class="contact-item">
                            <div class="contact-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div class="contact-details">
                                <div class="contact-label">Full Name</div>
                                <div class="contact-value">{{ customer.name }}</div>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div class="contact-details">
                                <div class="contact-label">Email Address</div>
                                <div class="contact-value">{{ customer.email }}</div>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div class="contact-details">
                                <div class="contact-label">Phone Number</div>
                                <div class="contact-value">{{ customer.phone_number }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Booking Summary Section -->
                <div class="section-header">
                    <h2 class="section-title">Your Booking Summary</h2>
                </div>

                <!-- Booking Cards -->
                <div v-for="(booking, index) in tourBooking.data" :key="booking.id" class="booking-card">
                    <div class="booking-header">
                        <div class="booking-id-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            Booking ID #{{ booking.id }}
                        </div>
                        <h3 class="booking-package-name">{{ booking.package_name }}</h3>
                    </div>

                    <div class="booking-details-grid">
                        <div class="detail-item">
                            <div class="detail-icon">📅</div>
                            <div class="detail-content">
                                <div class="detail-label">Date</div>
                                <div class="detail-value">{{ formatDate(booking.date) }}</div>
                            </div>
                        </div>
                        
                        <div v-if="booking.package_has_slots" class="detail-item">
                            <div class="detail-icon">🕐</div>
                            <div class="detail-content">
                                <div class="detail-label">Time</div>
                                <div class="detail-value">{{ booking.time }}</div>
                            </div>
                        </div>
                        
                        <div v-if="booking.hotel_id" class="detail-item full-width">
                            <div class="detail-icon">🏨</div>
                            <div class="detail-content">
                                <div class="detail-label">Hotel Pickup</div>
                                <div class="detail-value">{{ booking.hotel_name }}</div>
                                <div class="detail-address">{{ booking.hotel_address }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Guests Table -->
                    <div class="guests-section">
                        <h4 class="guests-title">Guests ({{ booking.tourists }} total)</h4>
                        <div class="guests-table">
                            <div class="guests-header">
                                <div class="col-type">Type</div>
                                <div class="col-rate">Rate</div>
                                <div v-if="booking.package_has_slots" class="col-fees">Fees</div>
                                <div class="col-total">Total</div>
                            </div>
                            <div v-for="rate in booking.tourPackageRates" :key="rate.id" class="guests-row">
                                <div class="col-type">{{ rate.tourists }}</div>
                                <div class="col-rate">{{ currencyFormat(rate.rate) }}</div>
                                <div v-if="booking.package_has_slots" class="col-fees">{{ currencyFormat(rate.fees) }}</div>
                                <div class="col-total">{{ currencyFormat(rate.total) }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Pricing Breakdown -->
                    <div class="pricing-breakdown">
                        <div class="pricing-row">
                            <span>{{ booking.discount2_value > 0 ? 'Ticket Cost' : 'Subtotal' }}</span>
                            <span>{{ currencyFormat(booking.subtotal) }}</span>
                        </div>
                        
                        <div v-if="booking.discount2_value > 0" class="pricing-row discount-row">
                            <span>
                                Discount
                                <span v-if="booking.discount2_percentage > 0" class="discount-percent">({{ booking.discount2_percentage }}%)</span>
                            </span>
                            <span class="discount-amount">-{{ currencyFormat(booking.discount2_value) }}</span>
                        </div>
                        
                        <div v-if="booking.discount2_value > 0" class="pricing-row">
                            <span>Subtotal After Discount</span>
                            <span>{{ currencyFormat(booking.subtotal - booking.discount2_value) }}</span>
                        </div>

                        <div v-if="booking.tourBookingAddons?.length" class="addons-section">
                            <div class="addons-header">Add-ons:</div>
                            <div v-for="addon in booking.tourBookingAddons" :key="addon.id" class="pricing-row addon-row">
                                <span>{{ addon.name }}</span>
                                <span>{{ currencyFormat(addon.price) }}</span>
                            </div>
                        </div>

                        <div class="pricing-row">
                            <span>Booking Fees</span>
                            <span>{{ currencyFormat(Number(booking.service_commission) + Number(booking.addons_fee)) }}</span>
                        </div>
                        
                        <div class="pricing-total">
                            <span>Booking Total</span>
                            <span>{{ currencyFormat((Number(booking.subtotal) - Number(booking.discount2_value)) + Number(booking.service_commission) + Number(booking.addons_total) + Number(booking.addons_fee)) }}</span>
                        </div>
                        <div class="tax-note">(inclusive all taxes)</div>
                    </div>
                </div>

                <!-- Help Section -->
                <div v-if="tourBooking?.data[0]?.company_number" class="help-card">
                    <div class="help-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div class="help-content">
                        <h3 class="help-title">Need Help?</h3>
                        <p class="help-text">
                            For any questions or assistance, please call us at:
                            <a :href="'tel:' + tourBooking.data[0].company_number" class="help-phone">
                                {{ tourBooking.data[0].company_number }}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { formatCurrencyIntl } from '../utils/currency';
import { getMomentTimezone } from '../utils/dateUtils';

export default {
    name: "Thankyou",
    title: "Booking Confirmation - Native American Tours",
    data() {
        return {
            tenantId: 0,
            iframeStatus: 0,
            id: [],
            idLength: 0,
            tourBooking: {
                details: [],
                baseUrl: process.env.VUE_APP_BASE_URL,
                data: [],
            },
            customer: {},
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
            const loader = this.$loading.show();
            const payload = { ...this.id };

            axios.post("/package-booking-confirmed", { ids: payload }).then((response) => {
                this.tourBooking = response.data;
                
                // Push booking success event to GTM
                if (window.dataLayer) {
                    const bookingData = this.tourBooking.data[0];
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
            }).catch((error) => {
                console.error('Error fetching booking confirmation:', error);
                this.processLoader(loader);
            });
        },
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
        formatDate(date) {
            return getMomentTimezone(this.$store.state.timezone, date).format('dddd, MMMM D, YYYY');
        },
        processLoader(loader) {
            loader.hide();
        },
    },
};
</script>

<style scoped>
.thankyou-page {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--neutral-50) 0%, white 100%);
    padding: var(--space-8) var(--space-6);
}

.thankyou-container {
    max-width: 1000px;
    margin: 0 auto;
}

/* Success Header */
.success-header {
    text-align: center;
    margin-bottom: var(--space-10);
    padding: var(--space-8) var(--space-6);
}

.success-icon {
    display: inline-block;
    margin-bottom: var(--space-6);
    animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.success-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-3) 0;
}

.success-subtitle {
    font-size: var(--text-lg);
    color: var(--neutral-600);
    margin: 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.confirmation-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

/* Info Cards */
.info-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--neutral-200);
}

.card-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-2) 0;
}

.card-subtitle {
    font-size: var(--text-base);
    color: var(--neutral-600);
    margin: 0 0 var(--space-6) 0;
}

/* Contact Grid */
.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-5);
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
}

.contact-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-light));
    border-radius: var(--radius-lg);
    color: white;
}

.contact-details {
    flex: 1;
}

.contact-label {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--neutral-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-1);
}

.contact-value {
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    color: var(--neutral-900);
}

/* Section Header */
.section-header {
    margin: var(--space-8) 0 var(--space-4) 0;
}

.section-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0;
}

/* Booking Card */
.booking-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--neutral-200);
}

.booking-header {
    padding-bottom: var(--space-5);
    border-bottom: 2px solid var(--neutral-100);
    margin-bottom: var(--space-5);
}

.booking-id-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-light));
    color: white;
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-3);
}

.booking-package-name {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0;
}

/* Booking Details Grid */
.booking-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-6);
}

.detail-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
}

.detail-item.full-width {
    grid-column: 1 / -1;
}

.detail-icon {
    font-size: var(--text-2xl);
    line-height: 1;
}

.detail-content {
    flex: 1;
}

.detail-label {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--neutral-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-1);
}

.detail-value {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
}

.detail-address {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    margin-top: var(--space-1);
}

/* Guests Section */
.guests-section {
    margin: var(--space-6) 0;
}

.guests-title {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-4) 0;
}

.guests-table {
    border: 1px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.guests-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-light));
    color: white;
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
}

.guests-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border-top: 1px solid var(--neutral-200);
    background: white;
    font-size: var(--text-sm);
}

.guests-row:nth-child(even) {
    background: var(--neutral-50);
}

.col-type, .col-rate, .col-fees, .col-total {
    display: flex;
    align-items: center;
}

/* Pricing Breakdown */
.pricing-breakdown {
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    margin-top: var(--space-6);
}

.pricing-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3) 0;
    font-size: var(--text-base);
    color: var(--neutral-700);
    border-bottom: 1px solid var(--neutral-200);
}

.pricing-row:last-of-type {
    border-bottom: none;
}

.discount-row {
    color: var(--primary-terracotta);
}

.discount-percent {
    font-size: var(--text-sm);
    margin-left: var(--space-1);
}

.discount-amount {
    color: var(--primary-terracotta);
    font-weight: var(--font-semibold);
}

.addons-section {
    margin: var(--space-4) 0;
    padding: var(--space-4) 0;
    border-top: 1px dashed var(--neutral-300);
    border-bottom: 1px dashed var(--neutral-300);
}

.addons-header {
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    color: var(--neutral-500);
    text-transform: uppercase;
    margin-bottom: var(--space-2);
}

.addon-row {
    font-size: var(--text-sm);
    padding: var(--space-2) 0;
    border: none;
}

.pricing-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-4);
    margin-top: var(--space-3);
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-light));
    border-radius: var(--radius-lg);
    color: white;
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
}

.tax-note {
    font-size: var(--text-xs);
    color: var(--neutral-500);
    text-align: right;
    margin-top: var(--space-2);
}

/* Help Card */
.help-card {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    background: linear-gradient(135deg, var(--primary-amber-light) 0%, var(--primary-amber) 100%);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    margin-top: var(--space-6);
}

.help-icon {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: var(--radius-full);
    color: var(--primary-amber);
}

.help-content {
    flex: 1;
}

.help-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: white;
    margin: 0 0 var(--space-2) 0;
}

.help-text {
    font-size: var(--text-base);
    color: white;
    margin: 0;
    opacity: 0.95;
}

.help-phone {
    color: white;
    font-weight: var(--font-bold);
    text-decoration: none;
    border-bottom: 2px solid white;
    transition: opacity 0.2s;
}

.help-phone:hover {
    opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 768px) {
    .thankyou-page {
        padding: var(--space-6) var(--space-4);
    }

    .success-title {
        font-size: var(--text-3xl);
    }

    .success-subtitle {
        font-size: var(--text-base);
    }

    .contact-grid {
        grid-template-columns: 1fr;
    }

    .booking-details-grid {
        grid-template-columns: 1fr;
    }

    .guests-header,
    .guests-row {
        grid-template-columns: 2fr 1fr 1fr;
        font-size: var(--text-xs);
    }

    .col-fees {
        display: none;
    }

    .help-card {
        flex-direction: column;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .success-icon svg {
        width: 60px;
        height: 60px;
    }

    .success-title {
        font-size: var(--text-2xl);
    }

    .card-title {
        font-size: var(--text-xl);
    }
}
</style>
