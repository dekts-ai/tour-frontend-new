<template>
    <section class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>

    <section class="inner-content-section">
        <div :class="['no-container']">
            <div class="background-color-sec">
                <div class="row">
                    <div class="col-12">
                        <div :class="['row payment-row iframe-row']">
                            <div class="col-12">
                                <div class="tourlist-packages-wrap">
                                    <GMapMap :center="center" ref="mapRef" :zoom="10" class="tour-map"
                                        :options="mapOptions" data-testid="tour-map">
                                        <GMapMarker v-for="(marker, index) in markers" :key="index"
                                            :ref="`marker${index}`" :position="marker.position" :clickable="true"
                                            :icon="marker.icon" :title="marker.title" @click="onMarkerClick(marker)"
                                            :data-testid="`marker-${index}`" />
                                    </GMapMap>

                                    <div class="tour-details-wrap">
                                        <div class="tour-details-title">Your Day:</div>
                                        <div v-for="item in cartItem" :key="item.tour_slot_id"
                                            class="d-lg-flex justify-content-between border-bottom pb-4 mb-4 w-100"
                                            :data-testid="`cart-item-${item.tour_slot_id}`">
                                            <div class="details-box mb-3 mb-lg-0">
                                                <div
                                                    class="title-wrap d-flex justify-content-between align-items-center">
                                                    <div class="tour-title">{{ item.package_name }}</div>
                                                    <div class="tour-time">
                                                        <span v-if="item.package_has_slots">{{ item.duration }}</span>
                                                        {{ item.type }}
                                                    </div>
                                                </div>
                                                <p class="date-time">
                                                    {{ dateFormat(item.date) }}
                                                    <span v-if="item.package_has_slots">@ {{ item.time_date }}</span>
                                                </p>
                                                <p class="details-text">{{ item.long_description }}</p>
                                            </div>
                                            <div class="tourselected-image">
                                                <img :src="item.package_image" :alt="item.package_name" />
                                            </div>
                                        </div>
                                    </div>
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
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import NavBtns from './Nav/NavBtns.vue';

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
            tabs: 4,
            center: { lat: 0, lng: 0 },
            markers: [],
            mapOptions: {
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
                disableDefaultUi: false
            }
        };
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
                ? format(new Date(this.$store.state.date), 'yyyy-MM-dd')
                : format(new Date(), 'yyyy-MM-dd');
            this.tenantId = this.$store.state.tenantId || null;
            this.tourOperatorId = this.$store.state.tourOperatorId || 0;
            this.iframeStatus = this.$store.state.iframeStatus ?? false;
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
            try {
                const parsedDate = new Date(date);
                // this.$store.dispatch('storeDate', parsedDate);
                return parsedDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch {
                return 'Invalid Date';
            }
        },
        navigateToTab(tab, destination) {
            if ([1, 2, 3, 5].includes(tab)) {
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
        }
    }
};
</script>

<style scoped>
.tour-map {
    width: 100%;
    height: 400px;
}
</style>