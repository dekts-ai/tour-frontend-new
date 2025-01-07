<template>
    <section :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']"
        v-for="tourPackageData in details.tourPackageData" :key="1" class="banner-section"
        v-bind:style="{ 'background-image': 'url(' + tourPackageData.HeaderOne + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>

	<section class="tabs-section" v-if="iframeStatus">
		<div class="no-container">
			<div class="row">
				<div class="col-12">
					<div class="dropdown text-start d-md-none">
                        <a class="hamburger-menu dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><button @click="navigateToTab(1, 'Index')" :class="'tabs tab1 dropdown-item ' + (tabs == 1 ? 'active' : '')">Tours</button></li>
                            <li><button :class="'tabs tab2 dropdown-item ' + (tabs == 2 ? 'active' : '')">Schedule</button></li>
                            <li><button v-if="comboIds" @click="navigateToTab(3, 'MyTrip')" :class="'tabs tab3 dropdown-item ' + (tabs == 3 ? 'active' : '')">My Trip</button></li>
                            <li><button v-if="comboIds" @click="navigateToTab(4, 'Maps')" :class="'tabs tab4 dropdown-item ' + (tabs == 4 ? 'active' : '')">Maps</button></li>
                            <li><button @click="navigateToTab(5, 'Checkout')" :class="'tabs tab5 dropdown-item ' + (tabs == 5 ? 'active' : '')">Checkout</button></li>
                        </ul>
                    </div>
                    <div class="tabs-wrap d-flex align-items-center w-100">
                        <button @click="navigateToTab(1, 'Index')" :class="'tabs tab1 ' + (tabs == 1 ? 'active' : '')">Tours</button>
                        <button :class="'tabs tab2 ' + (tabs == 2 ? 'active' : '')">Schedule</button>
                        <button v-if="comboIds" @click="navigateToTab(3, 'MyTrip')" :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')">My Trip</button>
                        <button v-if="comboIds" @click="navigateToTab(4, 'Maps')" :class="'tabs tab4 ' + (tabs == 4 ? 'active' : '')">Maps</button>
                        <button @click="navigateToTab(5, 'Checkout')" :class="'tabs tab5 ' + (tabs == 5 ? 'active' : '')">Checkout</button>
                    </div>
				</div>
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
                                            <a v-if="iframeStatus && form.package_id && form.affiliate_id" :href="`${baseUrl}?tid=${form.tenant_id}&oid=${form.tour_operator_id}&pid=${form.package_id}&cids=${comboIds}&aid=${form.affiliate_id}&iframe=${iframeStatus}`">
                                                Home
                                            </a>
                                            <a v-else-if="iframeStatus && form.package_id" :href="`${baseUrl}?tid=${form.tenant_id}&oid=${form.tour_operator_id}&pid=${form.package_id}&cids=${comboIds}&iframe=${iframeStatus}`">
                                                Home
                                            </a>
                                            <a v-else :href="`${baseUrl}`">
                                                Home
                                            </a>
                                        </li>
                                        <li>{{ tourPackageName }}</li>
                                    </ul>
                                    <div class="cloasedbtn">
                                        <img src="../assets/images/cross.png">
                                    </div>
                                </div>
                                <hr class="sep1">
                            </div>
                        </div>

                        <div class="row payment-row">
                            <div class="col-12">
                                <div class="row booking-row" v-if="iframeStatus == false">
                                    <div class="col-lg-5 col-md-12">
                                        <div class="booking">
                                            <h2>Book Online</h2>
                                            <div class="confirmation">
                                                <img src="../assets/images/confirmation.png">
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-lg-7 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip"
                                                data-placement="top" title="">Secured</button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip"
                                                data-placement="top" title="">Health &
                                                Safety</button>
                                            <button @click="navigateToTab(5, 'Checkout')" class="btn btn-warning"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout</button>
                                            <button @click="navigateToTab(1, 'Index')" class="btn btn-primary mt-2"><i class="fa fa-arrow-left" aria-hidden="true"></i> Home</button>
                                        </div>
                                    </div>
                                </div>

                                <form @submit.prevent="submit">
                                    <div class="row starttime-row">
                                        <div class="col-12">
                                            <div class="row select-time">
                                                <div class="col-12 col-lg-4">
                                                    <datepicker 
                                                        v-model="form.date"
                                                        :value="form.date" 
                                                        :inline="true"
                                                        :disabled-dates="disabledDates"
                                                        :prevent-disable-date-selection="preventDisableDateSelection"
                                                        @selected="selectedDate">
                                                    </datepicker>
                                                </div>

                                                <div v-if="staticDateRange(form.date, form.tenant_id)" class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <h3 class="watermark static-date-range">Canyon is closed for repairs. Please select another day.</h3>
                                                </div>

                                                <div v-else-if="begins" class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <h3 class="watermark static-date-range">Exciting News! Our Tour Begins on <br />{{ begins }}.</h3>
                                                </div>

                                                <div v-else-if="slotNotFound && dateTimeArr.length == 0" class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <h3 class="watermark static-date-range">Apologies, No slots available on your chosen date.</h3>
                                                </div>

                                                <div class="col-12 col-lg-8 mt-4 mt-lg-1">
                                                    <div class="accordion booking-accordion-wrap" id="accordionExample">

                                                        <div v-if="reveal && form.package_has_slots && !begins && !staticDateRange(form.date, form.tenant_id) && dateTimeArr.length > 0" class="accordion-item">
                                                            <div class="accordion-header" id="headingTwo">
                                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                    Select Your Tour Time:  <span>{{ form.time_date }}</span>
                                                                </button>
                                                            </div>
                                                            <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                <div class="accordion-body select-time-wrp">

                                                                    <div class="radio-toolbar">
                                                                        <div style="display: contents;" v-for="name in dateTimeArr">
                                                                            <div class="time-item" 
                                                                                :class="callToBookValidation(name, false) ? 'seats-free-label' : callToBookValidation(name, true) ? 'phone-label' : 'watermark-label'" 
                                                                                v-if="name.visible" 
                                                                                :key="name.Id" 
                                                                                @click="callToBookValidation(name, true) ? openPhonePopup(name) : selectedSlot(name.Id, name.Time, name.slot_time)"
                                                                                :style="name.Id == form.tour_slot_id ? 'background-color: #e9f7eb; border-color: #37d150;' : ''">

                                                                                <label class="time-item-lable" :for="name.Id"></label>

                                                                                <input type="radio" :id="name.Id" name="time_date"
                                                                                    :value="name.Time"
                                                                                    :disabled="isDisabled(name)"
                                                                                    @click.stop />

                                                                                <span class="background-change"></span>

                                                                                <label :for="name.Id">{{ name.Time }}</label>

                                                                                <text v-if="callToBookValidation(name, false)" class="seats-free">
                                                                                    <span v-if="form.show_seat_availability">{{ name.seats - name.dd }} left!</span>
                                                                                </text>

                                                                                <text v-else-if="callToBookValidation(name, true)" class="phone-call">
                                                                                    <span>CALL TO BOOK</span>
                                                                                </text>

                                                                                <text v-else-if="form.show_seat_availability" class="watermark">
                                                                                    <span v-if="staticDateRange(form.date, form.tenant_id)">CLOSED</span>
                                                                                    <span v-else>SOLD OUT</span>
                                                                                </text>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div v-if="reveal && tourPackageName" class="accordion-item">
                                                            <div class="accordion-header" id="headingOne">
                                                                <button :class="form.package_has_slots == 0 ? 'accordion-button' : 'accordion-button collapsed'" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" :aria-expanded="form.package_has_slots == 0 ? true : false" aria-controls="collapseOne">
                                                                    {{ tourPackageName }}: <span>{{ form.total_people_selected }} People</span>
                                                                </button>
                                                            </div>

                                                            <div id="collapseOne" :class="form.package_has_slots == 0 ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div class="accordion-body clearfix pb-1">

                                                                    <div v-if="is_group_rate_enabled" class="package-wrap">
                                                                        <div class="package-name">
                                                                            <div class="title">{{ "Guest's" }}</div>
                                                                            <div class="price">Navajo Nation Tax: ${{ form.selectedTax }}</div>
                                                                            <!-- <div class="price">${{ Number(parseFloat(form.selectedRate) + parseFloat(form.selectedTax)).toFixed(2) }}</div> -->
                                                                        </div>
                                                                        <div class="people-count">
                                                                            <div class="people">
                                                                                <select
                                                                                    class="form-select group-rate-discount" v-model="form.selectedSize" @change="handleGroupRateDiscountChange">
                                                                                    <option v-for="(item, q) in details.tourPackageRateGroups"
                                                                                        :value="item.size" :key="item.size">{{ item.size }} - ${{ item.rate }}</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div v-else>
                                                                        <div class="package-wrap" v-for="(tour, p) in details.tourPackageRateGroups" :key="tour.id">
                                                                            <div class="package-name">
                                                                                <div class="title">{{ tour.rate_for }}</div>
                                                                                <div class="price">${{ tour.rate }}</div>
                                                                            </div>
                                                                            <div class="people-count">
                                                                                <div class="people">
                                                                                    <label>People</label>
                                                                                    <input type="text" :name="'people_group_' + tour.id" :id="'people-group-'+tour.id" :value="form.counters[tour.id] ?? 0" readonly>
                                                                                </div>
                                                                                <div class="people-btn">
                                                                                    <button type="button" class="btn-people-count" @click="increment(tour.id)">+</button>
                                                                                    <button type="button" class="btn-people-count" @click="decrement(tour.id)">-</button>
                                                                                </div>
                                                                            </div>

                                                                            <select
                                                                                class="form-select people-group1 hidden"
                                                                                :name="'people_group' + tour.id "
                                                                                :id="'people_group'+tour.id">
                                                                                <option v-for="(item, q) in selectgrouppeoples"
                                                                                    :value="item.value" :key="item.value" :selected="q == this.form.people_group[p]">{{
                                                                                    item.number }}</option>
                                                                            </select>
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
                                                                :display_errors="false"
                                                                :display_submit="false"
                                                                :display_height="275"
                                                                :service_commission="form.service_commission"
                                                                @customformexists="hasCustomFormFields"
                                                                :endpoint="`/package/custom/form/${form.package_id}`" />
                                                        </div>

                                                        <div v-if="reveal && hotels.length" class="accordion-item">
                                                            <div class="accordion-header" id="headingFour">
                                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                    Select Pickup Hotel: 
                                                                </button>
                                                            </div>
                                                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
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
                                                <p v-if="errors.length" >
                                                    <b>Please correct the following error(s):</b>
                                                    <ul class="following-error">
                                                        <li v-for="(error, idx) in errors" :key="`error-${idx}`" v-bind:class="{'text-danger': error }" style="font-size:25px">{{ error }}</li>
                                                    </ul>
                                                </p>
                                            </div>

                                            <div class="starttime-row">
                                                <div class="groupofpeople">
                                                    <div class="booknowbtn text-end">
                                                        <button type="submit" style="padding: 11px 50px 15px 25px">Continue</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div class="row permit-tax" v-for="tourPackageData in details.tourPackageData"
                                    :key="tourPackageData.package_id">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="images-sec">
                                            <img :src="tourPackageData.HeaderImage" />
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="content-sec">
                                            <h2>{{tourPackageData.package_name }}</h2>
                                            <p>{{ tourPackageData.short_description }}</p>
                                            <p v-if="form?.tenant_id == 'kens'">{{ tourPackageData.long_description }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="form?.tenant_id != 'kens'" class="row hiking-tour-row" v-for="tourPackageData in details.tourPackageData"
                                    :key="tourPackageData.id">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="images-sec">
                                            <img :src="tourPackageData.DescriptionImage" />
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
                                    <div class="col-12 col-sm-12 col-md-6 duration"
                                        v-for="tourPackageData in details.tourPackageData"
                                        :key="tourPackageData.id">
                                        <h2>Duration</h2>
                                        <button class="btn-info">{{tourPackageData.duration }}</button>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-6 whattobring">
                                        <h2>What to Bring</h2>
                                        <div class="bring-group">
                                            <button class="btn-info" v-for="(thingsToBring, key) in details.thingsToBring"
                                                :key="key">{{ thingsToBring }}</button>
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
import $ from "jquery";
import Datepicker from 'vuejs3-datepicker';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { getUTCDateFromTimeZone } from '../utils/dateUtils';
import CustomFields from '../components/Forms/CustomFields';
import Pickup from "./Hotel/Pickup";

export default {
    name: "Init",
    title: "Native American Tours",
    components: {
        Datepicker,
        CustomFields,
        Pickup
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            reveal: false,
            packageOrder: [],
            comboIds: 0,
            tourPackageName: "",
            totalavailableseats: 0,
            selectgrouppeoples: [],
            details: [],
            hotels: [],
            cartItem: [],
            cartItemLength: 0,
            slotId: 0,
            slotNotFound: false,
            customRateFound: false,
            disabledDates: {
                to: this.getStartDate(),
                from: this.getEndDate()
            },
            preventDisableDateSelection: true,
            dateTimeArr: [],
            peopleselects: [],
            begins: null,
            blockedTimes: {},
            errors: [],
            customFieldExists: false,
            form: {
                iframeStatusInfo: false,
                tenant_id: "",
                tour_operator_id: 0,
                package_id: 0,
                package_name: "",
                package_image: "",
                affiliate_id: 0,
                hotel_id: 0,
                hotel_name: 0,
                hotel_image: 0,
                hotel_address: 0,
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
                short_description: "",
                long_description: "",
                duration: "",
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
                counters: {}
            },
            minSeats: 0,
            maxSeats: 0,
            is_group_rate_enabled: 0,
            with_rate_groups: 1,
            tabs: 2
        };
    },
    created: function () {
        this.packageOrder = this.$store.state.packageOrder;
        this.comboIds = this.$store.state.comboIds;
        this.cartItem = this.$store.state.cartItem;
        this.cartItemLength = Object.values(this.cartItem).length;
        this.iframeStatus = this.$store.state.iframeStatus;
        if (this.$store.state.formData && this.$store.state.formData?.package_id == this.$store.state.packageId) {
            this.form = this.$store.state.formData;
        } else {
            this.form.tenant_id = this.$store.state.tenantId;
            this.form.tour_operator_id = this.$store.state.tourOperatorId;
            this.form.package_id = this.$store.state.packageId;
            this.form.affiliate_id = this.$store.state.affiliateId;
            this.form.tour_slot_id = 0;
            this.form.time_date = null;
            this.form.slot_time = null;
            this.form.people_group = [];
            this.form.selectedRateId = null;
            this.form.selectedSize = null;
            this.form.selectedRate = 0;
            this.form.selectedTax = 0;
            this.form.package_has_slots = 1;
            this.form.tax_applicable = 1;
            this.form.show_seat_availability = 1;
            this.form.block_ctb_duration = 0;
            this.form.ctb_description = '';
            this.form.call_to_book = false;
        }

        if (this.$store.state.date) {
            this.form.date = new Date(this.$store.state.date);
        } else {
            this.form.date = this.getStartDate();
        }

        this.configure();
    },
    methods: {
        configure() {
            console.log('configure');

            var loader = this.$loading.show();
            var date = format(this.form.date, 'yyyy-MM-dd');

            axios.get("/tour-slot/" + date + '/' + this.form.package_id + '/' + this.form.affiliate_id)
                .then((response) => {
                    this.begins = response.data.begins;

                    var slotTimes = response.data.Time;

                    if (response.data.closedSlotVisibility === false) {
                        let filteredSlotTimes = slotTimes.filter(element => {
                            return element.bookable_status == 'Open' && element.dd < element.seats;
                        });

                        this.dateTimeArr = filteredSlotTimes;
                    } else {
                        this.dateTimeArr = slotTimes;
                    }

                    // Make all slots visible on first time
                    this.dateTimeArr.forEach(element => {
                        element.visible = true;
                        if (element.custom_rate != 0 && this.customRateFound == false) {
                            this.customRateFound = true;
                        }
                    });

                    this.totalavailableseats = response.data.TotalAvailableSeats;
                    this.maxSeats = this.totalavailableseats;
                    this.selectgrouppeoples = [];
                    var seats = this.totalavailableseats;
                    seats = seats + 1;
                    for (let index = 0; index < seats; index++) {
                        this.selectgrouppeoples.push({
                            id: index + 1,
                            value: index,
                            number: index,
                        });
                    }

                    this.slotNotFound = this.dateTimeArr.length > 0 ? false : true;

                    if (!this.staticDateRange(this.form.date, this.form.tenant_id) && this.customRateFound == false) {
                        this.updateRateGroups(date, 0, loader);
                    } else if (this.form.tour_slot_id != 0) {
                        this.updateRateGroups(date, 0, loader);
                    } else {
                        if (this.customRateFound == true) {
                            this.reveal = true;
                            this.tourPackageName = "";
                        }
                        this.processLoader(loader);
                    }
                }).catch(error => {
                    this.slotNotFound = true;
                    this.details.tourPackageRateGroups = [];
                    this.begins = error?.response?.data?.data?.begins;
                    this.processLoader(loader);
                });
        },
        updateRateGroups(date, calendar = 0, loader) {
            console.log('updateRateGroups');

            var comboIds = 0; // Need only selected package data and it's rate groups

            axios.get("/tour-package/" + date + "/" + this.form.tour_operator_id + "/" + this.form.package_id + "/" + this.form.affiliate_id + "/" + comboIds + "/" + this.with_rate_groups + "/" + this.form.tour_slot_id)
                .then((response) => {
                    this.$store.dispatch('storeTourPackage', response.data)

                    this.tourPackageName = response.data.tourPackageData[0].package_name;
                    this.details = this.$store.state.tourPackage;
                    this.hotels = response.data.hotels;
                    this.details.tourPackageRateGroups = this.details.tourPackageRateGroups[this.form.package_id];

                    this.form.things_to_bring = response.data.thingsToBring;
                    this.form.short_description = response.data.tourPackageData[0].short_description;
                    this.form.long_description = response.data.tourPackageData[0].long_description;
                    this.form.duration = response.data.tourPackageData[0].duration;
                    this.form.latitude = response.data.tourPackageData[0].latitude;
                    this.form.longitude = response.data.tourPackageData[0].longitude;
                    this.form.type = response.data.tourPackageData[0].type;
                    this.form.travel_duration = response.data.tourPackageData[0].travel_duration;
                    this.form.phone_number = response.data.tourPackageData[0].phone_number;
                    if (this.form.affiliate_id > 0) {
                        this.form.service_commission = Number(response.data.tourPackageData[0].affiliate_processing_percentage);
                    } else {
                        this.form.service_commission = Number(response.data.tourPackageData[0].service_commission_percentage);
                    }

                    this.form.package_has_slots = response.data.tourPackageData[0].package_has_slots;
                    this.form.tax_applicable = response.data.tourPackageData[0].tax_applicable;
                    this.form.show_seat_availability = response.data.tourPackageData[0].show_seat_availability;
                    this.form.block_ctb_duration = response.data.tourPackageData[0].block_ctb_duration;
                    this.form.ctb_description = response.data.tourPackageData[0].ctb_description;
                    this.form.call_to_book = response.data.callToBook;

                    this.is_group_rate_enabled = response.data.tourPackageData[0].is_group_rate_enabled;
                    if (this.is_group_rate_enabled) {
                        this.selectgrouppeoples = [];

                        this.form.selectedRateId = this.form.selectedRateId !== null ? this.form.selectedRateId : this.details.tourPackageRateGroups[0].id;
                        this.form.selectedSize = this.form.selectedSize !== null ? this.form.selectedSize : this.details.tourPackageRateGroups[0].size;
                        this.form.selectedRate = this.form.selectedRate > 0 ? this.form.selectedRate : this.details.tourPackageRateGroups[0].rate;
                        this.form.selectedTax = this.form.selectedTax > 0 ? this.form.selectedTax : this.details.tourPackageRateGroups[0].tax;
                        this.form.total_people_selected = this.form.selectedSize;
                    } else {
                        // Define Variables
                        var v1 = this.totalavailableseats;

                        // Append Dropdown Value for tourPackageRateGroups
                        this.details.tourPackageRateGroups?.forEach((element, i) => {
                            $("#people_group" + element.id)
                                .find("option")
                                .remove()
                                .end();

                            for (let j = 0; j <= v1; j++) {
                                $("#people_group" + element.id).append(
                                    '<option value=' + j + '>' + j + '</option>'
                                );
                            }
                        });
                    }

                    if (this.comboIds != 0 && this.cartItemLength) {
                        this.blockedTimes = {};
                        for (const key in this.cartItem) {
                            this.generateTimeArray(this.cartItem[key]);
                        }

                        for (let packageId in this.blockedTimes) {
                            if (this.blockedTimes.hasOwnProperty(packageId)) {
                                let packageData = this.blockedTimes[packageId];
                                if (packageData.date == date && packageData.package_has_slots) {
                                    this.dateTimeArr = this.dateTimeArr.filter(element => {
                                        // Convert element.slot_time to Date object for comparison
                                        let slotTime = new Date(`2000-01-01T${element.slot_time}`);

                                        // Convert packageData.time to Date objects for comparison
                                        let startTime = new Date(`2000-01-01T${packageData.time[0]}`);
                                        let endTime = new Date(`2000-01-01T${packageData.time[1]}`);

                                        // Check if slotTime falls within the time range
                                        return !(slotTime >= startTime && slotTime <= endTime);
                                    });
                                }
                            }
                        }
                    }

                    if (this.form.package_has_slots == 0) {
                        this.selectedSlot(this.dateTimeArr[0]?.Id, this.dateTimeArr[0]?.Time, this.dateTimeArr[0]?.slot_time);
                    }

                    this.reveal = true;
                    this.processLoader(loader);
                }).catch(() => {
                    this.processLoader(loader);
                });

            if (calendar) {
                this.form.tour_slot_id = 0;
                this.form.time_date = null;
                this.form.slot_time = null;
                this.form.people_group = [];
            }

            this.$store.dispatch('storeTabs', this.tabs);
            this.$store.dispatch('storeMindChange', 0);
        },
        selectedDate(date) {
            console.log('selectedDate');

            var loader = this.$loading.show();
            this.reveal = false;
            this.customRateFound = false;
            this.form.tour_slot_id = 0;
            this.form.time_date = null;
            this.form.slot_time = null;
            this.form.people_group = [];
            this.form.date = date;
            this.form.counters = {};
            this.form.total_people_selected = 0;
            this.dateTimeArr = [];
            this.errors = [];

            var date = format(date, 'yyyy-MM-dd');

            axios.get("/tour-slot/" + date + '/' + this.form.package_id + '/' + this.form.affiliate_id).then((response) => {
                this.begins = response.data.begins;
                var slotTimes = response.data.Time;

                if (response.data.closedSlotVisibility === false) {
                    let filteredSlotTimes = slotTimes.filter(element => {
                        return element.bookable_status == 'Open' && element.dd < element.seats;
                    });

                    this.dateTimeArr = filteredSlotTimes;
                } else {
                    this.dateTimeArr = slotTimes;
                }

                // Make all slots visible on first time
                this.dateTimeArr.forEach(element => {
                    element.visible = true;
                    if (element.custom_rate != 0 && this.customRateFound == false) {
                        this.customRateFound = true;
                    }
                });

                this.totalavailableseats = response.data.TotalAvailableSeats;
                this.maxSeats = this.totalavailableseats;
                this.selectgrouppeoples = [];
                var seats = this.totalavailableseats;
                seats = seats + 1;

                for (let index = 0; index < seats; index++) {
                    this.selectgrouppeoples.push({
                        id: index + 1,
                        value: index,
                        number: index,
                    });
                }

                this.slotNotFound = this.dateTimeArr.length > 0 ? false : true;

                if (!this.begins && !this.staticDateRange(this.form.date, this.form.tenant_id) && this.customRateFound == false) {
                    this.updateRateGroups(date, 1, loader);
                } else {
                    if (this.customRateFound == true) {
                        this.reveal = true;
                        this.tourPackageName = "";
                    }
                    this.processLoader(loader);
                }
            }).catch(error => {
                this.slotNotFound = true;
                this.details.tourPackageRateGroups = [];
                this.begins = error?.response?.data?.data?.begins;
                this.processLoader(loader);
            });
        },
        handleGroupRateDiscountChange(event) {
            const selectedIndex = this.details.tourPackageRateGroups.findIndex(size => size.size === this.form.selectedSize);
            const selectedGroup = this.details.tourPackageRateGroups[selectedIndex];
            this.form.selectedRateId = selectedGroup?.id;
            this.form.selectedRate = selectedGroup?.rate;
            this.form.selectedTax = selectedGroup?.tax;
            this.form.total_people_selected = this.form.selectedSize;

            // if (this.form.package_has_slots) {
            //     this.filterSlotsBasedOnSeats();
            // }
        },
        hasCustomFormFields(exists = false) {
            console.log(`sent from custom fields emit signal ${exists}`)
            this.customFieldExists = exists;
        },
        onCustomFormFieldsSubmit(customFormData) {
            // no need to do anything if no custom fields
            if ( !this.customFieldExists  ) {
                return false;
            }

            if (  customFormData.errors.length > 0  ) {
                this.errors = [...customFormData.errors];
            } else {
                this.form.custom_fields = customFormData.fields;
                this.form.addons_total = this.$refs.CustomFieldsRef.sumTotal(customFormData.fields);
                this.form.addons_fee = this.roundout(this.$refs.CustomFieldsRef.feeTotal(customFormData.fields));
            }
        },
        submit: async function () {
            this.errors = [];
            const loader = this.$loading.show();
            this.form.addons_total = 0;
            this.form.addons_fee = 0;

            //if custom fields exists this will be added to the item object custom_fields prop
            if (this.customFieldExists) { 
                const customFormData  = await this.$refs.CustomFieldsRef.submitForm(false);
                this.onCustomFormFieldsSubmit(customFormData);
            }

            if (!this.form.time_date) {
                this.errors.push("Please select a start time for your tour");
            }

            if (this.errors.length > 0) {
                // if errors scroll errors into view 
                this.$refs.packageErrorDisplay.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            }

            const tourPackageRateGroups = this.details.tourPackageRateGroups;

            let minMaxScenarioCheck = this.validateMinMaxScenario(tourPackageRateGroups);
            if (minMaxScenarioCheck) {
                this.processLoader(loader);
                return;
            }

            let rateGroupArr = [];
            let feesGroupArr = [];
            let groupPaxArr = [];
            let paxSubtotalArr = [];

            if (this.is_group_rate_enabled) {
                const selectedIndex = this.details.tourPackageRateGroups.findIndex(size => size.size === this.form.selectedSize);
                const selectedGroup = this.details.tourPackageRateGroups[selectedIndex];

                groupPaxArr.push(this.form.selectedSize);
                paxSubtotalArr.push(Number(parseFloat(this.form.selectedRate) + parseFloat(this.form.selectedTax)).toFixed(2));

                const fees = this.roundout((Number(parseFloat(this.form.selectedRate) + parseFloat(this.form.selectedTax)) * Number(this.form.service_commission)) / 100, 2);
                feesGroupArr.push(fees.toFixed(2));

                rateGroupArr.push(selectedGroup.rate_for);
            } else {
                let index = 0;

                tourPackageRateGroups?.forEach(number => {
                    let rateGroupField = 'people_group' + number.id;
                    const rateGroup = document.querySelector("select[name=" + rateGroupField + "]").value;
                    groupPaxArr.push(rateGroup);

                    const rate = Number(tourPackageRateGroups[index].rate) + Number(tourPackageRateGroups[index].permit_fee) + Number(tourPackageRateGroups[index].tax);
                    paxSubtotalArr.push(rateGroup > 0 ? rateGroup * rate.toFixed(2) : 0);

                    const fees = this.roundout((Number(rate) * Number(this.form.service_commission)) / 100, 2);
                    feesGroupArr.push(rateGroup > 0 ? rateGroup * fees.toFixed(2) : 0);

                    rateGroupArr.push(tourPackageRateGroups[index].rate_for);

                    index++;
                });
            }

            let subtotalSum = paxSubtotalArr.reduce((a, b) => Number(a) + Number(b), 0);
            let feesSum = feesGroupArr.reduce((a, b) => Number(a) + Number(b), 0);

            this.form.before_discount_subtotal = Number(subtotalSum);
            this.form.before_discount_fees = Number(feesSum);
            this.form.before_discount_total = this.roundout(Number(subtotalSum) + Number(feesSum));

            if (this.form.discount2_percentage > 0) {
                var discountedAmount = Number(subtotalSum) * Number(this.form.discount2_percentage) / 100;
                this.form.discount2_value = Number(discountedAmount).toFixed(2);
                subtotalSum = Number(subtotalSum - discountedAmount).toFixed(2);
                feesSum = this.roundout(subtotalSum * this.form.service_commission / 100, 2);
            } else if (this.form.discount2_value > 0) {
                subtotalSum = Number(subtotalSum - this.form.discount2_value).toFixed(2);
                feesSum = this.roundout(subtotalSum * this.form.service_commission / 100, 2);
            }

            if (this.errors.length == 0) {
                this.form.calucation = paxSubtotalArr;
                this.form.rate_group = rateGroupArr;
                this.form.people_group = groupPaxArr;
                this.form.iframeStatusInfo = this.iframeStatus;
                this.form.package_name = this.tourPackageName;
                this.form.subtotal = this.roundout(subtotalSum);
                this.form.fees = feesSum;

                let total = Number(subtotalSum) + Number(feesSum);
                this.form.total = this.roundout(total);

                if (this.form.total <= 0) {
                    this.errors.push("Oops! Something went wrong. Please try again later.");
                    this.processLoader(loader);
                    return;
                }

                this.addToCart(loader);
            } else {
                this.processLoader(loader);
            }
        },
        validateMinMaxScenario(tourPackageRateGroups) {
            let groupPaxArr = [];
            let errors = [];

            if (this.is_group_rate_enabled === 0) {
                tourPackageRateGroups?.forEach(number => {
                    let rateGroupField = 'people_group' + number.id;
                    const rateGroup = document.querySelector("select[name=" + rateGroupField + "]").value;
                    groupPaxArr.push(rateGroup);
                });

                const rateGroupsum = groupPaxArr.reduce((a, b) => Number(a) + Number(b), 0);
                if (rateGroupsum == 0) {
                    errors.push("Please select your group of people for the tour");
                } else {
                    tourPackageRateGroups?.forEach(number => {
                        let rateGroupField = 'people_group' + number.id;
                        const rateGroup = document.querySelector("select[name=" + rateGroupField + "]").value;

                        if (number.min_pax_allowed > rateGroup) {
                            errors.push("Please select a minimum of " + number.min_pax_allowed + " " + number.rate_for + " people to process your booking");
                        }

                        if (number.max_pax_allowed != null && number.max_pax_allowed != 0 && number.max_pax_allowed < rateGroup) {
                            errors.push("Please select a maximum of " + number.max_pax_allowed + " " + number.rate_for + " people to process your booking");
                        }
                    });
                }

                this.errors.push(...errors);
            }

            return this.errors.length > 0;
        },
        roundout(amount, places = 2) {
            if (places < 0) {
                places = 0;
            }

            let x = Math.pow(10, places);
            let formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        },
        processLoader(loader) {
            loader.hide();
        },
        getStartDate() {
            // See this issues with datepicker 
            // https://github.com/charliekassel/vuejs-datepicker/issues/118
            return getUTCDateFromTimeZone();
        },
        getEndDate() {
            let date = new Date(new Date(new Date().toLocaleString('en-US', { timeZone: 'US/Arizona' })).getFullYear() + 1, 11, 31);
            date.setHours(23, 59, 59, 999);
            return date;
        },
        isDisabled: function (slot) {
            if (slot.bookable_status == 'Closed' || slot.dd >= slot.seats) {
                return 'disabled';
            }
        },
        selectedSlot: function (id, timeDate, slotTime) {
            console.log('selectedSlot');

            this.$store.dispatch('storeSlotId', id);
            this.form.tour_slot_id = id;
            this.form.time_date = timeDate;
            this.form.slot_time = slotTime;

            if (this.customRateFound) {
                var loader = this.$loading.show();

                this.tourPackageName = "";
                this.details = [];
                this.form.counters = {};
                this.form.people_group = [];
                this.form.total_people_selected = 0;

                let date = format(this.form.date, 'yyyy-MM-dd');

                this.updateRateGroups(date, 0, loader);
            }
        },
        callToBookDuration: function (bookDuration, timeSlot) {
            if (this.form.call_to_book == false) {
                return false;
            }

            // Add the given duration in hours to the current time
            let expiryTime = new Date(new Date(new Date().toLocaleString('en-US', { timeZone: 'US/Arizona' })).getTime() + bookDuration * 60 * 60 * 1000);
            // Get the slot times and accordingly display the call to book data
            let slotTime = new Date(`${timeSlot.date}T${timeSlot.slot_time}`);

            if (slotTime < expiryTime) {
                return true;
            }

            return false;
        },
        callToBookValidation: function (timeSlot, bool) {            
            return timeSlot.bookable_status == 'Open' && timeSlot.dd < timeSlot.seats && this.callToBookDuration(this.form.block_ctb_duration, timeSlot) == bool;
        },
        staticDateRange: function (date, tenant) {
            const tenants = ["kens", "dixies"];
            if ( tenants.indexOf(tenant) === -1 ) {
                return false;
            }

            let packageIds = [1];
            if (tenant == "kens") {
                packageIds = [1, 2, 6];
            } else if (tenant == "others") {
                // add closed package ids
            }

            date = new Date(date);
            let firstDate = new Date('01 13 2025');
            let secondDate = new Date('01 27 2025');
            let status = date >= firstDate && date < secondDate && packageIds.includes(parseInt(this.form.package_id));

            if (status || this.begins) {
                this.form.tour_slot_id = 0;
                this.form.time_date = null;
                this.form.slot_time = null;
                this.form.people_group = [];
            }

            return status;
        },
        navigateToTab(tab, destination) {
            if (tab === 1 || tab === 3 || tab === 4 || tab === 5) {
                this.handleTab(tab, destination);
            }
        },
        handleTab(tab, destination) {
            if (tab === 1 || Object.keys(this.cartItem).length) {
                this.$store.dispatch('storeMindChange', 1);
                this.$router.push({ name: destination });
            } else {
                Swal.fire({
                    toast: true,
                    html: `In order to proceed with ${destination.toLowerCase()}, please schedule a trip.`,
                    icon: 'info',
                });
            }
        },
        addToCart(loader) {
            let checkSlotarr = {
                'tour_slot_id': this.form.tour_slot_id,
                'package_id': this.form.package_id,
                'affiliate_id': this.form.affiliate_id,
                'tourists': this.form.people_group,
                'tour_slot_time': this.form.time_date,
            };

            axios.post("/available-seats", checkSlotarr).then((response) => {
                if (response.data.success == "false") {
                    this.errors.push(response.data.message);
                    this.$refs.packageErrorDisplay.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest"
                    });
                } else {
                    if (this.comboIds == 0) {
                        this.cartItem = [];
                    }

                    const updatedCart = {};

                    for (const slotId in this.cartItem) {
                        const formData = this.cartItem[slotId];
                        if (formData.package_id != this.form.package_id) {
                            updatedCart[slotId] = formData;
                        }
                    }

                    this.cartItem = updatedCart;

                    var data = {};
                    data[this.form.tour_slot_id] = this.form;
                    this.cartItem = { ...this.cartItem, ...data };
                    this.$store.dispatch('storeCartItem', this.cartItem);
                    this.$store.dispatch('storeMindChange', 1);

                    if (this.comboIds == 0) {
                        this.$router.push({
                            name: 'Checkout'
                        });
                    } else {
                        this.$router.push({
                            name: 'Index'
                        });
                    }
                }

                this.processLoader(loader);
            });

            this.form.package_image = this.details?.tourPackageData?.length > 0 ? this.details.tourPackageData[0].FrontendPackageImage : "";

            return true;
        },
        generateTimeArray(cartItem) {
            var packageId = cartItem.package_id;
            var date = cartItem.date;
            var time = cartItem.slot_time;
            var packageHasSlots = cartItem.package_has_slots;
            var offset = this.form.travel_duration;

            if (offset !== '00:00:00') {
                const timeFormat = 'HH:mm:ss';
                const [offsetHours, offsetMinutes] = offset.split(':').map(Number);
                const timeBefore = this.calculateTime(time, -offsetHours, -offsetMinutes, timeFormat);
                const timeAfter = this.calculateTime(time, offsetHours, offsetMinutes, timeFormat);

                if (this.blockedTimes[this.form.package_id] || this.form.package_id == packageId) {
                    // this.blockedTimes.splice(this.form.package_id, 1);
                } else {
                    this.blockedTimes[packageId] = {
                        date: format(date, 'yyyy-MM-dd'),
                        time: [timeBefore, timeAfter],
                        package_has_slots: packageHasSlots
                    };
                }
            }
        },
        calculateTime(timeValue, hoursToAdd, minutesToAdd, format) {
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
        increment(rateId) {
            if (!this.form.counters[rateId]) {
                this.form.counters[rateId] = this.minSeats;
            }

            if (this.form.counters[rateId] < this.maxSeats) {
                this.form.counters[rateId]++;
                document.querySelector("select[name=people_group" + rateId + "]").value = this.form.counters[rateId];
            }

            if (this.is_group_rate_enabled === 0) {
                this.form.total_people_selected = Object.values(this.form.counters).reduce((total, num) => total + num, 0);
            }
            // if (this.form.package_has_slots) {
            //     this.filterSlotsBasedOnSeats();
            // }
        },
        decrement(rateId) {
            if (!this.form.counters[rateId]) {
                this.form.counters[rateId] = this.minSeats;
            }

            if (this.form.counters[rateId] > this.minSeats) {
                this.form.counters[rateId]--;
                document.querySelector("select[name=people_group" + rateId + "]").value = this.form.counters[rateId];
            }

            if (this.is_group_rate_enabled === 0) {
                this.form.total_people_selected = Object.values(this.form.counters).reduce((total, num) => total + num, 0);
            }
            // if (this.form.package_has_slots) {
            //     this.filterSlotsBasedOnSeats();
            // }
        },
        filterSlotsBasedOnSeats() {
            this.form.tour_slot_id = 0;
            this.form.time_date = null;
            this.form.slot_time = null;

            if (this.is_group_rate_enabled === 0) {
                this.form.total_people_selected = Object.values(this.form.counters).reduce((total, num) => total + num, 0);
            }

            this.dateTimeArr.forEach(element => {
                if (this.form.total_people_selected <= (element.seats - element.dd)) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            })
        },
        openPhonePopup() {
            Swal.fire({
                toast: false,
                html: this.form.ctb_description,
                icon: 'info',
                allowOutsideClick: true,
                showConfirmButton: false,
                timer: 5000,
            });
        },
    }
};
</script>

<style>
.payment-row .booking-row .info .btn-primary {margin-left: 5px; color: #004085; background-color: #cce5ff; border: 1px solid #b8daff; font-size: 13px; vertical-align: baseline; padding: 6px 17px; font-weight: 500;}
.payment-row .booking-row .info .btn-primary .fa {margin-right: 5px; margin-left: -5px;}
.payment-row .booking-row .info .btn-warning {margin-left: 5px; color: #004085; background-color: #cce5ff; border: 1px solid #b8daff; font-size: 13px; vertical-align: baseline; padding: 6px 17px; font-weight: 500;}
.payment-row .booking-row .info .btn-warning .fa {margin-right: 5px; margin-left: -5px;}
.static-date-range {width: 80%; margin: auto;}
.desired-pickup-location {text-align: left;}
</style>