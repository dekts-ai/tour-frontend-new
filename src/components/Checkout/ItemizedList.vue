<template>
    <div>
        <div class="form-field-title mt-md-0 mt-3" v-if="iframeStatus == false">Tour Cost:</div>

        <div class="total-cost-wrap" v-for="item in items" :key="item.tour_slot_id">
            <div class="title-wrap">
                <div class="title">{{ item.package_name }}</div>
                <div class="time">{{ dateFormat(item.date) }} <span v-if="item.package_has_slots">@ {{ item.time_date }}</span></div>
            </div>
            <div v-for="(pax, key) in item.people_group" :key="key">
                <div v-if="pax > 0" class="ages-wrap d-flex justify-content-between align-items-center">
                    <div class="title">{{ item.rate_group[key] }}</div>
                    <div class="number">{{ pax }}</div>
                </div>
            </div>
            <div class="other-details-wrap d-flex justify-content-between align-items-center">
                <div class="title">Ticket Cost</div>
                <div class="amount">${{ Number(item.subtotal).toFixed(2) }}</div>
            </div>
            <div class="other-details-wrap d-flex justify-content-between align-items-center"
                v-if="item?.discount2_value > 0">
                <div class="title">Discount</div>
                <div class="amount"><span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span>
                    ${{ item?.discount2_value ? Number(item?.discount2_value).toFixed(2) : Number(0).toFixed(2) }}</div>
            </div>
            <!-- <div class="other-details-wrap d-flex justify-content-between align-items-center" v-if="item?.discount2_value > 0">
            <div class="title">Subtotal</div>
            <div class="amount">${{ Number(item.fees).toFixed(2) }}</div>	
            </div> -->
            <div v-if="item?.custom_fields?.length && isPriceInfoEnabled(item?.custom_fields)">
                <div class="ages-wrap d-flex justify-content-between align-items-center">
                    <div class="title">Add-ons:</div>
                </div>
                <div v-for="(option, idx) in item.custom_fields" :key="`custom-option-${idx}`">
                    <div v-if="option.priceInfo.enabled"
                        class="other-details-wrap d-flex justify-content-between align-items-center">
                        <div class="title">{{ option.name }}</div>
                        <div class="amount">${{ Number(option.priceInfo.price).toFixed(2) }} </div>
                    </div>
                </div>
                <!-- <div class="other-details-wrap d-flex justify-content-between align-items-center lemonchiffon">
                    <div class="title"><strong>Total Cost</strong></div>
                    <div class="amount"><strong>${{ Number(item.total + item.addons_total).toFixed(2) }}</strong></div>
                </div> -->
                <hr class="m-1">
            </div>
            <div class="other-details-wrap d-flex justify-content-between align-items-center">
                <div class="title">Booking Fees</div>
                <div class="amount">${{ Number(Number(item.fees) + Number(item.addons_fee)).toFixed(2) }}</div>
            </div>
            <div class="other-details-wrap d-flex justify-content-between align-items-center lemonchiffon">
                <div class="title"><strong>Tour Cost</strong></div>
                <div class="amount">${{ Number(Number(item.total) + Number(item.addons_total) + Number(item.addons_fee)).toFixed(2) }}</div>
            </div>

            <Discount :item="item" :allItem="items" :globalTotalItem="globalTotalItem" />

            <p class="text-start tour-packages-detail ms-4 mt-2 mb-2" v-if="seatErrors?.length">
                <ul>
                    <li v-for="(error, index) in seatErrors" :key="index" v-bind:class="{ 'text-danger': error[item.tour_slot_id]?.success }"><small>{{ error[item.tour_slot_id]?.message }}</small></li>
                </ul>
            </p>
        </div>
        <hr />
    </div>
</template>

<script>
import { defaultDateFormat } from '../../utils/dateUtils';
import Discount from './Discount.vue';

export default {
    name: "ItemizedList",
    props: ["items", "globalTotalItem", "seatErrors", "iframeStatus"],
    components: {
        Discount,
    },
    data: () => {
        return {
        }
    },
    methods: {
        dateFormat(date) {
            this.$store.dispatch('storeDate', date)
            return defaultDateFormat(date);
        },
        isPriceInfoEnabled(customFields) {
            return customFields.some(item => item.priceInfo.enabled === true);
        }
    }
}
</script>