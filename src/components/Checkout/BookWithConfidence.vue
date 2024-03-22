<template>
        <div>
        <div class="col-lg-5 col-md-12">
            <div class="booking">
                <h2>Book Online</h2>
                <div class="confirmation">
                    <img src="../../assets/images/confirmation.png" />
                    <p>Get Instant Confirmation</p>
                </div>
            </div>
        </div>
        <div class="col-lg-7 col-md-12 text-center text-lg-end text-md-center text-sm-center">
            <div class="info">
                <button class="tooltipbtn btn-info" data-toggle="tooltip" data-placement="top">
                    Secured
                </button>
                <button class="tooltipbtn btn-danger" data-toggle="tooltip" data-placement="top">
                    Health & Safety
                </button>
                <button @click="toTab(1, 'Index')" class="btn btn-primary mt-2"><i class="fa fa-arrow-left" aria-hidden="true"></i> Home </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "BookWithConfidence",
    methods: {
        toTab(tab, name){
           this.$emit("navigatetotab", tab, name);
        }
    }
}

</script>