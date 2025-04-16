<template>
    <section v-for="tourPackageData in tourPackageData" :key="tourPackageData.package_id"
        :class="{ 'noiframe-inner-banner': !iframeStatus, 'iframe-inner-banner': iframeStatus }" class="banner-section"
        :style="{ backgroundImage: `url(${tourPackageData.HeaderOne})` }">
        <div class="container">
            <div class="row"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BannerSection',
    props: ['tourPackageData', 'iframeStatus']
};
</script>