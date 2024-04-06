<template>
<div>
        {{ str.toBool(field.required) ? "* " : " " }}
        {{ str.toTitle(field.name)}}
    <div v-if="field.description !== ''" class="text-muted">{{ field.description }}</div>
    <div v-if="str.toBool(field.priceInfo.enabled)" >
        <small>Additional Fee: ${{ Number(field.priceInfo.price).toFixed(2) }}</small>
    </div>
</div>
</template>

<script>
/**
 * display detials in form lable 
 * @param field custom field object
 * @return void
 */

import { StringUtils } from "../../utils/stringUtils";

export default {
    name: "CustomFieldLabel",
    props: ["field"],
    data:()=>{
        return {
            str: StringUtils
        }
    },
}
</script>