<template>
    <div class="tour-card" v-if="!checkPackageIds.includes(tourPackage.package_id)">
        <div class="tour-card-image">
            <img v-if="tourPackage.FrontendPackageImage" :src="tourPackage.FrontendPackageImage" :alt="tourPackage.package_name">
            <div v-else class="tour-card-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                </svg>
                <p>NO IMAGE AVAILABLE</p>
            </div>
        </div>
        <div class="tour-card-content">
            <h3 class="tour-card-title">{{ tourPackage.package_name }}</h3>
            <p class="tour-card-time">
                {{ tourPackage.type !== 'Stay' ? `${tourPackage.duration} ${tourPackage.type}` : tourPackage.type }}
            </p>
            <p class="tour-card-description">{{ tourPackage.short_description }}</p>
            <div class="tour-card-footer">
                <div class="tour-card-price">
                    <span class="price-label">From</span>
                    <span class="price-amount">${{ tourPackage.adult_price || tourPackage.price }}</span>
                    <span class="price-unit">per person</span>
                </div>
                <button class="tour-card-button"
                    @click="$emit('book-now', { tenant_id: tourPackage.tenant_id, tour_operator_id: tourPackage.tour_operator_id, package_id: tourPackage.package_id })">
                    Select Tour
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
.tour-card {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.tour-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tour-card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #f5f5f5;
}

.tour-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.tour-card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
    background: #e8e8e8;
}

.tour-card-placeholder p {
    margin-top: 12px;
    font-size: 12px;
    color: #999;
}

.tour-card-content {
    padding: 20px;
}

.tour-card-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #1a1a1a;
}

.tour-card-time {
    font-size: 14px;
    color: #666;
    margin: 0 0 12px 0;
}

.tour-card-description {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin: 0 0 20px 0;
}

.tour-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tour-card-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.price-label {
    font-size: 14px;
    color: #666;
}

.price-amount {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
}

.price-unit {
    font-size: 14px;
    color: #666;
}

.tour-card-button {
    background: #df7151;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s ease;
}

.tour-card-button:hover {
    background: #c9604a;
}
</style>
