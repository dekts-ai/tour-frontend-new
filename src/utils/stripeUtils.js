export const stripeCardStyle = {
    style: {
        base: {
            color: "#464646",
            fontFamily: 'Inter, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "14px",
            "::placeholder": {
                color: "#32325d"
            },
            backgroundColor: 'transparent',
            lineHeight: '26px'
        },
        invalid: {
            fontFamily: 'Inter, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

export const stripeEleStyle = {
    fonts: [{
        cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    }]
}