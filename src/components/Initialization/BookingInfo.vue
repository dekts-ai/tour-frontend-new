<template>
    <div v-if="!iframeStatus" class="row booking-row">
        <div class="col-lg-5 col-md-12">
            <div class="booking">
                <h2>Book Online</h2>
                <div class="confirmation">
                    <img src="../../assets/images/confirmation.png" alt="Confirmation" />
                    <p>Get Instant Confirmation</p>
                </div>
            </div>
        </div>
        <div class="col-lg-7 col-md-12 text-center text-lg-end text-md-center text-sm-center">
            <div class="info">
                <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top" title="Secured">
                    Secured
                </button>
                <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top"
                    title="Health & Safety">
                    Health & Safety
                </button>
                <button @click="navigateToTab(5, 'Checkout')" class="btn btn-warning" aria-label="Checkout">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout
                </button>
                <button @click="navigateToTab(1, 'Index')" class="btn btn-primary mt-2" aria-label="Home">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i> Home
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookingInfo',
    props: ['iframeStatus', 'navigateToTab']
};
</script>