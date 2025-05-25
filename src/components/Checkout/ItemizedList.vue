<template>
    <div>
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
                <div class="amount">{{ currencyFormat(item.subtotal) }}</div>
            </div>
            <div class="other-details-wrap d-flex justify-content-between align-items-center"
                v-if="item?.discount2_value > 0">
                <div class="title">Discount</div>
                <div class="amount"><span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span>
                    {{ item?.discount2_value ? currencyFormat(item?.discount2_value) : currencyFormat(0) }}</div>
            </div>
            <!-- <div class="other-details-wrap d-flex justify-content-between align-items-center" v-if="item?.discount2_value > 0">
            <div class="title">Subtotal</div>
            <div class="amount">{{ currencyFormat(item.fees) }}</div>	
            </div> -->
            <div v-if="item?.custom_fields?.length && isPriceInfoEnabled(item?.custom_fields)">
                <div class="ages-wrap d-flex justify-content-between align-items-center">
                    <div class="title">Add-ons:</div>
                </div>
                <div v-for="(option, idx) in item.custom_fields" :key="`custom-option-${idx}`">
                    <div v-if="option.priceInfo.enabled"
                        class="other-details-wrap d-flex justify-content-between align-items-center">
                        <div class="title">{{ option.name }}</div>
                        <div class="amount">{{ currencyFormat(option.priceInfo.price) }} </div>
                    </div>
                </div>
                <!-- <div class="other-details-wrap d-flex justify-content-between align-items-center lemonchiffon">
                    <div class="title"><strong>Total Cost</strong></div>
                    <div class="amount"><strong>{{ currencyFormat(item.total + item.addons_total) }}</strong></div>
                </div> -->
                <hr class="m-1">
            </div>
            <div class="other-details-wrap d-flex justify-content-between align-items-center">
                <div class="title">Booking Fees</div>
                <div class="amount">{{ currencyFormat(Number(item.fees) + Number(item.addons_fee)) }}</div>
            </div>
            <div class="other-details-wrap d-flex justify-content-between align-items-center lemonchiffon">
                <div class="title"><strong>Tour Cost</strong></div>
                <div class="amount">{{ currencyFormat(Number(item.total) + Number(item.addons_total) + Number(item.addons_fee)) }}</div>
            </div>

            <Discount :item="item" :allItem="items" :globalTotalItem="globalTotalItem" @update-items="handleItemsUpdate" />

            <p class="text-start tour-packages-detail ms-4 mt-2 mb-2" v-if="seatErrors?.length">
                <b>Error(s):</b>
            </p>
            <ul>
                <li v-for="(error, index) in seatErrors" :key="index"
                    v-bind:class="{ 'text-danger': error[item.tour_slot_id]?.success }">
                    <small>{{ error[item.tour_slot_id]?.message }}</small>
                </li>
            </ul>

        </div>
        <hr />
    </div>
</template>

<script>
import { defaultDateFormat } from '../../utils/dateUtils';
import { formatCurrencyIntl } from '../../utils/currency';
import Discount from './Discount.vue';

export default {
    name: "ItemizedList",
    props: ["items", "globalTotalItem", "seatErrors"],
    components: {
        Discount,
    },
    data: () => {
        return {
        }
    },
    methods: {
        dateFormat(date) {
            return defaultDateFormat(date);
        },
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
        isPriceInfoEnabled(customFields) {
            return customFields.some(item => item.priceInfo.enabled === true);
        },
        handleItemsUpdate(updatedItems) {
            // Emit the updated items list to `Checkout.vue`
            this.$emit("update-items", updatedItems);
        }
    }
}
</script>