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
                                                <div class="col-12 col-lg-8 mt-4 mt-lg-0">
                                                    <h2>Select a start time for your tour:</h2>
                                                    <div v-if="staticDateRange(form.date, form.tenant_id)">
                                                        <h3 class="watermark static-date-range">Canyon is closed for repairs. Please select another day.</h3>
                                                        <br>
                                                    </div>
                                                    <div v-else-if="begins">
                                                        <h3 class="watermark static-date-range">Exciting News! Our Tour Begins on <br />{{ begins }}.</h3>
                                                        <br>
                                                    </div>
                                                    <div v-else-if="begins">
                                                        <h3 class="watermark static-date-range">Exciting News! Our Tour Begins on <br />{{ begins }}.</h3>
                                                        <br>
                                                    </div>
                                                    <div class="radio-toolbar" v-if="dateTimeArr.length > 0">
                                                        <div class="time-item" 
                                                            :class="name.bookable_status == 'Open' && name.dd < name.seats ? 'seats-free-label' : 'watermark-label'" 
                                                            v-for="name in dateTimeArr"
                                                            :key="name.Id" 
                                                            @click="selectedSlot(name.Id, name.Time, name.slot_time)"
                                                            :style="name.Id == form.tour_slot_id ? 'background-color: #e9f7eb; border-color: #37d150;' : ''">

                                                            <label class="time-item-lable" :for="name.Id"></label>

                                                            <input type="radio" :id="name.Id" name="time_date"
                                                                :value="name.Time"
                                                                :disabled=isDisabled(name) />

                                                            <label class="background-change"></label>

                                                            <label :for="name.Id">{{ name.Time}}</label>

                                                            <text v-if="name.bookable_status == 'Open' && name.dd < name.seats" class="seats-free">{{ name.seats - name.dd }} AVAILABLE</text>
                                                            <text v-else class="watermark">
                                                                <span v-if="staticDateRange(form.date, form.tenant_id)">CLOSED</span>
                                                                <span v-else>SOLD OUT</span>
                                                            </text>
                                                        </div>
                                                    </div>
                                                    <div class="radio-toolbar" v-else-if="!begins && !staticDateRange(form.date) && dateTimeArr.length == 0">
                                                        <h3 class="watermark static-date-range">Apologies, No slots available on your chosen date.</h3>
                                                    </div>
                                                    <div class="row hotel-list-item-wrap">
                                                        <div v-if="hotels.length" class="p-1 pb-2 desired-pickup-location">
                                                            Please select your desired pickup location:
                                                        </div>
                                                        <div class="col-12 col-md-6"
                                                            v-for="hotel in hotels"
                                                            :key="hotel.id">

                                                            <div class="hotel-list-item"
                                                                @click="selectedHotel(hotel.id)"
                                                                @mouseover="flip(hotel.id)"
                                                                @mouseout="unflip(hotel.id)"
                                                                :class="{ 'flip': hotel.id === flippedHotelId, 'checked': hotel.id === form.hotel_id }">

                                                                <div class="front">
                                                                    <label :for="'hotel-list-item' + hotel.id "></label>
                                                                    <div class="hotel-list-item-img"><img :src="hotel.image" :alt="hotel.name"></div>
                                                                    <input :id="'hotel-list-item' + hotel.id " type="radio" name="hotel_id">
                                                                    <div class="hotel-list-item-title">{{ hotel.name }}</div>
                                                                </div>

                                                                <div class="back">
                                                                    <label :for="'hotel-list-item' + hotel.id "></label>
                                                                    <div class="hotel-list-item-address">{{ hotel.address }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                            <p v-if="errors.length">
                                                <b>Please correct the following error(s):</b>
                                                <ul class="following-error">
                                                    <li v-for="error in errors" :key="error" v-bind:class="{'text-danger': error }" style="font-size:25px">{{ error }}</li>
                                                </ul>
                                            </p>
                                            <div class="row groupofpeople">
                                                <div class="col-12">
                                                    <h2>
                                                        {{ form.category == 'Hotel Night' ? 'Select your room for the night stay:' : 'Select your group of people for the tour:' }}
                                                    </h2>
                                                    <div class="scroll-table">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">{{ form.category == 'Hotel Night' ? 'Name' : 'Age' }}</th>
                                                                    <th scope="col">Fees and Taxes</th>
                                                                    <th scope="col">
                                                                        {{ form.category == 'Hotel Night' ? 'Select Room' : 'Select Group Of People' }}
                                                                    </th>
                                                                    <th scope="col">Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody v-for="(tour, p) in details.tourPackageRateGroups"
                                                                :key="tour.id">
                                                                <tr>
                                                                    <td class="age" data-label="Age">
                                                                        <img src="../assets/images/aduct.png" />
                                                                        {{ tour.rate_for }}
                                                                    </td>
                                                                    <td class="taxes" data-label="Fees and Taxes">
                                                                        <p v-if="tour.description" style="white-space: pre-line;">
                                                                            {{ tour.description }}
                                                                        </p>
                                                                        <p v-else>
                                                                            Navajo Nation: Permit Fee ${{ tour.permit_fee
                                                                            }} & Tax ${{ tour.tax}}
                                                                        </p>
                                                                    </td>
                                                                    <td class="group"
                                                                        data-label="Select Group Of People">
                                                                        <select
                                                                            class="form-select people-group1"
                                                                            :name="'people_group' + tour.id "
                                                                            :id="'people_group'+tour.id">
                                                                            <option v-for="(item, q) in selectgrouppeoples"
                                                                                :value="item.value" :key="item.value" :selected="q == this.form.people_group[p]">{{
                                                                                item.number }}</option>
                                                                        </select>
                                                                    </td>
                                                                    <td class="price" data-label="Price">
                                                                        <span class="tag">${{ tour.rate }}</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-6 text-start">
                                                            <div v-if="form.questions.length">
                                                                <h2 class="mb-2">Your Input Matters:</h2>
                                                                <div class="form-group text-start" v-for="(data, index) in form.questions" :key="index">
                                                                    <label for="questions" class="col-form-label">{{ data.question }} <span class="required-star">*</span></label>
                                                                    <input type="text" v-model="form.answers[index]" :id="'answers-'+index" class="form-control" placeholder="Please type your answer ...">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6 booknowbtn text-end">
                                                            <button type="submit">Continue</button>
                                                            <!-- <button @click="addToCart" class="m-1">Add to Cart</button> -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="row permit-tax" v-for="tourPackageData in details.tourPackageData"
                                    :key="1">
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

export default {
    name: "Init",
    title: "Native American Tours",
    components: {
        Datepicker
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            packageOrder: [],
            comboIds: 0,
            tourPackageName: "",
            totalavailableseats: 0,
            selectgrouppeoples: [],
            details: [],
            hotels: [],
            flippedHotelId: null,
            cartItem: [],
            cartItemLength: 0,
            slotId: 0,
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
                date: getUTCDateFromTimeZone(),
                time_date: null,
                people_group: [],
                rate_group: [],
                calucation: [],
                subtotal: 0,
                fees: 0,
                total: 0,
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
                category: 'Tour',
                travel_duration: '02:00:00',
                questions: [],
                answers: [],
            },
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

                    var slotTimes = response.data.Time

                    // if (this.comboIds != 0 && this.cartItemLength) {
                    //     this.blockedTimes = {};
                    //     for (const key in this.cartItem) {
                    //         this.generateTimeArray(this.cartItem[key]);
                    //     }

                    //     for (let packageId in this.blockedTimes) {
                    //         if (this.blockedTimes.hasOwnProperty(packageId)) {
                    //             let packageData = this.blockedTimes[packageId];
                    //             if (packageData.date == date) {
                    //                 slotTimes = slotTimes.filter(element => {
                    //                     // Convert element.slot_time to Date object for comparison
                    //                     let slotTime = new Date(`2000-01-01T${element.slot_time}`);

                    //                     // Convert packageData.time to Date objects for comparison
                    //                     let startTime = new Date(`2000-01-01T${packageData.time[0]}`);
                    //                     let endTime = new Date(`2000-01-01T${packageData.time[1]}`);

                    //                     // Check if slotTime falls within the time range
                    //                     return !(slotTime >= startTime && slotTime <= endTime);
                    //                 });
                    //             }
                    //         }
                    //     }
                    // }

                    this.dateTimeArr = slotTimes;
                    this.totalavailableseats = response.data.TotalAvailableSeats;
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

                    this.updateRateGroups(date, 0, loader);
                }).catch(error => {
                    this.details.tourPackageRateGroups = [];
                    this.begins = error?.response?.data?.data?.begins;
                    this.processLoader(loader);
                });
        },
        updateRateGroups(date, calendar = 0, loader) {
            console.log('updateRateGroups');

            var comboIds = 0; // Need only selected package data and it's rate groups

            axios.get("/tour-package/" + date + "/" + this.form.tour_operator_id + "/" + this.form.package_id + "/" + this.form.affiliate_id + "/" + comboIds + "/" + this.with_rate_groups)
                .then((response) => {
                    this.$store.dispatch('storeTourPackage', response.data)
                    this.tourPackageName = response.data.tourPackageData[0].package_name;
                    this.details = this.$store.state.tourPackage;
                    this.hotels = response.data.hotels;
                    this.details.tourPackageRateGroups = this.details.tourPackageRateGroups[this.form.package_id];

                    this.form.service_commission = this.$store.state.tourPackage.tourPackageData[0].service_commission_percentage;
                    this.form.things_to_bring = response.data.thingsToBring;
                    this.form.short_description = response.data.tourPackageData[0].short_description;
                    this.form.long_description = response.data.tourPackageData[0].long_description;
                    this.form.duration = response.data.tourPackageData[0].duration;
                    this.form.latitude = response.data.tourPackageData[0].latitude;
                    this.form.longitude = response.data.tourPackageData[0].longitude;
                    this.form.category = response.data.tourPackageData[0].category;
                    this.form.travel_duration = response.data.tourPackageData[0].travel_duration;
                    this.form.questions = response.data.questions;

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

                    if (this.comboIds != 0 && this.cartItemLength) {
                        this.blockedTimes = {};
                        for (const key in this.cartItem) {
                            this.generateTimeArray(this.cartItem[key]);
                        }

                        for (let packageId in this.blockedTimes) {
                            if (this.blockedTimes.hasOwnProperty(packageId)) {
                                let packageData = this.blockedTimes[packageId];
                                if (packageData.date == date) {
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

                    this.processLoader(loader);
                }).catch(() => {
                    this.processLoader(loader);
                });

            if (calendar) {
                this.form.tour_slot_id = 0;
                this.form.time_date = null;
                this.form.slot_time = null;
            }

            this.$store.dispatch('storeTabs', this.tabs);
            this.$store.dispatch('storeMindChange', 0);
        },
        selectedDate(date) {
            console.log('selectedDate');

            var loader = this.$loading.show();
            this.form.date = date;
            this.dateTimeArr = [];
            this.errors = [];

            var date = format(date, 'yyyy-MM-dd');

            axios.get("/tour-slot/" + date + '/' + this.form.package_id + '/' + this.form.affiliate_id).then((response) => {
                this.begins = response.data.begins;
                var slotTimes = response.data.Time

                // if (this.comboIds != 0 && this.cartItemLength) {
                //     this.blockedTimes = {};
                //     for (const key in this.cartItem) {
                //         this.generateTimeArray(this.cartItem[key]);
                //     }

                //     for (let packageId in this.blockedTimes) {
                //         if (this.blockedTimes.hasOwnProperty(packageId)) {
                //             let packageData = this.blockedTimes[packageId];
                //             if (packageData.date == date) {
                //                 slotTimes = slotTimes.filter(element => {
                //                     // Convert element.slot_time to Date object for comparison
                //                     let slotTime = new Date(`2000-01-01T${element.slot_time}`);

                //                     // Convert packageData.time to Date objects for comparison
                //                     let startTime = new Date(`2000-01-01T${packageData.time[0]}`);
                //                     let endTime = new Date(`2000-01-01T${packageData.time[1]}`);

                //                     // Check if slotTime falls within the time range
                //                     return !(slotTime >= startTime && slotTime <= endTime);
                //                 });
                //             }
                //         }
                //     }
                // }

                this.dateTimeArr = slotTimes;
                this.totalavailableseats = response.data.TotalAvailableSeats;
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

                this.updateRateGroups(date, 1, loader);
            }).catch(error => {
                this.details.tourPackageRateGroups = [];
                this.begins = error?.response?.data?.data?.begins;
                this.processLoader(loader);
            });
        },
        submit: function () {
            var loader = this.$loading.show();

            this.errors = [];

            if (!this.form.time_date) {
                this.errors.push("Please select a start time for your tour");
            }

            let rateGroupArr = [];
            let feesGroupArr = [];
            let groupPaxArr = [];
            let paxSubtotalArr = [];

            const tourPackageRateGroups = this.details.tourPackageRateGroups;
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

            const rateGroupsum = groupPaxArr.reduce((a, b) => Number(a) + Number(b), 0);
            const feesSum = feesGroupArr.reduce((a, b) => Number(a) + Number(b), 0);
            const subtotalSum = paxSubtotalArr.reduce((a, b) => Number(a) + Number(b), 0);

            if (rateGroupsum == 0) {
                this.errors.push("Please select your group of people for the tour");
            } else {
                delete (this.errors.length > 1 ? this.errors[1] : this.errors[0]);
                if (this.form.tenant_id == 'apm' && rateGroupsum == 1) {
                    this.errors.push("Please select a minimum of two people to process your booking");
                } else if (groupPaxArr[0] == 0) {
                    this.errors.push("Please select a minimum of one adult to process your booking");
                }
            }

            if (this.errors.length == 0) {
                this.form.calucation = paxSubtotalArr;
                this.form.rate_group = rateGroupArr;
                this.form.people_group = groupPaxArr;
                this.form.iframeStatusInfo = this.iframeStatus;
                this.form.package_name = this.tourPackageName;
                this.form.subtotal = subtotalSum;
                this.form.fees = feesSum;
                this.form.total = subtotalSum + feesSum;

                this.addToCart(loader);
            } else {
                this.processLoader(loader);
            }
        },
        roundout(amount, places = 0) {
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

            this.$store.dispatch('storeSlotId', id)
            this.form.tour_slot_id = id;
            this.form.time_date = timeDate;
            this.form.slot_time = slotTime;
        },
        selectedHotel: function (hotelId) {
            this.$store.dispatch('storeHotelId', hotelId)
            this.form.hotel_id = hotelId;
            if (this.hotels.length) {
                this.hotels.forEach(hotel => {
                    if (hotel.id == this.form.hotel_id) {
                        this.form.hotel_name = hotel.name;
                        this.form.hotel_image = hotel.image;
                        this.form.hotel_address = hotel.address;
                    }
                });
            }
        },
        flip(hotelId) {
            this.flippedHotelId = hotelId;
        },
        unflip(hotelId) {
            this.flippedHotelId = null;
        },
        staticDateRange: function (date, tenant) {
            const tenants = ["kens", "dixies"];
            if( tenants.indexOf(tenant) === -1 ){
                return false
            }

            date = new Date(date);
            let firstDate = new Date('01 06 2024');
            let secondDate = new Date('01 13 2024');
            return date >= firstDate && date < secondDate && this.form.package_id == 1;
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
        bufferTimes(packageId) {
            axios.get("/buffer-times/" + packageId).then((response) => {
                console.log(response);
            }).catch(error => {
                // this.processLoader(loader);
            });
        },
        generateTimeArray(cartItem) {
            var packageId = cartItem.package_id;
            var date = cartItem.date;
            var time = cartItem.slot_time;
            var offset = this.form.travel_duration;

            const timeFormat = 'HH:mm:ss';
            const [offsetHours, offsetMinutes] = offset.split(':').map(Number);
            const timeBefore = this.calculateTime(time, -offsetHours, -offsetMinutes, timeFormat);
            const timeAfter = this.calculateTime(time, offsetHours, offsetMinutes, timeFormat);

            if (this.blockedTimes[this.form.package_id] || this.form.package_id == packageId) {
                // this.blockedTimes.splice(this.form.package_id, 1);
            } else {
                this.blockedTimes[packageId] = {
                    date: format(date, 'yyyy-MM-dd'),
                    time: [timeBefore, timeAfter]
                };
            }
            console.log(this.blockedTimes);
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
        }
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