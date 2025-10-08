<template>
    <div class="promo-code-section">
        <div class="promo-code-input-group">
            <input 
                :id="couponInputId" 
                v-model.trim="couponCode" 
                type="text" 
                placeholder="Enter promo code"
                class="promo-code-input" 
                @keyup="resetCoupon"
                :disabled="hasCouponApplied">
            <button 
                :id="applyButtonId"
                :class="['promo-code-button', hasCouponApplied ? 'applied' : '']"
                :disabled="hasCouponApplied || processing" 
                @click="applyCoupon">
                <span v-if="processing">Applying...</span>
                <span v-else-if="hasCouponApplied">✓ Applied</span>
                <span v-else>Apply</span>
            </button>
        </div>
        <div class="promo-code-messages">
            <p v-for="(message, index) in successMessages" :key="`success-${index}`" class="message-success">
                {{ message }}
            </p>
            <p v-for="(error, index) in errorMessages" :key="`error-${index}`" class="message-error">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'Discount',
    props: {
        item: { type: Object, required: true },
        allItem: { type: Object, required: true },
        globalTotalItem: { type: Object, required: true }
    },
    data() {
        return {
            couponCode: this.item.code || '',
            successMessages: [],
            errorMessages: [],
            processing: false
        };
    },
    computed: {
        hasCouponApplied() {
            return !!this.item.tour_promotion_id;
        },
        couponInputId() {
            return `couponCode-${this.item.tour_slot_id}`;
        },
        applyButtonId() {
            return `applyCouponButton-${this.item.tour_slot_id}`;
        }
    },
    methods: {
        resetCoupon() {
            this.successMessages = [];
            this.errorMessages = [];
            Object.assign(this.item, {
                tour_promotion_id: '',
                discount2_value: 0,
                discount2_percentage: 0,
                subtotal: Number(this.item.before_discount_subtotal),
                fees: Number(this.item.before_discount_fees),
                total: Number(this.item.before_discount_total)
            });
            this.updateCart();
        },

        async applyCoupon() {
            if (this.processing || !this.couponCode) return;

            this.processing = true;
            const loader = this.$loading.show();
            this.clearMessages();

            if (!this.couponCode) {
                this.errorMessages.push('Please enter a promo code to receive a discount.');
                this.hideLoader(loader);
                return;
            }

            try {
                const { data } = await axios.get(
                    `/apply-coupon/${this.item.package_id}/${this.item.tour_slot_id}/${this.couponCode}`
                );
                const promocode = data.data;
                const { subtotal, discount } = this.calculateDiscount(promocode, this.item.subtotal);

                if (subtotal <= 0) {
                    this.errorMessages.push('Your coupon code is not valid.');
                } else {
                    this.applyDiscount(promocode, subtotal, discount, data.message);
                    this.updateCart();
                    this.$emit('update-items', cloneDeep(this.allItem));
                }
            } catch (error) {
                this.handleError(error);
            } finally {
                this.hideLoader(loader);
            }
        },

        calculateDiscount(promocode, subtotal) {
            const isPercent = promocode.discount_value_type === 'Percent';
            const discountValue = Number(promocode.discount_value);
            let discount = isPercent
                ? (subtotal * discountValue) / 100
                : discountValue;
            const newSubtotal = subtotal - discount;

            return {
                subtotal: Number(newSubtotal.toFixed(2)),
                discount: Number(discount.toFixed(2))
            };
        },

        applyDiscount(promocode, subtotal, discount, successMessage) {
            const fees = this.roundout(subtotal * this.item.service_commission / 100, 2);
            Object.assign(this.item, {
                tour_promotion_id: promocode.id,
                discount2_value: discount,
                discount2_percentage: promocode.discount_value_type === 'Percent' ? Number(promocode.discount_value) : 0,
                subtotal,
                fees: Number(fees),
                total: Number(subtotal + fees)
            });
            this.successMessages.push(successMessage);
        },

        updateCart() {
            const totals = Object.values(this.allItem).reduce((acc, item) => ({
                subtotal: acc.subtotal + Number(item.subtotal),
                discount: acc.discount + Number(item.discount2_value),
                fees: acc.fees + Number(item.fees),
                addons_total: acc.addons_total + Number(item.addons_total),
                addons_fee: acc.addons_fee + Number(item.addons_fee),
                total: acc.total + Number(item.total)
            }), {
                subtotal: 0,
                discount: 0,
                fees: 0,
                addons_total: 0,
                addons_fee: 0,
                total: 0
            });

            Object.assign(this.globalTotalItem, totals);
        },

        handleError(error) {
            this.couponCode = '';
            Object.assign(this.item, {
                tour_promotion_id: '',
                discount2_value: 0,
                discount2_percentage: 0
            });
            this.errorMessages.push(
                error.response?.data?.message || 'An error occurred'
            );
        },

        clearMessages() {
            this.successMessages = [];
            this.errorMessages = [];
        },

        hideLoader(loader) {
            this.processing = false;
            loader.hide();
        },

        roundout(amount, places = 2) {
            if (places < 0) places = 0;
            let factor = Math.pow(10, places);
            return Math.round(amount * factor) / factor;
        }
    }
};
</script>

<style scoped>
.promo-code-section {
    margin-top: var(--space-4);
    padding: var(--space-4);
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
}

.promo-code-input-group {
    display: flex;
    gap: var(--space-2);
}

.promo-code-input {
    flex: 1;
    padding: var(--space-3);
    border: 2px solid var(--neutral-300);
    border-radius: var(--radius-lg);
    font-size: var(--text-base);
    font-family: var(--font-body);
    color: var(--neutral-900);
    background: white;
    transition: all var(--transition-base);
}

.promo-code-input:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.promo-code-input:disabled {
    background: var(--neutral-100);
    color: var(--neutral-500);
    cursor: not-allowed;
}

.promo-code-input::placeholder {
    color: var(--neutral-400);
}

.promo-code-button {
    padding: var(--space-3) var(--space-6);
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    white-space: nowrap;
}

.promo-code-button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.promo-code-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.promo-code-button.applied {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}

.promo-code-messages {
    margin-top: var(--space-3);
}

.message-success,
.message-error {
    margin: var(--space-2) 0;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
}

.message-success {
    background: rgba(16, 185, 129, 0.1);
    color: #059669;
}

.message-error {
    background: linear-gradient(135deg, rgba(224, 120, 86, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
    color: var(--primary-terracotta);
}
</style>