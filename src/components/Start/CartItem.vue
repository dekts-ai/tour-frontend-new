<template>
    <div class="selected-tour-card">
        <!-- Tour Image -->
        <div class="tour-image-container">
            <img :src="item.package_image || ''" :alt="`${item.package_name || 'Package'} image`" class="tour-image">
            <div class="duration-badge">
                {{ item.duration || '' }} {{ item.type || '' }}
            </div>
        </div>

        <!-- Tour Content -->
        <div class="tour-content">
            <!-- Header with Title and Actions -->
            <div class="tour-header">
                <div class="tour-title-section">
                    <h3 class="tour-title">{{ item.package_name || 'Unnamed Package' }}</h3>
                    <!-- <p class="tour-description">{{ item.short_description || '' }}</p> -->
                </div>
                <div class="tour-actions">
                    <button class="action-icon-btn edit-btn" @click="$emit('edit-package', item)" title="Edit Tour">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button v-if="firstPackageId !== item.package_id" class="action-icon-btn delete-btn" @click="$emit('remove-from-cart', item)" title="Delete Tour">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                    <button class="action-icon-btn checkout-btn" @click="$emit('tab-change', 5, 'Checkout')" title="Proceed to Checkout">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m5 12 5 5L20 7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Tour Details Grid -->
            <div class="tour-details-grid">
                <!-- Date & Time -->
                <div class="detail-card">
                    <div class="detail-label">Date & Time</div>
                    <div class="detail-value">
                        {{ dateFormat(item.date) }}
                        <span v-if="item.package_has_slots" class="time-value">@ {{ item.time_date || '' }}</span>
                    </div>
                </div>

                <!-- Guests -->
                <div class="detail-card">
                    <div class="detail-label">Guests</div>
                    <div class="guests-list">
                        <div v-if="item.people_group && typeof item.people_group === 'object' && Object.keys(item.people_group).length">
                            <div v-for="(count, groupType) in item.people_group" :key="groupType" class="guest-item">
                                <span class="guest-type">{{ item.rate_group?.[groupType] || groupType }}</span>
                                <span class="guest-count">{{ count }}</span>
                            </div>
                        </div>
                        <div v-else class="no-guests">No guests</div>
                    </div>
                </div>

                <!-- Pricing -->
                <div class="detail-card pricing-card">
                    <div class="detail-label">Cost Breakdown</div>
                    <div class="pricing-rows">
                        <div class="pricing-row">
                            <span>Subtotal</span>
                            <span>{{ currencyFormat(item.subtotal || 0) }}</span>
                        </div>
                        <div class="pricing-row" v-if="item?.discount2_value > 0">
                            <span>Discount <span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span></span>
                            <span class="discount-value">-{{ currencyFormat(item?.discount2_value || 0) }}</span>
                        </div>
                        
                        <!-- Add-ons Section -->
                        <div v-if="hasVisibleAddons(item?.custom_fields)" class="addons-section">
                            <div class="addons-divider"></div>
                            <div class="addons-header">ADD-ONS:</div>
                            
                            <div v-for="(option, k) in item.custom_fields" :key="`addon-${k}`">
                                <!-- Parent add-on - show if it has a value (priced or not) -->
                                <div v-if="hasValidFieldValue(option)" class="pricing-row addon-row">
                                    <span>{{ option.name }}</span>
                                    <span v-if="option.priceInfo?.enabled">{{ currencyFormat(option.priceInfo?.subtotal || option.priceInfo?.price || 0) }}</span>
                                    <span v-else>{{ formatNonPricedValue(option) }}</span>
                                </div>
                                
                                <!-- Child add-ons -->
                                <div v-if="option.children && option.children.length > 0">
                                    <div v-for="(child, childIdx) in option.children" :key="`child-${k}-${childIdx}`">
                                        <div v-if="hasValidFieldValue(child)" class="pricing-row addon-row child-addon">
                                            <span>  ↳ {{ child.name }}</span>
                                            <span v-if="child.priceInfo?.enabled">{{ currencyFormat(child.priceInfo?.subtotal || child.priceInfo?.price || 0) }}</span>
                                            <span v-else>{{ formatNonPricedValue(child) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pricing-row">
                            <span>Taxes & Fees</span>
                            <span>{{ currencyFormat(Number(item.fees || 0) + Number(item.addons_fee || 0)) }}</span>
                        </div>
                        <div class="pricing-row total">
                            <span>Total Cost</span>
                            <span>{{ currencyFormat(Number(item.total || 0) + Number(item.addons_fee || 0) + Number(item.addons_total || 0)) }}</span>
                        </div>
                    </div>
                </div>
            </div>
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
        hasVisibleAddons(customFields) {
            if (!customFields || !Array.isArray(customFields)) return false;
            
            // Check if at least one add-on (parent or child) has valid value (priced or not)
            return customFields.some(field => {
                // Check parent
                if (this.hasValidFieldValue(field)) {
                    return true;
                }
                // Check children
                if (field.children && Array.isArray(field.children)) {
                    return field.children.some(child => this.hasValidFieldValue(child));
                }
                return false;
            });
        },
        formatNonPricedValue(field) {
            // Format non-priced addon values for display
            
            // Handle repeated values (per-pax/per-unit)
            if (field.isRepeated && field.values && Array.isArray(field.values)) {
                const validValues = field.values.filter(val => {
                    if (field.type === 'checkbox') return val === true;
                    if (field.type === 'number') return Number(val) > 0;
                    if (field.type === 'text' || field.type === 'textbox') return val && String(val).trim() !== '';
                    return val !== '' && val !== null && val !== undefined;
                });
                
                if (validValues.length === 0) return '';
                
                // Show count or concatenated values
                if (field.type === 'checkbox') {
                    return `${validValues.length} selected`;
                } else if (field.type === 'text' || field.type === 'textbox') {
                    return validValues.join(', ');
                } else {
                    return validValues.join(', ');
                }
            }
            
            // Handle single value
            const value = field.value;
            
            switch (field.type) {
                case 'checkbox':
                    return value === true ? 'Yes' : 'No';
                case 'text':
                case 'textbox':
                    return String(value || '');
                case 'number':
                    return String(value || '0');
                case 'radio':
                case 'dropdown':
                    return String(value || '');
                default:
                    return String(value || '');
            }
        },
        hasValidFieldValue(field) {
            // For custom_fields saved from AddonsNew, check if there's a valid subtotal
            // This handles all pricing types including price-per-pax and price-per-unit
            if (field.priceInfo && field.priceInfo.subtotal > 0) {
                return true;
            }
            
            // Check if field has repeated values (for per-pax/per-unit pricing)
            if (field.isRepeated && field.values && Array.isArray(field.values)) {
                // For repeated fields, check if any value is valid
                return field.values.some(val => {
                    switch (field.type) {
                        case 'checkbox':
                            return val === true;
                        case 'number':
                            return Number(val) > 0;
                        case 'radio':
                        case 'dropdown':
                            return val !== '' && val !== null && val !== undefined;
                        case 'text':
                        case 'textbox':
                            return val && String(val).trim() !== '';
                        default:
                            return val !== null && val !== undefined && val !== '';
                    }
                });
            }
            
            // Fallback: check the single value field
            const value = field.value;
            
            switch (field.type) {
                case 'checkbox':
                    return value === true;
                case 'number':
                    return Number(value) > 0;
                case 'radio':
                case 'dropdown':
                    return value !== '' && value !== null && value !== undefined;
                case 'text':
                case 'textbox':
                    return value && String(value).trim() !== '';
                default:
                    return value !== null && value !== undefined && value !== '';
            }
        },
    },
};
</script>

<style scoped>
/* Selected Tour Card - Card-Based Design (Bigger than Available Tours) */
.selected-tour-card {
    background: white;
    border-radius: var(--radius-xl);
    overflow: hidden;
    /* border: 2px solid var(--primary-teal-light); */
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
}

.selected-tour-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

/* Tour Image */
.tour-image-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.tour-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
}

.selected-tour-card:hover .tour-image {
    transform: scale(1.05);
}

.duration-badge {
    position: absolute;
    top: var(--space-4);
    left: var(--space-4);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--primary-teal);
}

/* Tour Content */
.tour-content {
    padding: var(--space-4);
}

/* Header with Title and Icon Actions */
.tour-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-3);
    border-bottom: 2px solid var(--neutral-100);
    align-items: baseline;
}

.tour-title-section {
    flex: 1;
}

.tour-title {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-1) 0;
}

.tour-description {
    font-size: var(--text-base);
    color: var(--neutral-600);
    margin: 0;
    line-height: 1.6;
}

.tour-actions {
    display: flex;
    gap: var(--space-2);
    flex-shrink: 0;
}

.action-icon-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
}

.action-icon-btn.edit-btn {
    background: var(--neutral-100);
    color: var(--primary-teal);
}

.action-icon-btn.edit-btn:hover {
    background: var(--primary-teal);
    color: white;
}

.action-icon-btn.delete-btn {
    background: var(--neutral-100);
    color: #EF4444;
}

.action-icon-btn.delete-btn:hover {
    background: #EF4444;
    color: white;
}

.action-icon-btn.checkout-btn {
    background: linear-gradient(135deg, #E36D4A 0%, #D97454 100%) !important;
    color: white !important;
}

.action-icon-btn.checkout-btn svg {
    stroke: white;
}

.action-icon-btn.checkout-btn:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-md);
}

/* Tour Details Grid */
.tour-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
}

.detail-card {
    background: var(--neutral-50);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
}

.detail-label {
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    color: var(--neutral-500);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: var(--space-3);
}

.detail-value {
    font-size: var(--text-base);
    color: var(--neutral-900);
    font-weight: var(--font-semibold);
    line-height: 1.5;
}

.time-value {
    display: block;
    font-size: var(--text-sm);
    color: var(--primary-teal);
    margin-top: var(--space-1);
}

/* Guests */
.guests-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.guest-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2) var(--space-3);
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
    background: var(--primary-teal);
    background: rgba(13, 148, 136, 0.1);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
}

.no-guests {
    font-size: var(--text-sm);
    color: var(--neutral-500);
    font-style: italic;
}

/* Pricing */
.pricing-card {
    grid-column: 1 / -1;
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
    padding: var(--space-2) var(--space-3);
    background: white;
    border-radius: var(--radius-md);
}

.discount-value {
    color: var(--primary-terracotta);
    font-weight: var(--font-semibold);
}

.pricing-row.total {
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    font-weight: var(--font-bold);
    font-size: var(--text-base);
    margin-top: var(--space-3);
    padding: var(--space-3) var(--space-4);
}

/* Add-ons Section */
.addons-section {
    margin: var(--space-3) 0;
}

.addons-divider {
    height: 1px;
    background: repeating-linear-gradient(
        to right,
        var(--neutral-300) 0px,
        var(--neutral-300) 5px,
        transparent 5px,
        transparent 10px
    );
    margin-bottom: var(--space-3);
}

.addons-header {
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    color: var(--neutral-500);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: var(--space-2);
}

.pricing-row.addon-row {
    background: white;
    margin-bottom: var(--space-1);
}

.pricing-row.addon-row.child-addon {
    margin-left: var(--space-4);
    background: var(--neutral-100);
    font-size: var(--text-xs);
}

/* Responsive */
@media (max-width: 768px) {
    .tour-image-container {
        height: 220px;
    }
    
    .tour-content {
        padding: var(--space-4);
    }
    
    .tour-header {
        flex-direction: column;
        gap: var(--space-3);
    }
    
    .tour-actions {
        width: 100%;
        justify-content: flex-end;
    }
    
    .tour-details-grid {
        grid-template-columns: 1fr;
    }
}
</style>