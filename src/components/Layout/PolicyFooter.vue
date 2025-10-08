<template>
    <div class="policy-footer">
        <p class="policy-text">
            By booking you also agree to our
            <a href="https://nativeamericantours.com/privacy-policy.html" class="policy-link">policies</a>,
            and Stripe
            <a href="https://stripe.com/legal/end-users" class="policy-link">terms of service</a>.
        </p>
    </div>
</template>

<script>
export default {
    name: 'PolicyFooter'
};
</script>

<style scoped>
.policy-footer {
    margin-top: var(--space-4);
}

.policy-text {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    text-align: center;
    margin: 0;
}

.policy-link {
    color: var(--primary-teal);
    text-decoration: none;
    font-weight: var(--font-medium);
    transition: color var(--transition-base);
}

.policy-link:hover {
    color: var(--primary-teal-light);
    text-decoration: underline;
}
</style>