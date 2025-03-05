<template>
    <section :class="[(iframeStatus == false) ? 'noiframe-inner-banner' : 'iframe-inner-banner', '']" class="banner-section"
        v-bind:style="{ 'background-image': 'url(' + banner + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>

    <section class="inner-content-section" style="background: none !important;">
        <div :class="[(iframeStatus == false) ? 'container' : 'no-container', '']">
            <div class="background-color-sec" style="background: #e7e7e7;">
                
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            banner: "",
            iframeStatus: true,
            loading: true,
        };
    },
    async mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentIntentId = urlParams.get("payment_intent");

        if (!paymentIntentId) {
            this.loading = false;
            Swal.fire({
                title: "Error!",
                html: "Invalid Payment Session",
                width: '40vw',
                icon: "error"
            });
            return;
        } else {
            Swal.fire({
                title: "Info!",
                html: "Processing payment...",
                width: '40vw',
                icon: "info"
            });
        }

        try {
            const response = await axios.post("/verify-payment", {
                paymentIntentId: paymentIntentId,
            });

            if (response.data.status === "succeeded") {
                Swal.fire({
                    title: "Success!",
                    html: "Payment successful! 🎉",
                    width: '40vw',
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    html: "Payment failed. Please try again.",
                    width: '40vw',
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                html: "Error verifying payment.",
                width: '40vw',
                icon: "error"
            });
        } finally {
            this.loading = false;
        }
    }
};
</script>
