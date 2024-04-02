class FormUtils {

    static isBlank( val ){
        return ( !val || val.toString().trim() === "" ) ? true : false
    }

    static isSet( val ){
       return  ( val === undefined || val === false || val === "" || val === null ) ? false : true;
    }

    // TODO: adjust for work with international numbers
    static isPhoneNumber (_number) {
        return true;
        // if( !number || number === "" ){
        //   return false;
        // }
        //  return /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(number.toString());
      }

}


export { FormUtils }