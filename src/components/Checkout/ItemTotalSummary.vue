<template>
    <div class="summary-card">
        <h3 class="summary-title">Total Cost</h3>
        <div class="summary-rows">
            <div class="summary-row">
                <span>Ticket Cost</span>
                <span>{{ currencyFormat(globalTotal.subtotal) }}</span>
            </div>
            <div class="summary-row" v-if="globalTotal.discount > 0">
                <span>Discount</span>
                <span class="discount-amount">-{{ currencyFormat(globalTotal.discount) }}</span>
            </div>
            <div v-if="globalTotal.addons_total" class="summary-row">
                <span>Add-ons</span>
                <span>{{ currencyFormat(globalTotal.addons_total) }}</span>
            </div>
            <div class="summary-row">
                <span>Booking Fees</span>
                <span>{{ currencyFormat(Number(globalTotal.fees) + Number(globalTotal.addons_fee)) }}</span>
            </div>
            <div class="summary-row grand-total">
                <span>Total Cost</span>
                <span>{{ currencyFormat(Number(globalTotal.total) + Number(globalTotal.addons_total) + Number(globalTotal.addons_fee)) }}</span>
            </div>
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

<style scoped>
.summary-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-5);
    border: 1px solid var(--neutral-200);
    box-shadow: var(--shadow-sm);
}

.summary-title {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-4) 0;
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--neutral-200);
}

.summary-rows {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm);
    color: var(--neutral-700);
    padding: var(--space-2);
    background: var(--neutral-50);
    border-radius: var(--radius-md);
}

.summary-row.grand-total {
    background: linear-gradient(135deg, var(--primary-terracotta) 0%, #D97454 100%);
    color: white;
    font-weight: var(--font-bold);
    font-size: var(--text-base);
    margin-top: var(--space-3);
    padding: var(--space-4);
}

.discount-amount {
    color: var(--primary-terracotta);
}
</style>
