<template>
    <form @submit.prevent="submit" data-testid="tour-form">
        <div class="schedule-container-3col">
            <!-- Left Column: Select Date -->
            <div class="schedule-column">
                <h3 class="schedule-section-title">Select Date</h3>
                <div class="calendar-wrapper">
                    <CustomCalendar v-model="form.date" @selected="selectedDate" :form="form" />
                </div>
            </div>

            <!-- Middle Column: Available Times -->
            <div class="schedule-column">
                <div v-if="staticDateRange(form.date, form.tenant_id)">
                    <h3 class="schedule-section-title">Available Times</h3>
                    <div class="alert-message">
                        Canyon is closed for repairs. Please select another day.
                    </div>
                </div>
                <div v-else-if="begins">
                    <h3 class="schedule-section-title">Available Times</h3>
                    <div class="alert-message">
                        Exciting News! Our Tour Begins on {{ begins }}.
                    </div>
                </div>
                <div v-else-if="slotNotFound && dateTimeArr.length === 0">
                    <h3 class="schedule-section-title">Available Times</h3>
                    <div class="alert-message">
                        Apologies, No slots available on your chosen date.
                    </div>
                </div>
                <div v-else-if="form.package_has_slots && !begins && !staticDateRange(form.date, form.tenant_id) && dateTimeArr.length > 0">
                    <h3 class="schedule-section-title">Available Times</h3>
                    <div class="time-slots-list">
                        <div v-for="slot in dateTimeArr" :key="slot.Id" 
                            class="time-slot-item" 
                            :class="{
                                'selected': slot.Id === form.tour_slot_id,
                                'disabled': isDisabled(slot),
                                'sold-out': !callToBookValidation(slot, false) && !callToBookValidation(slot, true)
                            }" 
                            v-show="slot.visible" 
                            @click="callToBookValidation(slot, true) ? openPhonePopup(slot) : selectedSlot(slot.Id, slot.Time, slot.slot_time)"
                            :data-testid="`time-slot-${slot.Id}`">
                            <div class="time-slot-left">
                                <span class="time-icon">🕐</span>
                                <span class="time-text">{{ slot.Time }}</span>
                            </div>
                            <div class="time-slot-right">
                                <span v-if="callToBookValidation(slot, false) && form.show_seat_availability" class="seats-badge">
                                    {{ slot.seats - slot.dd }} left
                                </span>
                                <span v-else-if="callToBookValidation(slot, true)" class="call-badge">
                                    CALL TO BOOK
                                </span>
                                <span v-else-if="form.show_seat_availability" class="soldout-badge">
                                    <span v-if="staticDateRange(form.date, form.tenant_id)">CLOSED</span>
                                    <span v-else>Sold Out</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Booking Summary -->
            <div class="schedule-column">
                <h3 class="schedule-section-title">Booking Summary</h3>
                <div class="booking-summary-content">
                    <!-- Tour Details Card -->
                    <div v-if="tourPackageData && tourPackageData.length > 0" class="tour-summary-card">
                        <div class="tour-summary-image">
                            <img v-if="form.package_image" :src="form.package_image" :alt="form.package_name" />
                            <div v-else class="tour-summary-placeholder">NO IMAGE</div>
                        </div>
                        <div class="tour-summary-info">
                            <h4 class="tour-summary-title">{{ form.package_name || tourPackageName }}</h4>
                            <div class="tour-summary-meta">
                                <span v-if="tourPackageData[0]?.duration">{{ tourPackageData[0].duration }}</span>
                                <span v-if="tourPackageData[0]?.age_range">• For {{ tourPackageData[0].age_range }}</span>
                                <span v-if="tourPackageData[0]?.tag">• {{ tourPackageData[0].tag }}</span>
                            </div>
                            <div class="tour-summary-price">
                                From {{ currencyFormat(tourPackageData[0]?.base_rate || form.selectedRate) }} (per guest)
                            </div>
                        </div>
                    </div>

                    <!-- Selected Details -->
                    <div v-if="form.date && form.time_date" class="selected-details">
                        <div class="selected-detail-row">
                            <span class="detail-icon">📅</span>
                            <div>
                                <div class="detail-label">Date:</div>
                                <div class="detail-value">{{ formatDate(form.date) }}</div>
                            </div>
                        </div>
                        <div class="selected-detail-row">
                            <span class="detail-icon">🕐</span>
                            <div>
                                <div class="detail-label">Time:</div>
                                <div class="detail-value">{{ form.time_date }}</div>
                            </div>
                        </div>
                        <div class="selected-detail-row">
                            <span class="detail-icon">👥</span>
                            <div>
                                <div class="detail-label">Guest:</div>
                                <div class="detail-value">{{ form.total_people_selected }} {{ form?.type === 'Watercraft' ? 'Kayak' : 'People' }}</div>
                            </div>
                        </div>
                    </div>

                    <div v-if="reveal && tourPackageName" class="guest-selection-summary">
                        <div v-if="is_group_rate_enabled" class="guest-select-group">
                            <div class="guest-info">
                                <span class="guest-label">Guests</span>
                                <span class="guest-price">Navajo Nation Tax: {{ currencyFormat(form.selectedTax) }}</span>
                            </div>
                            <select class="guest-select" v-model="form.selectedSize" @change="handleGroupRateDiscountChange" data-testid="group-rate-select">
                                <option v-for="group in tourPackageRateGroups" :value="group.size" :key="group.size">
                                    {{ group.size }} - {{ currencyFormat(group.rate) }}
                                </option>
                            </select>
                        </div>

                        <div v-else class="guest-types-list">
                            <div v-for="tour in tourPackageRateGroups" :key="tour.id" class="guest-type-row">
                                <div class="guest-type-info">
                                    <div class="guest-type-name">{{ tour.rate_for }}</div>
                                    <div class="guest-type-price">{{ currencyFormat(tour.rate) }}</div>
                                    <div v-if="tour.rate_for.toLowerCase().includes('children') || tour.rate_for.toLowerCase().includes('child')" class="guest-type-age">
                                        Ages {{ tour.rate_for.includes('under') ? '3 and under' : '4 to 7' }}
                                    </div>
                                    <div v-else-if="tour.rate_for.toLowerCase().includes('adult')" class="guest-type-age">
                                        Ages 8+
                                    </div>
                                </div>
                                <div class="guest-type-counter">
                                    <button type="button" class="counter-btn-small" @click="decrement(tour.id)" aria-label="Decrement">-</button>
                                    <div class="counter-display">{{ form.counters[tour.id] ?? 0 }}</div>
                                    <button type="button" class="counter-btn-small" @click="increment(tour.id)" aria-label="Increment">+</button>
                                    <input type="hidden" :name="`people_group_${tour.id}`" :id="`people-group-${tour.id}`" :value="form.counters[tour.id] ?? 0" :data-testid="`people-group-${tour.id}`" />
                                    <select class="form-select people-group1 hidden" :name="`people_group${tour.id}`" :id="`people_group${tour.id}`" v-model="form.counters[tour.id]" hidden>
                                        <option v-for="item in selectgrouppeoples" :value="item.value" :key="item.value">{{ item.number }}</option>
                                    </select>
                                </div>

                                <div v-if="has_contacts" class="pax-container-summary">
                                    <div v-for="(pax, index) in form.paxDetails[tour.id] || []" :key="index" class="pax-card-small">
                                        <div class="pax-header-small">
                                            <span>Attendee {{ index + 1 }}</span>
                                            <button type="button" class="remove-pax-small" @click="removePax(tour.id, index)" aria-label="Remove Attendee">✖</button>
                                        </div>
                                        <div class="pax-body-small">
                                            <input type="text" :id="`name-${tour.id}-${index}`" v-model="pax.name" class="pax-input-small" placeholder="Name *" required />
                                            <input type="email" :id="`email-${tour.id}-${index}`" v-model="pax.email" class="pax-input-small" placeholder="Email *" required />
                                            <input type="tel" :id="`phone-${tour.id}-${index}`" v-model="pax.phone" class="pax-input-small" placeholder="Phone *" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="reveal && tourPackageName && form.package_id && form.package_id !== 0 && form.service_commission !== 0">
                        <CustomFields
                            ref="CustomFieldsRef"
                            :values="form.custom_fields"
                            :enabled="true"
                            :display_errors="true"
                            :display_submit="false"
                            :display_height="275"
                            :service_commission="form.service_commission"
                            @customformexists="hasCustomFormFields"
                            :endpoint="`/package/custom/form/${form.package_id}`" />
                    </div>

                    <div v-if="reveal && hotels.length" class="hotel-pickup-summary">
                        <h4 class="summary-subsection-title">Select Pickup Hotel</h4>
                        <Pickup :hotels="hotels" :form="form" />
                    </div>

                    <div ref="packageErrorDisplay" v-if="errors.length" class="error-summary">
                        <p><b>Please correct the following error(s):</b></p>
                        <ul class="following-error">
                            <li v-for="(error, idx) in errors" :key="`error-${idx}`" class="text-danger">
                                {{ error }}
                            </li>
                        </ul>
                    </div>

                    <!-- Pricing Breakdown -->
                    <div v-if="form.subtotal > 0" class="pricing-breakdown">
                        <div class="pricing-row">
                            <span>Subtotal ({{ form.total_people_selected }}×)</span>
                            <span>{{ currencyFormat(form.subtotal) }}</span>
                        </div>
                        <div class="pricing-row">
                            <span>Taxes & Fees</span>
                            <span>{{ currencyFormat(form.fees) }}</span>
                        </div>
                        <div class="pricing-total">
                            <span>Total</span>
                            <span>{{ currencyFormat(form.total) }}</span>
                        </div>
                    </div>

                    <div class="summary-totals">
                        <button type="submit" class="btn-continue-summary">Continue →</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { formatCurrencyIntl } from '../../utils/currency';
import CustomFields from './../Forms/CustomFields.vue';
import Pickup from './../Hotel/Pickup.vue';
import CustomCalendar from './CustomCalendar.vue';

export default {
    name: 'TourForm',
    components: {
        CustomCalendar,
        CustomFields,
        Pickup
    },
    props: [
        'form',
        'begins',
        'slotNotFound',
        'dateTimeArr',
        'reveal',
        'tourPackageName',
        'tourPackageData',
        'hotels',
        'errors',
        'is_group_rate_enabled',
        'tourPackageRateGroups',
        'selectgrouppeoples',
        'has_contacts',
        'staticDateRange',
        'selectedDate',
        'callToBookValidation',
        'openPhonePopup',
        'selectedSlot',
        'isDisabled',
        'handleGroupRateDiscountChange',
        'increment',
        'decrement',
        'updatePaxDetail',
        'removePax',
        'hasCustomFormFields',
        'submit'
    ],
    methods: {
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
        formatDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
    }
};
</script>
