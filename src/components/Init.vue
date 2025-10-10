<template>
    <div>
        <section class="tabs-section">
            <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
        </section>

        <section class="inner-content-section">
        <div :class="['no-container']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div class="row payment-row">
                            <div class="col-12">
                                <TourForm ref="TourForm" :form="form" :begins="begins" :slot-not-found="slotNotFound"
                                    :date-time-arr="dateTimeArr" :reveal="reveal" :tour-package-name="tourPackageName"
                                    :hotels="hotels" :errors="errors" :is_group_rate_enabled="is_group_rate_enabled"
                                    :tour-package-rate-groups="details.tourPackageRateGroups"
                                    :tour-package-data="details.tourPackageData"
                                    :selectgrouppeoples="selectgrouppeoples" :has_contacts="has_contacts"
                                    :static-date-range="staticDateRange" :selected-date="selectedDate"
                                    :call-to-book-validation="callToBookValidation" :open-phone-popup="openPhonePopup"
                                    :selected-slot="selectedSlot" :is-disabled="isDisabled"
                                    :handle-group-rate-discount-change="handleGroupRateDiscountChange"
                                    :increment="increment" :decrement="decrement" :update-pax-detail="updatePaxDetail"
                                    :remove-pax="removePax" :has-custom-form-fields="hasCustomFormFields"
                                    :submit="submit" />

                                <!-- Package details removed from Schedule section as per user request -->
                                <!-- <TourDetails :tour-package-data="details.tourPackageData" :form="form"
                                    :things-to-bring="details.thingsToBring" /> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { getMomentTimezone } from '../utils/dateUtils';
import Swal from 'sweetalert2';
import NavBtns from './Nav/NavBtns.vue';
import TourForm from './Initialization/TourForm.vue';
import TourDetails from './Initialization/TourDetails.vue';
import moment from 'moment';

export default {
    name: 'Init',
    title: 'Native American Tours',
    components: {
        NavBtns,
        TourForm,
        TourDetails
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: true,
            reveal: false,
            loaderInstance: null,
            packageOrder: [],
            comboIds: 0,
            tourPackageName: '',
            totalAvailableSeats: 0,
            selectgrouppeoples: [],
            details: { tourPackageData: [], tourPackageRateGroups: {}, thingsToBring: [] },
            hotels: [],
            cartItem: {},
            cartItemLength: 0,
            slotNotFound: false,
            customRateFound: false,
            dateTimeArr: [],
            begins: null,
            blockedTimes: {},
            errors: [],
            customFieldExists: false,
            form: {
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
                timezone: this.$store.state.timezone,
                date: this.getFormDate(),
                time_date: null,
                total_people_selected: 0,
                people_group: [],
                rate_group: [],
                calculation: [],
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
                currency: "USD"
            },
            minSeats: 0,
            maxSeats: 0,
            is_group_rate_enabled: 0,
            is_partner_package: 0,
            withRateGroups: 1,
            has_contacts: 0,
            tabs: 2
        };
    },
    created() {
        this.initializeFromStore();
        this.fetchTourData(this.form.date, false);
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        getFormDate() {
            const today = getMomentTimezone(this.$store.state.timezone);
            if (this.$store.state.tenantId === 'dixies' && today.year() === 2025) {
                return getMomentTimezone(this.$store.state.timezone, [2026, 0, 1]).format('YYYY-MM-DD');
            }
            return getMomentTimezone(this.$store.state.timezone).format('YYYY-MM-DD');
        },
        initializeFromStore() {
            const { state } = this.$store;
            this.packageOrder = state.packageOrder || [];
            this.comboIds = state.comboIds ?? 0;
            this.cartItem = state.cartItem || {};
            this.cartItemLength = Object.keys(this.cartItem).length;
            this.iframeStatus = state.iframeStatus;

            const storedForm = this.comboIds ? state?.formData : state?.cartItem?.[state.slotId];
            const defaultForm = {
                tenant_id: state.tenantId || null,
                tour_operator_id: state.tourOperatorId || 0,
                package_id: state.packageId || 0,
                affiliate_id: state.affiliateId || 0,
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
            };

            this.form = storedForm && storedForm.package_id === state.packageId && storedForm.affiliate_id === state.affiliateId
                ? { ...this.form, ...storedForm }
                : { ...this.form, ...defaultForm };
        },

        async fetchTourData(date, resetSlot = false) {
            this.processLoader(true);
            try {
                const { package_id, affiliate_id } = this.form;
                const slotResponse = await axios.get(`/tour-slot/${date}/${package_id}/${affiliate_id}`);
                const { begins, Time: slotTimes = [], closedSlotVisibility, TotalAvailableSeats = 0 } = slotResponse.data;

                this.begins = begins;
                this.dateTimeArr = (closedSlotVisibility === false
                    ? slotTimes.filter(slot => slot.bookable_status === 'Open' && slot.dd < slot.seats)
                    : slotTimes
                ).map(slot => ({ ...slot, visible: true, custom_rate: slot.custom_rate || 0 }));

                this.customRateFound = this.dateTimeArr.some(slot => slot.custom_rate !== 0);
                this.totalAvailableSeats = TotalAvailableSeats;
                this.maxSeats = TotalAvailableSeats;
                this.slotNotFound = this.dateTimeArr.length === 0;

                this.selectgrouppeoples = Array.from({ length: TotalAvailableSeats + 1 }, (_, i) => ({
                    id: i + 1,
                    value: i,
                    number: i
                }));

                if (!begins && !this.staticDateRange(this.form.date, this.form.tenant_id)) {
                    this.with_rate_groups = this.customRateFound == true ? 0 : 1;
                    let revealFlag = (this.customRateFound == true && this.form.tour_slot_id === 0) ? false : true;
                    await this.fetchPackageData(date, resetSlot, revealFlag);
                } else if (this.form.tour_slot_id !== 0) {
                    await this.fetchPackageData(date, resetSlot, true);
                } else {
                    this.reveal = this.customRateFound;
                    this.tourPackageName = this.customRateFound ? '' : this.tourPackageName;
                }
            } catch (error) {
                console.error('Failed to fetch tour data:', error);
                this.slotNotFound = true;
                this.details.tourPackageRateGroups = {};
                this.begins = error?.response?.data?.data?.begins || null;
            } finally {
                this.processLoader(false);
            }
        },

        async fetchPackageData(date, resetSlot, revealFlag) {
            this.processLoader(true);
            try {
                const { tour_operator_id, package_id, affiliate_id, tour_slot_id } = this.form;
                const response = await axios.get(
                    `/tour-package/${date}/${tour_operator_id}/${package_id}/${affiliate_id}/0/${this.withRateGroups}/${tour_slot_id}`
                );
                this.$store.dispatch('storeTourPackage', response.data);

                const tourData = response.data.tourPackageData?.[0] || {};
                this.$store.dispatch('storeCurrency', tourData.currency || "USD");
                this.$store.dispatch('storeCountryCode', tourData.country_code || "US");

                this.tourPackageName = tourData.package_name || '';
                this.details = {
                    tourPackageData: response.data.tourPackageData || [],
                    tourPackageRateGroups: response.data.tourPackageRateGroups?.[package_id] || [],
                    thingsToBring: response.data.thingsToBring || []
                };
                this.hotels = response.data.hotels || [];
                this.has_contacts = tourData.has_contacts || 0;

                Object.assign(this.form, {
                    package_image: tourData.FrontendPackageImage || '',
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
                    call_to_book: response.data.callToBook || false,
                    service_commission: affiliate_id
                        ? Number(tourData.affiliate_processing_percentage || 0)
                        : Number(tourData.service_commission_percentage || 0)
                });

                this.is_group_rate_enabled = tourData.is_group_rate_enabled || 0;
                this.is_partner_package = tourData.is_partner_package || 0;
                if (this.is_group_rate_enabled) {
                    const defaultGroup = this.details.tourPackageRateGroups[0] || {};
                    Object.assign(this.form, {
                        selectedRateId: this.form.selectedRateId || defaultGroup.id,
                        selectedSize: this.form.selectedSize || defaultGroup.size,
                        selectedRate: this.form.selectedRate || defaultGroup.rate || 0,
                        selectedTax: this.form.selectedTax || defaultGroup.tax || 0,
                        total_people_selected: this.form.selectedSize || defaultGroup.size || 0
                    });
                }

                if (this.comboIds && this.cartItemLength) {
                    this.updateBlockedTimes(date);
                }

                if (this.form.package_has_slots === 0 && this.dateTimeArr[0]) {
                    this.selectedSlot(this.dateTimeArr[0].Id, this.dateTimeArr[0].Time, this.dateTimeArr[0].slot_time);
                }

                this.reveal = revealFlag;
            } catch (error) {
                console.error('Failed to fetch package data:', error);
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
                this.processLoader(false);
            }
        },

        updateBlockedTimes(date) {
            this.blockedTimes = Object.values(this.cartItem).reduce((acc, item) => {
                if (item.package_id !== this.form.package_id) {
                    const [hours, minutes] = item.travel_duration.split(':').map(Number);
                    const timeBefore = this.calculateTime(item.slot_time, -hours, -minutes);
                    const timeAfter = this.calculateTime(item.slot_time, hours, minutes);

                    acc[item.package_id] = {
                        date: item.date,
                        time: [timeBefore, timeAfter],
                        package_has_slots: item.package_has_slots
                    };
                }
                return acc;
            }, {});

            this.dateTimeArr = this.dateTimeArr.filter(slot => {
                return !Object.values(this.blockedTimes).some(({ date: blockedDate, time, package_has_slots }) => {
                    if (blockedDate !== date || !package_has_slots) return false;
                    const [startTime, endTime] = time.map(t => getMomentTimezone(this.$store.state.timezone, `2000-01-01T${t}`).format('YYYY-MM-DD HH:mm:ss'));
                    const slotTime = getMomentTimezone(this.$store.state.timezone, `2000-01-01T${slot.slot_time}`).format('YYYY-MM-DD HH:mm:ss');
                    return slotTime >= startTime && slotTime <= endTime;
                });
            });
        },

        selectedDate(date) {
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
            this.fetchTourData(date, true);
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
            // Update pricing breakdown immediately when rate group changes
            this.updatePricingBreakdown();
        },

        hasCustomFormFields(exists) {
            this.customFieldExists = exists;
        },

        updatePricingBreakdown() {
            // Only calculate if we have rate groups and people selected
            if (!this.details.tourPackageRateGroups?.length || this.form.total_people_selected === 0) {
                this.form.subtotal = 0;
                this.form.fees = 0;
                this.form.total = 0;
                return;
            }

            const rateGroups = Object.values(this.details.tourPackageRateGroups);
            const { paxSubtotalArr, feesGroupArr } = this.calculateTotals(rateGroups);
            
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
                feesSum = this.roundout((discountedSubtotal * this.form.service_commission) / 100, 2);
            } else if (this.form.discount2_value > 0) {
                discountedSubtotal = Number(subtotalSum - this.form.discount2_value).toFixed(2);
                feesSum = this.roundout((discountedSubtotal * this.form.service_commission) / 100, 2);
            }

            const total = Number(discountedSubtotal) + Number(feesSum);
            this.form.subtotal = this.roundout(discountedSubtotal);
            this.form.fees = feesSum;
            this.form.total = this.roundout(total);
        },

        async submit() {
            this.errors = [];
            this.processLoader(true);
            this.form.addons_total = 0;
            this.form.addons_fee = 0;

            try {
                if (this.has_contacts) {
                    const validationErrors = this.validatePaxDetails();
                    if (validationErrors.length) {
                        this.errors = validationErrors;
                        this.$nextTick(() => this.scrollToErrors());
                        return;
                    }
                }

                if (this.customFieldExists && this.$refs.TourForm) {
                    const customFormData = await this.$refs.TourForm.$refs.CustomFieldsRef.submitForm(false);
                    if (customFormData.errors.length) {
                        this.errors = customFormData.errors;
                    } else {
                        this.form.custom_fields = customFormData.fields;
                        this.form.addons_total = this.$refs.TourForm.$refs.CustomFieldsRef.sumTotal(customFormData.fields);
                        this.form.addons_fee = this.roundout(this.$refs.TourForm.$refs.CustomFieldsRef.feeTotal(customFormData.fields));
                    }
                }

                if (!this.form.time_date && this.form.package_has_slots) {
                    this.errors.push('Please select a start time for your tour.');
                }

                const rateGroups = Object.values(this.details.tourPackageRateGroups);
                if (this.validateMinMaxScenario(rateGroups)) {
                    this.$nextTick(() => this.scrollToErrors());
                    return;
                }

                const { groupPaxArr, rateGroupArr, paxSubtotalArr, feesGroupArr } = this.calculateTotals(rateGroups);
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
                    feesSum = this.roundout((discountedSubtotal * this.form.service_commission) / 100, 2);
                } else if (this.form.discount2_value > 0) {
                    discountedSubtotal = Number(subtotalSum - this.form.discount2_value).toFixed(2);
                    feesSum = this.roundout((discountedSubtotal * this.form.service_commission) / 100, 2);
                }

                const total = Number(discountedSubtotal) + Number(feesSum);
                this.form.subtotal = this.roundout(discountedSubtotal);
                this.form.fees = feesSum;
                this.form.total = this.roundout(total);

                if (this.form.total <= 0) {
                    this.errors.push('Oops! Something went wrong. Please try again later.');
                    this.$nextTick(() => this.scrollToErrors());
                    return;
                }

                if (!this.errors.length) {
                    Object.assign(this.form, {
                        calculation: paxSubtotalArr,
                        rate_group: rateGroupArr,
                        people_group: groupPaxArr,
                        package_name: this.tourPackageName
                    });
                    await this.addToCart();
                }

                if (this.errors.length) {
                    this.$nextTick(() => this.scrollToErrors());
                }
            } catch (error) {
                console.error('Submit error:', error);
                this.errors.push('An unexpected error occurred. Please try again.');
                this.$nextTick(() => this.scrollToErrors());
            } finally {
                this.processLoader(false);
            }
        },

        validatePaxDetails() {
            const errors = [];
            this.details.tourPackageRateGroups.forEach(tour => {
                this.form.paxDetails[tour.id] = this.form.paxDetails[tour.id] || [];
                if (this.form.counters[tour.id] && this.form.paxDetails[tour.id].length !== this.form.counters[tour.id]) {
                    errors.push(`Please provide details for all ${this.form.counters[tour.id]} attendees in ${tour.rate_for}.`);
                } else {
                    this.form.paxDetails[tour.id].forEach((pax, index) => {
                        if (!pax.name || !pax.age || !pax.weight) {
                            errors.push(`Please fill in all fields for Attendee ${index + 1} in ${tour.rate_for}.`);
                        }
                    });
                }
            });
            return errors;
        },

        calculateTotals(rateGroups) {
            const groupPaxArr = [];
            const rateGroupArr = [];
            const paxSubtotalArr = [];
            const feesGroupArr = [];

            if (this.is_group_rate_enabled) {
                const selectedGroup = rateGroups.find(group => group.size === this.form.selectedSize);
                groupPaxArr.push(this.form.selectedSize);
                rateGroupArr.push(selectedGroup.rate_for);
                const subtotal = Number(parseFloat(this.form.selectedRate) + parseFloat(this.form.selectedTax)).toFixed(2);
                paxSubtotalArr.push(subtotal);
                const fees = this.roundout((Number(subtotal) * Number(this.form.service_commission)) / 100, 2);
                feesGroupArr.push(fees.toFixed(2));
            } else {
                rateGroups.forEach(group => {
                    const partnerFeeAmount = this.is_partner_package ? group.partner_fee_amount : 0;
                    const count = this.form.counters[group.id] || 0;
                    groupPaxArr.push(count);
                    rateGroupArr.push(group.rate_for);
                    const rate = Number(group.rate) + Number(group.permit_fee || 0) + Number(group.tax || 0) + Number(partnerFeeAmount || 0);
                    const subtotal = count > 0 ? (count * rate).toFixed(2) : 0;
                    paxSubtotalArr.push(subtotal);
                    const fees = this.roundout((Number(rate) * Number(this.form.service_commission)) / 100, 2);
                    feesGroupArr.push(count > 0 ? (count * fees).toFixed(2) : 0);
                });
            }

            return { groupPaxArr, rateGroupArr, paxSubtotalArr, feesGroupArr };
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
                    this.$nextTick(() => this.scrollToErrors());
                    return;
                }

                let updatedCart = this.comboIds === 0
                    ? {}
                    : Object.fromEntries(
                        Object.entries(this.cartItem).filter(([, item]) => item.package_id !== this.form.package_id)
                    );

                this.form.package_image = this.details.tourPackageData?.[0]?.FrontendPackageImage || '';
                updatedCart[this.form.tour_slot_id] = { ...this.form };
                this.cartItem = updatedCart;
                this.$store.dispatch('storeCartItem', this.cartItem);
                this.$store.dispatch('storeMindChange', 1);

                // Always go to Add Extras first (tab 4), then to Checkout (tab 5)
                this.$router.push({ name: 'Addons' });
            } catch (error) {
                console.error('Add to cart error:', error);
                this.errors.push(error.response?.data?.message || 'Failed to add to cart.');
                this.$nextTick(() => this.scrollToErrors());
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
                this.details = { tourPackageData: [], tourPackageRateGroups: [], thingsToBring: [] };
                this.form.counters = {};
                this.form.people_group = [];
                this.form.total_people_selected = 0;
                this.form.paxDetails = {};
                this.errors = [];
                this.fetchPackageData(this.form.date, false, true);
            }
        },

        increment(rateId) {
            const newCount = (this.form.counters[rateId] || this.minSeats) + 1;
            if (newCount > this.maxSeats) return;

            this.form.counters[rateId] = newCount;
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
            
            // Update pricing breakdown immediately when rate count changes
            this.updatePricingBreakdown();
        },

        decrement(rateId) {
            const newCount = (this.form.counters[rateId] || this.minSeats) - 1;
            if (newCount < this.minSeats) return;

            this.form.counters[rateId] = newCount;
            if (this.has_contacts && this.form.paxDetails[rateId]?.length) {
                this.form.paxDetails[rateId].pop();
            }

            if (!this.is_group_rate_enabled) {
                this.form.total_people_selected = Object.values(this.form.counters).reduce(
                    (sum, num) => sum + num,
                    0
                );
            }
            
            // Update pricing breakdown immediately when rate count changes
            this.updatePricingBreakdown();
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

            const timezone = this.$store.state.timezone;

            // Use backend time as-is, don't convert timezone
            const slotTime = moment.parseZone(`${timeSlot.date}T${timeSlot.slot_time}`);

            // Get current time in timezone
            const currentTime = getMomentTimezone(timezone);

            const latestBookableTime = slotTime.clone().subtract(bookDuration, 'hours');

            const currentTimeFormatted = currentTime.format('YYYY-MM-DD HH:mm:ss');
            const slotTimeFormatted = latestBookableTime.format('YYYY-MM-DD HH:mm:ss');

            const isPast = currentTimeFormatted > slotTimeFormatted;

            return isPast;
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
            const selectedDate = getMomentTimezone(this.$store.state.timezone, date).format('YYYY-MM-DD');
            const firstDate = getMomentTimezone(this.$store.state.timezone, '2026-01-12').format('YYYY-MM-DD');
            const secondDate = getMomentTimezone(this.$store.state.timezone, '2026-01-19').format('YYYY-MM-DD');
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
            if ([1, 3, 4, 5, 6].includes(tab)) {
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
            let factor = Math.pow(10, places);
            return Math.round(amount * factor) / factor;
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
            if (this.errors.length) {
                this.$nextTick(() => {
                    if (this.$refs.TourForm?.$refs.packageErrorDisplay) {
                        this.$refs.TourForm.$refs.packageErrorDisplay.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });
                    } else {
                        console.warn('TourForm or packageErrorDisplay ref is undefined');
                        const tourFormElement = this.$refs.TourForm?.$el;
                        if (tourFormElement) {
                            tourFormElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                                inline: 'nearest'
                            });
                        }
                    }
                });
            }
        },

        getStartDate() {
            return getMomentTimezone(this.$store.state.timezone).format('YYYY-MM-DD');
        },

        getEndDate() {
            const date = getMomentTimezone(this.$store.state.timezone).year(getMomentTimezone(this.$store.state.timezone).year() + 1).month(11).date(31);
            date.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
            return date.format('YYYY-MM-DD');
        },

        isDisabled(slot) {
            return slot.bookable_status === 'Closed' || slot.dd >= slot.seats;
        },

        calculateTime(timeValue, hoursToAdd, minutesToAdd) {
            const time = getMomentTimezone(this.$store.state.timezone, `2000-01-01T${timeValue}`);
            time.add(hoursToAdd, 'hours');
            time.add(minutesToAdd, 'minutes');
            return time.format('HH:mm:ss');
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