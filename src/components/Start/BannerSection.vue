<template>
    <section :class="[iframeStatus ? 'iframe-inner-banner' : 'noiframe-inner-banner', 'banner-section']"
        :style="{ 'background-image': `url(${banner})` }">
        <div class="container">
            <div class="row">
                <div class="col-12"></div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BannerSection',
    props: ['banner', 'iframeStatus']
};
</script>

<style scoped>
/* .banner-section { */
    /* Add any specific banner styles if needed */
/* } */
</style>