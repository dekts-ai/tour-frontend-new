<template>
    <div>
        <h1>Success</h1>
        <p>Payment completed successfully, please wait while we process your booking... </p>
        <p v-if="payment_intent"> {{ payment_intent }} </p>
        <hr />
    </div>
    
</template>


<script>
import { loadStripe } from '@stripe/stripe-js';
export default {

    async mounted(){
        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
        this.payment_intent =  this.$route.query.payment_intent_client_secret;
        this.completeBooking()
    },

    created(){
       
    },

    components:{

    },

    name:"PaymentSuccess",

    data(){
        return {
            stripe: null,
            payment_intent: null,
        };
    },

    methods:{
        async completeBooking(){
            const {error, paymentIntent} = await this.stripe.retrievePaymentIntent(this.payment_intent);
            console.log(paymentIntent);
        }
    },

};


</script>