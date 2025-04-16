<template>
    <section class="inner-content-section">
        <div :class="[iframeStatus ? 'no-container' : 'container']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div :class="[iframeStatus ? 'row payment-row iframe-row' : 'row payment-row']">
                            <div class="col-12">
                                <div class="row booking-row" v-if="!iframeStatus">
                                    <div class="col-lg-6 col-md-12">
                                        <div class="booking">
                                            <h2 class="easy-to-find">Book Online</h2>
                                            <div class="confirmation">
                                                <img src="../../assets/images/confirmation.png" alt="Confirmation icon">
                                                <p>Get Instant Confirmation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-lg-6 col-md-12 text-center text-lg-end text-md-center text-sm-center">
                                        <div class="info">
                                            <button class="tooltipbtn btn-info" data-toggle="tooltip"
                                                data-placement="top" title="Secured">
                                                Secured
                                            </button>
                                            <button class="tooltipbtn btn-danger" data-toggle="tooltip"
                                                data-placement="top" title="Health & Safety">
                                                Health & Safety
                                            </button>
                                            <button class="btn btn-warning mt-2"
                                                @click="$emit('tab-change', { tab: 5, destination: 'Checkout' })">
                                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="tourlist-packages-wrap">
                                    <div v-if="Object.keys(cartItem).length">
                                        <cart-item v-for="(item, tourSlotId) in cartItem" :key="tourSlotId" :item="item"
                                            :first-package-id="firstPackageId"
                                            @edit-package="$emit('edit-package', $event)"
                                            @remove-from-cart="$emit('remove-from-cart', $event)"
                                            @tab-change="$emit('tab-change', $event)" />
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
    props: ['iframeStatus', 'cartItem', 'tourPackageData', 'checkPackageIds', 'firstPackageId'],
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
