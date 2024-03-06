<template>
<div class="int_phone">
  <div class="int_phone_group">
      <div class="int_phone_select_warp">

          <div @click="displayCodes" class="init_phone_select_btn">
            {{ phone_flag }} {{ phone_ext }} 
          </div>
          
          <div class="int_phone_number_list" :style="`display: ${show_codes ? 'block' : 'none' }`" >

              <input @keyup="searchCodes" value="" type="text" placeholder="Search"  class=" form-control int_phone_number_search_input" />

                <div v-on:mouseleave="hideCodes" class="int_phone_number_country_list">
                  <div v-for="(ele, idx) in country_codes" 
                    @click="()=>updateExt(ele.code, ele.key, ele.flag)" 
                    :key="`phone-int-code-${idx}`" 
                    class="int_phone_countries_btn"> 
                    {{ ele.flag }} {{ele.code}} {{ele.name}}
                  </div>
                </div>
              <hr />
          </div>
      </div>

      <input @keydown="updateParent" @change="updateParent" type="text" id="phone_number" name="phone_number" v-model="phone_num"
       v-mask="'################'" class="form-control int_phone_number" placeholder="(Area Code) Phone Number" />

  </div>

</div>


</template>


<style scoped> @import '../../assets/css/int_phone.css';</style>

<script>
import CountryCodes from '../../utils/countryCode';
import { mask } from 'vue-the-mask';

export default {
  name: "IntPhoneNumber",

  props:{
      current_phone_number: String,
      current_phone_code: String,
  },

  directives: {
    mask
  },

  mounted(){
    this.phone_num = this.current_phone_number;
    this.phone_ext = this.current_phone_code;
    this.phone_flag = this.getFlagEmoji(this.phone_ext, true);
  },

  created(){
    this.country_codes = CountryCodes.getCodes();
  },

  data: ()=>{return {
      phone_ext: "+1",
      phone_num: "",
      phone_flag: "",
      phone_cnt: "us",
      country_codes: [],
      show_codes: false,
      search_term: "",
  }},

  methods:{

    getFlagEmoji(countryCode, useExt=false) {
      let code = countryCode;
      if( useExt ){
        const codes = CountryCodes.getCodes();
        const result =  codes.filter((c)=>c.code === code);
        if(result.length > 0 ){
            code = result[0].key;
        }
      }
      const codePoints = code
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    
    },

    displayCodes(){
      this.show_codes = true;
    },

    hideCodes(){
      this.show_codes = false;
    },

    searchCodes(evt){
      const codes = CountryCodes.getCodes();
      const val = evt.target.value;
      if( val.trim() === ""){
        this.country_codes = codes;
      }else{
         this.country_codes = codes.filter((c)=> { 
         return ( c.name.toLowerCase().includes(val.toLowerCase()) || c.code.includes(`${val}`) ) ;
        });
      }

    },

    updateExt(ext, cnt, flag){
        this.phone_ext = ext;
        this.phone_cnt = cnt;
        this.show_codes = false;
        this.phone_flag = flag;
        this.updateParent();
    },

    updateParent(){
      const {phone_ext, phone_num} = this;
      this.$emit('onphoneupdate', {phone_ext, phone_num});
    }
  }
}


</script>