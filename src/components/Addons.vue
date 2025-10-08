<template>
    <section class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>

    <section class="addons-section">
        <div class="addons-container">
            <div class="addons-content">
                <div class="addons-left">
                    <h2 class="section-title">Booking Add-Ons</h2>
                    
                    <div class="addon-item">
                        <label class="addon-checkbox">
                            <input type="checkbox" v-model="addons.texiPickup">
                            <span class="checkmark"></span>
                            <div class="addon-info">
                                <span class="addon-name">Texi Pickup</span>
                                <span class="addon-price">Additional Fee: $10.00</span>
                            </div>
                        </label>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Meal Preference</label>
                        <select v-model="addons.mealPreference" class="form-select">
                            <option value="">Select meal preference</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="gluten-free">Gluten Free</option>
                            <option value="no-preference">No Preference</option>
                        </select>
                    </div>

                    <div class="addon-item">
                        <label class="addon-checkbox">
                            <input type="checkbox" v-model="addons.vipLounge">
                            <span class="checkmark"></span>
                            <div class="addon-info">
                                <span class="addon-name">VIP Lounge Access</span>
                                <span class="addon-price">Additional Fee: $25.00</span>
                            </div>
                        </label>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Payment Notes</label>
                        <textarea v-model="addons.paymentNotes" 
                            class="form-textarea" 
                            rows="3" 
                            placeholder="Any payment - related notes"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Internal Comments</label>
                        <textarea v-model="addons.internalComments" 
                            class="form-textarea" 
                            rows="3" 
                            placeholder="Internal comments for staff ..."></textarea>
                    </div>
                </div>

                <div class="addons-right">
                    <h2 class="section-title">Booking Summary</h2>
                    <div class="booking-summary">
                        <p class="summary-placeholder">Booking details will appear here</p>
                    </div>
                    
                    <div class="summary-totals">
                        <div class="summary-row">
                            <span>Subtotal (3×)</span>
                            <span>$360</span>
                        </div>
                        <div class="summary-row">
                            <span>Taxes & Fees</span>
                            <span>$43.20</span>
                        </div>
                        <div class="summary-total">
                            <span>Total</span>
                            <span>$403.20</span>
                        </div>
                    </div>

                    <button class="continue-button" @click="continueToCheckout">
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavBtns from './Nav/NavBtns.vue';

export default {
    name: 'Addons',
    title: 'Native American Tours',
    components: {
        NavBtns
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: true,
            tenantId: null,
            tourOperatorId: 0,
            comboIds: 0,
            packageId: 0,
            affiliateId: 0,
            cartItem: {},
            cartItemLength: 0,
            tabs: 3,
            checkPackageIds: [],
            addons: {
                texiPickup: false,
                mealPreference: '',
                vipLounge: false,
                paymentNotes: '',
                internalComments: ''
            }
        };
    },
    async created() {
        this.initializeState();
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        initializeState() {
            this.tenantId = this.$store.state.tenantId;
            this.tourOperatorId = this.$store.state.tourOperatorId;
            this.packageId = this.$store.state.packageId;
            this.affiliateId = this.$store.state.affiliateId;
            this.iframeStatus = this.$store.state.iframeStatus;
            this.comboIds = this.$store.state.comboIds;
            this.cartItem = this.$store.state.cartItem;
            this.cartItemLength = Object.values(this.cartItem).length;

            if (this.cartItemLength) {
                this.checkPackageIds = Object.values(this.cartItem).map(item => parseInt(item.package_id));
            }
        },
        navigateToTab(tab, destination) {
            if ([1, 2, 3, 4, 5, 6].includes(tab)) {
                if (tab === 2) {
                    this.$store.dispatch('storeFormData', null);
                }
                this.$store.dispatch('storeMindChange', 1);
                this.$router.push({ name: destination });
            }
        },
        continueToCheckout() {
            this.$router.push({ name: 'Checkout' });
        },
        processLoader(loader) {
            loader.hide();
        },
    },
};
</script>

<style scoped>
.addons-section {
    padding: 40px;
    background: #fafafa;
}

.addons-container {
    max-width: 1200px;
    margin: 0 auto;
}

.addons-content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 40px;
}

.section-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #1a1a1a;
}

.addon-item {
    margin-bottom: 20px;
}

.addon-checkbox {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    position: relative;
}

.addon-checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkmark {
    width: 24px;
    height: 24px;
    border: 2px solid #df7151;
    border-radius: 4px;
    margin-right: 12px;
    flex-shrink: 0;
    position: relative;
}

.addon-checkbox input:checked ~ .checkmark {
    background: #df7151;
}

.addon-checkbox input:checked ~ .checkmark::after {
    content: '';
    position: absolute;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.addon-info {
    display: flex;
    flex-direction: column;
}

.addon-name {
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 4px;
}

.addon-price {
    font-size: 14px;
    color: #666;
}

.form-group {
    margin-bottom: 20px;
}

.form-label {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 8px;
}

.form-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    color: #666;
    background: #fff;
}

.form-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    color: #666;
    resize: vertical;
    font-family: inherit;
}

.addons-right {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    height: fit-content;
}

.booking-summary {
    margin-bottom: 20px;
}

.summary-placeholder {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 20px;
}

.summary-totals {
    border-top: 1px solid #e5e5e5;
    padding-top: 16px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
    color: #666;
}

.summary-total {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e5e5e5;
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
}

.continue-button {
    width: 100%;
    background: #df7151;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 14px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.3s ease;
}

.continue-button:hover {
    background: #c9604a;
}

@media (max-width: 992px) {
    .addons-content {
        grid-template-columns: 1fr;
    }
}
</style>