<template>
    <section class="inner-content-section">
        <div class="tour-grid-container">
            <div v-if="Object.keys(cartItem).length" class="cart-items-section">
                <cart-item v-for="(item, tourSlotId) in cartItem" :key="tourSlotId" :item="item"
                    :first-package-id="firstPackageId"
                    @edit-package="$emit('edit-package', $event)"
                    @remove-from-cart="$emit('remove-from-cart', $event)"
                    @tab-change="$emit('tab-change', 5, 'Checkout')" />
            </div>
            <div class="tour-grid">
                <available-package v-for="tourPackage in tourPackageData" :key="tourPackage.id"
                    :tour-package="tourPackage" :check-package-ids="checkPackageIds"
                    @book-now="$emit('book-now', $event)" />
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

<style scoped>
.inner-content-section {
    padding: 40px 40px;
    background: #fafafa;
}

.tour-grid-container {
    max-width: 1200px;
    margin: 0 auto;
}

.cart-items-section {
    margin-bottom: 30px;
}

.tour-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

@media (max-width: 992px) {
    .tour-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .inner-content-section {
        padding: 20px;
    }
    
    .tour-grid {
        grid-template-columns: 1fr;
    }
}
</style>
