<template>
  <div class="container">
        <div class="row">
            <div class="col-12" style="background-color: #fff; border-radius: 5px; padding: 5px;">
                <h1>Payment</h1>
                <form id="payment-form" @submit.prevent="onFormSubmit">
                    <PaymentMessages :messages="messages" />
                    <div id="link-authentication-element"> </div>
                    <div id="payment-element"> </div>
                    <hr />
                    <button class="btn btn-md btn-primary" id="submit" :disabled="loading">Pay now</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * this script is based off the stripe payment method form
 *  https://stripe.com/docs/payments/payment-element
 */

import { loadStripe } from '@stripe/stripe-js';
import PaymentMessages from './PaymentMessages';
import axios from 'axios';

export default {
    name: "PaymentForm",
    props: [],

    components:{
        PaymentMessages
    },

    async mounted(){
        this.messages.push('Mouting');
        this.messages.push(`Return URL: ${window.location.origin}/success`);
        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
        this.messages.push('Stripe loading');
        this.createPaymentIntent();
    },

    data() {
        return {
            stripe: null,
            messages: [],
            loading: true,
            elements: null,
            payment_intent_url: 'https://localhost:5001/local/stripe/payment/intent/create/1000',
            
        }
    },

  methods:{
   async createPaymentIntent(){

        

        try{
            const headers = {'Accept': '*/*', 'x-api-key': 'd41d8cd98f00b204e9800998ecf8427e'};
            const resp =  await axios.post(this.payment_intent_url, {}, { headers });
            console.log(resp);
            const { client_secret } = resp.data;
            console.log(client_secret);
            this.renderStripeForm(client_secret);
            
        }catch(err){
            this.messages.push(err.message);
            return false;
        }

    },


    renderStripeForm(client_secret){
        const clientSecret = client_secret; //'pi_3OIEXMFWb9Y3fHFE2icNdkXB_secret_TnPvcpHlx7enXUsLxOf82bMs7';
        const paymentOptions = {
            paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
            business: { name: 'Native American Tours' },
            wallets: { 
                applePay: 'auto',
                googlePay:'auto'
            },
            layout: "tabs" }
        const appearance = {  theme: 'flat'  };
        this.messages.push(`Client secret returned.`);
        this.elements = this.stripe.elements({clientSecret, appearance});
        const paymentElement = this.elements.create('payment', paymentOptions );
        paymentElement.mount("#payment-element");
        const linkAuthenticationElement = this.elements.create("linkAuthentication");
        linkAuthenticationElement.mount("#link-authentication-element");
        this.loading = false;
    },

    async onFormSubmit(){
        
        if (this.loading === true) { return; }

        this.loading = true;
        let elements = this.elements;
        const { error } = await this.stripe.confirmPayment({
            elements,
            confirmParams: {
            return_url: `${window.location.origin}/success`
            }
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            this.messages.push(error.message);
        } else {
            this.messages.push("An unexpected error occured.");
        }

        this.loading = false;
    }

  }
};
</script>