<template>
    <section v-if="iframeStatus" class="tabs-section">
        <div class="no-container padding-sec">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex align-items-start justify-content-between">
                        <!-- Mobile Dropdown -->
                        <div class="dropdown d-md-none">
                            <a class="hamburger-menu dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <button :class="['tabs tab1 dropdown-item', { active: tabs === 1 }]"
                                        @click="$emit('tab-change', { tab: 1, destination: 'Tours' })">
                                        Tours
                                    </button>
                                </li>
                                <li>
                                    <button :class="['tabs tab2 dropdown-item', { active: tabs === 2 }]"
                                        @click="$emit('tab-change', { tab: 2, destination: 'Init' })">
                                        Schedule
                                    </button>
                                </li>
                                <li v-if="comboIds">
                                    <button :class="['tabs tab3 dropdown-item', { active: tabs === 3 }]"
                                        @click="$emit('tab-change', { tab: 3, destination: 'MyTrip' })">
                                        My Trip
                                    </button>
                                </li>
                                <li v-if="comboIds">
                                    <button :class="['tabs tab4 dropdown-item', { active: tabs === 4 }]"
                                        @click="$emit('tab-change', { tab: 4, destination: 'Maps' })">
                                        Maps
                                    </button>
                                </li>
                                <li>
                                    <button :class="['tabs tab5 dropdown-item m-0', { active: tabs === 5 }]"
                                        @click="$emit('tab-change', { tab: 5, destination: 'Checkout' })">
                                        Checkout
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <!-- Desktop Tabs -->
                        <div class="tabs-wrap d-flex align-items-center w-100">
                            <button :class="['tabs tab1', { active: tabs === 1 }]"
                                @click="$emit('tab-change', { tab: 1, destination: 'Tours' })">
                                Tours
                            </button>
                            <button :class="['tabs tab2', { active: tabs === 2 }]"
                                @click="$emit('tab-change', { tab: 2, destination: 'Init' })">
                                Schedule
                            </button>
                            <button v-if="comboIds" :class="['tabs tab3', { active: tabs === 3 }]"
                                @click="$emit('tab-change', { tab: 3, destination: 'MyTrip' })">
                                My Trip
                            </button>
                            <button v-if="comboIds" :class="['tabs tab4', { active: tabs === 4 }]"
                                @click="$emit('tab-change', { tab: 4, destination: 'Maps' })">
                                Maps
                            </button>
                            <button :class="['tabs tab5 me-auto', { active: tabs === 5 }]"
                                @click="$emit('tab-change', { tab: 5, destination: 'Checkout' })">
                                Checkout
                            </button>
                            <datepicker v-if="comboIds" class="d-md-block d-none" :value="date" :inline="false"
                                :disabled-dates="disabledDates" :prevent-disable-date-selection="true"
                                @update:value="$emit('update:date', $event)"
                                @selected="$emit('selected-date', $event)" />
                        </div>

                        <!-- Mobile Datepicker -->
                        <datepicker v-if="comboIds" class="d-md-none d-block" :value="date" :inline="false"
                            :disabled-dates="disabledDates" :prevent-disable-date-selection="true"
                            @update:value="$emit('update:date', $event)" @selected="$emit('selected-date', $event)" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Datepicker from 'vuejs3-datepicker';

export default {
    name: 'TabsSection',
    components: {
        Datepicker,
    },
    props: ['iframeStatus', 'comboIds', 'date', 'tabs', 'disabledDates'],
    emits: ['update:date', 'selected-date', 'tab-change'],
};
</script>

<style>
.deal-block .item-slide {margin-bottom: 24px;}
.item-slide .box-img {position: relative;height: 225px;}
.item-slide .box-img:before {content: ""; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); position: absolute;}
.item-slide .box-img img {width: 100%; height: 100%; object-fit: cover; object-position: center center;}
.item-slide .box-img .text-wrap {position: absolute; bottom: 0; z-index: 2; width: 100%; left: 0; text-align: left; padding: 10px 10px 15px;}
.item-slide .box-img .text-wrap h4 {font-size: 17px; color: #ffffff; line-height: 1.2; margin-bottom: 4px;}
.item-slide .box-img .text-wrap .desc {font-size: 14px; color: #fff; font-weight: 300; margin-bottom: 8px;}
.item-slide .box-img .text-wrap button {background: transparent; color: #ffffff; border: 1px solid #fff; border-radius: 3px; line-height: 1; vertical-align: middle; padding: 5px 12px; font-weight: 400;}
.item-slide .box-img .text-wrap button:hover, .item-slide .box-img .text-wrap button:focus {background: #fff; color: #000000;}
</style>