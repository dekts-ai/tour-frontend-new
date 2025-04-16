<template>
    <div v-if="!iframeStatus" class="row bradcumb-row">
        <div class="col-12">
            <div class="bradcumb-main">
                <ul>
                    <li class="home">
                        <a :href="homeUrl" :data-testid="`home-link-${packageId || 'default'}`">
                            Home
                        </a>
                    </li>
                    <li>{{ tourPackageName }}</li>
                </ul>
                <div class="cloasedbtn">
                    <img src="../../assets/images/cross.png" alt="Close" />
                </div>
            </div>
            <hr class="sep1" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props: ['iframeStatus', 'homeUrl', 'packageId', 'tourPackageName']
};
</script>