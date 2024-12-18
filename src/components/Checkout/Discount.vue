<template>
    <div class="other-details-wrap">
        <div class="tour-packages-couponcode d-flex justify-content-end align-items-center">
            <input type="text" name="couponcode" placeholder="Promo Code" v-model="item.code" :id="'couponCode-' + item.tour_slot_id" @keyup="addCouponCode(item)">
            <button class="couponcode-apply-btn ms-1" :class="item?.tour_promotion_id ? 'btn-success' : 'btn-primary'" :disabled="item?.tour_promotion_id ? true : false" :id="'applyCouponButton-' + item.tour_slot_id" @click="applyCoupon(item)">{{ item?.tour_promotion_id ? 'Applied' : 'Apply' }}</button>
        </div>
        <p v-if="item?.couponSuccess?.length" v-for="success in item?.couponSuccess" :key="success" v-bind:class="{'text-success text-end': success }">
            {{ success }}
        </p>
        <p v-if="item?.couponErrors?.length" v-for="error in item?.couponErrors" :key="error" v-bind:class="{'text-danger text-end': error }">
            {{ error }}
        </p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Discount",
    props: ["item", "allItem", "globalTotalItem"],
    data: () => {
        return {
        }
    },
    methods: {
        addCouponCode(item) {
            console.log('addCouponCode');

            item.tour_promotion_id = "";
            item.discount2_value = 0;
            item.discount2_percentage = 0;
            item.couponSuccess = [];
            item.couponErrors = [];
            item.subtotal = Number(item.before_discount_subtotal);
            item.fees = Number(item.before_discount_fees);
            item.total = Number(item.before_discount_total);

            this.updateCartItem();

            $('#applyCouponButton-' + item.tour_slot_id)
                .text('Apply')
                .removeClass('btn-success')
                .addClass('btn-primary')
                .attr('disabled', false);
        },
        applyCoupon(item) {
            console.log('applyCoupon');
            this.processing = true;
            var loader = this.$loading.show();
            item.code = document.querySelector("#couponCode-" + item.tour_slot_id).value;

            item.couponSuccess = [];
            item.couponErrors = [];
            if (!item.code) {
                item.couponErrors.push("To receive a discount, please enter the promo code.");
                this.processLoader(loader);
            } else {
                let self = this;
                axios.get("/apply-coupon/" + item.package_id + "/" + item.tour_slot_id + "/" + item.code).then((response) => {
                    var promocode = response.data.data;
                    var subtotal = item.subtotal;
                    var discount2Percentage = 0;
                    if (promocode.discount_value_type == "Percent") {
                        discount2Percentage = Number(promocode.discount_value);
                        var discountedAmount = subtotal * discount2Percentage / 100;
                        subtotal = Number(subtotal - discountedAmount).toFixed(2);
                    } else {
                        var discountedAmount = Number(promocode.discount_value).toFixed(2);
                        subtotal = Number(subtotal - discountedAmount).toFixed(2);
                    }

                    if (subtotal <= 0) {
                        item.couponErrors.push("Your coupon code is not valid.");
                    } else {
                        item.discount2_percentage = discount2Percentage;
                        item.tour_promotion_id = promocode.id;
                        item.discount2_value = Number(discountedAmount);

                        item.subtotal = Number(subtotal);
                        var fees = this.roundout(subtotal * item.service_commission / 100, 2);
                        item.fees = Number(fees);

                        var total = Number(item.subtotal) + Number(item.fees);
                        item.total = Number(total);

                        $('#applyCouponButton-' + item.tour_slot_id)
                            .text('Applied')
                            .removeClass('btn-primary')
                            .addClass('btn-success')
                            .attr('disabled', true);

                        item.couponSuccess.push(response.data.message);

                        this.updateCartItem();
                    }

                    this.processLoader(loader);
                }).catch(function (error) {
                    item.code = "";
                    item.tour_promotion_id = "";
                    item.discount2_value = 0;
                    item.discount2_percentage = 0;
                    self.processLoader(loader);
                    if (error.response) {
                        item.couponErrors.push(error.response.data.message);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
            }
        },
        updateCartItem() {
            this.globalTotalItem.subtotal = 0;
            this.globalTotalItem.discount = 0;
            this.globalTotalItem.fees = 0;
            this.globalTotalItem.addons_total = 0;
            this.globalTotalItem.addons_fee = 0;
            this.globalTotalItem.total = 0;

            for (var key in this.allItem) {
                this.globalTotalItem.subtotal = Number(this.globalTotalItem.subtotal) + Number(this.allItem[key].subtotal);
                this.globalTotalItem.discount = Number(this.globalTotalItem.discount) + Number(this.allItem[key].discount2_value);
                this.globalTotalItem.fees = Number(this.globalTotalItem.fees) + Number(this.allItem[key].fees);
                this.globalTotalItem.addons_total = Number(this.globalTotalItem.addons_total) + Number(this.allItem[key].addons_total);
                this.globalTotalItem.addons_fee = Number(this.globalTotalItem.addons_fee) + Number(this.allItem[key].addons_fee);
                this.globalTotalItem.total = Number(this.globalTotalItem.total) + Number(this.allItem[key].total);
            }
        },
        processLoader(loader) {
            // reset the state
            this.processing = false;
            loader.hide();
        },
        roundout(amount, places = 2) {
            if (places < 0) {
                places = 0;
            }

            let x = Math.pow(10, places);
            let formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        }
    }
}
</script>
