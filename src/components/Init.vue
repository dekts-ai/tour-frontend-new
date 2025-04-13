<template>
    <section v-for="tourPackageData in details.tourPackageData" :key="tourPackageData.package_id"
        :class="{ 'noiframe-inner-banner': !iframeStatus, 'iframe-inner-banner': iframeStatus }" class="banner-section"
        :style="{ backgroundImage: `url(${tourPackageData.HeaderOne})` }">
        <div class="container">
            <div class="row"></div>
        </div>
    </section>

    <section v-if="iframeStatus" class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>

    <section class="inner-content-section">
        <div :class="{ container: !iframeStatus, 'no-container': iframeStatus }">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div v-if="!iframeStatus" class="row bradcumb-row">
                            <div class="col-12">
                                <div class="bradcumb-main">
                                    <ul>
                                        <li class="home">
                                            <a :href="homeUrl"
                                                :data-testid="`home-link-${form.package_id || 'default'}`">
                                                Home
                                            </a>
                                        </li>
                                        <li>{{ tourPackageName }}</li>
                                    </ul>
                                    <div class="cloasedbtn">
                                        <img src="../assets/images/cross.png" alt="Close" />
                                    </div>
                                </div>
                                <hr class="sep1" />
                            </div>
                        </div>

                        <div class="row payment-row">
                            <div class="col-12">
                                <div v-if="!iframeStatus" class="row booking-row">
                                    <div class="col-lg-5 col-md-12">
                                        <div class="booking">
                                            <h2>Book Online</h2>
                                            <div class="confirmation">
                                                <img src="../assets/images/confirmation.png" alt="Confirmation" />
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-lg-7 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip"
                                                data-placement="top" title="Secured">
                                                Secured
                                            </button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip"
                                                data-placement="top" title="Health & Safety">
                                                Health & Safety
                                            </button>
                                            <button @click="navigateToTab(5, 'Checkout')" class="btn btn-warning"
                                                aria-label="Checkout">
                                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout
                                            </button>
                                            <button @click="navigateToTab(1, 'Index')" class="btn btn-primary mt-2"
                                                aria-label="Home">
                                                <i class="fa fa-arrow-left" aria-hidden="true"></i> Home
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <form @submit.prevent="submit" data-testid="tour-form">
                                    <div class="row starttime-row">
                                        <div class="col-12">
                                            <div class="row select-time">
                                                <div class="col-12 col-lg-4">
                                                    <datepicker v-model="form.date" :inline="true"
                                                        :disabled-dates="disabledDates"
                                                        :prevent-disable-date-selection="preventDisableDateSelection"
                                                        @selected="selectedDate" data-testid="tour-date-picker" />
                                                </div>

                                                <div v-if="staticDateRange(form.date, form.tenant_id)"
                                                    class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <h3 class="watermark static-date-range">
                                                        Canyon is closed for repairs. Please select another day.
                                                    </h3>
                                                </div>
                                                <div v-else-if="begins" class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <h3 class="watermark static-date-range">
                                                        Exciting News! Our Tour Begins on <br />{{ begins }}.
                                                    </h3>
                                                </div>
                                                <div v-else-if="slotNotFound && dateTimeArr.length === 0"
                                                    class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <h3 class="watermark static-date-range">
                                                        Apologies, No slots available on your chosen date.
                                                    </h3>
                                                </div>

                                                <div class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <div class="accordion booking-accordion-wrap" id="accordionExample">
                                                        <div v-if="
                                                            reveal &&
                                                            form.package_has_slots &&
                                                            !begins &&
                                                            !staticDateRange(form.date, form.tenant_id) &&
                                                            dateTimeArr.length > 0
                                                        " class="accordion-item">
                                                            <div class="accordion-header" id="headingTwo">
                                                                <button class="accordion-button" type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseTwo" aria-expanded="true"
                                                                    aria-controls="collapseTwo">
                                                                    Select Your Tour Time: <span>{{ form.time_date
                                                                        }}</span>
                                                                </button>
                                                            </div>
                                                            <div id="collapseTwo"
                                                                class="accordion-collapse collapse show"
                                                                aria-labelledby="headingTwo"
                                                                data-bs-parent="#accordionExample">
                                                                <div class="accordion-body select-time-wrp">
                                                                    <div class="radio-toolbar">
                                                                        <div v-for="slot in dateTimeArr" :key="slot.Id"
                                                                            class="time-item" :class="{
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
                                                                            <label class="time-item-lable"
                                                                                :for="slot.Id"></label>
                                                                            <input type="radio" :id="slot.Id"
                                                                                name="time_date" :value="slot.Time"
                                                                                :disabled="isDisabled(slot)"
                                                                                @click.stop />
                                                                            <span class="background-change"></span>
                                                                            <label :for="slot.Id">{{ slot.Time
                                                                                }}</label>
                                                                            <span
                                                                                v-if="callToBookValidation(slot, false)"
                                                                                class="seats-free">
                                                                                <span
                                                                                    v-if="form.show_seat_availability">
                                                                                    {{ slot.seats - slot.dd }} left!
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                v-else-if="callToBookValidation(slot, true)"
                                                                                class="phone-call">
                                                                                CALL TO BOOK
                                                                            </span>
                                                                            <span
                                                                                v-else-if="form.show_seat_availability"
                                                                                class="watermark">
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
                                                                    type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne"
                                                                    :aria-expanded="form.package_has_slots === 0"
                                                                    aria-controls="collapseOne">
                                                                    {{ tourPackageName }}:
                                                                    <span>
                                                                        {{ form.total_people_selected }}
                                                                        {{ form?.type === 'Watercraft' ? 'Kayak' :
                                                                        'People' }}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div id="collapseOne" :class="{
                                                                'accordion-collapse collapse': true,
                                                                show: form.package_has_slots === 0
                                                            }" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div class="accordion-body clearfix pb-1">
                                                                    <div v-if="is_group_rate_enabled"
                                                                        class="package-wrap">
                                                                        <div class="package-name">
                                                                            <div class="title">Guest's</div>
                                                                            <div class="price">Navajo Nation Tax: ${{
                                                                                form.selectedTax }}</div>
                                                                        </div>
                                                                        <div class="people-count">
                                                                            <div class="people">
                                                                                <select
                                                                                    class="form-select group-rate-discount"
                                                                                    v-model="form.selectedSize"
                                                                                    @change="handleGroupRateDiscountChange"
                                                                                    data-testid="group-rate-select">
                                                                                    <option
                                                                                        v-for="group in details.tourPackageRateGroups"
                                                                                        :value="group.size"
                                                                                        :key="group.size">
                                                                                        {{ group.size }} - ${{
                                                                                        group.rate }}
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div v-else>
                                                                        <div v-for="tour in details.tourPackageRateGroups"
                                                                            :key="tour.id" class="package-wrap d-block">
                                                                            <div
                                                                                class="d-flex justify-content-between w-100">
                                                                                <div class="package-name">
                                                                                    <div class="title">{{ tour.rate_for
                                                                                        }}</div>
                                                                                    <div class="price">${{ tour.rate }}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="people-count">
                                                                                    <div class="people">
                                                                                        <label>
                                                                                            {{ form?.type ===
                                                                                            'Watercraft' ? 'Kayak' :
                                                                                            'People' }}
                                                                                        </label>
                                                                                        <input type="text"
                                                                                            :name="`people_group_${tour.id}`"
                                                                                            :id="`people-group-${tour.id}`"
                                                                                            :value="form.counters[tour.id] ?? 0"
                                                                                            readonly
                                                                                            :data-testid="`people-group-${tour.id}`" />
                                                                                    </div>
                                                                                    <div class="people-btn">
                                                                                        <button type="button"
                                                                                            class="btn-people-count"
                                                                                            @click="increment(tour.id)"
                                                                                            aria-label="Increment">
                                                                                            +
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            class="btn-people-count"
                                                                                            @click="decrement(tour.id)"
                                                                                            aria-label="Decrement">
                                                                                            -
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <select
                                                                                    class="form-select people-group1 hidden"
                                                                                    :name="`people_group${tour.id}`"
                                                                                    :id="`people_group${tour.id}`"
                                                                                    v-model="form.counters[tour.id]"
                                                                                    hidden>
                                                                                    <option
                                                                                        v-for="item in selectgrouppeoples"
                                                                                        :value="item.value"
                                                                                        :key="item.value">
                                                                                        {{ item.number }}
                                                                                    </option>
                                                                                </select>
                                                                            </div>

                                                                            <div v-if="has_contacts" class="row">
                                                                                <div v-for="(pax, index) in form.paxDetails[tour.id] || []"
                                                                                    :key="index"
                                                                                    class="col-12 col-md-6 col-lg-4">
                                                                                    <div class="pax-form">
                                                                                        <div class="pax-header">
                                                                                            <span>Attendee {{ index + 1
                                                                                                }}</span>
                                                                                            <button type="button"
                                                                                                class="remove-pax"
                                                                                                @click="removePax(tour.id, index)"
                                                                                                aria-label="Remove Attendee">
                                                                                                ✖
                                                                                            </button>
                                                                                        </div>
                                                                                        <div class="pax-body">
                                                                                            <div class="form-group">
                                                                                                <label
                                                                                                    :for="`name-${tour.id}-${index}`">
                                                                                                    Name <sup>*</sup>
                                                                                                </label>
                                                                                                <input type="text"
                                                                                                    :id="`name-${tour.id}-${index}`"
                                                                                                    v-model="pax.name"
                                                                                                    @input="updatePaxDetail(tour.id, index, 'name', pax.name)"
                                                                                                    placeholder="Enter name"
                                                                                                    required />
                                                                                            </div>
                                                                                            <div class="form-group">
                                                                                                <label
                                                                                                    :for="`age-${tour.id}-${index}`">
                                                                                                    Age <sup>*</sup>
                                                                                                </label>
                                                                                                <input type="number"
                                                                                                    :id="`age-${tour.id}-${index}`"
                                                                                                    v-model.number="pax.age"
                                                                                                    @input="updatePaxDetail(tour.id, index, 'age', pax.age)"
                                                                                                    placeholder="Enter age"
                                                                                                    min="0" step="1"
                                                                                                    required />
                                                                                            </div>
                                                                                            <div class="form-group">
                                                                                                <label
                                                                                                    :for="`weight-${tour.id}-${index}`">
                                                                                                    Weight <sup>*</sup>
                                                                                                </label>
                                                                                                <input type="number"
                                                                                                    :id="`weight-${tour.id}-${index}`"
                                                                                                    v-model.number="pax.weight"
                                                                                                    @input="updatePaxDetail(tour.id, index, 'weight', pax.weight)"
                                                                                                    placeholder="Enter weight"
                                                                                                    min="0" step="0.01"
                                                                                                    required />
                                                                                            </div>
                                                                                            <div class="form-group">
                                                                                                <label
                                                                                                    :for="`note-${tour.id}-${index}`">Note</label>
                                                                                                <textarea
                                                                                                    :id="`note-${tour.id}-${index}`"
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
                                                            <CustomFields ref="CustomFieldsRef"
                                                                :values="form.custom_fields" :enabled="true"
                                                                :display_errors="false" :display_submit="false"
                                                                :display_height="275"
                                                                :service_commission="form.service_commission"
                                                                @customformexists="hasCustomFormFields"
                                                                :endpoint="`/package/custom/form/${form.package_id}`" />
                                                        </div>

                                                        <div v-if="reveal && hotels.length" class="accordion-item">
                                                            <div class="accordion-header" id="headingFour">
                                                                <button class="accordion-button collapsed" type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseFour" aria-expanded="false"
                                                                    aria-controls="collapseFour">
                                                                    Select Pickup Hotel:
                                                                </button>
                                                            </div>
                                                            <div id="collapseFour" class="accordion-collapse collapse"
                                                                aria-labelledby="headingFour"
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
                                                    <li v-for="(error, idx) in errors" :key="`error-${idx}`"
                                                        :class="{ 'text-danger': error }" style="font-size: 25px">
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

                                <div v-for="tourPackageData in details.tourPackageData"
                                    :key="tourPackageData.package_id" class="row permit-tax">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="images-sec">
                                            <img :src="tourPackageData.HeaderImage" :alt="tourPackageData.package_name"
                                                :data-testid="`header-image-${tourPackageData.package_id}`" />
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="content-sec">
                                            <h2>{{ tourPackageData.package_name }}</h2>
                                            <p>{{ tourPackageData.short_description }}</p>
                                            <p v-if="form?.tenant_id === 'kens'">{{ tourPackageData.long_description }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="form?.tenant_id !== 'kens'"
                                    v-for="tourPackageData in details.tourPackageData"
                                    :key="`desc-${tourPackageData.package_id}`" class="row hiking-tour-row">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="images-sec">
                                            <img :src="tourPackageData.DescriptionImage"
                                                :alt="tourPackageData.package_name"
                                                :data-testid="`desc-image-${tourPackageData.package_id}`" />
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="content-sec">
                                            <h2>{{ tourPackageData.package_name }}</h2>
                                            <p>{{ tourPackageData.long_description }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="row tour-start-row">
                                    <div v-for="tourPackageData in details.tourPackageData"
                                        :key="`duration-${tourPackageData.package_id}`"
                                        class="col-12 col-sm-12 col-md-6 duration">
                                        <h2>Duration</h2>
                                        <button class="btn-info">{{ tourPackageData.duration }}</button>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-6 whattobring">
                                        <h2>What to Bring</h2>
                                        <div class="bring-group">
                                            <button v-for="(item, key) in details.thingsToBring" :key="key"
                                                class="btn-info">
                                                {{ item }}
                                            </button>
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
import axios from 'axios';
import Datepicker from 'vuejs3-datepicker';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { getUTCDateFromTimeZone } from '../utils/dateUtils';
import CustomFields from './Forms/CustomFields.vue';
import Pickup from './Hotel/Pickup.vue';
import NavBtns from './Nav/NavBtns.vue';

export default {
    name: 'Init',
    title: 'Native American Tours',
    components: {
        Datepicker,
        CustomFields,
        Pickup,
        NavBtns
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            reveal: false,
            loaderInstance: null,
            packageOrder: [],
            comboIds: 0,
            tourPackageName: '',
            totalavailableseats: 0,
            selectgrouppeoples: [],
            details: { tourPackageData: [], tourPackageRateGroups: {}, thingsToBring: [] },
            hotels: [],
            cartItem: {},
            cartItemLength: 0,
            slotNotFound: false,
            customRateFound: false,
            disabledDates: {
                to: this.getStartDate(),
                from: this.getEndDate()
            },
            preventDisableDateSelection: true,
            dateTimeArr: [],
            begins: null,
            blockedTimes: {},
            errors: [],
            customFieldExists: false,
            form: {
                iframeStatusInfo: false,
                tenant_id: '',
                tour_operator_id: 0,
                package_id: 0,
                package_name: '',
                package_image: '',
                affiliate_id: 0,
                hotel_id: 0,
                hotel_name: '',
                hotel_image: '',
                hotel_address: '',
                timezone: 'US/Arizona',
                date: getUTCDateFromTimeZone(),
                time_date: null,
                total_people_selected: 0,
                people_group: [],
                rate_group: [],
                calucation: [],
                subtotal: 0,
                fees: 0,
                total: 0,
                addons_total: 0,
                addons_fee: 0,
                tour_slot_id: 0,
                service_commission: 0,
                tour_promotion_id: 0,
                discount2_percentage: 0,
                discount2_value: 0,
                things_to_bring: [],
                short_description: '',
                long_description: '',
                duration: '',
                slot_time: null,
                latitude: null,
                longitude: null,
                type: 'Tour',
                travel_duration: '02:00:00',
                custom_fields: null,
                before_discount_subtotal: 0,
                before_discount_fees: 0,
                before_discount_total: 0,
                selectedRateId: null,
                selectedSize: null,
                selectedRate: 0,
                selectedTax: 0,
                package_has_slots: 1,
                tax_applicable: 1,
                show_seat_availability: 1,
                block_ctb_duration: 0,
                ctb_description: '',
                call_to_book: false,
                phone_number: '',
                counters: {},
                paxDetails: {},
                paymentIntentId: null
            },
            minSeats: 0,
            maxSeats: 0,
            is_group_rate_enabled: 0,
            with_rate_groups: 1,
            has_contacts: 0,
            tabs: 2
        };
    },
    computed: {
        homeUrl() {
            const { tenant_id, tour_operator_id, package_id, affiliate_id, comboIds, iframeStatus } = this.form;
            let url = `${this.baseUrl}`;
            if (iframeStatus) {
                url += `?tid=${tenant_id}&oid=${tour_operator_id}&pid=${package_id}&cids=${comboIds}`;
                if (affiliate_id) url += `&aid=${affiliate_id}`;
                url += `&iframe=${iframeStatus}`;
            }
            return url;
        }
    },
    created() {
        this.initializeFromStore();
        this.fetchTourData(format(this.form.date, 'yyyy-MM-dd'), false);
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
        console.log('iframeStatus:', this.iframeStatus); // Debug menu visibility
    },
    methods: {
        initializeFromStore() {
            this.packageOrder = this.$store.state.packageOrder || [];
            this.comboIds = this.$store.state.comboIds ?? 0;
            this.cartItem = this.$store.state.cartItem || {};
            this.cartItemLength = Object.keys(this.cartItem).length;
            this.iframeStatus = this.$store.state.iframeStatus ?? false;

            const storedForm = this.$store.state.formData;
            if (storedForm && storedForm.package_id === this.$store.state.packageId) {
                this.form = { ...this.form, ...storedForm };
            } else {
                Object.assign(this.form, {
                    tenant_id: this.$store.state.tenantId || '',
                    tour_operator_id: this.$store.state.tourOperatorId || 0,
                    package_id: this.$store.state.packageId || 0,
                    affiliate_id: this.$store.state.affiliateId || 0,
                    tour_slot_id: 0,
                    time_date: null,
                    slot_time: null,
                    people_group: [],
                    selectedRateId: null,
                    selectedSize: null,
                    selectedRate: 0,
                    selectedTax: 0,
                    package_has_slots: 1,
                    tax_applicable: 1,
                    show_seat_availability: 1,
                    block_ctb_duration: 0,
                    ctb_description: '',
                    call_to_book: false
                });
            }

            this.form.date = this.$store.state.date
                ? new Date(this.$store.state.date)
                : this.getStartDate();
        },
        async fetchTourData(date, resetSlot = false) {
            this.processLoader(true);
            try {
                // Fetch slots
                const slotResponse = await axios.get(
                    `/tour-slot/${date}/${this.form.package_id}/${this.form.affiliate_id}`
                );
                this.begins = slotResponse.data.begins;
                let slotTimes = slotResponse.data.Time || [];

                if (slotResponse.data.closedSlotVisibility === false) {
                    slotTimes = slotTimes.filter(
                        slot => slot.bookable_status === 'Open' && slot.dd < slot.seats
                    );
                }
                this.dateTimeArr = slotTimes.map(slot => ({
                    ...slot,
                    visible: true,
                    custom_rate: slot.custom_rate || 0
                }));
                this.customRateFound = this.dateTimeArr.some(slot => slot.custom_rate !== 0);
                this.totalavailableseats = slotResponse.data.TotalAvailableSeats || 0;
                this.maxSeats = this.totalavailableseats;
                this.slotNotFound = this.dateTimeArr.length === 0;

                // Update selectgrouppeoples
                this.selectgrouppeoples = Array.from(
                    { length: this.totalavailableseats + 1 },
                    (_, i) => ({
                        id: i + 1,
                        value: i,
                        number: i
                    })
                );

                // Fetch package data if needed
                if (
                    !this.begins &&
                    !this.staticDateRange(this.form.date, this.form.tenant_id) &&
                    !this.customRateFound
                ) {
                    await this.fetchPackageData(date, resetSlot);
                } else if (this.form.tour_slot_id !== 0) {
                    await this.fetchPackageData(date, resetSlot);
                } else {
                    this.reveal = this.customRateFound;
                    this.tourPackageName = this.customRateFound ? '' : this.tourPackageName;
                }
            } catch (error) {
                this.slotNotFound = true;
                this.details.tourPackageRateGroups = {};
                this.begins = error?.response?.data?.data?.begins || null;
                this.errors.push('Failed to load tour slots.');
            } finally {
                this.processLoader(false);
            }
        },
        async fetchPackageData(date, resetSlot) {
            try {
                const response = await axios.get(
                    `/tour-package/${date}/${this.form.tour_operator_id}/${this.form.package_id}/${this.form.affiliate_id}/0/${this.with_rate_groups}/${this.form.tour_slot_id}`
                );
                this.$store.dispatch('storeTourPackage', response.data);

                const tourData = response.data.tourPackageData?.[0] || {};
                this.tourPackageName = tourData.package_name || '';
                this.details = {
                    tourPackageData: response.data.tourPackageData || [],
                    tourPackageRateGroups: response.data.tourPackageRateGroups?.[this.form.package_id] || {},
                    thingsToBring: response.data.thingsToBring || []
                };
                this.hotels = response.data.hotels || [];
                this.has_contacts = tourData.has_contacts || 0;

                Object.assign(this.form, {
                    things_to_bring: response.data.thingsToBring || [],
                    short_description: tourData.short_description || '',
                    long_description: tourData.long_description || '',
                    duration: tourData.duration || '',
                    latitude: tourData.latitude || null,
                    longitude: tourData.longitude || null,
                    type: tourData.type || 'Tour',
                    travel_duration: tourData.travel_duration || '02:00:00',
                    phone_number: tourData.phone_number || '',
                    package_has_slots: tourData.package_has_slots ?? 1,
                    tax_applicable: tourData.tax_applicable ?? 1,
                    show_seat_availability: tourData.show_seat_availability ?? 1,
                    block_ctb_duration: tourData.block_ctb_duration || 0,
                    ctb_description: tourData.ctb_description || '',
                    call_to_book: tourData.callToBook || false,
                    service_commission: this.form.affiliate_id
                        ? Number(tourData.affiliate_processing_percentage || 0)
                        : Number(tourData.service_commission_percentage || 0)
                });

                this.is_group_rate_enabled = tourData.is_group_rate_enabled || 0;
                if (this.is_group_rate_enabled) {
                    const defaultGroup = this.details.tourPackageRateGroups[0] || {};
                    Object.assign(this.form, {
                        selectedRateId: this.form.selectedRateId || defaultGroup.id,
                        selectedSize: this.form.selectedSize || defaultGroup.size,
                        selectedRate: this.form.selectedRate || defaultGroup.rate || 0,
                        selectedTax: this.form.selectedTax || defaultGroup.tax || 0,
                        total_people_selected: this.form.selectedSize || 0
                    });
                }

                if (this.comboIds && this.cartItemLength) {
                    this.updateBlockedTimes(date);
                }

                if (this.form.package_has_slots === 0 && this.dateTimeArr[0]) {
                    this.selectedSlot(
                        this.dateTimeArr[0].Id,
                        this.dateTimeArr[0].Time,
                        this.dateTimeArr[0].slot_time
                    );
                }

                this.reveal = true;
            } catch (error) {
                this.errors.push('Failed to load tour package data.');
            } finally {
                if (resetSlot) {
                    Object.assign(this.form, {
                        tour_slot_id: 0,
                        time_date: null,
                        slot_time: null,
                        people_group: [],
                        counters: {},
                        total_people_selected: 0,
                        paxDetails: {}
                    });
                }
            }
        },
        updateBlockedTimes(date) {
            this.blockedTimes = {};
            Object.values(this.cartItem).forEach(item => {
                if (item.package_id !== this.form.package_id) {
                    const packageId = item.package_id;
                    const itemDate = format(new Date(item.date), 'yyyy-MM-dd');
                    const [hours, minutes] = item.travel_duration.split(':').map(Number);
                    const timeBefore = this.calculateTime(item.slot_time, -hours, -minutes);
                    const timeAfter = this.calculateTime(item.slot_time, hours, minutes);

                    this.blockedTimes[packageId] = {
                        date: itemDate,
                        time: [timeBefore, timeAfter],
                        package_has_slots: item.package_has_slots
                    };
                }
            });

            for (const packageId in this.blockedTimes) {
                const { date: blockedDate, time, package_has_slots } = this.blockedTimes[packageId];
                if (blockedDate === date && package_has_slots) {
                    const [startTime, endTime] = time.map(t => new Date(`2000-01-01T${t}`));
                    this.dateTimeArr = this.dateTimeArr.filter(slot => {
                        const slotTime = new Date(`2000-01-01T${slot.slot_time}`);
                        return !(slotTime >= startTime && slotTime <= endTime);
                    });
                }
            }
        },
        selectedDate(date) {
            this.processLoader(true);
            this.reveal = false;
            this.customRateFound = false;
            Object.assign(this.form, {
                tour_slot_id: 0,
                time_date: null,
                slot_time: null,
                people_group: [],
                counters: {},
                total_people_selected: 0,
                paxDetails: {}
            });
            this.dateTimeArr = [];
            this.errors = [];
            this.form.date = date;
            this.fetchTourData(format(date, 'yyyy-MM-dd'), true);
        },
        handleGroupRateDiscountChange() {
            const selectedGroup = this.details.tourPackageRateGroups.find(
                group => group.size === this.form.selectedSize
            );
            if (selectedGroup) {
                Object.assign(this.form, {
                    selectedRateId: selectedGroup.id,
                    selectedRate: selectedGroup.rate,
                    selectedTax: selectedGroup.tax,
                    total_people_selected: this.form.selectedSize
                });
            }
        },
        hasCustomFormFields(exists) {
            this.customFieldExists = exists;
        },
        async submit() {
            this.errors = [];
            this.processLoader(true);
            this.form.addons_total = 0;
            this.form.addons_fee = 0;

            // Validate pax details
            if (this.has_contacts) {
                let validationPassed = true;
                this.details.tourPackageRateGroups.forEach(tour => {
                    this.form.paxDetails[tour.id] = this.form.paxDetails[tour.id] || [];
                    if (
                        this.form.counters[tour.id] &&
                        this.form.paxDetails[tour.id].length !== this.form.counters[tour.id]
                    ) {
                        this.errors.push(`Please provide details for all ${this.form.counters[tour.id]} attendees in ${tour.rate_for}.`);
                        validationPassed = false;
                    } else {
                        this.form.paxDetails[tour.id].forEach((pax, index) => {
                            if (!pax.name || !pax.age || !pax.weight) {
                                this.errors.push(`Please fill in all fields for Attendee ${index + 1} in ${tour.rate_for}.`);
                                validationPassed = false;
                            }
                        });
                    }
                });
                if (!validationPassed) {
                    this.scrollToErrors();
                    this.processLoader(false);
                    return;
                }
            }

            // Validate custom fields
            if (this.customFieldExists) {
                const customFormData = await this.$refs.CustomFieldsRef.submitForm(false);
                if (customFormData.errors.length) {
                    this.errors = [...customFormData.errors];
                } else {
                    this.form.custom_fields = customFormData.fields;
                    this.form.addons_total = this.$refs.CustomFieldsRef.sumTotal(customFormData.fields);
                    this.form.addons_fee = this.roundout(this.$refs.CustomFieldsRef.feeTotal(customFormData.fields));
                }
            }

            // Validate time selection
            if (!this.form.time_date && this.form.package_has_slots) {
                this.errors.push('Please select a start time for your tour.');
            }

            // Validate group selection
            const tourPackageRateGroups = Object.values(this.details.tourPackageRateGroups);
            if (this.validateMinMaxScenario(tourPackageRateGroups)) {
                this.scrollToErrors();
                this.processLoader(false);
                return;
            }

            // Calculate totals
            let groupPaxArr = [];
            let rateGroupArr = [];
            let paxSubtotalArr = [];
            let feesGroupArr = [];

            if (this.is_group_rate_enabled) {
                const selectedGroup = tourPackageRateGroups.find(
                    group => group.size === this.form.selectedSize
                );
                groupPaxArr.push(this.form.selectedSize);
                rateGroupArr.push(selectedGroup.rate_for);
                const subtotal = Number(
                    parseFloat(this.form.selectedRate) + parseFloat(this.form.selectedTax)
                ).toFixed(2);
                paxSubtotalArr.push(subtotal);
                const fees = this.roundout(
                    (Number(subtotal) * Number(this.form.service_commission)) / 100,
                    2
                );
                feesGroupArr.push(fees.toFixed(2));
            } else {
                tourPackageRateGroups.forEach((group, index) => {
                    const count = this.form.counters[group.id] || 0;
                    groupPaxArr.push(count);
                    rateGroupArr.push(group.rate_for);
                    const rate = Number(group.rate) + Number(group.permit_fee || 0) + Number(group.tax || 0);
                    const subtotal = count > 0 ? (count * rate).toFixed(2) : 0;
                    paxSubtotalArr.push(subtotal);
                    const fees = this.roundout((Number(rate) * Number(this.form.service_commission)) / 100, 2);
                    feesGroupArr.push(count > 0 ? (count * fees).toFixed(2) : 0);
                });
            }

            const subtotalSum = paxSubtotalArr.reduce((sum, val) => sum + Number(val), 0);
            let feesSum = feesGroupArr.reduce((sum, val) => sum + Number(val), 0);
            this.form.before_discount_subtotal = Number(subtotalSum);
            this.form.before_discount_fees = Number(feesSum);
            this.form.before_discount_total = this.roundout(subtotalSum + feesSum);

            let discountedSubtotal = subtotalSum;
            if (this.form.discount2_percentage > 0) {
                const discount = (subtotalSum * this.form.discount2_percentage) / 100;
                this.form.discount2_value = Number(discount).toFixed(2);
                discountedSubtotal = Number(subtotalSum - discount).toFixed(2);
            } else if (this.form.discount2_value > 0) {
                discountedSubtotal = Number(subtotalSum - this.form.discount2_value).toFixed(2);
            }

            feesSum = this.roundout((discountedSubtotal * this.form.service_commission) / 100, 2);
            const total = Number(discountedSubtotal) + Number(feesSum);
            this.form.subtotal = this.roundout(discountedSubtotal);
            this.form.fees = feesSum;
            this.form.total = this.roundout(total);

            if (this.form.total <= 0) {
                this.errors.push('Oops! Something went wrong. Please try again later.');
                this.scrollToErrors();
                this.processLoader(false);
                return;
            }

            if (this.errors.length === 0) {
                Object.assign(this.form, {
                    calucation: paxSubtotalArr,
                    rate_group: rateGroupArr,
                    people_group: groupPaxArr,
                    iframeStatusInfo: this.iframeStatus,
                    package_name: this.tourPackageName
                });
                await this.addToCart();
            }

            this.scrollToErrors();
            this.processLoader(false);
        },
        validateMinMaxScenario(groups) {
            if (this.is_group_rate_enabled) return false;

            const groupPaxArr = groups.map(group => this.form.counters[group.id] || 0);
            const totalPax = groupPaxArr.reduce((sum, val) => sum + Number(val), 0);

            if (totalPax === 0) {
                this.errors.push('Please select your group of people for the tour.');
            } else {
                groups.forEach(group => {
                    const count = this.form.counters[group.id] || 0;
                    if (group.min_pax_allowed > count) {
                        this.errors.push(
                            `Please select a minimum of ${group.min_pax_allowed} ${group.rate_for} people to process your booking.`
                        );
                    }
                    if (group.max_pax_allowed && group.max_pax_allowed < count) {
                        this.errors.push(
                            `Please select a maximum of ${group.max_pax_allowed} ${group.rate_for} people to process your booking.`
                        );
                    }
                });
            }

            return this.errors.length > 0;
        },
        async addToCart() {
            try {
                const checkSlot = {
                    tour_slot_id: this.form.tour_slot_id,
                    package_id: this.form.package_id,
                    affiliate_id: this.form.affiliate_id,
                    tourists: this.form.people_group,
                    tour_slot_time: this.form.time_date
                };

                const response = await axios.post('/available-seats', checkSlot);
                if (response.data.success === 'false') {
                    this.errors.push(response.data.message);
                    return;
                }

                let updatedCart = { ...this.cartItem };
                if (this.comboIds === 0) {
                    updatedCart = {};
                } else {
                    updatedCart = Object.fromEntries(
                        Object.entries(this.cartItem).filter(
                            ([, item]) => item.package_id !== this.form.package_id
                        )
                    );
                }

                this.form.package_image =
                this.details.tourPackageData?.[0]?.FrontendPackageImage || '';
                updatedCart[this.form.tour_slot_id] = { ...this.form };
                this.cartItem = updatedCart;
                this.$store.dispatch('storeCartItem', this.cartItem);
                this.$store.dispatch('storeMindChange', 1);

                this.$router.push({
                    name: this.comboIds === 0 ? 'Checkout' : 'Index'
                });
            } catch (error) {
                this.errors.push(error.response?.data?.message || 'Failed to add to cart.');
            }
        },
        selectedSlot(id, timeDate, slotTime) {
            this.$store.dispatch('storeSlotId', id);
            Object.assign(this.form, {
                tour_slot_id: id,
                time_date: timeDate,
                slot_time: slotTime
            });

            if (this.customRateFound) {
                this.processLoader(true);
                this.tourPackageName = '';
                this.details = { tourPackageData: [], tourPackageRateGroups: {}, thingsToBring: [] };
                this.form.counters = {};
                this.form.people_group = [];
                this.form.total_people_selected = 0;
                this.form.paxDetails = {};
                this.fetchPackageData(format(this.form.date, 'yyyy-MM-dd'), false);
            }
        },
        increment(rateId) {
            this.form.counters[rateId] = (this.form.counters[rateId] || this.minSeats) + 1;
            if (this.form.counters[rateId] > this.maxSeats) {
                this.form.counters[rateId] = this.maxSeats;
                return;
            }

            if (this.has_contacts) {
                this.form.paxDetails[rateId] = this.form.paxDetails[rateId] || [];
                this.form.paxDetails[rateId].push({ name: '', age: '', weight: '', note: '' });
            }

            if (!this.is_group_rate_enabled) {
                this.form.total_people_selected = Object.values(this.form.counters).reduce(
                    (sum, num) => sum + num,
                    0
                );
            }
        },
        decrement(rateId) {
            this.form.counters[rateId] = (this.form.counters[rateId] || this.minSeats) - 1;
            if (this.form.counters[rateId] < this.minSeats) {
                this.form.counters[rateId] = this.minSeats;
                return;
            }

            if (this.has_contacts && this.form.paxDetails[rateId]?.length) {
                this.form.paxDetails[rateId].pop();
            }

            if (!this.is_group_rate_enabled) {
                this.form.total_people_selected = Object.values(this.form.counters).reduce(
                    (sum, num) => sum + num,
                    0
                );
            }
        },
        updatePaxDetail(rateId, index, field, value) {
            if (this.form.paxDetails[rateId]?.[index]) {
                this.form.paxDetails[rateId][index][field] = value;
            }
        },
        removePax(rateId, index) {
            if (this.form.paxDetails[rateId]?.[index]) {
                this.form.paxDetails[rateId].splice(index, 1);
                this.form.counters[rateId] = (this.form.counters[rateId] || this.minSeats) - 1;
                if (!this.is_group_rate_enabled) {
                    this.form.total_people_selected = Object.values(this.form.counters).reduce(
                        (sum, num) => sum + num,
                        0
                    );
                }
            }
        },
        callToBookDuration(bookDuration, timeSlot) {
            if (!this.form.call_to_book) return false;

            const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'US/Arizona' }));
            const expiryTime = new Date(now.getTime() + bookDuration * 60 * 60 * 1000);
            const slotTime = new Date(`${timeSlot.date}T${timeSlot.slot_time}`);
            return slotTime < expiryTime;
        },
        callToBookValidation(timeSlot, bool) {
            return (
                timeSlot.bookable_status === 'Open' &&
                timeSlot.dd < timeSlot.seats &&
                this.callToBookDuration(this.form.block_ctb_duration, timeSlot) === bool
            );
        },
        staticDateRange(date, tenant) {
            const tenants = ['kens', 'dixies'];
            if (!tenants.includes(tenant)) return false;

            const packageIds = tenant === 'kens' ? [1, 2, 6] : [1];
            const selectedDate = new Date(date);
            const firstDate = new Date('2025-01-13');
            const secondDate = new Date('2025-01-27');
            const isClosed =
                selectedDate >= firstDate &&
                selectedDate < secondDate &&
                packageIds.includes(Number(this.form.package_id));

            if (isClosed || this.begins) {
                Object.assign(this.form, {
                    tour_slot_id: 0,
                    time_date: null,
                    slot_time: null,
                    people_group: []
                });
            }

            return isClosed;
        },
        navigateToTab(tab, destination) {
            if ([1, 3, 4, 5].includes(tab)) {
                if (tab === 1 || Object.keys(this.cartItem).length) {
                    this.$store.dispatch('storeMindChange', 1);
                    this.$router.push({ name: destination });
                } else {
                    Swal.fire({
                        toast: true,
                        html: `In order to proceed with ${destination.toLowerCase()}, please schedule a trip.`,
                        icon: 'info'
                    });
                }
            }
        },
        roundout(amount, places = 2) {
            if (places < 0) places = 0;
            const x = Math.pow(10, places);
            const formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        },
        processLoader(show) {
            if (show) {
                if (this.loaderInstance) this.loaderInstance.hide();
                this.loaderInstance = this.$loading.show();
            } else if (this.loaderInstance) {
                this.loaderInstance.hide();
                this.loaderInstance = null;
            }
        },
        scrollToErrors() {
            if (this.errors.length && this.$refs.packageErrorDisplay) {
                this.$refs.packageErrorDisplay.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        },
        getStartDate() {
            return getUTCDateFromTimeZone();
        },
        getEndDate() {
            const date = new Date(
                new Date(new Date().toLocaleString('en-US', { timeZone: 'US/Arizona' })).getFullYear() + 1,
                11,
                31
            );
            date.setHours(23, 59, 59, 999);
            return date;
        },
        isDisabled(slot) {
            return slot.bookable_status === 'Closed' || slot.dd >= slot.seats;
        },
        calculateTime(timeValue, hoursToAdd, minutesToAdd) {
            const time = new Date(`2000-01-01T${timeValue}`);
            time.setHours(time.getHours() + hoursToAdd * 2);
            time.setMinutes(time.getMinutes() + minutesToAdd * 2);
            return time.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        openPhonePopup() {
            Swal.fire({
                toast: false,
                html: this.form.ctb_description,
                icon: 'info',
                allowOutsideClick: true,
                showConfirmButton: false,
                timer: 5000
            });
        }
    }
};
</script>

<style scoped>
.payment-row .booking-row .info .btn-primary {
    margin-left: 5px;
    color: #004085;
    background-color: #cce5ff;
    border: 1px solid #b8daff;
    font-size: 13px;
    vertical-align: baseline;
    padding: 6px 17px;
    font-weight: 500;
}

.payment-row .booking-row .info .btn-primary .fa {
    margin-right: 5px;
    margin-left: -5px;
}

.payment-row .booking-row .info .btn-warning {
    margin-left: 5px;
    color: #004085;
    background-color: #cce5ff;
    border: 1px solid #b8daff;
    font-size: 13px;
    vertical-align: baseline;
    padding: 6px 17px;
    font-weight: 500;
}

.payment-row .booking-row .info .btn-warning .fa {
    margin-right: 5px;
    margin-left: -5px;
}

.static-date-range {
    width: 80%;
    margin: auto;
}

.desired-pickup-location {
    text-align: left;
}

.btn-continue {
    padding: 11px 50px 15px 25px;
}
</style>