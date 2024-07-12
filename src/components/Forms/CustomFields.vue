<template>
<div v-if="display_form" class="row"> 
    <div class="col-12 custom-form-wrap" :style="`height: ${display_height}px;`">
    <div v-if="loading_form">
        Featching Checkout Options...
    </div>
    
    <div v-if="display_form">

        <h3 class="custom-form-header">{{ form.form_name }}</h3>
        <p>{{ form.description }}</p>

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
                        <CustomFieldLabel :field="field" />
                    </FormLabel>
                    <input :ref="field.id"
                           :class="renderStyle(field.error)" 
                           :id="str.toId(field.id)" 
                           :type="field.type" 
                           v-model="field.value" class="form-control" />
                </div>

                <div v-if="field.type === 'textarea'">
                    <FormLabel :id="str.toId(field.id)" className="custom-form-label" >
                        <CustomFieldLabel :field="field" />
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
                        <CustomFieldLabel :field="field" />
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
                        <CustomFieldLabel :field="field" />
                    </FormLabel>
                </div>

                <div v-if="field.type === 'radio'" class="custom-form-options-wrap">
                    <FormLabel :class="renderStyle(field.error)" :id="str.toId(field.id)" className="custom-form-label" >
                        <CustomFieldLabel :field="field" />
                    </FormLabel>
                    <div v-for="(option, idx) in field.attrs.options" :key="`radio-${key}-${idx}`" >
                        <input :ref="option.id" 
                               :value="option.value" 
                               :id="option.id" 
                               :name="field.id" 
                               :type="field.type" 
                               v-model="field.value" 
                               class="form-check-input" />
                        <FormLabel :id="option.id" className="custom-radio-label" >{{ str.toTitle(option.name) }}</FormLabel>
                    </div>
                </div>

                <div v-if="field.type === 'select'">
                    <FormLabel :class="field.error ? 'custom-from-error' : ''" :id="str.toId(field.id)" className="custom-form-label" >
                        <CustomFieldLabel :field="field" />
                    </FormLabel>
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
import CustomFieldLabel from './CustomFieldLabel';
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
        service_commission: { type: Number, default: 0 },
    },
    components:{
        FormLabel,
        CustomFieldLabel
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

    /**
     * fetch data from api endpoint 
     * if no form do not display this component 
     * @returns void
     */
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

        /**
         * loop over the custom form object and display the fields 
         * @param data custom form field data object 
         * @returns void
         */
        renderForm(data){
            try{
                this.$emit('customformexists',  data.isset );
                if( data.isset ){
                    this.form = data.form;
                    const fields = JSON.parse(this.form.form_fields);
                    // format the data to attach it to a v-model with a value prop
                    fields.forEach((_field, idx)=>{
                        fields[idx].value = this.getValueFromProps( fields[idx].id );
                        fields[idx].error = false;
                        fields[idx].form_id = this.form.id
                        fields[idx].priceInfo.enabled = this.str.toBool(fields[idx].priceInfo.enabled );
                        fields[idx].priceInfo.price = this.str.toFloat(fields[idx].priceInfo.price);
                        fields[idx].priceInfo.fee = this.str.toFloat(this.roundout(fields[idx].priceInfo.price * this.service_commission / 100));
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
         * @param id stirng unique field id 
         * @return any
         */
        getValueFromProps(id){
            let value = "";
            if ( this.values && Array.isArray(this.values) ){
                let field = this.values.filter(f=>f.id===id);
                if(field.length > 0 ){
                    value = this.str.stripTags( field[0].value );
                }
            }
            return value;
        },

        /**
         * if error display a red outline around field 
         * @param string error
         * @return void
         */
        renderStyle(err){
           return (err) ? 'custom-from-error' : ''
        },

        /**
         * add error class to input 
         * @param msg string
         * @param idx field index to this.fields index
         * @return void
         */
        renderError(msg, idx){
            this.errors.push( msg );
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
        /**
         * validate Radio input make sure one value checked if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateRadio(field, idx){
           if( !this.frm.isSet(field.value) ){
                this.renderError(`${field.name} option must be selected`, idx);
            }
        },
        /**
         * validate select input make sure one value is selected if required 
         * @param field object
         * @param idx field index to this.fields index
         * @return void
         */
        validateSelect(field, idx){
            if( this.frm.isBlank(field.value) ){
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

       async sanitizeForm(){
            for(let key in this.fields){
                this.fields[key].value = this.str.stripTags( this.fields[key].value );
            }
       },

       async submitForm(emit = true){
            await this.validateForm();
            await this.sanitizeForm();
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
        },

        feeTotal(fields) {
            let fee = 0;
            for( let key in fields ){
                let field = fields[key];
                if( this.str.toBool(field.priceInfo.enabled) ){
                    fee += this.str.toFloat(field.priceInfo.fee);
                }
            }
            return fee;
        },

        roundout(amount, places = 2) {
            if (places < 0) {
                places = 0;
            }

            let x = Math.pow(10, places);
            let formul = (amount * x).toFixed(10);
            return (amount >= 0 ? Math.ceil(formul) : Math.floor(formul)) / x;
        }
    }
}
</script>