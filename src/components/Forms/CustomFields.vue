<template>
<div v-if="display_form" class="row"> 
    <div class="col-12 custom-form-wrap" :style="`height: ${display_height}px;`">
    <div v-if="loading_form">
        Featching Checkout Options...
    </div>
    
    <div v-if="display_form">

        <h3 class="custom-form-header">{{ form.form_name }}</h3>
        <p>{{ form.form_info }}</p>

        <div v-if="display_errors && errors.length > 0">
            <div class="alert alert-warning">
                <p v-for="(err, idx) in errors">{{ err }}</p>
            </div>
        </div>

        <hr />

        <div v-for="(field, key) in fields">
            <div :id="field.id" :key="field.id" class="form-group" >
                    
                <div v-if="field.type === 'text'">
                    <FormLabel :id="str.toId(field.id)" className="custom-form-label" >
                        {{ renderReq(field.required) }}
                        {{ renderTitle(field.name) }} 
                    </FormLabel>
                    <input :ref="field.id"
                           :class="renderStyle(field.error)" 
                           :id="str.toId(field.id)" 
                           :type="field.type" 
                           v-model="field.value" class="form-control" />
                </div>

                <div v-if="field.type === 'textarea'">
                    <FormLabel :id="str.toId(field.id)" className="custom-form-label" >
                        {{ renderReq(field.required) }}
                        {{ renderTitle(field.name) }}
                    </FormLabel>
                    <textarea :ref="field.id"
                              :class="renderStyle(field.error)" 
                              :id="str.toId(field.id)" 
                              :type="field.type" 
                              v-model="field.value" 
                              class="form-control"></textarea>
                </div>

                <div v-if="field.type === 'number'">
                    <FormLabel :id="str.toId(field.id)" className="custom-form-label" >
                        {{ renderReq(field.required) }}
                        {{ renderTitle(field.name) }}
                    </FormLabel>
                    <input :ref="field.id" 
                           :class="renderStyle(field.error)" 
                           :id="str.toId(field.id)" 
                           :type="field.type" 
                           :min="field.attrs.min" 
                           :max="field.attrs.max" 
                           v-model="field.value" 
                           class="form-control" />
                </div>

                <div v-if="field.type === 'checkbox'" class="custom-form-options-wrap">
                    <input :ref="field.id" 
                           :class="renderStyle(field.error)" 
                           :id="str.toId(field.id)" 
                           :type="field.type" 
                           v-model="field.value" 
                           :value="field.default" 
                           class="form-check-input" /> 
                    <FormLabel :id="str.toId(field.id)" className="custom-checkbox-label" >
                        {{ renderReq(field.required) }}
                        {{ renderTitle(field.name) }}
                    </FormLabel>
                </div>

                <div v-if="field.type === 'radio'" class="custom-form-options-wrap">
                    <FormLabel :class="renderStyle(field.error)" :id="str.toId(field.id)" className="custom-form-label" >{{ renderTitle(field.name) }}</FormLabel>
                    <div v-for="(option, idx) in field.attrs.options" :key="`radio-${key}-${idx}`" >
                        <input :ref="option.id" 
                               :value="option.value" 
                               :id="option.id" 
                               :name="field.id" 
                               :type="field.type" 
                               v-model="field.value" 
                               class="form-check-input" />
                        <FormLabel :id="option.id" className="custom-radio-label" >{{ renderTitle(option.name) }}</FormLabel>
                    </div>
                </div>

                <div v-if="field.type === 'select'">
                    <FormLabel :class="field.error ? 'custom-from-error' : ''" :id="str.toId(field.id)" className="custom-form-label" >{{ renderTitle(field.name) }}</FormLabel>
                    <select :ref="field.id" 
                            :id="str.toId(field.id)" 
                            v-model="field.value" 
                            class="form-select"> 
                        <option v-for="option in field.attrs.options" :value="option.value">{{ option.name }}</option>
                    </select>
                </div>

            </div>
        </div>
       
        <div v-if="display_submit">
            <hr />
        </div>
        
        <div v-if="display_submit" class="custom-from-actions">
            <input class="btn btn-success text-white float-end" type="button" @click="submitForm" value="Submit" />
        </div>

    </div>
    
    </div>
</div>
</template>

<style scoped>

    .custom-form-wrap{
        background-color: #fff; 
        text-align:left !important;
        overflow-y: scroll;
    }
    .custom-from-error{
        border: 1px solid red;
    }
    .custom-form-label{
        display: block;
    }

    .custom-form-header{
        font-size: 25px;
    }

    .custom-radio-label,
    .custom-checkbox-label{
        display: inline-block;
        margin-left: 10px;
        font-size: large;
    }

    .custom-form-options-wrap{
        border-radius: 7px;
        padding: 7px;
        margin-top: 10px;
        border: 1px solid #ccc;
    }

    .custom-from-actions{
        margin: 10px;
        padding: 10px;
        min-height: 40px;
    }

</style>

<script >

import axios from "axios";
import FormLabel from "./FormLabel";
import { StringUtils } from "../../utils/stringUtils";
import { FormUtils } from "../../utils/formUtils";


export default {

    name: "CustomFields",

    props: {
        enabled: { type: Boolean, default: false },
        endpoint: { type: String, default: "" }, 
        values: { type: Array, default: ()=>[]},
        display_height:{ type: Number, default: 400 }, 
        display_errors: { type: Boolean, default: true },
        display_submit: { type: Boolean, default: true },
    },

    components:{
        FormLabel
    },

    created(){
        this.getData();
    },

    data: ()=>{
        return {
            form: null,
            fields: [],
            errors: [],
            loading_form: false,
            display_form: false,
            str: StringUtils,
            frm: FormUtils
        }
    },

    methods:{
      async getData(){
            if (!this.enabled){ return false; }
            try{
                this.loading_form = true;
                const resp = await axios.get(this.endpoint);
                const { data } = resp;
                this.renderForm(data);
            }catch(err){
                console.log(err);
            }finally{
                this.loading_form = false;
            }
        },

        renderForm(data){

            try{
                //console.log(this.endpoint);
                this.$emit('customformexists',  data.isset );
                
                if( data.isset ){
                    this.form = data.form;
                    console.log(this.values);
                    const fields = JSON.parse(this.form.form_fields);
                    fields.forEach((_field, idx)=>{
                        fields[idx].value = this.getValueFromProps( fields[idx].id );
                        fields[idx].error = false;
                        fields[idx].priceInfo.enabled = this.str.toBool(fields[idx].priceInfo.enabled );
                        fields[idx].priceInfo.price = this.str.toFloat(fields[idx].priceInfo.price);
                    });
                    this.fields = fields;
                    this.display_form = true;
                }

            }catch(err){
                console.log(err);
            }
        },

        /**
         * if prop values is set and is an array 
         * search the values array for an id that matchs the field id
         * return the users form value
         */
        getValueFromProps(id){
            let value = "";
            if ( this.values &&  Array.isArray(this.values) ){
                let field = this.values.filter(f=>f.id===id);
                if(field.length > 0 ){
                    value = field[0].value;
                }
            }
            return value;
        },

        renderTitle(str){
            return str.replace(/\w\S*/g,txt=>txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        },

        renderReq(req){
            if( this.str.toBool(req) ){
                return "*";
            }
        },

        renderStyle(err){
           return (err) ? 'custom-from-error' : ''
        },

        renderError(msg, idx){
            this.errors.push( msg );
            // const ele = this.str.toId(this.fields[idx].id);
            // document.getElementById(ele).focus();
            this.fields[idx].error = true;
        },

        /**
         * validate number if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateNumber(field, idx){
            if( isNaN(field.value) ) {
                this.renderError(`${field.name} must be a number`, idx);
            }else if(this.frm.isBlank(field.value)){
                this.renderError(`${field.name} can not be blank`, idx);
            }else if( parseInt( field.attrs.min ) > -1 ){
                if( parseFloat(field.value) < parseFloat( field.attrs.min ) ){
                    this.renderError(`${field.name} must be grater then or equal to ${field.attrs.min}`, idx);                     
                }
            }else if( parseInt( field.attrs.max ) > -1  ){
                if( parseFloat(field.value) < parseFloat( field.attrs.max ) ){
                    this.renderError(`${field.name} must be less then or equal to ${field.attrs.max}`, idx);                     
                }
            }
        },

        /**
         * validate text input if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateText(field, idx){
            if( this.frm.isBlank(field.value) ) {
                this.renderError(`${field.name} can not be blank`, idx);
            }
        },

        /**
         * validate text checkbox is checked if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateCheckbox(field, idx){
            if( !this.frm.isSet(field.value) ){
                this.renderError(`${field.name} must be selected`, idx);
            }
        },

        validateRadio(field, idx){
           if( !this.frm.isSet(field.value) ){
                this.renderError(`${field.name} option must be selected`, idx);
            }
        },

        validateSelect(field, idx){
            if( !this.frm.isBlank(field.value) ){
                this.renderError(`${field.name} option must be selected`, idx);
            }
        },

        /**
         * loop over the fields and check if its required 
         * and if its blank
         */
        async validateForm(){
            //reset all errors 
            this.errors = [];
            // for each field valid input
            for( let i=0; i < this.fields.length; i++ ) {
                // reset error for field 
                this.fields[i].error = false;
                // get the field 
                let field = this.fields[i];
                // check if the field is required 
                let req = this.str.toBool( field.required );
                if( req ){

                    if( field.type === "text" || field.type === "textarea" ){
                        this.validateText( field, i );
                    }

                    if( field.type === 'number'){
                        this.validateNumber(field, i);
                    }

                    if(field.type === 'checkbox'){
                        this.validateCheckbox(field, i);
                    }

                    if( field.type === 'radio' ){
                        this.validateRadio(field, i)
                    }

                    if( field.type === 'select'){
                        this.validateSelect(field, i)
                    }
                }
            }

            // if error return valid false 
            return  ( this.errors.length === 0 ) ? true : false;
        },

       async submitForm(emit = true){
            await this.validateForm();
            const data = { form: this.form, fields: this.submittedFields(), errors: this.errors}

            if( emit ){
                this.$emit('submitcustomform', data);
            }else{
                return data;
            }
        },

        submittedFields(){
            return this.fields.filter((f)=>this.frm.isSet( f.value ));
        },

        sumTotal(fields) {
            let sum = 0;
            for( let key in fields ){
                let field = fields[key];
                if( this.str.toBool(field.priceInfo.enabled) ){
                    sum += this.str.toFloat(field.priceInfo.price);
                }
            }
            return sum;
        }
    }
}
</script>