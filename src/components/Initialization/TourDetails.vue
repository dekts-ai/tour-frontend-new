<template>
    <div>
        <div v-for="tourPackageData in tourPackageData" :key="tourPackageData.package_id" class="row permit-tax">
            <div class="col-lg-4 col-md-12">
                <div class="images-sec">
                    <img :src="tourPackageData.HeaderImage" :alt="tourPackageData.package_name"
                        :data-testid="`header-image-${tourPackageData.package_id}`" />
                </div>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="content-sec">
                    <h2>{{ tourPackageData.package_name }}</h2>
                    <p>{{ tourPackageData.short_description }}</p>
                    <p v-if="form?.tenant_id === 'kens'">{{ tourPackageData.long_description }}</p>
                </div>
            </div>
        </div>

        <div v-if="form?.tenant_id !== 'kens'" v-for="tourPackageData in tourPackageData"
            :key="`desc-${tourPackageData.package_id}`" class="row hiking-tour-row">
            <div class="col-lg-4 col-md-12">
                <div class="images-sec">
                    <img :src="tourPackageData.DescriptionImage" :alt="tourPackageData.package_name"
                        :data-testid="`desc-image-${tourPackageData.package_id}`" />
                </div>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="content-sec">
                    <h2>{{ tourPackageData.package_name }}</h2>
                    <p>{{ tourPackageData.long_description }}</p>
                </div>
            </div>
        </div>

        <div class="row tour-start-row">
            <div v-for="tourPackageData in tourPackageData" :key="`duration-${tourPackageData.package_id}`"
                class="col-12 col-sm-12 col-md-6 duration">
                <h2>Duration</h2>
                <button class="btn-info">{{ tourPackageData.duration }}</button>
            </div>
            <div class="col-12 col-sm-12 col-md-6 whattobring">
                <h2>What to Bring</h2>
                <div class="bring-group">
                    <button v-for="(item, key) in thingsToBring" :key="key" class="btn-info">
                        {{ item }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TourDetails',
    props: ['tourPackageData', 'form', 'thingsToBring']
};
</script>