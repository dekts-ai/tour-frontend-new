<template>
    <div class="booking-header">
        <div class="booking-header-content">
            <h1 class="booking-title">Book Your Experience</h1>
            <div class="booking-tabs">
                <button @click="toTab(1, 'Index')"
                    :class="['booking-tab', { 'active': tabs == 1 }]">Tours</button>
                <button @click="toTab(2, 'Init')"
                    :class="['booking-tab', { 'active': tabs == 2 }]">Schedule</button>
                <button @click="toTab(3, 'Addons')"
                    :class="['booking-tab', { 'active': tabs == 3 }]">Add-Ons</button>
                <button @click="toTab(6, 'Checkout')"
                    :class="['booking-tab', { 'active': tabs == 6 }]">Checkout</button>
            </div>
            <button class="booking-close" @click="closeBooking">×</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBtns",
    props: ["comboIds", "tabs"],
    data: () => {
        return {};
    },
    methods: {
        toTab(tab, destination) {
            this.$emit('navigatetotab', tab, destination);
        },
        closeBooking() {
            window.close();
        }
    }
}
</script>

<style scoped>
.booking-header {
    background: #fff;
    padding: 20px 40px;
    border-bottom: 1px solid #e5e5e5;
}

.booking-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
}

.booking-title {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    color: #1a1a1a;
}

.booking-tabs {
    display: flex;
    gap: 8px;
    flex: 1;
    justify-content: center;
}

.booking-tab {
    background: #f5f3f3;
    border: none;
    border-radius: 20px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
}

.booking-tab:hover {
    background: #e5e5e5;
}

.booking-tab.active {
    background: #2d3139;
    color: #fff;
}

.booking-close {
    background: none;
    border: none;
    font-size: 32px;
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.booking-close:hover {
    color: #000;
}

@media (max-width: 768px) {
    .booking-header {
        padding: 15px 20px;
    }

    .booking-title {
        font-size: 18px;
    }

    .booking-tabs {
        gap: 4px;
    }

    .booking-tab {
        padding: 8px 12px;
        font-size: 12px;
    }
}
</style>
