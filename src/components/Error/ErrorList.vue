<template>
    <div v-if="errors.length" class="error-container">
        <p class="error-title">Please correct the following error(s):</p>
        <ul class="error-list">
            <li v-for="error in errors" :key="error" class="error-item">
                {{ error }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ErrorList',
    props: {
        errors: { type: Array, default: () => [] }
    }
};
</script>

<style scoped>
.error-container {
    background: linear-gradient(135deg, rgba(224, 120, 86, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
    border-left: 4px solid var(--primary-terracotta);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    margin-bottom: var(--space-4);
}

.error-title {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    color: var(--primary-terracotta);
    margin: 0 0 var(--space-2) 0;
}

.error-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.error-item {
    color: var(--neutral-900);
    font-size: var(--text-sm);
    padding: var(--space-1) 0;
}

.error-item:before {
    content: "• ";
    margin-right: var(--space-2);
    color: var(--primary-terracotta);
}
</style>