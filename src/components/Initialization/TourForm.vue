<template>
    <form @submit.prevent="submit" data-testid="tour-form">
        <div class="schedule-container">
            <div class="schedule-left">
                <div class="schedule-section">
                    <h3 class="schedule-section-title">Select Date</h3>
                    <CustomCalendar v-model="form.date" @selected="selectedDate" :form="form" />
                </div>

                <div v-if="reveal && tourPackageName" class="schedule-section">
                    <h3 class="schedule-section-title">{{ tourPackageName }}</h3>
                    <div class="guest-selection">
                        <div v-if="is_group_rate_enabled" class="guest-row">
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

                        <div v-else>
                            <div v-for="tour in tourPackageRateGroups" :key="tour.id" class="guest-row">
                                <div class="guest-info">
                                    <span class="guest-label">{{ tour.rate_for }}</span>
                                    <span class="guest-price">{{ currencyFormat(tour.rate) }}</span>
                                </div>
                                <div class="guest-counter">
                                    <button type="button" class="counter-btn" @click="decrement(tour.id)" aria-label="Decrement">-</button>
                                    <input type="text" :name="`people_group_${tour.id}`" :id="`people-group-${tour.id}`" :value="form.counters[tour.id] ?? 0" readonly :data-testid="`people-group-${tour.id}`" class="counter-input" />
                                    <button type="button" class="counter-btn" @click="increment(tour.id)" aria-label="Increment">+</button>
                                    <select class="form-select people-group1 hidden" :name="`people_group${tour.id}`" :id="`people_group${tour.id}`" v-model="form.counters[tour.id]" hidden>
                                        <option v-for="item in selectgrouppeoples" :value="item.value" :key="item.value">{{ item.number }}</option>
                                    </select>
                                </div>

                                <div v-if="has_contacts" class="pax-container">
                                    <div v-for="(pax, index) in form.paxDetails[tour.id] || []" :key="index" class="pax-card">
                                        <div class="pax-header">
                                            <span>Attendee {{ index + 1 }}</span>
                                            <button type="button" class="remove-pax" @click="removePax(tour.id, index)" aria-label="Remove Attendee">✖</button>
                                        </div>
                                        <div class="pax-body">
                                            <div class="form-group">
                                                <label :for="`name-${tour.id}-${index}`">Name <sup>*</sup></label>
                                                <input type="text" :id="`name-${tour.id}-${index}`" v-model="pax.name" class="form-control" required />
                                            </div>
                                            <div class="form-group">
                                                <label :for="`email-${tour.id}-${index}`">Email <sup>*</sup></label>
                                                <input type="email" :id="`email-${tour.id}-${index}`" v-model="pax.email" class="form-control" required />
                                            </div>
                                            <div class="form-group">
                                                <label :for="`phone-${tour.id}-${index}`">Phone <sup>*</sup></label>
                                                <input type="tel" :id="`phone-${tour.id}-${index}`" v-model="pax.phone" class="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="reveal && tourPackageName && form.package_id && form.package_id !== 0 && form.service_commission !== 0" class="schedule-section">
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

                <div v-if="reveal && hotels.length" class="schedule-section">
                    <h3 class="schedule-section-title">Select Pickup Hotel</h3>
                    <Pickup :hotels="hotels" :form="form" />
                </div>
            </div>

            <div class="schedule-right">
                <div v-if="staticDateRange(form.date, form.tenant_id)" class="schedule-section">
                    <div class="alert-message">
                        Canyon is closed for repairs. Please select another day.
                    </div>
                </div>
                <div v-else-if="begins" class="schedule-section">
                    <div class="alert-message">
                        Exciting News! Our Tour Begins on {{ begins }}.
                    </div>
                </div>
                <div v-else-if="slotNotFound && dateTimeArr.length === 0" class="schedule-section">
                    <div class="alert-message">
                        Apologies, No slots available on your chosen date.
                    </div>
                </div>

                <div v-if="form.package_has_slots && !begins && !staticDateRange(form.date, form.tenant_id) && dateTimeArr.length > 0" class="schedule-section">
                    <h3 class="schedule-section-title">Available Times</h3>
                    <div class="time-slots-grid">
                        <div v-for="slot in dateTimeArr" :key="slot.Id" 
                            class="time-slot-card" 
                            :class="{
                                'selected': slot.Id === form.tour_slot_id,
                                'disabled': isDisabled(slot),
                                'sold-out': !callToBookValidation(slot, false) && !callToBookValidation(slot, true)
                            }" 
                            v-show="slot.visible" 
                            @click="callToBookValidation(slot, true) ? openPhonePopup(slot) : selectedSlot(slot.Id, slot.Time, slot.slot_time)"
                            :data-testid="`time-slot-${slot.Id}`">
                            <div class="time-slot-time">{{ slot.Time }}</div>
                            <div v-if="callToBookValidation(slot, false) && form.show_seat_availability" class="time-slot-seats">
                                {{ slot.seats - slot.dd }} seats left
                            </div>
                            <div v-else-if="callToBookValidation(slot, true)" class="time-slot-call">
                                CALL TO BOOK
                            </div>
                            <div v-else-if="form.show_seat_availability" class="time-slot-status">
                                <span v-if="staticDateRange(form.date, form.tenant_id)">CLOSED</span>
                                <span v-else>SOLD OUT</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref="packageErrorDisplay" class="schedule-section">
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                    </p>
                    <ul class="following-error">
                        <li v-for="(error, idx) in errors" :key="`error-${idx}`" :class="{ 'text-danger': error }" style="font-size: 25px">
                            {{ error }}
                        </li>
                    </ul>
                </div>

                <div class="schedule-section">
                    <button type="submit" class="btn-continue">Continue</button>
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
    }
};
</script>
