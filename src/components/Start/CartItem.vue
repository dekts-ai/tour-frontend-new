<template>
    <div class="selected-tour-card">
        <div class="tour-header">
            <div class="tour-image-wrapper">
                <img :src="item.package_image || ''" :alt="`${item.package_name || 'Package'} image`" class="tour-image">
            </div>
            <div class="tour-info">
                <h3 class="tour-title">{{ item.package_name || 'Unnamed Package' }}</h3>
                <div class="tour-meta">
                    <span class="tour-duration">{{ item.duration || '' }} {{ item.type || '' }}</span>
                </div>
                <p class="tour-description">{{ item.short_description || '' }}</p>
            </div>
        </div>

        <div class="tour-details">
            <div class="detail-section">
                <div class="detail-label">Scheduled Date & Time</div>
                <div class="detail-value">
                    {{ dateFormat(item.date) }}
                    <span v-if="item.package_has_slots"> @ {{ item.time_date || '' }}</span>
                </div>
            </div>

            <div class="detail-section">
                <div class="detail-label">Guests</div>
                <div class="guests-list">
                    <div v-if="item.people_group && typeof item.people_group === 'object' && Object.keys(item.people_group).length">
                        <div v-for="(count, groupType) in item.people_group" :key="groupType" class="guest-item">
                            <span class="guest-type">{{ item.rate_group?.[groupType] || groupType }}</span>
                            <span class="guest-count">{{ count }}</span>
                        </div>
                    </div>
                    <div v-else class="no-guests">No guests selected</div>
                </div>
            </div>

            <div class="pricing-section">
                <div class="pricing-label">Tour Cost</div>
                <div class="pricing-rows">
                    <div class="pricing-row">
                        <span>Subtotal</span>
                        <span>{{ currencyFormat(item.subtotal || 0) }}</span>
                    </div>
                    <div class="pricing-row" v-if="item?.discount2_value > 0">
                        <span>Discount <span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span></span>
                        <span>-{{ currencyFormat(item?.discount2_value || 0) }}</span>
                    </div>
                    <div v-if="item?.custom_fields?.length && isPriceInfoEnabled(item?.custom_fields)">
                        <div class="pricing-label small">Add-ons</div>
                        <div v-for="(option, k) in item.custom_fields.filter(f => f.priceInfo?.enabled)"
                            :key="`custom-field-${k}`" class="pricing-row">
                            <span>{{ option.name }}</span>
                            <span>{{ currencyFormat(option.priceInfo?.price || 0) }}</span>
                        </div>
                    </div>
                    <div class="pricing-row">
                        <span>Booking Fees</span>
                        <span>{{ currencyFormat(Number(item.fees || 0) + Number(item.addons_fee || 0)) }}</span>
                    </div>
                    <div class="pricing-row total">
                        <span>Tour Cost</span>
                        <span>{{ currencyFormat(Number(item.total || 0) + Number(item.addons_fee || 0) + Number(item.addons_total || 0)) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="tour-actions">
            <button class="action-btn edit-btn" @click="$emit('edit-package', item)">Edit</button>
            <button v-if="firstPackageId !== item.package_id" class="action-btn delete-btn" @click="$emit('remove-from-cart', item)">Delete</button>
            <button class="action-btn checkout-btn" @click="$emit('tab-change', 5, 'Checkout')">Checkout</button>
        </div>
    </div>
</template>

<script>
import { formatCurrencyIntl } from '../../utils/currency';
import { getMomentTimezone } from '../../utils/dateUtils';

export default {
    name: 'CartItem',
    props: ['item', 'firstPackageId'],
    emits: ['edit-package', 'remove-from-cart', 'tab-change'],
    methods: {
        dateFormat(date) {
            return getMomentTimezone(this.$store.state.timezone, date).format('dddd, MMMM D, YYYY');
        },
        currencyFormat(amount) {
            return formatCurrencyIntl(amount, this.$store.state.currency);
        },
        isPriceInfoEnabled(customFields) {
            return customFields?.some(item => item.priceInfo?.enabled === true) || false;
        },
    },
};
</script>

<style scoped>
/* Selected Tour Card - Native Journey Design */
.selected-tour-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    border: 1px solid var(--neutral-200);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--space-5);
}

.tour-header {
    display: flex;
    gap: var(--space-4);
    padding-bottom: var(--space-5);
    border-bottom: 1px solid var(--neutral-200);
    margin-bottom: var(--space-5);
}

.tour-image-wrapper {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.tour-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.tour-info {
    flex: 1;
}

.tour-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-2) 0;
}

.tour-meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
}

.tour-duration {
    font-size: var(--text-sm);
    color: var(--primary-teal);
    font-weight: var(--font-medium);
}

.tour-description {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    margin: 0;
    line-height: 1.5;
}

.tour-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
}

.detail-section {
    background: var(--neutral-50);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
}

.detail-label {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--neutral-500);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: var(--space-2);
}

.detail-value {
    font-size: var(--text-base);
    color: var(--neutral-900);
    font-weight: var(--font-medium);
}

.guests-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.guest-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2);
    background: white;
    border-radius: var(--radius-md);
}

.guest-type {
    font-size: var(--text-sm);
    color: var(--neutral-700);
    text-transform: capitalize;
}

.guest-count {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    color: var(--primary-teal);
    background: var(--neutral-100);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
}

.no-guests {
    font-size: var(--text-sm);
    color: var(--neutral-500);
    font-style: italic;
}

.pricing-section {
    background: var(--neutral-50);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
}

.pricing-label {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin-bottom: var(--space-3);
}

.pricing-label.small {
    font-size: var(--text-xs);
    margin-top: var(--space-3);
}

.pricing-rows {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.pricing-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm);
    color: var(--neutral-700);
    padding: var(--space-2);
    background: white;
    border-radius: var(--radius-md);
}

.pricing-row.total {
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    font-weight: var(--font-bold);
    margin-top: var(--space-2);
    padding: var(--space-3);
}

.tour-actions {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-5);
    padding-top: var(--space-5);
    border-top: 1px solid var(--neutral-200);
}

.action-btn {
    flex: 1;
    padding: var(--space-3);
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
}

.edit-btn {
    background: white;
    border: 2px solid var(--primary-teal);
    color: var(--primary-teal);
}

.edit-btn:hover {
    background: var(--primary-teal);
    color: white;
}

.delete-btn {
    background: white;
    border: 2px solid #EF4444;
    color: #EF4444;
}

.delete-btn:hover {
    background: #EF4444;
    color: white;
}

.checkout-btn {
    background: linear-gradient(135deg, var(--primary-terracotta) 0%, #D97454 100%);
    color: white;
}

.checkout-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
    .tour-header {
        flex-direction: column;
    }

    .tour-image-wrapper {
        width: 100%;
        height: 200px;
    }

    .tour-actions {
        flex-direction: column;
    }

    .action-btn {
        width: 100%;
    }
}
</style>