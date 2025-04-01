<template>
    <div class="row align-items-center">
        <div class="col-lg-5 col-md-12">
            <div class="booking">
                <h2>Book Online</h2>
                <div class="confirmation d-flex align-items-center gap-2">
                    <img src="../../assets/images/confirmation.png" alt="Confirmation Icon" />
                    <p class="mb-0">Get Instant Confirmation</p>
                </div>
            </div>
        </div>
        <div class="col-lg-7 col-md-12 text-center text-lg-end">
            <div class="info">
                <span class="badge bg-info me-2" title="Secured Payment">Secured</span>
                <span class="badge bg-danger me-2" title="Health & Safety Measures">Health & Safety</span>
                <button class="btn btn-primary mt-2" @click="navigateToHome">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i> Home
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookWithConfidence',
    methods: {
        navigateToHome() {
            this.$emit('navigatetotab', 1, 'Index');
        }
    }
};
</script>