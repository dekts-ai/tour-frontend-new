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
                                            <a :href="`${baseUrl}`">
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
                                                    data-placement="top" title="What is Lorem Ipsum?"><img
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
                                                data-placement="top" title="What is Lorem Ipsum?">Secured</button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip"
                                                data-placement="top" title="What is Lorem Ipsum?">Health &
                                                Safety</button>
                                        </div>
                                    </div>
                                </div>
                                <form @submit.prevent="submit">
                                    <div class="row date-booking-row align-items-center">
                                        <input id="realdatevalue" ref="realdatevalue" type="hidden">
                                        <input type="hidden" ref="day" id="day">
                                        <input type="hidden" id="month">
                                        <input type="hidden" id="year">
                                        <input type="hidden" id="date">
                                        <div class="col-xl-6" @click="onchange()">
                                            <div id="dsel2" ref="dsel2"></div>
                                        </div>
                                        <div class="col-xl-6 position-relative" v-on:change="onchangeNew()">
                                            <div id="dsel3" ref="dsel3"></div>
                                        </div>
                                    </div>
                                    <div class="row date-booking-row align-items-center">
                                        <div class="col-xl-7">
                                            <div class="calendardate">
                                                <div class="owl-carousel owl-theme owl-loaded">
                                                    <div class="owl-stage-outer">
                                                        <div class="owl-stage">
                                                            <div class="owl-item" v-for="(day, index) in week"
                                                                v-bind:key="index" v-on:click="setActiveDay(day)"
                                                                style="width: 74.286px;">
                                                                <div class="time-item">
                                                                    <label class="dayNumber">{{ day.ordinal }} <span>{{ day.dayName }}</span></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="owl-nav">
                                                        <button type="button" role="presentation" class="owl-prev" v-on:click="getPreviousWeek()">
                                                            <span aria-label="Previous">‹</span>
                                                        </button>
                                                        <button type="button" role="presentation" class="owl-next" v-on:click="getNextWeek()">
                                                            <span aria-label="Next">›</span>
                                                        </button>
                                                    </div>
                                                    <div class="owl-dots disabled"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-5 text-end">
                                            <div class="selectboxes">
                                                <div class="selectmonth">
                                                    <select name="calendarmonth" id="calendarmonth">
                                                        <option value="January">January</option>
                                                        <option value="February">February</option>
                                                        <option value="March">March</option>
                                                        <option value="April">April</option>
                                                        <option value="May">May</option>
                                                        <option value="June">June</option>
                                                        <option value="July">July</option>
                                                        <option value="August">August</option>
                                                        <option value="September" selected="">September</option>
                                                        <option value="October">October</option>
                                                        <option value="November">November</option>
                                                        <option value="December">December</option>
                                                    </select>
                                                </div>
                                                <div class="selectyear">
                                                    <select name="calendaryear" id="calendaryear">
                                                        <option value="2020">2021</option>
                                                        <option value="2020">2022</option>
                                                        <option value="2020">2023</option>
                                                        <option value="2020">2024</option>
                                                        <option value="2020">2025</option>
                                                        <option value="2020">2026</option>
                                                        <option value="2020">2027</option>
                                                        <option value="2020">2028</option>
                                                        <option value="2020">2029</option>
                                                        <option value="2020">2030</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {{ selectedDate }}
                                    <!-- <div class="row status-row">
                                       <div class="col-12 text-end">
                                          <ul class="status">
                                             <li class="available">Available</li>
                                             <li class="fastfilling">Fast Filling</li>
                                             <li class="soldout">Sold Out</li>
                                          </ul>
                                       </div>
                                    </div> -->
                                    <div class="row starttime-row">
                                        <div class="col-12">
                                            <div class="row select-time">
                                                <div class="col-12">
                                                    <h2>Select a start time for your tour:</h2>
                                                    <div class="radio-toolbar" v-if="dateTimeArr.length > 0">
                                                        <div class="time-item" v-for="name in dateTimeArr"
                                                            :key="name.Id" @click="timedate(name.Id, name.Time)">
                                                            <input type="radio" :id="name.Id" name="timedate"
                                                                :value="name.Time" />
                                                            <label :for="name.Id">{{ name.Time }}</label>
                                                        </div>
                                                    </div>
                                                    <div class="radio-toolbar" v-else>
                                                        <h2>Slot not found</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                            <p v-if="errors.length">
                                                <b>Please correct the following error(s):</b>
                                            <ul>
                                                <li v-for="error in errors" :key="error"
                                                    v-bind:class="{ 'text-danger': error }" style="font-size:25px">{{
                                                            error
                                                    }}</li>
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
                                                                        <p>
                                                                            Navajo Nation: Permit Fee ${{ tour.PermitFee
                                                                            }} & Tax ${{ tour.Tax }}, Processing Fee: {{
        tour.ProcessingFee
}}%
                                                                        </p>
                                                                    </td>
                                                                    <td v-if="form.tourists1" class="group"
                                                                        data-label="Select Group Of People">
                                                                        <select @change="onChange($event)"
                                                                            class="form-select people-group1"
                                                                            :name="'peoplegroup' + tour.pkg_rate_id"
                                                                            :id="'peoplegroup' + tour.pkg_rate_id"
                                                                            v-model="form.tourists1[tour.pkg_rate_id]">
                                                                            <option v-for="item in selectgrouppeoples"
                                                                                :value="item.value" :key="item.value"
                                                                                :selected="form.tourists1 === item.id">
                                                                                {{ item.number }}</option>
                                                                        </select>
                                                                    </td>

                                                                    <td v-else class="group"
                                                                        data-label="Select Group Of People">
                                                                        <select @change="onChange($event)"
                                                                            class="form-select people-group1"
                                                                            :name="'peoplegroup' + tour.pkg_rate_id"
                                                                            :id="'peoplegroup' + tour.pkg_rate_id">
                                                                            <option v-for="item in selectgrouppeoples"
                                                                                :value="item.value" :key="item.value">{{
                                                                                        item.number
                                                                                }}</option>
                                                                        </select>
                                                                    </td>


                                                                    <td class="price" data-label="Price"
                                                                        v-if="peopleselects != '' && peopleselects != null">
                                                                        <span class="tag"><input type="hidden"
                                                                                name="amount" v-model="form.amount">{{
                                                                                        tour.price
                                                                                }}</span>
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
                                            <h2>{{ TourPkgDetails.TourPkgName }}</h2>
                                            <p>{{ TourPkgDetails.TourPkgShortDesc }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row hiking-tour-row" v-for="TourPkgDetails in details.TourPkgDetails"
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
                                        <button class="btn-info">{{ TourPkgDetails.TourPkgDuration }}</button>
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
export default {
    name: "Index",
    title: "Foo Page",
    mounted() {
        let today = new Date();
        this.day = today.getDate();
        this.month = today.getMonth();
        this.year = today.getFullYear();
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: false,
            timeSlotChecked: true,
            selected_fulldate: '',
            TourPkgName: '',
            select_time: '',
            selectgrouppeoples: [],
            oldGroupPeopleValue: [],
            totalGroupPeopleValue: 0,
            details: [],
            dateTimeArr: [],
            date: null,
            peopleselects: [],
            errors: [],
            form: {
                iframeStatusInfo: '',
                package_id: '',
                dateselect: "",
                calendarmonth: "",
                calendaryear: "",
                day: "",
                timedate: "",
                peoplegroup: [],
                tour: "",
                amount: "",
                tour_slot_id: "",
                calucation: [],
                peoplegroup_: [],
                tourists1: "",
                fulldate: "",
            },
            timedateId: "",
            data: {
                timedate: "",
            },
            i: 0,
            year: [],
            month: [],
            week: [],
            selectedDate: {}
        };
    },
    created: function () {
        if (this.data != '' && this.data != null) {
            if (this.data.iframeStatusInfo == 'true') {
                this.iframeStatus = true;
            }
        }
        this.myFunctionOnLoad();
        this.myFunctionDateLoad();
        this.getWeekBlock();
    },
    updated() {
        const dateset = document.getElementById("date").value;
        this.form.dateselect = dateset;
        const day = document.getElementById("day").value;
        this.form.day = day;
        const month = document.getElementById("month").value;
        this.form.calendarmonth = month;
        const year = document.getElementById("year").value;
        this.form.calendaryear = year;
    },
    methods: {
        timedate(id, timedate) {
            this.form.tour_slot_id = id;
            this.form.timedate = timedate;
        },
        onChange: function (event) {
            // Define Variables
            var v1 = this.totalavailableseats.seats;
            var dropval = event.target.value;
            var eventId = event.target.id;
            var v2 = 0;
            // Compare previous value when available
            if (this.oldGroupPeopleValue.length > 0) {
                this.oldGroupPeopleValue.forEach((object) => {
                    if (
                        object.key == eventId &&
                        object.value &&
                        object.value > 0 &&
                        object.value != dropval
                    ) {
                        if (parseInt(object.value) > parseInt(dropval)) {
                            var diff = parseInt(object.value) - parseInt(dropval);
                            this.totalGroupPeopleValue =
                                parseInt(this.totalGroupPeopleValue) - parseInt(diff);
                            v2 = parseInt(v1) - parseInt(this.totalGroupPeopleValue);
                        } else {
                            diff = parseInt(dropval) - parseInt(object.value);
                            this.totalGroupPeopleValue =
                                parseInt(this.totalGroupPeopleValue) + parseInt(diff);
                            v2 = parseInt(v1) - parseInt(this.totalGroupPeopleValue);
                        }
                    } else {
                        if (object.key == eventId) {
                            this.totalGroupPeopleValue =
                                parseInt(this.totalGroupPeopleValue) + parseInt(dropval);
                            v2 = parseInt(v1) - parseInt(this.totalGroupPeopleValue);
                        }
                    }
                });
            } else {
                this.totalGroupPeopleValue =
                    parseInt(this.totalGroupPeopleValue) + parseInt(dropval);
                v2 = parseInt(v1) - parseInt(this.totalGroupPeopleValue);
            }
            // Append Dropdown Value for TourPkgRates
            this.oldGroupPeopleValue = [];
            this.details.TourPkgRates.forEach((element) => {
                if (v2 > 0) {
                    $("#peoplegroup" + element.pkg_rate_id).prop("disabled", false);
                }
                var packageValue = $("#peoplegroup" + element.pkg_rate_id).val();
                this.oldGroupPeopleValue.push({
                    key: "peoplegroup" + element.pkg_rate_id,
                    value: packageValue,
                });
                if (packageValue != null && packageValue > 0) {
                    if (v2 > packageValue) {
                        this.appendValue(v2, packageValue, element.pkg_rate_id);
                    }
                } else {
                    if (v2 <= 0) {
                        $("#peoplegroup" + element.pkg_rate_id).prop("disabled", true);
                        $("#peoplegroup" + element.pkg_rate_id)
                            .find("option")
                            .remove()
                            .end();
                        this.appendValue(v2, 0, element.pkg_rate_id);
                    } else {
                        if (v2 > 0) {
                            this.appendValue(v2, 0, element.pkg_rate_id);
                        }
                    }
                }
            });
        },
        appendValue(v2, packageValue, pkg_rate_id) {
            $("#peoplegroup" + pkg_rate_id)
                .find("option")
                .remove()
                .end();
            for (let j = 0; j <= v2; j++) {
                var selectedValue = j == packageValue ? "selected" : "";
                $("#peoplegroup" + pkg_rate_id).append(
                    '<option value="' + j + '" ' + selectedValue + ">" + j + "</option>"
                );
            }
        },
        onchange() {
            const date = document.getElementById("realdatevalue").value;
            this.form.fulldate = date;
            const dateset = document.getElementById("date").value;
            this.form.dateselect = dateset;
            const day = document.getElementById("day").value;
            this.form.day = day;
            const month = document.getElementById("month").value;
            this.form.calendarmonth = month;
            const year = document.getElementById("year").value;
            this.form.calendaryear = year;
            const cdddate = document.getElementById("realdatevalue").value;
            this.selected_fulldate = cdddate;
            this.dateTimeArr = [];
            axios.get("/tour-slot/" + cdddate + '/' + this.form.package_id).then((response) => {
                this.dateTimeArr = response.data.Time;
                this.totalavailableseats = response.data.TotalAvailableSeats;
                this.selectgrouppeoples = [];
                var seatsava = this.totalavailableseats.seats + 1;
                for (let index = 0; index < seatsava; index++) {
                    this.selectgrouppeoples.push({
                        id: index + 1,
                        value: index,
                        number: index,
                    });
                }

            });
            this.timeSlotChecked = false;
            this.select_time = "";
            this.form.tour_slot_id = "";
            this.form.timedate = "";
        },
        onchangeNew() {
            const date = document.getElementById("realdatevalue").value;
            this.form.fulldate = date;
            const dateset = document.getElementById("date").value;
            this.form.dateselect = dateset;
            const day = document.getElementById("day").value;
            this.form.day = day;
            const month = document.getElementById("month").value;
            this.form.calendarmonth = month;
            const year = document.getElementById("year").value;
            this.form.calendaryear = year;
            const cdddate = document.getElementById("realdatevalue").value;
            this.selected_fulldate = cdddate;
            const package_id = this.form.package_id
            this.dateTimeArr = [];
            axios.get("/tour-slot/" + cdddate + '/' + package_id).then((response) => {
                this.dateTimeArr = response.data.Time;
                this.totalavailableseats = response.data.TotalAvailableSeats;
                this.selectgrouppeoples = [];
                var seatsava = this.totalavailableseats.seats + 1;
                for (let index = 0; index < seatsava; index++) {
                    this.selectgrouppeoples.push({
                        id: index + 1,
                        value: index,
                        number: index,
                    });
                }
            });
            this.timeSlotChecked = false;
            this.select_time = "";
            this.form.tour_slot_id = "";
            this.form.timedate = "";
        },
        myFunctionDateLoad: function () {
            document.title = "Native American Tours";
            const current = new Date();
            var date = `${current.getDate()}-${current.getMonth() + 1
                }-${current.getFullYear()}`;
            this.selected_fulldate = date;
            axios.get("/tour-slot/" + date + '/' + this.form.package_id).then((response) => {
                this.dateTimeArr = response.data.Time;
                this.totalavailableseats = response.data.TotalAvailableSeats;
                this.selectgrouppeoples = [];
                var seatsava = this.totalavailableseats.seats + 1;
                for (let index = 0; index < seatsava; index++) {
                    this.selectgrouppeoples.push({
                        id: index + 1,
                        value: index,
                        number: index,
                    });
                }
            });
        },
        myFunctionOnLoad: function () {
            let uri = window.location.search.substring(1);
            if (uri != '') {
                let params = new URLSearchParams(uri);

                let package_id = params.get("pkg");
                if (params.get("iframe") != null && params.get("iframe") == 'true') {
                    this.iframeStatus = params.get("iframe");
                } else {
                    this.iframeStatus = false;
                }

                if (package_id != '' && package_id > 1) {
                    this.form.package_id = package_id;
                } else {
                    this.form.package_id = 1;
                }
            } else {
                this.form.package_id = 1;
            }

            axios.get("/tour-package/" + this.form.package_id + "").then((response) => {
                this.$store.dispatch('storeTourPkgDetails', response.data.TourPkgDetails)
                this.TourPkgName = response.data.TourPkgDetails[0].TourPkgName;
                this.details = response.data;
            });
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

                if (this.form.timedate == '' && this.select_time != '' && this.select_time != 'null') {
                    this.form.timedate = this.select_time;
                }
                if (!this.form.timedate) {
                    this.errors.push("Please Select a start time for your tour");
                }

                index++;
            });

            const groupsum = GroupPeoArr.reduce((a, b) => Number(a) + Number(b), 0);
            const calsum = CalPeoArr.reduce((a, b) => Number(a) + Number(b), 0);

            if (groupsum != 0 && this.form.timedate != '' && calsum != 0) {
                let router = this.$router;
                this.form.calucation = CalPeoArr;
                this.form.peoplegroup = GroupPeoArr;
                this.form.peoplegroup_ = GroupPeoArr;
                this.form.iframeStatusInfo = this.iframeStatus;

                let checkSlotarr = {
                    'tour_slot_id': this.form.tour_slot_id,
                    'package_id': this.form.package_id,
                    'tourists': this.form.peoplegroup,
                    'tour_slot_time': this.form.timedate,
                    'tour_slot_fulldate': this.selected_fulldate,
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
            } else {
                if (groupsum <= 0) {
                    this.errors.push("Please Select your group of people for the tour");
                }
            }
            e.preventDefault();
        },
        getOrdinalNum(n) {
            return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
        },
        getDayName(n) {
            var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return dayNames[n];
        },
        addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        },
        getWeekBlock() {
            let today = new Date();
            let prevMonday = new Date();

            let n = today.getDay();

            prevMonday.setDate(today.getDate() - (n - 1) + (this.i * 7));

            this.prevMonday = prevMonday;

            // Flush this.week to empty Array:
            this.week = [];

            this.month = [];

            this.year = [];

            for (var i = 0; i < 7; i++) {
                let day = this.addDays(this.prevMonday, i);

                let currentDayToday = false;
                if (today.getTime() == day.getTime()) {
                    currentDayToday = true;
                }

                this.week.push({
                    ordinal: day.getDate(),
                    dayName: this.getDayName(day.getDay()),
                    active: false,
                    currentDayToday: currentDayToday,
                    actual: new Date(day.setHours(0, 0, 0, 0)),
                });

                this.month.indexOf(day.toLocaleString('default', { month: 'long' })) === -1 ? this.month.push(day.toLocaleString('default', { month: 'long' })) : this.month;
                this.year.indexOf(day.toLocaleString('default', { year: 'numeric' })) === -1 ? this.year.push(day.toLocaleString('default', { year: 'numeric' })) : this.year;
            }
        },
        getNextWeek() {
            this.i++;
            this.getWeekBlock();
        },
        getPreviousWeek() {
            this.i--;
            this.getWeekBlock();
        },
        setActiveDay(activeDay) {
            console.log(activeDay);
            // this.selectedDate = activeDay;
            this.week.forEach((day) => {
                if (activeDay == day) {
                    day.active = true;
                } else {
                    day.active = false;
                }
            });
        },
    }
};
</script>