<template>

<div class="total-cost-wrap third">
    <div class="title-wrap">
        <div class="title mb-0">Total Cost</div>
    </div>
    <div class="other-details-wrap d-flex justify-content-between align-items-center mt-0">
        <div class="title">Ticket Cost</div>
        <div class="amount">${{ Number(subtotal).toFixed(2) }}</div>	
    </div>
    <div class="other-details-wrap d-flex justify-content-between align-items-center" v-if="discount > 0">
        <div class="title">Discount</div>
        <div class="amount">${{ Number(discount).toFixed(2) }}</div>	
    </div>
    <!-- <div class="other-details-wrap d-flex justify-content-between align-items-center">
        <div class="title">Subtotal</div>
        <div class="amount">$132.60</div>	
    </div> -->
    <div class="other-details-wrap d-flex justify-content-between align-items-center">
        <div class="title">Booking Fees</div>
        <div class="amount">${{ Number(fees).toFixed(2) }}</div>	
    </div>
    <div class="other-details-wrap d-flex justify-content-between align-items-center last">
        <div class="title"><strong>Total Cost</strong></div>
        <div class="amount"><strong>${{ Number(total).toFixed(2) }}</strong></div>	
    </div>


</div>


</template>


<script>

export default {
    name: "ItemTotalSummary",
    props: ["subtotal", "total", "fees", "discount"],
    data:()=>{
        return {}
    },
}
</script>