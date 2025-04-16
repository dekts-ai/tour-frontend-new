<template>
    <section v-if="iframeStatus" class="tabs-section">
        <NavBtns @navigatetotab="navigateToTab" :combo-ids="comboIds" :tabs="tabs" />
    </section>
</template>

<script>
import NavBtns from './../Nav/NavBtns.vue';

export default {
    name: 'TabsSection',
    components: {
        NavBtns
    },
    props: ['iframeStatus', 'comboIds', 'tabs', 'navigateToTab']
};
</script>