<template>
    <form @submit.prevent="submit" data-testid="tour-form">
        <div class="row starttime-row">
            <div class="col-12">
                <div class="row select-time">
                    <div class="col-12 col-lg-4">
                        <CustomCalendar v-model="form.date" @selected="selectedDate" :form="form" />
                    </div>

                    <div v-if="staticDateRange(form.date, form.tenant_id)" class="col-12 col-lg-8 mt-4 mt-lg-1">
                        <h3 class="watermark static-date-range">
                            Canyon is closed for repairs. Please select another day.
                        </h3>
                    </div>
                    <div v-else-if="begins" class="col-12 col-lg-8 mt-4 mt-lg-1">
                        <h3 class="watermark static-date-range">
                            Exciting News! Our Tour Begins on <br />{{ begins }}.
                        </h3>
                    </div>
                    <div v-else-if="slotNotFound && dateTimeArr.length === 0" class="col-12 col-lg-8 mt-4 mt-lg-1">
                        <h3 class="watermark static-date-range">
                            Apologies, No slots available on your chosen date.
                        </h3>
                    </div>

                    <div class="col-12 col-lg-8 mt-4 mt-lg-1">
                        <div class="accordion booking-accordion-wrap" id="accordionExample">
                            <div v-if="
                                form.package_has_slots &&
                                !begins &&
                                !staticDateRange(form.date, form.tenant_id) &&
                                dateTimeArr.length > 0
                            " class="accordion-item">
                                <div class="accordion-header" id="headingTwo">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                        Select Your Tour Time: <span>{{ form.time_date }}</span>
                                    </button>
                                </div>
                                <div id="collapseTwo" class="accordion-collapse collapse show"
                                    aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div class="accordion-body select-time-wrp">
                                        <div class="radio-toolbar">
                                            <div v-for="slot in dateTimeArr" :key="slot.Id" class="time-item" :class="{
                                                    'seats-free-label': callToBookValidation(slot, false),
                                                    'phone-label': callToBookValidation(slot, true),
                                                    'watermark-label': !callToBookValidation(slot, false) && !callToBookValidation(slot, true)
                                                }" v-show="slot.visible" @click="
                                                    callToBookValidation(slot, true)
                                                        ? openPhonePopup(slot)
                                                        : selectedSlot(slot.Id, slot.Time, slot.slot_time)
                                                    " :style="slot.Id === form.tour_slot_id
                                                        ? { backgroundColor: '#e9f7eb', borderColor: '#37d150' }
                                                        : {}
                                                    " :data-testid="`time-slot-${slot.Id}`">
                                                <label class="time-item-lable" :for="slot.Id"></label>
                                                <input type="radio" :id="slot.Id" name="time_date" :value="slot.Time"
                                                    :disabled="isDisabled(slot)" @click.stop />
                                                <span class="background-change"></span>
                                                <label :for="slot.Id">{{ slot.Time }}</label>
                                                <span v-if="callToBookValidation(slot, false)" class="seats-free">
                                                    <span v-if="form.show_seat_availability">
                                                        {{ slot.seats - slot.dd }} left!
                                                    </span>
                                                </span>
                                                <span v-else-if="callToBookValidation(slot, true)" class="phone-call">
                                                    CALL TO BOOK
                                                </span>
                                                <span v-else-if="form.show_seat_availability" class="watermark">
                                                    <span
                                                        v-if="staticDateRange(form.date, form.tenant_id)">CLOSED</span>
                                                    <span v-else>SOLD OUT</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="reveal && tourPackageName" class="accordion-item">
                                <div class="accordion-header" id="headingOne">
                                    <button
                                        :class="{ 'accordion-button': true, collapsed: form.package_has_slots !== 0 }"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                        :aria-expanded="form.package_has_slots === 0" aria-controls="collapseOne">
                                        {{ tourPackageName }}:
                                        <span>
                                            {{ form.total_people_selected }}
                                            {{ form?.type === 'Watercraft' ? 'Kayak' : 'People' }}
                                        </span>
                                    </button>
                                </div>
                                <div id="collapseOne" :class="{
                                    'accordion-collapse collapse': true,
                                    show: form.package_has_slots === 0
                                }" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body clearfix pb-1">
                                        <div v-if="is_group_rate_enabled" class="package-wrap">
                                            <div class="package-name">
                                                <div class="title">Guest's</div>
                                                <div class="price">Navajo Nation Tax: {{ currencyFormat(form.selectedTax) }}</div>
                                            </div>
                                            <div class="people-count">
                                                <div class="people">
                                                    <select class="form-select group-rate-discount"
                                                        v-model="form.selectedSize"
                                                        @change="handleGroupRateDiscountChange"
                                                        data-testid="group-rate-select">
                                                        <option v-for="group in tourPackageRateGroups"
                                                            :value="group.size" :key="group.size">
                                                            {{ group.size }} - {{ currencyFormat(group.rate) }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-else>
                                            <div v-for="tour in tourPackageRateGroups" :key="tour.id"
                                                class="package-wrap d-block">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div class="package-name">
                                                        <div class="title">{{ tour.rate_for }}</div>
                                                        <div class="price">{{ currencyFormat(tour.rate) }}</div>
                                                    </div>
                                                    <div class="people-count">
                                                        <div class="people">
                                                            <label>
                                                                {{ form?.type === 'Watercraft' ? 'Kayak' : 'People' }}
                                                            </label>
                                                            <input type="text" :name="`people_group_${tour.id}`"
                                                                :id="`people-group-${tour.id}`"
                                                                :value="form.counters[tour.id] ?? 0" readonly
                                                                :data-testid="`people-group-${tour.id}`" />
                                                        </div>
                                                        <div class="people-btn">
                                                            <button type="button" class="btn-people-count"
                                                                @click="increment(tour.id)" aria-label="Increment">
                                                                +
                                                            </button>
                                                            <button type="button" class="btn-people-count"
                                                                @click="decrement(tour.id)" aria-label="Decrement">
                                                                -
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <select class="form-select people-group1 hidden"
                                                        :name="`people_group${tour.id}`" :id="`people_group${tour.id}`"
                                                        v-model="form.counters[tour.id]" hidden>
                                                        <option v-for="item in selectgrouppeoples" :value="item.value"
                                                            :key="item.value">
                                                            {{ item.number }}
                                                        </option>
                                                    </select>
                                                </div>

                                                <div v-if="has_contacts" class="row">
                                                    <div v-for="(pax, index) in form.paxDetails[tour.id] || []"
                                                        :key="index" class="col-12 col-md-6 col-lg-4">
                                                        <div class="pax-form">
                                                            <div class="pax-header">
                                                                <span>Attendee {{ index + 1 }}</span>
                                                                <button type="button" class="remove-pax"
                                                                    @click="removePax(tour.id, index)"
                                                                    aria-label="Remove Attendee">
                                                                    ✖
                                                                </button>
                                                            </div>
                                                            <div class="pax-body">
                                                                <div class="form-group">
                                                                    <label :for="`name-${tour.id}-${index}`">
                                                                        Name <sup>*</sup>
                                                                    </label>
                                                                    <input type="text" :id="`name-${tour.id}-${index}`"
                                                                        v-model="pax.name"
                                                                        @input="updatePaxDetail(tour.id, index, 'name', pax.name)"
                                                                        placeholder="Enter name" required />
                                                                </div>
                                                                <div class="form-group">
                                                                    <label :for="`age-${tour.id}-${index}`">
                                                                        Age <sup>*</sup>
                                                                    </label>
                                                                    <input type="number" :id="`age-${tour.id}-${index}`"
                                                                        v-model.number="pax.age"
                                                                        @input="updatePaxDetail(tour.id, index, 'age', pax.age)"
                                                                        placeholder="Enter age" min="0" step="1"
                                                                        required />
                                                                </div>
                                                                <div class="form-group">
                                                                    <label :for="`weight-${tour.id}-${index}`">
                                                                        Weight <sup>*</sup>
                                                                    </label>
                                                                    <input type="number"
                                                                        :id="`weight-${tour.id}-${index}`"
                                                                        v-model.number="pax.weight"
                                                                        @input="updatePaxDetail(tour.id, index, 'weight', pax.weight)"
                                                                        placeholder="Enter weight" min="0" step="0.01"
                                                                        required />
                                                                </div>
                                                                <div class="form-group">
                                                                    <label
                                                                        :for="`note-${tour.id}-${index}`">Note</label>
                                                                    <textarea :id="`note-${tour.id}-${index}`"
                                                                        v-model="pax.note"
                                                                        @input="updatePaxDetail(tour.id, index, 'note', pax.note)"
                                                                        placeholder="Enter note"></textarea>
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

                            <div v-if="
                                reveal &&
                                tourPackageName &&
                                form.package_id &&
                                form.package_id !== 0 &&
                                form.service_commission !== 0
                            ">
                                <CustomFields ref="CustomFieldsRef" :values="form.custom_fields" :enabled="true"
                                    :display_errors="false" :display_submit="false" :display_height="275"
                                    :service_commission="form.service_commission"
                                    @customformexists="hasCustomFormFields"
                                    :endpoint="`/package/custom/form/${form.package_id}`" />
                            </div>

                            <div v-if="reveal && hotels.length" class="accordion-item">
                                <div class="accordion-header" id="headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour" aria-expanded="false"
                                        aria-controls="collapseFour">
                                        Select Pickup Hotel:
                                    </button>
                                </div>
                                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="row">
                                            <div class="col-12 custom-form-wrap">
                                                <Pickup :hotels="hotels" :form="form" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref="packageErrorDisplay">
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                    </p>
                    <ul class="following-error">
                        <li v-for="(error, idx) in errors" :key="`error-${idx}`" :class="{ 'text-danger': error }"
                            style="font-size: 25px">
                            {{ error }}
                        </li>
                    </ul>
                </div>

                <div class="starttime-row">
                    <div class="groupofpeople">
                        <div class="booknowbtn text-end">
                            <button type="submit" class="btn-continue">
                                Continue
                            </button>
                        </div>
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
import { formatMomentDate } from '../../utils/dateUtils';
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
    mounted() {
        this.form.date = formatMomentDate(this.form.date, 'YYYY-MM-DD');
    },
    methods: {
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
    }
};
</script>