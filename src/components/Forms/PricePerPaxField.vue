<template>
    <div class="price-per-pax-wrapper" :class="{ 'nested-field': isNested }">
        <div class="pax-field-header">
            <label :class="{ 'required': field.required }">
                {{ field.label }}
                <span v-if="field.description" class="field-description">{{ field.description }}</span>
            </label>
            <span v-if="field.price" class="price-badge">{{ formatCurrency(field.price) }} per person</span>
        </div>

        <div class="rate-groups-container">
            <div 
                v-for="(rateGroupName, index) in rateGroups" 
                :key="index" 
                class="rate-group-item"
                v-show="rateGroupCounts[index] > 0">
                
                <div class="rate-group-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
                        <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>{{ rateGroupName }} ({{ rateGroupCounts[index] }} selected)</span>
                </div>

                <div class="rate-group-input">
                    <input 
                        type="number" 
                        :min="0"
                        :max="rateGroupCounts[index]"
                        :value="value[index] || 0"
                        @input="handleRateGroupInput(index, $event.target.value)"
                        :placeholder="`Enter number (max ${rateGroupCounts[index]})`"
                        class="form-control" />
                    
                    <span v-if="value[index] > 0" class="rate-group-price">
                        {{ formatCurrency(calculateRateGroupPrice(index)) }}
                    </span>
                </div>
            </div>
        </div>

        <div v-if="totalPrice > 0" class="total-price-display">
            <span>Total for {{ field.label }}:</span>
            <span class="total-amount">{{ formatCurrency(totalPrice) }}</span>
        </div>
    </div>
</template>

<script>
import { formatCurrencyIntl } from '@/utils/currency';

export default {
    name: 'PricePerPaxField',
    props: {
        field: {
            type: Object,
            required: true
        },
        value: {
            type: Object,
            default: () => ({})
        },
        rateGroups: {
            type: Array,
            default: () => []
        },
        rateGroupCounts: {
            type: Array,
            default: () => []
        },
        currency: {
            type: String,
            default: 'USD'
        },
        isNested: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        totalPrice() {
            return Object.values(this.value).reduce((sum, count) => {
                return sum + (Number(count) || 0) * Number(this.field.price || 0);
            }, 0);
        }
    },
    methods: {
        formatCurrency(amount) {
            return formatCurrencyIntl(amount, this.currency);
        },
        handleRateGroupInput(index, newValue) {
            const updatedValue = { ...this.value };
            updatedValue[index] = Number(newValue) || 0;
            
            this.$emit('update', {
                fieldId: this.field.id,
                value: updatedValue,
                field: this.field,
                totalPrice: this.calculateTotalPrice(updatedValue)
            });
        },
        calculateRateGroupPrice(index) {
            return (Number(this.value[index]) || 0) * Number(this.field.price || 0);
        },
        calculateTotalPrice(valueObj) {
            return Object.values(valueObj).reduce((sum, count) => {
                return sum + (Number(count) || 0) * Number(this.field.price || 0);
            }, 0);
        }
    }
};
</script>

<style scoped>
.price-per-pax-wrapper {
    margin-bottom: 1.5rem;
    padding: 1.25rem;
    background: var(--color-background);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border);
}

.nested-field {
    margin-left: 2rem;
    border-left: 3px solid var(--color-primary);
}

.pax-field-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
}

.pax-field-header label {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text-primary);
}

.pax-field-header label.required::after {
    content: ' *';
    color: var(--color-terracotta);
}

.field-description {
    display: block;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
}

.price-badge {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-amber);
    background: rgba(245, 158, 11, 0.1);
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius-full);
    white-space: nowrap;
}

.rate-groups-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.rate-group-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.rate-group-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
}

.rate-group-label svg {
    color: var(--color-primary);
}

.rate-group-input {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.rate-group-input .form-control {
    flex: 1;
    padding: 0.625rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    font-size: 0.9375rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.rate-group-input .form-control:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.rate-group-price {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-primary);
    min-width: 80px;
    text-align: right;
}

.total-price-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid var(--color-border);
}

.total-price-display span:first-child {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-primary);
}

.total-amount {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-primary);
}

@media (max-width: 768px) {
    .pax-field-header {
        flex-direction: column;
    }
    
    .rate-group-input {
        flex-direction: column;
        align-items: stretch;
    }
    
    .rate-group-price {
        text-align: left;
    }
}
</style>
