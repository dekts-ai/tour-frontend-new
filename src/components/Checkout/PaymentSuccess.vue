<template>
    <section class="inner-content-section" style="background: none !important;">
        <div :class="['no-container', '']">
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
            // Step 1: Verify the payment
            const verifyResponse = await axios.post("/verify-payment", {
                paymentIntentId: paymentIntentId,
            });

            if (verifyResponse.data.status !== "succeeded") {
                Swal.fire({
                    title: "Error!",
                    html: "Payment failed. Please try again.",
                    width: '40vw',
                    icon: "error"
                });
                return;
            }

            // Step 2: Retrieve stored data from Vuex store
            const customer = this.$store.state.customer;
            const cartItem = this.$store.state.cartItem;

            if (!customer || !cartItem || !Object.keys(cartItem).length) {
                Swal.fire({
                    title: "Error!",
                    html: "Booking data is missing. Please try again.",
                    width: '40vw',
                    icon: "error"
                });
                return;
            }

            // Step 3: Calculate totals from cartItem
            let globalTotal = {
                subtotal: 0,
                discount: 0,
                fees: 0,
                addons_total: 0,
                addons_fee: 0,
                total: 0,
            };

            for (const key in cartItem) {
                globalTotal.subtotal += Number(cartItem[key].subtotal) || 0;
                globalTotal.discount += Number(cartItem[key].discount2_value) || 0;
                globalTotal.fees += Number(cartItem[key].fees) || 0;
                globalTotal.addons_total += Number(cartItem[key].addons_total) || 0;
                globalTotal.addons_fee += Number(cartItem[key].addons_fee) || 0;
                globalTotal.total += Number(cartItem[key].total) || 0;
            }

            // Step 4: Prepare payload for booking creation
            const payload = {
                items: cartItem,
                name: customer.name,
                email: customer.email,
                phone_number: customer.phone_number,
                comment: customer.comment,
                getemailupdates: customer.getemailupdates,
                cancellations_policy: customer.cancellations_policy,
                payment_intent_id: paymentIntentId,
                subtotal: globalTotal.subtotal,
                discount: globalTotal.discount,
                fees: globalTotal.fees,
                addons_total: globalTotal.addons_total,
                addons_fee: globalTotal.addons_fee,
                total: globalTotal.total
            };

            // Step 5: Create booking
            const bookingResponse = await axios.post("/package-booking-tour", payload);

            if (bookingResponse.data.success === "false") {
                Swal.fire({
                    title: "Error!",
                    html: bookingResponse.data.message || "Failed to create booking.",
                    width: '40vw',
                    icon: "error"
                });
                return;
            }

            // Step 6: Handle successful booking
            this.$store.dispatch('storeBookingIds', bookingResponse.data.bookingIds);

            Swal.fire({
                title: "Success!",
                html: "Payment and booking successful! 🎉",
                width: '40vw',
                icon: "success"
            });

            // Step 7: Redirect to thank you page
            this.$router.push("/thankyou");

        } catch (error) {
            console.error("Error in payment or booking process:", error);
            Swal.fire({
                title: "Error!",
                html: error.response?.data?.message || "An error occurred during payment or booking.",
                width: '40vw',
                icon: "error"
            });
        } finally {
            this.loading = false;
        }
    }
};
</script>
