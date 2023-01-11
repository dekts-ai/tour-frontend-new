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
                                            <a v-if="iframeStatus && data.package_id && form.affiliate_id" :href="`${baseUrl}?pkg=${data.package_id}&aid=${form.affiliate_id}&iframe=${iframeStatus}`">
                                                Home
                                            </a>
                                            <a v-else-if="iframeStatus && data.package_id" :href="`${baseUrl}?pkg=${data.package_id}&iframe=${iframeStatus}`">
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

                                                            <text v-if="name.bookable_status == 'Open' && name.dd < name.seats" class="seats-free">{{ name.seats - name.dd }} SEATS</text>
                                                            <text v-else class="watermark">
                                                                <span v-if="name.date >= '15-1-2023' && name.date <= '21-1-2023'">CLOSED</span>
                                                                <span v-else>SOLD OUT</span>
                                                            </text>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="radio-toolbar" v-else>
                                                        <h2>Slot not found</h2>
                                                    </div> -->
                                                </div>
                                            </div>
                                            <hr>
                                            <p v-if="errors.length">
                                                <b>Please correct the following error(s):</b>
                                            <ul>
                                                <li v-for="error in errors" :key="error"
                                                    v-bind:class="{'text-danger': error }" style="font-size:25px">{{
                                                    error }}</li>
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
                                                                            }} & Tax ${{ tour.Tax}}, Processing Fee: {{
                                                                            tour.ProcessingFee }}%
                                                                        </p>
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
            year: "",
            totalavailableseats: {},
            selectgrouppeoples: [],
            details: [],
            disabledDates: {
                to: new Date(new Date().setDate(new Date().getDate() - 1)),
                from: new Date(2024, 0, 0)
            },
            preventDisableDateSelection: true,
            dateTimeArr: [],
            peopleselects: [],
            errors: [],
            form: {
                iframeStatusInfo: "",
                package_id: "",
                affiliate_id: "",
                date: new Date(),
                timedate: "",
                peoplegroup: [],
                amount: "",
                tour_slot_id: "",
                calucation: []
            }
        };
    },
    created: function () {
        this.iframeStatus = this.$store.state.iframeStatus;
        this.form.package_id = this.$store.state.packageId;
        this.form.affiliate_id = this.$store.state.affiliateId;
        if (this.$store.state.date) {
            this.form.date = new Date(this.$store.state.date);
        } else if (localStorage.getItem('date')) {
            this.form.date = new Date(localStorage.getItem('date'));
        }
        this.data = this.$store.state.formData;
        this.configure();
    },
    methods: {
        configure() {
            console.log('configure');

            var loader = this.$loading.show();
            document.title = "Native American Tours";

            var date = `${this.form.date.getDate()}-${this.form.date.getMonth() + 1}-${this.form.date.getFullYear()}`;

            axios.get("/tour-slot/" + date + '/' + this.form.package_id).then((response) => {
                this.dateTimeArr = response.data.Time;
                this.totalavailableseats = response.data.TotalAvailableSeats;
                this.selectgrouppeoples = [];
                var seats = this.totalavailableseats?.seats ? this.totalavailableseats?.seats : 0;
                seats = seats + 1;
                for (let index = 0; index < seats; index++) {
                    this.selectgrouppeoples.push({
                        id: index + 1,
                        value: index,
                        number: index,
                    });
                }

                this.processLoader(loader);
            }).catch(() => {
                this.processLoader(loader);
            });

            this.year = this.form.date.getFullYear();
            this.updateRateGroups();
        },
        selectedDate(date) {
            console.log('selectedDate');

            var loader = this.$loading.show();
            this.form.date = date;
            this.dateTimeArr = [];

            var date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

            axios.get("/tour-slot/" + date + '/' + this.form.package_id).then((response) => {
                this.dateTimeArr = response.data.Time;
                this.totalavailableseats = response.data.TotalAvailableSeats;
                this.selectgrouppeoples = [];
                var seats = this.totalavailableseats?.seats ? this.totalavailableseats?.seats : 0;
                seats = seats + 1;

                for (let index = 0; index < seats; index++) {
                    this.selectgrouppeoples.push({
                        id: index + 1,
                        value: index,
                        number: index,
                    });
                }

                this.processLoader(loader);
            }).catch(() => {
                this.processLoader(loader);
            });

            this.year = this.form.date.getFullYear();
            this.updateRateGroups();
        },
        selectedSlot: function (id, timedate) {
            console.log('selectedSlot');

            this.$store.dispatch('storeSlotId', id)
            this.form.tour_slot_id = id;
            this.form.timedate = timedate;
        },
        updateRateGroups() {
            console.log('updateRateGroups');

            var loader = this.$loading.show();
            axios.get("/tour-package/" + this.year + "/" + this.form.package_id + "/" + this.form.affiliate_id).then((response) => {
                this.$store.dispatch('storeTourPackage', response.data.TourPkgDetails)
                this.TourPkgName = response.data.TourPkgDetails[0].TourPkgName;
                this.details = response.data;

                // Define Variables
                var v1 = this.totalavailableseats?.seats ? this.totalavailableseats?.seats : 0;

                // Append Dropdown Value for TourPkgRates
                this.details.TourPkgRates.forEach((element) => {
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
                this.form.iframeStatusInfo = this.iframeStatus;

                let checkSlotarr = {
                    'tour_slot_id': this.form.tour_slot_id,
                    'package_id': this.form.package_id,
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
            } else {
                if (groupsum <= 0) {
                    this.errors.push("Please Select your group of people for the tour");
                }
            }
            e.preventDefault();
        },
        processLoader: function (loader) {
            loader.hide();
        },
        isDisabled: function (slot) {
            if(slot.bookable_status == 'Closed' || slot.dd >= slot.seats) {
                return 'disabled';
            }
        }
    }
};
</script>