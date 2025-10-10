<template>
    <div>
        <section class="tabs-section">
            <NavBtns @navigatetotab="handleTabChange" :combo-ids="comboIds" :tabs="tabs" />
        </section>
        <!-- <tabs-section :combo-ids="comboIds" :date="date" :tabs="tabs"
            :disabled-dates="disabledDates" @tab-change="handleTabChange" @selected-date="selectedDate"
            @update:date="updateDate" /> -->
        <inner-content-section :cart-item="cartItem" :tour-package-data="tourPackageData"
            :check-package-ids="checkPackageIds" :first-package-id="firstPackageId" @edit-package="editPackage"
            @remove-from-cart="removeFromCart" @tab-change="handleTabChange" @book-now="bookNow" />
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { getMomentTimezone } from '../utils/dateUtils';
import NavBtns from './Nav/NavBtns.vue';
// import TabsSection from './Start/TabsSection.vue';
import InnerContentSection from './Start/InnerContentSection.vue';

export default {
    name: 'Index',
    title: 'Native American Tours',
    components: {
        NavBtns,
        // TabsSection,
        InnerContentSection,
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            iframeStatus: true,
            tourPackageData: [],
            tenantId: null,
            tourOperatorId: 0,
            packageId: 0,
            affiliateId: 0,
            comboIds: 0,
            date: null,
            cartItem: {},
            cartItemLength: 0,
            checkPackageIds: [],
            firstPackageId: 0,
            firstPackageName: '',
        };
    },
    computed: {
        tabs() {
            // Browse is always step 1 (for both single and combo packages)
            return 1;
        },
        hasCustomFields() {
            return this.$store.state.hasCustomFields;
        }
    },
    async created() {
        const loader = this.$loading.show();
        try {
            // Remove the single package cart item if exist
            if (this.$store.state.comboIds) {
                this.removePreviousSessionCartItems();
            }

            // Initialize date: use stored date if not in the past, otherwise use current date
            const today = getMomentTimezone(this.$store.state.timezone);
            const isDixies = this.$store.state.tenantId === 'dixies' && today.year() === 2025;
            const storedDate = this.$store.state.date ? this.$store.state.date : null;
            const currentDate = isDixies ? getMomentTimezone(this.$store.state.timezone, [2026, 0, 1]).format('YYYY-MM-DD') : getMomentTimezone(this.$store.state.timezone).format('YYYY-MM-DD');
            this.date = (storedDate && storedDate >= currentDate) ? storedDate : currentDate;

            // Initialize from Vuex store or stored params, respecting URL intent
            this.tenantId = this.$store.state.tenantId || null;
            this.tourOperatorId = this.$store.state.tourOperatorId || 0;
            this.packageId = this.$store.state.packageId || 0;
            this.affiliateId = this.$store.state.affiliateId || 0;
            this.comboIds = this.$store.state.comboIds || 0;
            this.iframeStatus = this.$store.state.iframeStatus || false;
            this.cartItem = this.$store.state.cartItem || {};
            this.cartItemLength = Object.keys(this.cartItem).length;

            if (this.cartItemLength) {
                // Get package IDs from cart
                this.checkPackageIds = Object.values(this.cartItem).map(item => parseInt(item.package_id));
            }

            if (this.packageId > 0 && this.$store.state.mindChange === 0) {
                this.$router.push({ name: 'Init' });
                return;
            }

            if (this.$store.state.mindChange === 1 && this.comboIds) {
                this.packageId = 0;
                this.affiliateId = 0;
            }

            const url = `/tour-package/${this.date}/${this.tourOperatorId}/${this.packageId}/${this.affiliateId}/${this.comboIds}`;
            const response = await axios.get(url);
            this.$store.dispatch('storeTourPackage', response.data);
            this.tourPackageData = response.data.tourPackageData;
            if (this.comboIds) {
                const strCids = this.comboIds.split(',');
                this.firstPackageId = parseInt(strCids[0]) || 0;
                const firstPkg = this.tourPackageData.find(pkg => pkg.package_id === this.firstPackageId);
                if (firstPkg) this.firstPackageName = firstPkg.package_name.toLowerCase();
            }
        } catch (error) {
            console.error('Error in created hook:', error);
            Swal.fire({
                toast: true,
                html: 'Failed to load tour packages. Please try again.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false,
            });
            this.tourPackageData = [];
        } finally {
            this.processLoader(loader);
        }

        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        handleTabChange(tab, destination) {
            if (tab === 1 || tab === 2 || tab === 3 || tab === 4 || tab === 5 || tab === 6) {
                this.handleTab(tab, destination);
            } else {
                Swal.fire({
                    toast: true,
                    html: `In order to proceed with scheduling, please add package.`,
                    icon: 'info',
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        },
        handleTab(tab, destination) {
            if (tab === 2 || Object.keys(this.cartItem).length) {
                // Check if navigating to MyTrip or Maps with only 1 package (combo requires 2+)
                if ((destination === 'MyTrip' || destination === 'Maps') && this.comboIds && this.cartItemLength === 1) {
                    Swal.fire({
                        toast: true,
                        html: `To proceed, please ensure you have selected at least two packages.`,
                        icon: 'info',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    return;
                }
                if (tab === 2) {
                    this.$store.dispatch('storeFormData', null);
                }
                this.tabs = tab;
                this.$store.dispatch('storeTabs', tab);
                this.$store.dispatch('storeMindChange', 1);
                this.$router.push({ name: destination });
            } else {
                Swal.fire({
                    toast: true,
                    html: `In order to proceed with ${destination.toLowerCase()}, please select package.`,
                    icon: 'info',
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        },
        bookNow({ tenant_id, tour_operator_id, package_id }) {
            if (this.comboIds) {
                const isPackageSelected = this.checkPackageIds.includes(this.firstPackageId) || this.firstPackageId === package_id;
                if (isPackageSelected) {
                    this.handlePackageSelection(tenant_id, tour_operator_id, package_id);
                } else {
                    Swal.fire({
                        toast: true,
                        html: `In order to proceed, please first schedule a ${this.firstPackageName.toLowerCase()} package.`,
                        icon: 'info',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }
            } else {
                this.handlePackageSelection(tenant_id, tour_operator_id, package_id);
            }
        },
        handlePackageSelection(tid, oid, pid) {
            this.$store.dispatch('storeTenantId', tid);
            this.$store.dispatch('storeTourOperatorId', oid);
            this.$store.dispatch('storePackageId', pid);
            this.$store.dispatch('storeFormData', null);
            this.$router.push({ name: 'Init' });
        },
        editPackage(formData) {
            if (formData.affiliate_id) {
                this.$store.dispatch('storeAffiliateId', formData.affiliate_id);
            }
            this.$store.dispatch('storeFormData', formData);
            this.$store.dispatch('storePackageId', formData.package_id);
            this.$store.dispatch('storeDate', formData.date);
            this.$router.push({ name: 'Init' });
        },
        removeFromCart(formData) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(result => {
                if (result.isConfirmed) {
                    const newCart = { ...this.cartItem };
                    delete newCart[formData.tour_slot_id];
                    this.cartItem = newCart;
                    this.cartItemLength = Object.keys(newCart).length;
                    this.checkPackageIds = Object.values(newCart).map(item => parseInt(item.package_id));
                    this.$store.dispatch('storeCartItem', newCart);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your package has been deleted.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    if (!this.cartItemLength) {
                        this.$store.dispatch('storeCartItem', {});
                    }
                }
            });
        },
        processLoader(loader) {
            loader.hide();
        },
        removePreviousSessionCartItems() {
            const strCids = this.$store.state.comboIds.split(',');

            // Filter out items whose package_id is not in strCids
            const filteredCartItems = Object.values(this.$store.state.cartItem).filter(item => {
                return strCids.includes(String(item.package_id));
            });

            if (filteredCartItems.length === 0) {
                // If no matches found, empty cart
                this.$store.dispatch('storeCartItem', {});
            }
        }
    },
};
</script>
