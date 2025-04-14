<template>
    <div class="tourselected-packages-item remaining-packages-list"
        v-if="!checkPackageIds.includes(tourPackage.package_id)">
        <div class="tourselected-inner-wrap">
            <div class="tourselected-inner">
                <div class="tourselected-detail">
                    <div class="tourselected-image">
                        <img :src="tourPackage.FrontendPackageImage" :alt="tourPackage.package_name">
                    </div>
                    <div class="tourselected-title-wrap">
                        <div class="tourselected-title">{{ tourPackage.package_name }}</div>
                        <div class="tourselected-title-top">{{ tourPackage.duration }} {{ tourPackage.type }}</div>
                        <div class="what-bring-wrap">
                            <p>{{ tourPackage.short_description }}</p>
                        </div>
                        <div class="tourselected-action-btn">
                            <button class="action-btn action-btn-addmore"
                                @click="$emit('book-now', { tenant_id: tourPackage.tenant_id, tour_operator_id: tourPackage.tour_operator_id, package_id: tourPackage.package_id })">
                                <span>+ Add Package</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AvailablePackage',
    props: ['tourPackage', 'checkPackageIds'],
    emits: ['book-now'],
};
</script>
