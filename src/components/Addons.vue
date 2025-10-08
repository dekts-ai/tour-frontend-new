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
    padding: var(--space-8) var(--space-6);
    background: var(--neutral-50);
    min-height: calc(100vh - 200px);
}

.addons-container {
    max-width: 1400px;
    margin: 0 auto;
}

.addons-content {
    display: grid;
    grid-template-columns: 1fr 440px;
    gap: var(--space-6);
}

.section-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    margin: 0 0 var(--space-6) 0;
    color: var(--neutral-900);
}

.addon-item {
    margin-bottom: var(--space-5);
    padding: var(--space-4);
    background: white;
    border-radius: var(--radius-lg);
    border: 2px solid var(--neutral-200);
    transition: all var(--transition-base);
}

.addon-item:hover {
    border-color: var(--primary-teal-light);
    box-shadow: var(--shadow-sm);
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
    border: 2px solid var(--neutral-300);
    border-radius: var(--radius-md);
    margin-right: var(--space-3);
    flex-shrink: 0;
    position: relative;
    background: white;
    transition: all var(--transition-base);
}

.addon-checkbox input:checked ~ .checkmark {
    background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-light));
    border-color: var(--primary-teal);
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
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
    margin-bottom: var(--space-1);
}

.addon-price {
    font-size: var(--text-sm);
    color: var(--primary-terracotta);
    font-weight: var(--font-medium);
}

.form-group {
    margin-bottom: var(--space-5);
}

.form-label {
    display: block;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--neutral-900);
    margin-bottom: var(--space-2);
}

.form-select {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    color: var(--neutral-700);
    background: white;
    transition: all var(--transition-base);
}

.form-select:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.form-textarea {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    color: var(--neutral-700);
    resize: vertical;
    font-family: var(--font-body);
    transition: all var(--transition-base);
}

.form-textarea:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.addons-right {
    background: white;
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    border: 1px solid var(--neutral-200);
    height: fit-content;
    box-shadow: var(--shadow-sm);
}

.booking-summary {
    margin-bottom: var(--space-5);
}

.summary-placeholder {
    color: var(--neutral-500);
    font-size: var(--text-sm);
    text-align: center;
    padding: var(--space-6);
    background: var(--neutral-50);
    border-radius: var(--radius-lg);
}

.summary-totals {
    border-top: 2px solid var(--neutral-200);
    padding-top: var(--space-4);
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-3);
    font-size: var(--text-sm);
    color: var(--neutral-600);
}

.summary-total {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 2px solid var(--neutral-200);
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
}

.continue-button {
    width: 100%;
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    cursor: pointer;
    margin-top: var(--space-5);
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
}

.continue-button:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
    .addons-content {
        grid-template-columns: 1fr;
    }
    
    .addons-right {
        order: -1;
    }
}

@media (max-width: 768px) {
    .addons-section {
        padding: var(--space-6) var(--space-4);
    }
}
</style>