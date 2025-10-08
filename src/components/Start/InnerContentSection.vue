<template>
    <section class="tours-page">
        <div class="tours-container">
            <!-- Cart Items Section -->
            <div v-if="Object.keys(cartItem).length" class="selected-tours-section">
                <div class="section-header">
                    <h2 class="section-title">Your Selected Tours</h2>
                    <span class="tour-count">{{ Object.keys(cartItem).length }} tour{{ Object.keys(cartItem).length > 1 ? 's' : '' }}</span>
                </div>
                <div class="selected-tours-grid">
                    <cart-item 
                        v-for="(item, tourSlotId) in cartItem" 
                        :key="tourSlotId" 
                        :item="item"
                        :first-package-id="firstPackageId"
                        @edit-package="$emit('edit-package', $event)"
                        @remove-from-cart="$emit('remove-from-cart', $event)"
                        @tab-change="$emit('tab-change', 5, 'Checkout')" />
                </div>
            </div>

            <!-- Available Tours Section -->
            <div class="available-tours-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Available Cultural Experiences</h2>
                        <p class="section-subtitle">Discover authentic Native American tours and cultural experiences</p>
                    </div>
                </div>
                <div class="tours-grid">
                    <available-package 
                        v-for="tourPackage in tourPackageData" 
                        :key="tourPackage.id"
                        :tour-package="tourPackage" 
                        :check-package-ids="checkPackageIds"
                        @book-now="$emit('book-now', $event)" />
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
};
</script>

<style scoped>
.tours-page {
    min-height: calc(100vh - 200px);
    background: var(--neutral-50);
    padding: var(--space-8) var(--space-6);
}

.tours-container {
    max-width: 1400px;
    margin: 0 auto;
}

/* Section Headers */
.section-header {
    margin-bottom: var(--space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.section-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0;
}

.section-subtitle {
    font-size: var(--text-base);
    color: var(--neutral-600);
    margin-top: var(--space-2);
}

.tour-count {
    background: var(--primary-teal);
    color: white;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
}

/* Selected Tours Section */
.selected-tours-section {
    margin-bottom: var(--space-10);
    padding: var(--space-6);
    background: white;
    border-radius: var(--radius-xl);
    border: 2px solid var(--primary-teal-light);
}

.selected-tours-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
}

/* Available Tours Section */
.available-tours-section {
    /* No special styling needed */
}

.tours-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
}

/* Responsive */
@media (max-width: 1200px) {
    .tours-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}

@media (max-width: 768px) {
    .tours-page {
        padding: var(--space-6) var(--space-4);
    }
    
    .section-title {
        font-size: var(--text-2xl);
    }
    
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
    }
    
    .selected-tours-section {
        padding: var(--space-4);
    }
    
    .tours-grid {
        grid-template-columns: 1fr;
        gap: var(--space-4);
    }
}
</style>
