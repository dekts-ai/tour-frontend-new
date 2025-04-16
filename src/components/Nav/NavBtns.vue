<template>
<div class="no-container">
    <div class="row">
        <div class="col-12">
            <div class="dropdown text-start d-md-none">
                <a class="hamburger-menu dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><button @click="toTab(1, 'Index')" :class="'tabs tab1 dropdown-item ' + (tabs == 1 ? 'active' : '')">Tours</button></li>
                    <li><button @click="toTab(2, 'Init')" :class="'tabs tab2 dropdown-item ' + (tabs == 2 ? 'active' : '')">Schedule</button></li>
                    <li><button v-if="comboIds" @click="toTab(3, 'MyTrip')" :class="'tabs tab3 dropdown-item ' + (tabs == 3 ? 'active' : '')">My Trip</button></li>
                    <li><button v-if="comboIds" @click="toTab(4, 'Maps')" :class="'tabs tab4 dropdown-item ' + (tabs == 4 ? 'active' : '')">Maps</button></li>
                    <li><button @click="toTab(5, 'Checkout')" :class="'tabs tab5 dropdown-item ' + (tabs == 5 ? 'active' : '')">Checkout</button></li>
                </ul>
            </div>
            <div class="tabs-wrap d-flex align-items-center w-100">
                <button @click="toTab(1, 'Index')" :class="'tabs tab1 ' + (tabs == 1 ? 'active' : '')">Tours</button>
                <button @click="toTab(2, 'Init')" :class="'tabs tab2 ' + (tabs == 2 ? 'active' : '')">Schedule</button>
                <button v-if="comboIds" @click="toTab(3, 'MyTrip')" :class="'tabs tab3 ' + (tabs == 3 ? 'active' : '')">My Trip</button>
                <button v-if="comboIds" @click="toTab(4, 'Maps')" :class="'tabs tab4 ' + (tabs == 4 ? 'active' : '')">Maps</button>
                <button @click="toTab(5, 'Checkout')" :class="'tabs tab5 ' + (tabs == 5 ? 'active' : '')">Checkout</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "NavBtns",
    props: ["comboIds", "tabs"],
    data: ()=>{
        return {};
    },
    methods:{
        toTab(tab, destination){
            this.$emit('navigatetotab', tab, destination);
        }
    }
}
</script>