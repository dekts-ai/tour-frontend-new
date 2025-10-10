<template>
    <div class="itemized-list-container">
        <div class="item-card" v-for="item in items" :key="item.tour_slot_id">
            <div class="item-header">
                <h4 class="item-title">{{ item.package_name }}</h4>
                <p class="item-datetime">{{ dateFormat(item.date) }} <span v-if="item.package_has_slots">@ {{ item.time_date }}</span></p>
            </div>

            <div class="item-guests">
                <div v-for="(pax, key) in item.people_group" :key="key">
                    <div v-if="pax > 0" class="guest-row">
                        <span class="guest-label">{{ item.rate_group[key] }}</span>
                        <span class="guest-value">{{ pax }}</span>
                    </div>
                </div>
            </div>

            <div class="item-pricing">
                <div class="pricing-line">
                    <span>Ticket Cost</span>
                    <span>{{ currencyFormat(item.subtotal) }}</span>
                </div>
                <div class="pricing-line" v-if="item?.discount2_value > 0">
                    <span>Discount <span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span></span>
                    <span class="discount">-{{ item?.discount2_value ? currencyFormat(item?.discount2_value) : currencyFormat(0) }}</span>
                </div>

                <div v-if="item?.custom_fields?.length && isPriceInfoEnabled(item?.custom_fields)" class="addons-section">
                    <div class="addon-header">Add-ons:</div>
                    <div v-for="(option, idx) in item.custom_fields" :key="`custom-option-${idx}`">
                        <div v-if="option.priceInfo.enabled && hasValidFieldValue(option)" class="pricing-line">
                            <span>{{ option.name }}</span>
                            <span>{{ currencyFormat(option.priceInfo.price) }}</span>
                        </div>
                    </div>
                </div>

                <div class="pricing-line">
                    <span>Booking Fees</span>
                    <span>{{ currencyFormat(Number(item.fees) + Number(item.addons_fee)) }}</span>
                </div>
                <div class="pricing-line total">
                    <span>Tour Cost</span>
                    <span>{{ currencyFormat(Number(item.total) + Number(item.addons_total) + Number(item.addons_fee)) }}</span>
                </div>
            </div>

            <Discount :item="item" :allItem="items" :globalTotalItem="globalTotalItem"
                @update-items="handleItemsUpdate" />

            <div v-if="seatErrors?.length" class="errors-section">
                <p class="error-title">Error(s):</p>
                <ul class="error-list">
                    <li v-for="(error, index) in seatErrors" :key="index"
                        :class="{ 'error-success': error[item.tour_slot_id]?.success }">
                        <small>{{ error[item.tour_slot_id]?.message }}</small>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getMomentTimezone } from '../../utils/dateUtils';
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
            return getMomentTimezone(this.$store.state.timezone, date).format('dddd, MMMM D, YYYY');
        },
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
        isPriceInfoEnabled(customFields) {
            return customFields.some(item => item.priceInfo.enabled === true);
        },
        hasValidFieldValue(field) {
            // Check if a field has a valid selected value based on its type
            const value = field.value;
            
            switch (field.type) {
                case 'checkbox':
                    // Checkbox must be checked (truthy value)
                    return !!value;
                
                case 'number':
                    // Number must be greater than 0
                    return Number(value) > 0;
                
                case 'radio':
                case 'select':
                    // Radio and select must have a non-empty value selected
                    return value !== null && value !== undefined && value !== '';
                
                case 'text':
                case 'textarea':
                    // Text fields must have a non-empty value
                    return value !== null && value !== undefined && String(value).trim() !== '';
                
                default:
                    // For any other type, check if value exists
                    return value !== null && value !== undefined && value !== '';
            }
        },
        handleItemsUpdate(updatedItems) {
            // Emit the updated items list to `Checkout.vue`
            this.$emit("update-items", updatedItems);
        }
    }
}
</script>

<style scoped>
.itemized-list-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}

.item-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-5);
    border: 1px solid var(--neutral-200);
}

.item-header {
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--neutral-200);
    margin-bottom: var(--space-4);
}

.item-title {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-2) 0;
}

.item-datetime {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    margin: 0;
}

.item-guests {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    background: var(--neutral-50);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
}

.guest-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm);
}

.guest-label {
    color: var(--neutral-700);
}

.guest-value {
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
}

.item-pricing {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.pricing-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm);
    color: var(--neutral-700);
    padding: var(--space-2);
    background: var(--neutral-50);
    border-radius: var(--radius-md);
}

.pricing-line.total {
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    font-weight: var(--font-bold);
    margin-top: var(--space-3);
    padding: var(--space-3);
}

.discount {
    color: var(--primary-terracotta);
}

.addons-section {
    margin-top: var(--space-3);
    padding-top: var(--space-3);
    border-top: 1px dashed var(--neutral-300);
}

.addon-header {
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    color: var(--neutral-500);
    text-transform: uppercase;
    margin-bottom: var(--space-2);
}

.errors-section {
    margin-top: var(--space-4);
    padding: var(--space-3);
    background: #FEE2E2;
    border-radius: var(--radius-lg);
}

.error-title {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    color: #991B1B;
    margin: 0 0 var(--space-2) 0;
}

.error-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.error-list li {
    color: #DC2626;
    font-size: var(--text-sm);
}

.error-list li.error-success {
    color: #059669;
}
</style>