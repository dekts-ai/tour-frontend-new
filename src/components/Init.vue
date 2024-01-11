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
                                            <a v-if="iframeStatus && form.package_id && form.affiliate_id" :href="`${baseUrl}?tid=${form.tenant_id}&oid=${form.tour_operator_id}&pid=${form.package_id}&aid=${form.affiliate_id}&iframe=${iframeStatus}`">
                                                Home
                                            </a>
                                            <a v-else-if="iframeStatus && form.package_id" :href="`${baseUrl}?tid=${form.tenant_id}&oid=${form.tour_operator_id}&pid=${form.package_id}&iframe=${iframeStatus}`">
                                                Home
                                            </a>
                                            <a v-else :href="`${baseUrl}`">
                                                Home
                                            </a>
                                        </li>
                                        <li>{{ TourPkgName }}</li>
                                    </ul>
                                    <div class="cloasedbtn">
                                        <img src="../assets/images/cross.png">
                                    </div>
                                </div>
                                <hr class="sep1">
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
                                    <div class="rating" v-if="form.package_id == 1">
                                        <ul>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li class="rate">4.5</li>
                                            <li class="info"><a href="javascript:void(0);" data-toggle="tooltip"
                                                    data-placement="top" title=""><img
                                                        src="../assets/images/info.png"></a></li>
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
                                                <img src="../assets/images/confirmation.png">
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-lg-6 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip"
                                                data-placement="top" title="">Secured</button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip"
                                                data-placement="top" title="">Health &
                                                Safety</button>
                                            <button @click="mindChange" class="btn btn-primary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                                        </div>
                                    </div>
                                </div>
                                <form @submit.prevent="submit">
                                    <div class="row starttime-row">
                                        <div class="col-12">
                                            <div class="row select-time">
                                                <div class="col-12 col-md-4">
                                                    <datepicker 
                                                        
                                                        v-model="form.date"
                                                        :value="form.date" 
                                                        :inline="true"
                                                        :disabled-dates="disabledDates"
                                                        :prevent-disable-date-selection="preventDisableDateSelection"
                                                        @selected="selectedDate">
                                                    </datepicker>
                                                </div>
                                                <div class="col-12 col-md-8 mt-4 mt-md-0">
                                                    <h2>Select a start time for your tour:</h2>
                                                    <div v-if="staticDateRange(form.date, form.tenant_id)">
                                                        <h3 class="watermark static-date-range">Canyon is closed for repairs. Please select another day.</h3>
                                                        <br>
                                                    </div>
                                                    <!-- <div v-else-if="begins">
                                                        <h3 class="watermark static-date-range">Exciting News! Our Tour Begins on <br />{{ begins }}.</h3>
                                                        <br>
                                                    </div> -->
                                                    <div class="radio-toolbar" v-if="dateTimeArr.length > 0">
                                                        <div class="time-item" 
                                                            :class="name.bookable_status == 'Open' && name.dd < name.seats ? 'seats-free-label' : 'watermark-label'" 
                                                            v-for="name in dateTimeArr"
                                                            :key="name.Id" 
                                                            @click="selectedSlot(name.Id, name.Time)">

                                                            <label class="time-item-lable" :for="name.Id"></label>

                                                            <input type="radio" :id="name.Id" name="timedate"
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
                                                    <div class="radio-toolbar" v-else-if="!begins && !staticDateRange(form.date, form.tenant_id) && dateTimeArr.length == 0">
                                                        <h3 class="watermark static-date-range" id="no-slot-found">{{ noSlotFound }}</h3>
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
                                            <ul>
                                                <li v-for="error in errors" :key="error" v-bind:class="{'text-danger': error }" style="font-size:25px">{{ error }}</li>
                                            </ul>
                                            </p>
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
                                                                        Select Group Of People
                                                                    </th>
                                                                    <th scope="col">Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody v-for="tour in details.TourPkgRates"
                                                                :key="tour.pkg_rate_id">
                                                                <tr>
                                                                    <td class="age" data-label="Age">
                                                                        <img src="../assets/images/aduct.png" />
                                                                        {{ tour.Age }}
                                                                    </td>
                                                                    <td class="taxes" data-label="Fees and Taxes">
                                                                        <p v-if="tour.description === ''">Navajo Nation: Permit Fee ${{tour.PermitFee}} & Tax ${{tour.Tax}}</p>
                                                                        <p v-else>{{ tour.description }}</p>
                                                                    </td>
                                                                    <td class="group"
                                                                        data-label="Select Group Of People">
                                                                        <select
                                                                            class="form-select people-group1"
                                                                            :name="'peoplegroup' + tour.pkg_rate_id "
                                                                            :id="'peoplegroup'+tour.pkg_rate_id">
                                                                            <option v-for="item in selectgrouppeoples"
                                                                                :value="item.value" :key="item.value">{{
                                                                                item.number }}</option>
                                                                        </select>
                                                                    </td>
                                                                    <td class="price" data-label="Price"
                                                                        v-if="peopleselects != '' && peopleselects != null">
                                                                        <span class="tag"><input type="hidden"
                                                                                name="amount" v-model="form.amount">{{
                                                                                tour.price}}</span>
                                                                    </td>
                                                                    <td class="price" data-label="Price" v-else>
                                                                        <span class="tag">${{ tour.price }}</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="booknowbtn text-end">
                                                        <button type="submit">Book Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="row permit-tax" v-for="TourPkgDetails in details.TourPkgDetails"
                                    :key="TourPkgDetails.pkg_rate_id">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="images-sec">
                                            <img :src="TourPkgDetails.HeaderImage" />
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="content-sec">
                                            <h2>{{TourPkgDetails.TourPkgName }}</h2>
                                            <p>{{ TourPkgDetails.TourPkgShortDesc }}</p>
                                            <p v-if="form?.tenant_id == 'kens'">{{ TourPkgDetails.TourPkgLongDesc }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="form?.tenant_id != 'kens'" class="row hiking-tour-row" v-for="TourPkgDetails in details.TourPkgDetails"
                                    :key="TourPkgDetails.pkg_rate_id">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="images-sec">
                                            <img :src="TourPkgDetails.DescriptionImage" />
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="content-sec">
                                            <h2>{{ TourPkgDetails.TourPkgName }}</h2>
                                            <p>{{ TourPkgDetails.TourPkgLongDesc }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row tour-start-row">
                                    <div class="col-12 col-sm-12 col-md-6 duration"
                                        v-for="TourPkgDetails in details.TourPkgDetails"
                                        :key="TourPkgDetails.pkg_rate_id">
                                        <h2>Duration</h2>
                                        <button class="btn-info">{{TourPkgDetails.TourPkgDuration }}</button>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-6 whattobring">
                                        <h2>What to Bring</h2>
                                        <div class="bring-group">
                                            <button class="btn-info" v-for="ThingsToBring in details.ThingsToBring"
                                                :key="ThingsToBring.pkg_rate_id">{{ ThingsToBring }}</button>

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
import { format } from 'date-fns';
import {getUTCDateFromTimeZone} from '../utils/dateUtils';

export default {
    name: "Index",
    title: "Native American Tours",
    components: {
        Datepicker
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            TourPkgName: "",
            totalavailableseats: 0,
            selectgrouppeoples: [],
            details: [],
            hotels: [],
            flippedHotelId: null,
            disabledDates: {
                to: this.getStartDate(),
                from: this.getEndDate()
            },
            preventDisableDateSelection: true,
            dateTimeArr: [],
            peopleselects: [],
            begins: null,
            noSlotFound: null,
            errors: [],
            form: {
                iframeStatusInfo: "",
                tenant_id: "",
                tour_operator_id: "",
                package_id: "",
                affiliate_id: "",
                hotel_id: 0,
                date: new Date(),
                timedate: "",
                peoplegroup: [],
                amount: "",
                tour_slot_id: "",
                calucation: []
            },
            with_rate_groups: 1
        };
    },
    created: function () {
        this.iframeStatus = this.$store.state.iframeStatus;
        this.form.tenant_id = this.$store.state.tenantId;
        this.form.tour_operator_id = this.$store.state.tourOperatorId;
        this.form.package_id = this.$store.state.packageId;
        this.form.affiliate_id = this.$store.state.affiliateId;
        this.form.hotel_id = this.$store.state.hotelId;

        if (this.form.package_id === 0) {
            window.location.href = '/';
        }

        if (this.$store.state.date) {
            this.form.date = new Date(this.$store.state.date);
        } else {
            this.form.date = this.getStartDate();
        }

        this.data = this.$store.state.formData;
        this.configure();
    },
    methods: {
        configure() {
            console.log('configure');

            var loader = this.$loading.show();
            this.noSlotFound = null;
            document.title = "Native American Tours";
            var date = format(this.form.date, 'yyyy-MM-dd');

            axios.get("/tour-slot/" + date + '/' + this.form.package_id + '/' + this.form.affiliate_id).then((response) => {
                this.begins = response.data.begins;
                this.dateTimeArr = response.data.Time;
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

                this.processLoader(loader);
            }).catch(error => {
                this.noSlotFound = "Apologies, No slots available on your chosen date.";
                this.begins = error?.response?.data?.data?.begins;
                this.processLoader(loader);
            });

            this.updateRateGroups(date);
        },
        selectedDate(date) {
            console.log('selectedDate');

            var loader = this.$loading.show();
            this.noSlotFound = null;
            this.form.date = date;
            this.dateTimeArr = [];

            var date = format(date, 'yyyy-MM-dd');

            axios.get("/tour-slot/" + date + '/' + this.form.package_id + '/' + this.form.affiliate_id).then((response) => {
                this.begins = response.data.begins;
                this.dateTimeArr = response.data.Time;
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

                this.processLoader(loader);
            }).catch(error => {
                this.noSlotFound = "Apologies, No slots available on your chosen date.";
                this.begins = error?.response?.data?.data?.begins;
                this.processLoader(loader);
            });

            this.updateRateGroups(date);
        },
        updateRateGroups(date) {
            console.log('updateRateGroups');

            var loader = this.$loading.show();
            axios.get("/tour-package/" + date + "/" + this.form.tour_operator_id + "/" + this.form.package_id + "/" + this.form.affiliate_id + "/" + this.with_rate_groups).then((response) => {
                this.$store.dispatch('storeTourPackage', response.data.TourPkgDetails)
                this.TourPkgName = response.data.TourPkgDetails[0].TourPkgName;
                this.details = response.data;
                this.details.TourPkgRates = this.details.TourPkgRates[this.form.package_id];
                this.hotels = response.data.hotels;

                // Define Variables
                var v1 = this.totalavailableseats;

                // Append Dropdown Value for TourPkgRates
                this.details.TourPkgRates?.forEach((element) => {
                    $("#peoplegroup" + element.pkg_rate_id)
                        .find("option")
                        .remove()
                        .end();

                    for (let j = 0; j <= v1; j++) {
                        $("#peoplegroup" + element.pkg_rate_id).append(
                            '<option value=' + j + '>' + j + '</option>'
                        );
                    }
                });
            });

            this.form.tour_slot_id = "";
            this.form.timedate = "";
            this.processLoader(loader);
        },
        submit: function (e) {
            const n = this.details.TourPkgRates;
            let index = 0;
            let GroupPeoArr = [];
            let CalPeoArr = [];

            n.forEach(number => {
                let names_field = 'peoplegroup' + number.pkg_rate_id;
                const field1 = document.querySelector("select[name=" + names_field + "]").value;
                GroupPeoArr.push(field1);

                const ProcessingFee1 =
                    Number(this.details.TourPkgRates[index].price) +
                    Number(this.details.TourPkgRates[index].PermitFee) +
                    Number(this.details.TourPkgRates[index].Tax);
                const Fee1 =
                    (Number(ProcessingFee1) *
                        Number(this.details.TourPkgRates[index].ProcessingFee)) /
                    100;
                var master_cal1 = Number(ProcessingFee1) + Number(Fee1);

                if (Number(field1 > 0)) {
                    var field1_cal = (Number(master_cal1) * Number(field1)).toFixed(2);
                } else {
                    field1_cal = 0;
                }
                CalPeoArr.push(field1_cal);
                this.errors = [];

                if (!this.form.timedate) {
                    this.errors.push("Please select a start time for your tour");
                }

                index++;
            });

            const groupsum = GroupPeoArr.reduce((a, b) => Number(a) + Number(b), 0);
            if (groupsum == 0) {
                this.errors.push("Please select your group of people for the tour");
            } else {
                delete (this.errors.length > 1 ? this.errors[1] : this.errors[0]);
                if (this.form.tenant_id == 'apm' && groupsum == 1) {
                    this.errors.push("Please select a minimum of two people to process your booking");
                } else if (GroupPeoArr[0] == 0) {
                    this.errors.push("Please select a minimum of one adult to process your booking");
                }
            }

            if (this.errors.length == 0) {
                let router = this.$router;
                this.form.calucation = CalPeoArr;
                this.form.peoplegroup = GroupPeoArr;
                this.form.iframeStatusInfo = this.iframeStatus;

                let checkSlotarr = {
                    'tour_slot_id': this.form.tour_slot_id,
                    'package_id': this.form.package_id,
                    'affiliate_id': this.form.affiliate_id,
                    'tourists': this.form.peoplegroup,
                    'tour_slot_time': this.form.timedate,
                };

                axios.post("/available-seats", checkSlotarr).then((response) => {
                    if (response.data.success == "false") {
                        this.errors.push(response.data.message);
                    } else {
                        this.$store.dispatch('storeFormData', this.form)
                        router.push("/payment");
                    }
                });

                return true;
            }
            e.preventDefault();
        },
        processLoader: function (loader) {
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
            if(slot.bookable_status == 'Closed' || slot.dd >= slot.seats) {
                return 'disabled';
            }
        },
        selectedSlot: function (id, timedate) {
            console.log('selectedSlot');

            this.$store.dispatch('storeSlotId', id)
            this.form.tour_slot_id = id;
            this.form.timedate = timedate;
        },
        selectedHotel: function (hotelId) {
            this.$store.dispatch('storeHotelId', hotelId)
            this.form.hotel_id = hotelId;
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
        mindChange() {
            this.$store.dispatch('storePackageId', 0)
            this.$router.push({
                name: 'Index'
            });
        },
    }
};
</script>

<style>
.payment-row .booking-row .info .btn-primary {margin-left: 5px; color: #004085; background-color: #cce5ff; border: 1px solid #b8daff; font-size: 13px; vertical-align: baseline; padding: 6px 17px; font-weight: 500;}
.payment-row .booking-row .info .btn-primary .fa {margin-right: 5px; margin-left: -5px;}
.static-date-range {width: 80%; margin: auto;}
.desired-pickup-location {text-align: left;}
</style>