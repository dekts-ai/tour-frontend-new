<template>
    <div>
        <section class="tabs-section">
            <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
        </section>

        <section class="inner-content-section">
        <div class="maps-container">
            <!-- Page Header -->
            <div class="maps-header">
                <div class="header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" fill="currentColor" opacity="0.2"/>
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
                        <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 3V5M21 13H19M5 13H3M18.364 18.364L16.95 16.95" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="header-content">
                    <h1 class="header-title">Trip Map</h1>
                    <p class="header-subtitle">Visualize your journey across locations</p>
                </div>
            </div>

            <!-- Map Container -->
            <div class="map-wrapper">
                <GMapMap 
                    :center="center" 
                    ref="mapRef" 
                    :zoom="10" 
                    class="tour-map"
                    :options="mapOptions" 
                    data-testid="tour-map">
                    <GMapMarker 
                        v-for="(marker, index) in markers" 
                        :key="index"
                        :ref="`marker${index}`" 
                        :position="marker.position" 
                        :clickable="true"
                        :icon="marker.icon" 
                        :title="marker.title" 
                        @click="onMarkerClick(marker)"
                        :data-testid="`marker-${index}`" />
                </GMapMap>
            </div>

            <!-- Tour Details -->
            <div class="tour-details-section">
                <div class="section-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                        <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
                        <path d="M8 3V7M16 3V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <h2>Your Day</h2>
                </div>

                <div class="tour-cards">
                    <div 
                        v-for="item in cartItem" 
                        :key="item.tour_slot_id"
                        class="tour-card"
                        :data-testid="`cart-item-${item.tour_slot_id}`">
                        
                        <div class="tour-card-image">
                            <img :src="item.package_image" :alt="item.package_name" />
                            <div class="tour-type-badge">{{ item.type }}</div>
                        </div>

                        <div class="tour-card-content">
                            <div class="tour-card-header">
                                <h3 class="tour-title">{{ item.package_name }}</h3>
                                <div v-if="item.package_has_slots" class="tour-duration">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
                                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    <span>{{ item.duration }}</span>
                                </div>
                            </div>

                            <div class="tour-meta">
                                <div class="meta-badge">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                                        <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    <span>
                                        {{ dateFormat(item.date) }}
                                        <span v-if="item.package_has_slots">@ {{ item.time_date }}</span>
                                    </span>
                                </div>
                            </div>

                            <p class="tour-description">{{ item.long_description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Continue Button -->
            <div class="continue-section">
                <button class="continue-button" @click="continueToCheckout">
                    Continue to Checkout →
                </button>
            </div>
        </div>
        </section>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import NavBtns from './Nav/NavBtns.vue';
import { getMomentTimezone } from '../utils/dateUtils';

export default {
    name: 'GoogleMap',
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
            cartItem: {},
            center: { lat: 0, lng: 0 },
            markers: [],
            mapOptions: {
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
                disableDefaultUi: false,
                styles: [
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
                    },
                    {
                        featureType: 'landscape',
                        elementType: 'geometry',
                        stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.fill',
                        stylers: [{ color: '#ffffff' }, { lightness: 17 }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }]
                    },
                    {
                        featureType: 'road.arterial',
                        elementType: 'geometry',
                        stylers: [{ color: '#ffffff' }, { lightness: 18 }]
                    }
                ]
            }
        };
    },
    computed: {
        tabs() {
            const hasCustomFields = this.$store.state.hasCustomFields;
            const isCombo = this.comboIds && this.comboIds !== 0;
            
            if (isCombo) {
                // Combo WITH add-ons: Browse(1), Init(2), Addons(3), MyTrip(4), Maps(5), Checkout(6)
                // Combo WITHOUT add-ons: Browse(1), Init(2), MyTrip(3), Maps(4), Checkout(5)
                return hasCustomFields === false ? 4 : 5;
            }
            
            // Maps is only for combo packages, shouldn't be here for single packages
            return 1;
        }
    },
    created() {
        this.initializeFromStore();
        this.buildMarkers();
        this.$store.dispatch('storeTabs', this.tabs);
        this.$store.dispatch('storeMindChange', 0);
    },
    methods: {
        initializeFromStore() {
            this.date = this.$store.state.date
                ? this.$store.state.date
                : getMomentTimezone(this.$store.state.timezone).format('YYYY-MM-DD');
            this.tenantId = this.$store.state.tenantId || null;
            this.tourOperatorId = this.$store.state.tourOperatorId || 0;
            this.iframeStatus = this.$store.state.iframeStatus;
            this.comboIds = this.$store.state.comboIds ?? 0;
            this.cartItem = this.$store.state.cartItem || {};
        },
        buildMarkers() {
            this.markers = [];
            this.center = { lat: 0, lng: 0 };
            let isFirstMarker = true;

            Object.values(this.cartItem).forEach(item => {
                if (item.latitude && item.longitude) {
                    const lat = Number(item.latitude);
                    const lng = Number(item.longitude);
                    if (isFirstMarker) {
                        this.center = { lat, lng };
                        isFirstMarker = false;
                    }
                    this.markers.push({
                        position: { lat, lng },
                        title: item.package_name || 'Tour',
                        image: item.package_image || '',
                        duration: item.duration || '',
                        date: item.date || this.date,
                        time_date: item.time_date || '',
                        short_description: item.short_description || ''
                    });
                }
            });
        },
        dateFormat(date) {
            return getMomentTimezone(this.$store.state.timezone, date).format('dddd, MMMM D, YYYY');
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
        onMarkerClick(marker) {
            Swal.fire({
                type: 'info',
                toast: true,
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
                html: `
            <div class="d-md-flex mt-2">
              <img src="${marker.image || '../assets/images/placeholder.png'}" width="100" height="100" alt="${marker.title}" />
              <div class="content-box">
                <div class="d-lg-flex">
                  <b>${marker.title}</b>
                </div>
                <p class="mb-2">${this.dateFormat(marker.date)} @ ${marker.time_date || 'N/A'}</p>
              </div>
            </div>`
            });
        },
        continueToCheckout() {
            this.$router.push({ name: 'Checkout' });
        }
    }
};
</script>

<style scoped>
.maps-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-6);
}

/* Header */
.maps-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 2px solid var(--neutral-200);
}

.header-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
}

.header-content {
    flex: 1;
}

.header-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin-bottom: var(--space-2);
}

.header-subtitle {
    font-size: var(--text-base);
    color: var(--neutral-600);
    margin: 0;
}

/* Map */
.map-wrapper {
    background: white;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    margin-bottom: var(--space-8);
}

.tour-map {
    width: 100%;
    height: 500px;
}

/* Tour Details Section */
.tour-details-section {
    background: white;
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-lg);
}

.section-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-4);
    border-bottom: 2px solid var(--neutral-200);
}

.section-header svg {
    color: var(--primary-teal);
}

.section-header h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0;
}

/* Tour Cards */
.tour-cards {
    display: grid;
    gap: var(--space-6);
}

.tour-card {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-6);
    padding: var(--space-6);
    background: var(--neutral-50);
    border-radius: var(--radius-xl);
    border: 2px solid var(--neutral-200);
    transition: all var(--transition-base);
}

.tour-card:hover {
    border-color: var(--primary-teal-lighter);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.tour-card-image {
    position: relative;
    width: 280px;
    height: 200px;
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.tour-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.tour-type-badge {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    padding: var(--space-2) var(--space-4);
    background: linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-amber-light) 100%);
    color: white;
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-sm);
}

.tour-card-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}

.tour-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
}

.tour-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    margin: 0;
}

.tour-duration {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: white;
    border-radius: var(--radius-md);
    color: var(--primary-teal);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    white-space: nowrap;
}

.tour-duration svg {
    flex-shrink: 0;
}

.tour-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
}

.meta-badge {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: white;
    border-radius: var(--radius-md);
    color: var(--neutral-700);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
}

.meta-badge svg {
    color: var(--primary-teal);
    flex-shrink: 0;
}

.tour-description {
    color: var(--neutral-600);
    font-size: var(--text-sm);
    line-height: 1.7;
    margin: 0;
}

/* Responsive */
/* Continue Section */
.continue-section {
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 2px solid var(--neutral-200);
    display: flex;
    justify-content: flex-end;
}

.continue-button {
    padding: var(--space-4) var(--space-8);
    background: linear-gradient(135deg, var(--accent-amber) 0%, #ea580c 100%);
    color: white;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.continue-button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.continue-button:active {
    transform: translateY(0);
}

@media (max-width: 1024px) {
    .tour-card {
        grid-template-columns: 240px 1fr;
    }
    
    .tour-card-image {
        width: 240px;
        height: 180px;
    }
}

@media (max-width: 768px) {
    .maps-container {
        padding: var(--space-6) var(--space-4);
    }
    
    .maps-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
    }
    
    .header-icon {
        width: 48px;
        height: 48px;
    }
    
    .header-title {
        font-size: var(--text-2xl);
    }
    
    .tour-map {
        height: 350px;
    }
    
    .tour-details-section {
        padding: var(--space-6) var(--space-4);
    }
    
    .tour-card {
        grid-template-columns: 1fr;
        gap: var(--space-4);
    }
    
    .tour-card-image {
        width: 100%;
        height: 220px;
    }
    
    .tour-card-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .section-header h2 {
        font-size: var(--text-xl);
    }
}
</style>
