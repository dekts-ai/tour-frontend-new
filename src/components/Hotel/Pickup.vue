<template>
    <div class="row hotel-list-item-wrap">
        <div v-if="hotels.length" class="p-1 pb-2 desired-pickup-location">
            Please select your desired pickup location:
        </div>
        <div class="col-12 col-md-6"
            v-for="hotel in hotels"
            :key="hotel.id">

            <div class="hotel-list-item"
                @click="selectedHotel(hotel.id)"
                @mouseover="flip(hotel.id)"
                @mouseout="unflip(hotel.id)"
                :class="{ 'flip': hotel.id === flippedHotelId, 'checked': hotel.id === form.hotel_id }">

                <div class="front">
                    <label :for="'hotel-list-item' + hotel.id "></label>
                    <div class="hotel-list-item-img"><img :src="hotel.image" :alt="hotel.name"></div>
                    <input :id="'hotel-list-item' + hotel.id " type="radio" name="hotel_id">
                    <div class="hotel-list-item-title">{{ hotel.name }}</div>
                </div>

                <div class="back">
                    <label :for="'hotel-list-item' + hotel.id "></label>
                    <div class="hotel-list-item-address">{{ hotel.address }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pickup",
    props: ["hotels", "form"],
    data: () => {
        return {
            flippedHotelId: null,
        }
    },
    methods: {
        selectedHotel: function (hotelId) {
            this.$store.dispatch('storeHotelId', hotelId)
            this.form.hotel_id = hotelId;
            if (this.hotels.length) {
                this.hotels.forEach(hotel => {
                    if (hotel.id == this.form.hotel_id) {
                        this.form.hotel_name = hotel.name;
                        this.form.hotel_image = hotel.image;
                        this.form.hotel_address = hotel.address;
                    }
                });
            }
        },
        flip(hotelId) {
            this.flippedHotelId = hotelId;
        },
        unflip(hotelId) {
            this.flippedHotelId = null;
        },
    }
}
</script>
