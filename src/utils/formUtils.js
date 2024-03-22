class FormUtils {


    static isBlank( val ){
        return ( !val || val.toString().trim() === "" ) ? true : false
    }

    static isSet( val ){
       return  ( val === undefined || val === false || val === "" || val === null ) ? false : true;

    }

}


export { FormUtils }