<template>
    <div class="other-details-wrap">
        <div class="tour-packages-couponcode d-flex justify-content-end align-items-center gap-2">
            <input :id="couponInputId" v-model.trim="couponCode" type="text" placeholder="Promo Code"
                class="form-control" @keyup="resetCoupon">
            <button :id="applyButtonId"
                :class="['couponcode-apply-btn ms-1', hasCouponApplied ? 'btn-success' : 'btn-primary']"
                :disabled="hasCouponApplied || processing" @click="applyCoupon">
                {{ hasCouponApplied ? 'Applied' : 'Apply' }}
            </button>
        </div>
        <p v-for="(message, index) in successMessages" :key="`success-${index}`" class="text-success text-end mb-0">
            {{ message }}
        </p>
        <p v-for="(error, index) in errorMessages" :key="`error-${index}`" class="text-danger text-end mb-0">
            {{ error }}
        </p>
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
            const factor = 10 ** places;
            return Math.round(amount * factor) / factor;
        }
    }
};
</script>