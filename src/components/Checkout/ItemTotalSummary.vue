<template>
    <div class="total-cost-wrap third">
        <div class="title-wrap">
            <div class="title mb-0">Total Cost</div>
        </div>
        <div class="other-details-wrap d-flex justify-content-between align-items-center mt-0">
            <div class="title">Ticket Cost</div>
            <div class="amount">{{ currencyFormat(globalTotal.subtotal) }}</div>
        </div>
        <div class="other-details-wrap d-flex justify-content-between align-items-center" v-if="globalTotal.discount > 0">
            <div class="title">Discount</div>
            <div class="amount">{{ currencyFormat(globalTotal.discount) }}</div>
        </div>
        <div v-if="globalTotal.addons_total" class="other-details-wrap d-flex justify-content-between align-items-center">
            <div class="title">Add-ons</div>
            <div class="amount">{{ currencyFormat(globalTotal.addons_total) }}</div>
        </div>
        <div class="other-details-wrap d-flex justify-content-between align-items-center">
            <div class="title">Booking Fees</div>
            <div class="amount">{{ currencyFormat(Number(globalTotal.fees) + Number(globalTotal.addons_fee)) }}</div>
        </div>
        <div class="other-details-wrap d-flex justify-content-between align-items-center last">
            <div class="title"><strong>Total Cost</strong></div>
            <div class="amount"><strong>{{ currencyFormat(Number(globalTotal.total) + Number(globalTotal.addons_total) + Number(globalTotal.addons_fee)) }}</strong></div>
        </div>
    </div>
</template>

<script>
import { formatCurrencyIntl } from '../../utils/currency';

export default {
    name: "ItemTotalSummary",
    props: ["globalTotal"],
    data: () => {
        return {}
    },
    methods: {
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
    }
}
</script>
