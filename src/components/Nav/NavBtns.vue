<template>
    <div class="no-container">
        <div class="row">
            <div class="col-12">
                <!-- Mobile Dropdown -->
                <div class="dropdown text-start d-md-none">
                    <button class="hamburger-menu dropdown-toggle" type="button" id="dropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <span v-for="i in 4" :key="i" />
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li v-for="tab in tabsConfig" :key="`mobile-${tab.id}`">
                            <button v-if="tab && tab.visible" class="dropdown-item tabs"
                                :class="[tab.class, { active: tabs === tab.id }]" :disabled="!tab.destination"
                                @click="tab.destination ? toTab(tab.id, tab.destination) : null">
                                {{ tab.label }}
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Desktop Tabs -->
                <div class="tabs-wrap d-flex align-items-center w-100">
                    <button v-for="tab in tabsConfig" :key="tab.id" v-if="tab && tab.visible" class="tabs"
                        :class="[tab.class, { active: tabs === tab.id }]" :disabled="!tab.destination"
                        @click="tab.destination ? toTab(tab.id, tab.destination) : null">
                        {{ tab.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBtns',
    props: {
        comboIds: {
            type: [String, Number, Array, Boolean, Object],
            default: false
        },
        tabs: {
            type: Number,
            required: true
        }
    },
    computed: {
        tabsConfig() {
            // Ensure no undefined entries
            const config = [
                { id: 1, label: 'Tours', destination: 'Index', class: 'tab1', visible: true },
                { id: 2, label: 'Schedule', destination: 'Init', class: 'tab2', visible: true },
                { id: 3, label: 'My Trip', destination: 'MyTrip', class: 'tab3', visible: !!this.comboIds },
                { id: 4, label: 'Maps', destination: 'Maps', class: 'tab4', visible: !!this.comboIds },
                { id: 5, label: 'Checkout', destination: null, class: 'tab5', visible: true }
            ];
            return config.filter(tab => !!tab); // Extra safety to remove any falsy entries
        }
    },
    methods: {
        toTab(tabId, destination) {
            if (tabId && destination) {
                this.$emit('navigatetotab', tabId, destination);
            }
        }
    }
};
</script>