<template>
    <div class="modern-tour-card" v-if="!checkPackageIds.includes(tourPackage.package_id)">
        <div class="tour-image-wrapper">
            <img v-if="tourPackage.FrontendPackageImage" 
                :src="tourPackage.FrontendPackageImage" 
                :alt="tourPackage.package_name"
                class="tour-image">
            <div v-else class="tour-image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <p class="placeholder-text">Image coming soon</p>
            </div>
            <div class="tour-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{{ tourPackage.type !== 'Stay' ? `${tourPackage.duration} ${tourPackage.type}` : tourPackage.type }}</span>
            </div>
        </div>
        
        <div class="tour-content">
            <h3 class="tour-title">{{ tourPackage.package_name }}</h3>
            <p class="tour-description">{{ tourPackage.short_description }}</p>
            
            <div class="tour-footer">
                <div class="tour-pricing">
                    <span class="price-from">From</span>
                    <span class="price-value">${{ tourPackage.adult_price || tourPackage.price }}</span>
                    <span class="price-per">per person</span>
                </div>
                <button class="btn-select-tour"
                    @click="$emit('book-now', { 
                        tenant_id: tourPackage.tenant_id, 
                        tour_operator_id: tourPackage.tour_operator_id, 
                        package_id: tourPackage.package_id 
                    })">
                    <span>Select Tour</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AvailablePackage',
    props: ['tourPackage', 'checkPackageIds'],
    emits: ['book-now'],
};
</script>

<style scoped>
.modern-tour-card {
    background: white;
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--neutral-200);
    transition: all var(--transition-base);
    display: flex;
    flex-direction: column;
    height: 100%;
}

.modern-tour-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
    border-color: var(--primary-teal-light);
}

/* Image Section */
.tour-image-wrapper {
    position: relative;
    height: 240px;
    overflow: hidden;
    background: linear-gradient(135deg, var(--neutral-100) 0%, var(--neutral-200) 100%);
}

.tour-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
}

.modern-tour-card:hover .tour-image {
    transform: scale(1.05);
}

.tour-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--neutral-400);
}

.placeholder-text {
    margin-top: var(--space-2);
    font-size: var(--text-sm);
    color: var(--neutral-500);
}

.tour-badge {
    position: absolute;
    bottom: var(--space-3);
    left: var(--space-3);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--neutral-700);
    box-shadow: var(--shadow-sm);
}

.tour-badge svg {
    color: var(--primary-teal);
}

/* Content Section */
.tour-content {
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    flex: 1;
}

.tour-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0 0 var(--space-3) 0;
    line-height: 1.3;
}

.tour-description {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    line-height: 1.6;
    margin: 0 0 var(--space-5) 0;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Footer */
.tour-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--neutral-200);
}

.tour-pricing {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.price-from {
    font-size: var(--text-xs);
    color: var(--neutral-500);
    font-weight: var(--font-medium);
}

.price-value {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    line-height: 1;
}

.price-per {
    font-size: var(--text-xs);
    color: var(--neutral-500);
}

.btn-select-tour {
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    white-space: nowrap;
}

.btn-select-tour:hover {
    transform: translateX(2px);
    box-shadow: var(--shadow-md);
}

.btn-select-tour svg {
    transition: transform var(--transition-base);
}

.btn-select-tour:hover svg {
    transform: translateX(2px);
}

/* Responsive */
@media (max-width: 768px) {
    .tour-image-wrapper {
        height: 200px;
    }
    
    .tour-content {
        padding: var(--space-4);
    }
    
    .tour-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
    }
    
    .btn-select-tour {
        width: 100%;
        justify-content: center;
    }
}
</style>
