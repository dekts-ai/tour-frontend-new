<template>
    <div class="row hotel-list-item-wrap">
        <div v-if="hotels.length" class="p-1 pb-2 desired-pickup-location">
            Please select your desired pickup location:
        </div>
        <div v-for="hotel in hotels" :key="hotel.id" class="col-12 col-md-6">
            <div class="hotel-list-item"
                :class="{ flip: flippedHotelId === hotel.id, checked: selectedHotelId === hotel.id }"
                @click.prevent="selectHotel(hotel)" @mouseover="flip(hotel.id)" @mouseleave="unflip">
                <div class="front">
                    <label :for="`hotel-list-item-${hotel.id}`" />
                    <div class="hotel-list-item-img">
                        <img :src="hotel.image" :alt="hotel.name" loading="lazy">
                    </div>
                    <input :id="`hotel-list-item-${hotel.id}`" type="radio" name="hotel_id"
                        :checked="selectedHotelId === hotel.id" disabled>
                    <div class="hotel-list-item-title">{{ hotel.name }}</div>
                </div>
                <div class="back">
                    <label :for="`hotel-list-item-${hotel.id}`" />
                    <div class="hotel-list-item-address">{{ hotel.address }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pickup',
    props: {
        hotels: {
            type: Array,
            required: true,
            default: () => []
        },
        form: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            flippedHotelId: null,
            selectedHotelId: null // Local state to track selection
        };
    },
    watch: {
        selectedHotelId(newId) {
            // Sync form with local state
            if (newId === null) {
                Object.assign(this.form, {
                    hotel_id: null,
                    hotel_name: '',
                    hotel_image: '',
                    hotel_address: ''
                });
                this.$store.dispatch('storeHotelId', null);
            } else {
                const hotel = this.hotels.find(h => h.id === newId);
                if (hotel) {
                    Object.assign(this.form, {
                        hotel_id: hotel.id,
                        hotel_name: hotel.name,
                        hotel_image: hotel.image,
                        hotel_address: hotel.address
                    });
                    this.$store.dispatch('storeHotelId', hotel.id);
                }
            }
        },
        'form.hotel_id': {
            immediate: true,
            handler(newId) {
                // Sync local state with form if changed externally
                this.selectedHotelId = newId;
            }
        }
    },
    methods: {
        selectHotel(hotel) {
            const { id } = hotel;
            // Toggle selection: deselect if same hotel, select if different
            this.selectedHotelId = this.selectedHotelId === id ? null : id;
        },
        flip(hotelId) {
            this.flippedHotelId = hotelId;
        },
        unflip() {
            this.flippedHotelId = null;
        }
    }
};
</script>

<style scoped>
.hotel-list-item.checked {
    background-color: #28a745;
    /* Green background for selected hotel */
    color: white;
    /* Adjust text color for contrast */
}
</style>