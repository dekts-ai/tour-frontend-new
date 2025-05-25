<template>
    <section class="inner-content-section">
        <div :class="['no-container']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div :class="['row payment-row iframe-row']">
                            <div class="col-12">
                                <div class="tourlist-packages-wrap">
                                    <div v-if="Object.keys(cartItem).length">
                                        <cart-item v-for="(item, tourSlotId) in cartItem" :key="tourSlotId" :item="item"
                                            :first-package-id="firstPackageId"
                                            @edit-package="$emit('edit-package', $event)"
                                            @remove-from-cart="$emit('remove-from-cart', $event)"
                                            @tab-change="$emit('tab-change', 5, 'Checkout')" />
                                    </div>
                                    <available-package v-for="tourPackage in tourPackageData" :key="tourPackage.id"
                                        :tour-package="tourPackage" :check-package-ids="checkPackageIds"
                                        @book-now="$emit('book-now', $event)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CartItem from './CartItem.vue';
import AvailablePackage from './AvailablePackage.vue';

export default {
    name: 'InnerContentSection',
    components: {
        CartItem,
        AvailablePackage,
    },
    props: ['cartItem', 'tourPackageData', 'checkPackageIds', 'firstPackageId'],
    emits: ['edit-package', 'remove-from-cart', 'tab-change', 'book-now'],
    mounted() {
        // Debug: Log cartItem to verify data
        // console.log('InnerContentSection cartItem:', this.cartItem);
    },
    methods: {
        isPriceInfoEnabled(customFields) {
            return customFields?.some(item => item.priceInfo?.enabled === true) || false;
        },
    },
};
</script>
