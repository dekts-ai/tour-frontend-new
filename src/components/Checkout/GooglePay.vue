<template>
    <div class="example">
        <div ref="googlePay"></div>
    </div>
</template>

<script>
export default {
    name: "GooglePay",
    props: {
        totalPrice: {
            type: String,
            default: "0.00",
            required: true,
        },
    },
    data() {
        return {
            paymentsClient: null,
            config: {
                baseRequest: {
                    apiVersion: 2,
                    apiVersionMinor: 0,
                },
                tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                        gateway: process.env.VUE_APP_GOOGLE_PAY_GATEWAY,
                        gatewayMerchantId: process.env.VUE_APP_GOOGLE_PAY_GATEWAY_MERCHANT_ID,
                    },
                },
                allowedPaymentMethods: [
                    {
                        type: "CARD",
                        parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                                gateway: process.env.VUE_APP_GOOGLE_PAY_GATEWAY,
                                gatewayMerchantId: process.env.VUE_APP_GOOGLE_PAY_GATEWAY_MERCHANT_ID,
                            },
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        setTimeout(this.loadGooglePay, 2000);
    },
    methods: {
        async loadGooglePay() {
            try {
                this.paymentsClient = new google.payments.api.PaymentsClient({
                    environment: process.env.VUE_APP_GOOGLE_PAY_ENVIRONMENT,
                });

                const request = this.getGoogleIsReadyToPayRequest();
                console.log("isReadyToPay Request:", request);

                const response = await this.paymentsClient.isReadyToPay(request);
                console.log("isReadyToPay Response:", response);

                if (response.result) {
                    this.addGooglePayButton();
                    this.$emit("loaded", response.result);
                }
            } catch (error) {
                console.error("Google Pay Load Error:", error);
                this.$emit("loadedError", error);
            }
        },
        getGoogleIsReadyToPayRequest() {
            return JSON.parse(JSON.stringify({
                ...this.config.baseRequest,
                allowedPaymentMethods: this.config.allowedPaymentMethods,
            }));
        },
        getGooglePaymentDataRequest() {
            return JSON.parse(JSON.stringify({
                ...this.config.baseRequest,
                allowedPaymentMethods: this.config.allowedPaymentMethods,
                transactionInfo: this.getGoogleTransactionInfo(),
                merchantInfo: {
                    merchantId: process.env.VUE_APP_GOOGLE_PAY_MERCHANT_ID,
                    merchantName: process.env.VUE_APP_GOOGLE_PAY_MERCHANT_NAME,
                },
            }));
        },
        addGooglePayButton() {
            if (!this.$refs.googlePay) {
                console.error("Google Pay ref is not available");
                return;
            }

            try {
                const button = this.paymentsClient.createButton({
                    onClick: this.onGooglePaymentButtonClicked,
                });

                this.$refs.googlePay.innerHTML = ""; // Clear previous button if any
                this.$refs.googlePay.appendChild(button);
            } catch (error) {
                console.error("Error Creating Google Pay Button:", error);
            }
        },
        getGoogleTransactionInfo() {
            return {
                countryCode: "US",
                currencyCode: "USD",
                totalPriceLabel: "Total",
                totalPriceStatus: "FINAL",
                totalPrice: this.totalPrice,
            };
        },
        async onGooglePaymentButtonClicked() {
            try {
                const paymentDataRequest = this.getGooglePaymentDataRequest();
                console.log("Payment Request Data:", paymentDataRequest);

                const paymentData = await this.paymentsClient.loadPaymentData(paymentDataRequest);
                this.processPayment(paymentData);
            } catch (error) {
                console.error("Payment Error:", error);
                this.$emit("paymentError", error);
            }
        },
        processPayment(paymentData) {
            console.log("Payment Success:", paymentData);
            const paymentToken = paymentData?.paymentMethodData?.tokenizationData?.token;

            if (paymentToken) {
                this.$emit("paymentSuccess", paymentToken);
            } else {
                console.error("Payment Token Missing:", paymentData);
                this.$emit("paymentError", "Payment Token Missing");
            }
        },
    },
};
</script>
