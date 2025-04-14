<template>
    <div class="tourselected-packages-item">
        <div class="tourselected-inner-wrap">
            <div class="tourselected-inner">
                <div class="tourselected-detail">
                    <div class="tourselected-image">
                        <img :src="item.package_image || ''" :alt="`${item.package_name || 'Package'} image`">
                    </div>
                    <div class="tourselected-title-wrap">
                        <div class="d-flex align-items-start justify-content-between">
                            <div class="tourselected-title">{{ item.package_name || 'Unnamed Package' }}</div>
                            <div class="tourselected-title">
                                <span class="duration-text">{{ item.duration || '' }} {{ item.type || '' }}</span>
                            </div>
                        </div>
                        <div class="tourselected-title-top">
                            {{ dateFormat(item.date) }}
                            <span v-if="item.package_has_slots">@ {{ item.time_date || '' }}</span>
                        </div>
                        <div class="tourselected-title-top">{{ item.short_description || '' }}</div>
                        <div class="what-bring-wrap-added" v-if="item?.things_to_bring?.length">
                            <div class="what-bring-title">What to bring</div>
                            <ul>
                                <li v-for="bring in item?.things_to_bring" :key="bring">{{ bring }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tourselected-totalcost">
            <div class="tourselected-group-wrap">
                <div class="tourselected-group-small-title protanopia">Guests:</div>
                <div class="tourselected-group-people">
                    <div
                        v-if="item.people_group && typeof item.people_group === 'object' && Object.keys(item.people_group).length">
                        <div v-for="(count, groupType) in item.people_group" :key="groupType"
                            class="tourselected-people">
                            <div class="tourselected-people-icon">
                                <svg width="8" height="11" viewBox="0 0 8 11" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.07976 5.3184C5.3978 5.3184 6.46628 4.24991 6.46628 2.93187C6.46628 1.61383 5.3978 0.545349 4.07976 0.545349C2.76172 0.545349 1.69324 1.61383 1.69324 2.93187C1.69324 4.24991 2.76172 5.3184 4.07976 5.3184Z"
                                        fill="#4C76B2" />
                                    <path
                                        d="M5.6879 6.11444H2.47167C1.94894 6.11507 1.44781 6.323 1.07819 6.69263C0.708563 7.06225 0.500632 7.56338 0.5 8.08611L0.5 10.092H7.65957V8.08611C7.65894 7.56338 7.45101 7.06225 7.08139 6.69263C6.71176 6.323 6.21063 6.11507 5.6879 6.11444Z"
                                        fill="#4C76B2" />
                                </svg>
                            </div>
                            <div class="tourselected-people-title">{{ item.rate_group?.[groupType] || groupType }}</div>
                            <div class="tourselected-people-count">
                                <input type="text" name="guest-count" :disabled="true" :value="count">
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        No guests selected
                    </div>
                </div>
            </div>
            <div class="tourselected-costcount-small-title protanopia">Tour cost:</div>
            <div class="tourselected-costcount-subitem">
                <div class="tourselected-costcount-subitem-title">Subtotal:</div>
                <div class="tourselected-costcount-subitem-cost">${{ Number(item.subtotal || 0).toFixed(2) }}</div>
            </div>
            <div class="tourselected-costcount-subitem" v-if="item?.discount2_value > 0">
                <div class="tourselected-costcount-subitem-title">Discount:</div>
                <div class="tourselected-costcount-subitem-cost">
                    <span v-if="item?.discount2_percentage">({{ item?.discount2_percentage }}%)</span>
                    ${{ Number(item?.discount2_value || 0).toFixed(2) }}
                </div>
            </div>
            <div v-if="item?.custom_fields?.length && isPriceInfoEnabled(item?.custom_fields)">
                <div class="tourselected-costcount-small-title protanopia">Add-ons:</div>
                <div class="max-height-200">
                    <div v-for="(option, k) in item.custom_fields.filter(f => f.priceInfo?.enabled)"
                        :key="`custom-field-${k}`" class="tourselected-costcount-subitem">
                        <div class="tourselected-costcount-subitem-title">{{ option.name }}</div>
                        <div class="tourselected-costcount-subitem-cost">${{ Number(option.priceInfo?.price ||
                            0).toFixed(2) }}</div>
                    </div>
                </div>
            </div>
            <div class="tourselected-costcount-subitem">
                <div class="tourselected-costcount-subitem-title">Booking Fees:</div>
                <div class="tourselected-costcount-subitem-cost">${{ (Number(item.fees || 0) + Number(item.addons_fee ||
                    0)).toFixed(2) }}</div>
            </div>
            <div class="tourselected-costcount-total">
                <div class="tourselected-costcount-total-title">Tour Cost:</div>
                <div class="tourselected-costcount-total-cost">${{ (Number(item.total || 0) + Number(item.addons_fee ||
                    0) + Number(item.addons_total || 0)).toFixed(2) }}</div>
            </div>
            <div class="tourselected-edit-wrap">
                <div class="tourselected-action-wrap">
                    <div class="tourselected-action-btn">
                        <a class="action-btn action-btn-edit" @click="$emit('edit-package', item)">Edit</a>
                    </div>
                    <div v-if="firstPackageId !== item.package_id" class="tourselected-action-btn">
                        <a class="action-btn action-btn-delete" @click="$emit('remove-from-cart', item)">Delete</a>
                    </div>
                    <div class="tourselected-action-btn">
                        <a class="action-btn action-btn-checkout"
                            @click="$emit('tab-change', { tab: 5, destination: 'Checkout' })">
                            Checkout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CartItem',
    props: ['item', 'firstPackageId'],
    emits: ['edit-package', 'remove-from-cart', 'tab-change'],
    mounted() {
        // Debug: Log people_group to inspect its structure
        console.log('CartItem item:', this.item);
        console.log('CartItem people_group:', this.item.people_group);
    },
    methods: {
        dateFormat(date) {
            if (!date) return '';
            const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('en-US', options);
        },
        isPriceInfoEnabled(customFields) {
            return customFields?.some(item => item.priceInfo?.enabled === true) || false;
        },
    },
};
</script>

<style scoped>
.duration-text {
    color: #004085;
}

.tourselected-people {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.tourselected-people-title {
    text-transform: capitalize;
}

.tourselected-group-people {
    margin-top: 0.5rem;
}
</style>