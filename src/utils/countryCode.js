
class CountryCodes {


  static validatePhoneNumber (_number) {
    return true;

    // if( !number || number === "" ){
    //   return false;
    // }

    //  return /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(number.toString());
     
  }



  //try our best to format the number like: +1 (111) 222-3333
  static formatPhoneNumber (code, number) {

    const phone_number = ('' + number).replace(/\D/g, '');
    const match = phone_number.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) { 
         const formatted_phone_number = '(' + match[1] + ') ' + match[2] + '-' + match[3];
         return `${code}${formatted_phone_number}`;
    };

    //if all else fails return the country code + phone number
    return `${code}${phone_number}`;
  }


  static getCodes(){
    return [

      {
        "key": "us",
        "ios2": "US",
        "ios3": "USA",
        "name": "United States",
        "short_name": "United States",
        "country_code": "1",
        "code": "+1",
        "flag": "🇺🇸"
      },


      {
        "key": "ca",
        "ios2": "CA",
        "ios3": "CAN",
        "name": "Canada",
        "short_name": "Canada",
        "country_code": "1",
        "code": "+1",
        "flag": "🇨🇦"
    },

    {
      "key": "mx",
      "ios2": "MX",
      "ios3": "MEX",
      "name": "Mexico (México)",
      "short_name": "Mexico",
      "country_code": "52",
      "code": "+52",
      "flag": "🇲🇽"
    },


      {
          "key": "af",
          "ios2": "AF",
          "ios3": "AFG",
          "name": "Afghanistan (افغانستان‎)",
          "short_name": "Afghanistan",
          "country_code": "93",
          "code": "+93",
          "flag": "🇦🇫"
      },
      {
          "key": "al",
          "ios2": "AL",
          "ios3": "ALB",
          "name": "Albania (Shqipëri)",
          "short_name": "Albania",
          "country_code": "355",
          "code": "+355",
          "flag": "🇦🇱"
      },
      {
          "key": "dz",
          "ios2": "DZ",
          "ios3": "DZA",
          "name": "Algeria (الجزائر‎)",
          "short_name": "Algeria",
          "country_code": "213",
          "code": "+213",
          "flag": "🇩🇿"
      },
      {
          "key": "as",
          "ios2": "AS",
          "ios3": "ASM",
          "name": "American Samoa",
          "short_name": "American Samoa",
          "country_code": "1-684",
          "code": "+1684",
          "flag": "🇦🇸"
      },
      {
          "key": "ad",
          "ios2": "AD",
          "ios3": "AND",
          "name": "Andorra",
          "short_name": "Andorra",
          "country_code": "376",
          "code": "+376",
          "flag": "🇦🇩"
      },
      {
          "key": "ao",
          "ios2": "AO",
          "ios3": "AGO",
          "name": "Angola",
          "short_name": "Angola",
          "country_code": "244",
          "code": "+244",
          "flag": "🇦🇴"
      },
      {
          "key": "ai",
          "ios2": "AI",
          "ios3": "AIA",
          "name": "Anguilla",
          "short_name": "Anguilla",
          "country_code": "1-264",
          "code": "+1264",
          "flag": "🇦🇮"
      },
      {
          "key": "aq",
          "ios2": "AQ",
          "ios3": "ATA",
          "name": "Antarctica",
          "short_name": "Antarctica",
          "country_code": "672",
          "code": "+672",
          "flag": "🇦🇶"
      },
      {
          "key": "ag",
          "ios2": "AG",
          "ios3": "ATG",
          "name": "Antigua and Barbuda",
          "short_name": "Antigua and Barbuda",
          "country_code": "1-268",
          "code": "+1268",
          "flag": "🇦🇬"
      },
      {
          "key": "ar",
          "ios2": "AR",
          "ios3": "ARG",
          "name": "Argentina",
          "short_name": "Argentina",
          "country_code": "54",
          "code": "+54",
          "flag": "🇦🇷"
      },
      {
          "key": "am",
          "ios2": "AM",
          "ios3": "ARM",
          "name": "Armenia (Հայաստան)",
          "short_name": "Armenia",
          "country_code": "374",
          "code": "+374",
          "flag": "🇦🇲"
      },
      {
          "key": "aw",
          "ios2": "AW",
          "ios3": "ABW",
          "name": "Aruba",
          "short_name": "Aruba",
          "country_code": "297",
          "code": "+297",
          "flag": "🇦🇼"
      },
      {
          "key": "au",
          "ios2": "AU",
          "ios3": "AUS",
          "name": "Australia",
          "short_name": "Australia",
          "country_code": "61",
          "code": "+61",
          "flag": "🇦🇺"
      },
      {
          "key": "at",
          "ios2": "AT",
          "ios3": "AUT",
          "name": "Austria (Österreich)",
          "short_name": "Austria",
          "country_code": "43",
          "code": "+43",
          "flag": "🇦🇹"
      },
      {
          "key": "az",
          "ios2": "AZ",
          "ios3": "AZE",
          "name": "Azerbaijan (Azərbaycan)",
          "short_name": "Azerbaijan",
          "country_code": "994",
          "code": "+994",
          "flag": "🇦🇿"
      },
      {
          "key": "bs",
          "ios2": "BS",
          "ios3": "BHS",
          "name": "Bahamas",
          "short_name": "Bahamas",
          "country_code": "1-242",
          "code": "+1242",
          "flag": "🇧🇸"
      },
      {
          "key": "bh",
          "ios2": "BH",
          "ios3": "BHR",
          "name": "Bahrain (البحرين‎)",
          "short_name": "Bahrain",
          "country_code": "973",
          "code": "+973",
          "flag": "🇧🇭"
      },
      {
          "key": "bd",
          "ios2": "BD",
          "ios3": "BGD",
          "name": "Bangladesh (বাংলাদেশ)",
          "short_name": "Bangladesh",
          "country_code": "880",
          "code": "+880",
          "flag": "🇧🇩"
      },
      {
          "key": "bb",
          "ios2": "BB",
          "ios3": "BRB",
          "name": "Barbados",
          "short_name": "Barbados",
          "country_code": "1-246",
          "code": "+1246",
          "flag": "🇧🇧"
      },
      {
          "key": "by",
          "ios2": "BY",
          "ios3": "BLR",
          "name": "Belarus (Беларусь)",
          "short_name": "Belarus",
          "country_code": "375",
          "code": "+375",
          "flag": "🇧🇾"
      },
      {
          "key": "be",
          "ios2": "BE",
          "ios3": "BEL",
          "name": "Belgium (België)",
          "short_name": "Belgium",
          "country_code": "32",
          "code": "+32",
          "flag": "🇧🇪"
      },
      {
          "key": "bz",
          "ios2": "BZ",
          "ios3": "BLZ",
          "name": "Belize",
          "short_name": "Belize",
          "country_code": "501",
          "code": "+501",
          "flag": "🇧🇿"
      },
      {
          "key": "bj",
          "ios2": "BJ",
          "ios3": "BEN",
          "name": "Benin (Bénin)",
          "short_name": "Benin",
          "country_code": "229",
          "code": "+229",
          "flag": "🇧🇯"
      },
      {
          "key": "bm",
          "ios2": "BM",
          "ios3": "BMU",
          "name": "Bermuda",
          "short_name": "Bermuda",
          "country_code": "1-441",
          "code": "+1441",
          "flag": "🇧🇲"
      },
      {
          "key": "bt",
          "ios2": "BT",
          "ios3": "BTN",
          "name": "Bhutan (འབྲུག)",
          "short_name": "Bhutan",
          "country_code": "975",
          "code": "+975",
          "flag": "🇧🇹"
      },
      {
          "key": "bo",
          "ios2": "BO",
          "ios3": "BOL",
          "name": "Bolivia",
          "short_name": "Bolivia",
          "country_code": "591",
          "code": "+591",
          "flag": "🇧🇴"
      },
      {
          "key": "ba",
          "ios2": "BA",
          "ios3": "BIH",
          "name": "Bosnia and Herzegovina (Босна и Херцеговина)",
          "short_name": "Bosnia and Herzegovina",
          "country_code": "387",
          "code": "+387",
          "flag": "🇧🇦"
      },
      {
          "key": "bw",
          "ios2": "BW",
          "ios3": "BWA",
          "name": "Botswana",
          "short_name": "Botswana",
          "country_code": "267",
          "code": "+267",
          "flag": "🇧🇼"
      },
      {
          "key": "br",
          "ios2": "BR",
          "ios3": "BRA",
          "name": "Brazil (Brasil)",
          "short_name": "Brazil",
          "country_code": "55",
          "code": "+55",
          "flag": "🇧🇷"
      },
      {
          "key": "io",
          "ios2": "IO",
          "ios3": "IOT",
          "name": "British Indian Ocean Territory",
          "short_name": "British Indian Ocean Territory",
          "country_code": "246",
          "code": "+246",
          "flag": "🇮🇴"
      },
      {
          "key": "vg",
          "ios2": "VG",
          "ios3": "VGB",
          "name": "British Virgin Islands",
          "short_name": "British Virgin Islands",
          "country_code": "1-284",
          "code": "+1284",
          "flag": "🇻🇬"
      },
      {
          "key": "bn",
          "ios2": "BN",
          "ios3": "BRN",
          "name": "Brunei",
          "short_name": "Brunei",
          "country_code": "673",
          "code": "+673",
          "flag": "🇧🇳"
      },
      {
          "key": "bg",
          "ios2": "BG",
          "ios3": "BGR",
          "name": "Bulgaria (България)",
          "short_name": "Bulgaria",
          "country_code": "359",
          "code": "+359",
          "flag": "🇧🇬"
      },
      {
          "key": "bf",
          "ios2": "BF",
          "ios3": "BFA",
          "name": "Burkina Faso",
          "short_name": "Burkina Faso",
          "country_code": "226",
          "code": "+226",
          "flag": "🇧🇫"
      },
      {
          "key": "bi",
          "ios2": "BI",
          "ios3": "BDI",
          "name": "Burundi (Uburundi)",
          "short_name": "Burundi",
          "country_code": "257",
          "code": "+257",
          "flag": "🇧🇮"
      },
      {
          "key": "kh",
          "ios2": "KH",
          "ios3": "KHM",
          "name": "Cambodia (កម្ពុជា)",
          "short_name": "Cambodia",
          "country_code": "855",
          "code": "+855",
          "flag": "🇰🇭"
      },
      {
          "key": "cm",
          "ios2": "CM",
          "ios3": "CMR",
          "name": "Cameroon (Cameroun)",
          "short_name": "Cameroon",
          "country_code": "237",
          "code": "+237",
          "flag": "🇨🇲"
      },

      {
          "key": "cv",
          "ios2": "CV",
          "ios3": "CPV",
          "name": "Cape Verde (Kabu Verdi)",
          "short_name": "Cape Verde",
          "country_code": "238",
          "code": "+238",
          "flag": "🇨🇻"
      },
      {
          "key": "ky",
          "ios2": "KY",
          "ios3": "CYM",
          "name": "Cayman Islands",
          "short_name": "Cayman Islands",
          "country_code": "1-345",
          "code": "+1345",
          "flag": "🇰🇾"
      },
      {
          "key": "cf",
          "ios2": "CF",
          "ios3": "CAF",
          "name": "Central African Republic (République centrafricaine)",
          "short_name": "Central African Republic",
          "country_code": "236",
          "code": "+236",
          "flag": "🇨🇫"
      },
      {
          "key": "td",
          "ios2": "TD",
          "ios3": "TCD",
          "name": "Chad (Tchad)",
          "short_name": "Chad",
          "country_code": "235",
          "code": "+235",
          "flag": "🇹🇩"
      },
      {
          "key": "cl",
          "ios2": "CL",
          "ios3": "CHL",
          "name": "Chile",
          "short_name": "Chile",
          "country_code": "56",
          "code": "+56",
          "flag": "🇨🇱"
      },
      {
          "key": "cn",
          "ios2": "CN",
          "ios3": "CHN",
          "name": "China (中国)",
          "short_name": "China",
          "country_code": "86",
          "code": "+86",
          "flag": "🇨🇳"
      },
      {
          "key": "cx",
          "ios2": "CX",
          "ios3": "CXR",
          "name": "Christmas Island",
          "short_name": "Christmas Island",
          "country_code": "61",
          "code": "+61",
          "flag": "🇨🇽"
      },
      {
          "key": "cc",
          "ios2": "CC",
          "ios3": "CCK",
          "name": "Cocos (Keeling) Islands",
          "short_name": "Cocos Islands",
          "country_code": "61",
          "code": "+61",
          "flag": "🇨🇨"
      },
      {
          "key": "co",
          "ios2": "CO",
          "ios3": "COL",
          "name": "Colombia",
          "short_name": "Colombia",
          "country_code": "57",
          "code": "+57",
          "flag": "🇨🇴"
      },
      {
          "key": "km",
          "ios2": "KM",
          "ios3": "COM",
          "name": "Comoros (جزر القمر‎)",
          "short_name": "Comoros",
          "country_code": "269",
          "code": "+269",
          "flag": "🇰🇲"
      },
      {
          "key": "ck",
          "ios2": "CK",
          "ios3": "COK",
          "name": "Cook Islands",
          "short_name": "Cook Islands",
          "country_code": "682",
          "code": "+682",
          "flag": "🇨🇰"
      },
      {
          "key": "cr",
          "ios2": "CR",
          "ios3": "CRI",
          "name": "Costa Rica",
          "short_name": "Costa Rica",
          "country_code": "506",
          "code": "+506",
          "flag": "🇨🇷"
      },
      {
          "key": "hr",
          "ios2": "HR",
          "ios3": "HRV",
          "name": "Croatia (Hrvatska)",
          "short_name": "Croatia",
          "country_code": "385",
          "code": "+385",
          "flag": "🇭🇷"
      },
      {
          "key": "cu",
          "ios2": "CU",
          "ios3": "CUB",
          "name": "Cuba",
          "short_name": "Cuba",
          "country_code": "53",
          "code": "+53",
          "flag": "🇨🇺"
      },
      {
          "key": "cw",
          "ios2": "CW",
          "ios3": "CUW",
          "name": "Curaçao",
          "short_name": "Curacao",
          "country_code": "599",
          "code": "+599",
          "flag": "🇨🇼"
      },
      {
          "key": "cy",
          "ios2": "CY",
          "ios3": "CYP",
          "name": "Cyprus (Κύπρος)",
          "short_name": "Cyprus",
          "country_code": "357",
          "code": "+357",
          "flag": "🇨🇾"
      },
      {
          "key": "cz",
          "ios2": "CZ",
          "ios3": "CZE",
          "name": "Czech Republic (Česká republika)",
          "short_name": "Czech Republic",
          "country_code": "420",
          "code": "+420",
          "flag": "🇨🇿"
      },
      {
          "key": "cd",
          "ios2": "CD",
          "ios3": "COD",
          "name": "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
          "short_name": "Democratic Republic of the Congo",
          "country_code": "243",
          "code": "+243",
          "flag": "🇨🇩"
      },
      {
          "key": "dk",
          "ios2": "DK",
          "ios3": "DNK",
          "name": "Denmark (Danmark)",
          "short_name": "Denmark",
          "country_code": "45",
          "code": "+45",
          "flag": "🇩🇰"
      },
      {
          "key": "dj",
          "ios2": "DJ",
          "ios3": "DJI",
          "name": "Djibouti",
          "short_name": "Djibouti",
          "country_code": "253",
          "code": "+253",
          "flag": "🇩🇯"
      },
      {
          "key": "dm",
          "ios2": "DM",
          "ios3": "DMA",
          "name": "Dominica",
          "short_name": "Dominica",
          "country_code": "1-767",
          "code": "+1767",
          "flag": "🇩🇲"
      },
      {
          "key": "do",
          "ios2": "DO",
          "ios3": "DOM",
          "name": "Dominican Republic (República Dominicana)",
          "short_name": "Dominican Republic",
          "country_code": "1-809, 1-829, 1-849",
          "code": "+1",
          "flag": "🇩🇴"
      },
      {
          "key": "tl",
          "ios2": "TL",
          "ios3": "TLS",
          "name": "Timor-Leste",
          "short_name": "East Timor",
          "country_code": "670",
          "code": "+670",
          "flag": "🇹🇱"
      },
      {
          "key": "ec",
          "ios2": "EC",
          "ios3": "ECU",
          "name": "Ecuador",
          "short_name": "Ecuador",
          "country_code": "593",
          "code": "+593",
          "flag": "🇪🇨"
      },
      {
          "key": "eg",
          "ios2": "EG",
          "ios3": "EGY",
          "name": "Egypt (مصر‎)",
          "short_name": "Egypt",
          "country_code": "20",
          "code": "+20",
          "flag": "🇪🇬"
      },
      {
          "key": "sv",
          "ios2": "SV",
          "ios3": "SLV",
          "name": "El Salvador",
          "short_name": "El Salvador",
          "country_code": "503",
          "code": "+503",
          "flag": "🇸🇻"
      },
      {
          "key": "gq",
          "ios2": "GQ",
          "ios3": "GNQ",
          "name": "Equatorial Guinea (Guinea Ecuatorial)",
          "short_name": "Equatorial Guinea",
          "country_code": "240",
          "code": "+240",
          "flag": "🇬🇶"
      },
      {
          "key": "er",
          "ios2": "ER",
          "ios3": "ERI",
          "name": "Eritrea",
          "short_name": "Eritrea",
          "country_code": "291",
          "code": "+291",
          "flag": "🇪🇷"
      },
      {
          "key": "ee",
          "ios2": "EE",
          "ios3": "EST",
          "name": "Estonia (Eesti)",
          "short_name": "Estonia",
          "country_code": "372",
          "code": "+372",
          "flag": "🇪🇪"
      },
      {
          "key": "et",
          "ios2": "ET",
          "ios3": "ETH",
          "name": "Ethiopia",
          "short_name": "Ethiopia",
          "country_code": "251",
          "code": "+251",
          "flag": "🇪🇹"
      },
      {
          "key": "fk",
          "ios2": "FK",
          "ios3": "FLK",
          "name": "Falkland Islands (Islas Malvinas)",
          "short_name": "Falkland Islands",
          "country_code": "500",
          "code": "+500",
          "flag": "🇫🇰"
      },
      {
          "key": "fo",
          "ios2": "FO",
          "ios3": "FRO",
          "name": "Faroe Islands (Føroyar)",
          "short_name": "Faroe Islands",
          "country_code": "298",
          "code": "+298",
          "flag": "🇫🇴"
      },
      {
          "key": "fj",
          "ios2": "FJ",
          "ios3": "FJI",
          "name": "Fiji",
          "short_name": "Fiji",
          "country_code": "679",
          "code": "+679",
          "flag": "🇫🇯"
      },
      {
          "key": "fi",
          "ios2": "FI",
          "ios3": "FIN",
          "name": "Finland (Suomi)",
          "short_name": "Finland",
          "country_code": "358",
          "code": "+358",
          "flag": "🇫🇮"
      },
      {
          "key": "fr",
          "ios2": "FR",
          "ios3": "FRA",
          "name": "France",
          "short_name": "France",
          "country_code": "33",
          "code": "+33",
          "flag": "🇫🇷"
      },
      {
          "key": "pf",
          "ios2": "PF",
          "ios3": "PYF",
          "name": "French Polynesia (Polynésie française)",
          "short_name": "French Polynesia",
          "country_code": "689",
          "code": "+689",
          "flag": "🇵🇫"
      },
      {
          "key": "ga",
          "ios2": "GA",
          "ios3": "GAB",
          "name": "Gabon",
          "short_name": "Gabon",
          "country_code": "241",
          "code": "+241",
          "flag": "🇬🇦"
      },
      {
          "key": "gm",
          "ios2": "GM",
          "ios3": "GMB",
          "name": "Gambia",
          "short_name": "Gambia",
          "country_code": "220",
          "code": "+220",
          "flag": "🇬🇲"
      },
      {
          "key": "ge",
          "ios2": "GE",
          "ios3": "GEO",
          "name": "Georgia (საქართველო)",
          "short_name": "Georgia",
          "country_code": "995",
          "code": "+995",
          "flag": "🇬🇪"
      },
      {
          "key": "de",
          "ios2": "DE",
          "ios3": "DEU",
          "name": "Germany (Deutschland)",
          "short_name": "Germany",
          "country_code": "49",
          "code": "+49",
          "flag": "🇩🇪"
      },
      {
          "key": "gh",
          "ios2": "GH",
          "ios3": "GHA",
          "name": "Ghana (Gaana)",
          "short_name": "Ghana",
          "country_code": "233",
          "code": "+233",
          "flag": "🇬🇭"
      },
      {
          "key": "gi",
          "ios2": "GI",
          "ios3": "GIB",
          "name": "Gibraltar",
          "short_name": "Gibraltar",
          "country_code": "350",
          "code": "+350",
          "flag": "🇬🇮"
      },
      {
          "key": "gr",
          "ios2": "GR",
          "ios3": "GRC",
          "name": "Greece (Ελλάδα)",
          "short_name": "Greece",
          "country_code": "30",
          "code": "+30",
          "flag": "🇬🇷"
      },
      {
          "key": "gl",
          "ios2": "GL",
          "ios3": "GRL",
          "name": "Greenland (Kalaallit Nunaat)",
          "short_name": "Greenland",
          "country_code": "299",
          "code": "+299",
          "flag": "🇬🇱"
      },
      {
          "key": "gd",
          "ios2": "GD",
          "ios3": "GRD",
          "name": "Grenada",
          "short_name": "Grenada",
          "country_code": "1-473",
          "code": "+1473",
          "flag": "🇬🇩"
      },
      {
          "key": "gu",
          "ios2": "GU",
          "ios3": "GUM",
          "name": "Guam",
          "short_name": "Guam",
          "country_code": "1-671",
          "code": "+1671",
          "flag": "🇬🇺"
      },
      {
          "key": "gt",
          "ios2": "GT",
          "ios3": "GTM",
          "name": "Guatemala",
          "short_name": "Guatemala",
          "country_code": "502",
          "code": "+502",
          "flag": "🇬🇹"
      },
      {
          "key": "gg",
          "ios2": "GG",
          "ios3": "GGY",
          "name": "Guernsey",
          "short_name": "Guernsey",
          "country_code": "44-1481",
          "code": "+44",
          "flag": "🇬🇬"
      },
      {
          "key": "gn",
          "ios2": "GN",
          "ios3": "GIN",
          "name": "Guinea (Guinée)",
          "short_name": "Guinea",
          "country_code": "224",
          "code": "+224",
          "flag": "🇬🇳"
      },
      {
          "key": "gw",
          "ios2": "GW",
          "ios3": "GNB",
          "name": "Guinea-Bissau (Guiné Bissau)",
          "short_name": "Guinea-Bissau",
          "country_code": "245",
          "code": "+245",
          "flag": "🇬🇼"
      },
      {
          "key": "gy",
          "ios2": "GY",
          "ios3": "GUY",
          "name": "Guyana",
          "short_name": "Guyana",
          "country_code": "592",
          "code": "+592",
          "flag": "🇬🇾"
      },
      {
          "key": "ht",
          "ios2": "HT",
          "ios3": "HTI",
          "name": "Haiti",
          "short_name": "Haiti",
          "country_code": "509",
          "code": "+509",
          "flag": "🇭🇹"
      },
      {
          "key": "hn",
          "ios2": "HN",
          "ios3": "HND",
          "name": "Honduras",
          "short_name": "Honduras",
          "country_code": "504",
          "code": "+504",
          "flag": "🇭🇳"
      },
      {
          "key": "hk",
          "ios2": "HK",
          "ios3": "HKG",
          "name": "Hong Kong (香港)",
          "short_name": "Hong Kong",
          "country_code": "852",
          "code": "+852",
          "flag": "🇭🇰"
      },
      {
          "key": "hu",
          "ios2": "HU",
          "ios3": "HUN",
          "name": "Hungary (Magyarország)",
          "short_name": "Hungary",
          "country_code": "36",
          "code": "+36",
          "flag": "🇭🇺"
      },
      {
          "key": "is",
          "ios2": "IS",
          "ios3": "ISL",
          "name": "Iceland (Ísland)",
          "short_name": "Iceland",
          "country_code": "354",
          "code": "+354",
          "flag": "🇮🇸"
      },
      {
          "key": "in",
          "ios2": "IN",
          "ios3": "IND",
          "name": "India (भारत)",
          "short_name": "India",
          "country_code": "91",
          "code": "+91",
          "flag": "🇮🇳"
      },
      {
          "key": "id",
          "ios2": "ID",
          "ios3": "IDN",
          "name": "Indonesia",
          "short_name": "Indonesia",
          "country_code": "62",
          "code": "+62",
          "flag": "🇮🇩"
      },
      {
          "key": "ir",
          "ios2": "IR",
          "ios3": "IRN",
          "name": "Iran (ایران‎)",
          "short_name": "Iran",
          "country_code": "98",
          "code": "+98",
          "flag": "🇮🇷"
      },
      {
          "key": "iq",
          "ios2": "IQ",
          "ios3": "IRQ",
          "name": "Iraq (العراق‎)",
          "short_name": "Iraq",
          "country_code": "964",
          "code": "+964",
          "flag": "🇮🇶"
      },
      {
          "key": "ie",
          "ios2": "IE",
          "ios3": "IRL",
          "name": "Ireland",
          "short_name": "Ireland",
          "country_code": "353",
          "code": "+353",
          "flag": "🇮🇪"
      },
      {
          "key": "im",
          "ios2": "IM",
          "ios3": "IMN",
          "name": "Isle of Man",
          "short_name": "Isle of Man",
          "country_code": "44-1624",
          "code": "+44",
          "flag": "🇮🇲"
      },
      {
          "key": "il",
          "ios2": "IL",
          "ios3": "ISR",
          "name": "Israel (ישראל‎)",
          "short_name": "Israel",
          "country_code": "972",
          "code": "+972",
          "flag": "🇮🇱"
      },
      {
          "key": "it",
          "ios2": "IT",
          "ios3": "ITA",
          "name": "Italy (Italia)",
          "short_name": "Italy",
          "country_code": "39",
          "code": "+39",
          "flag": "🇮🇹"
      },
      {
          "key": "ci",
          "ios2": "CI",
          "ios3": "CIV",
          "name": "Côte d'Ivoire",
          "short_name": "Ivory Coast",
          "country_code": "225",
          "code": "+225",
          "flag": "🇨🇮"
      },
      {
          "key": "jm",
          "ios2": "JM",
          "ios3": "JAM",
          "name": "Jamaica",
          "short_name": "Jamaica",
          "country_code": "1-876",
          "code": "+1876",
          "flag": "🇯🇲"
      },
      {
          "key": "jp",
          "ios2": "JP",
          "ios3": "JPN",
          "name": "Japan (日本)",
          "short_name": "Japan",
          "country_code": "81",
          "code": "+81",
          "flag": "🇯🇵"
      },
      {
          "key": "je",
          "ios2": "JE",
          "ios3": "JEY",
          "name": "Jersey",
          "short_name": "Jersey",
          "country_code": "44-1534",
          "code": "+44",
          "flag": "🇯🇪"
      },
      {
          "key": "jo",
          "ios2": "JO",
          "ios3": "JOR",
          "name": "Jordan (الأردن‎)",
          "short_name": "Jordan",
          "country_code": "962",
          "code": "+962",
          "flag": "🇯🇴"
      },
      {
          "key": "kz",
          "ios2": "KZ",
          "ios3": "KAZ",
          "name": "Kazakhstan (Казахстан)",
          "short_name": "Kazakhstan",
          "country_code": "7",
          "code": "+7",
          "flag": "🇰🇿"
      },
      {
          "key": "ke",
          "ios2": "KE",
          "ios3": "KEN",
          "name": "Kenya",
          "short_name": "Kenya",
          "country_code": "254",
          "code": "+254",
          "flag": "🇰🇪"
      },
      {
          "key": "ki",
          "ios2": "KI",
          "ios3": "KIR",
          "name": "Kiribati",
          "short_name": "Kiribati",
          "country_code": "686",
          "code": "+686",
          "flag": "🇰🇮"
      },
      {
          "key": "xk",
          "ios2": "XK",
          "ios3": "XKX",
          "name": "Kosovo",
          "short_name": "Kosovo",
          "country_code": "383",
          "code": "+383",
          "flag": "🇽🇰"
      },
      {
          "key": "kw",
          "ios2": "KW",
          "ios3": "KWT",
          "name": "Kuwait (الكويت‎)",
          "short_name": "Kuwait",
          "country_code": "965",
          "code": "+965",
          "flag": "🇰🇼"
      },
      {
          "key": "kg",
          "ios2": "KG",
          "ios3": "KGZ",
          "name": "Kyrgyzstan (Кыргызстан)",
          "short_name": "Kyrgyzstan",
          "country_code": "996",
          "code": "+996",
          "flag": "🇰🇬"
      },
      {
          "key": "la",
          "ios2": "LA",
          "ios3": "LAO",
          "name": "Laos (ລາວ)",
          "short_name": "Laos",
          "country_code": "856",
          "code": "+856",
          "flag": "🇱🇦"
      },
      {
          "key": "lv",
          "ios2": "LV",
          "ios3": "LVA",
          "name": "Latvia (Latvija)",
          "short_name": "Latvia",
          "country_code": "371",
          "code": "+371",
          "flag": "🇱🇻"
      },
      {
          "key": "lb",
          "ios2": "LB",
          "ios3": "LBN",
          "name": "Lebanon (لبنان‎)",
          "short_name": "Lebanon",
          "country_code": "961",
          "code": "+961",
          "flag": "🇱🇧"
      },
      {
          "key": "ls",
          "ios2": "LS",
          "ios3": "LSO",
          "name": "Lesotho",
          "short_name": "Lesotho",
          "country_code": "266",
          "code": "+266",
          "flag": "🇱🇸"
      },
      {
          "key": "lr",
          "ios2": "LR",
          "ios3": "LBR",
          "name": "Liberia",
          "short_name": "Liberia",
          "country_code": "231",
          "code": "+231",
          "flag": "🇱🇷"
      },
      {
          "key": "ly",
          "ios2": "LY",
          "ios3": "LBY",
          "name": "Libya (ليبيا‎)",
          "short_name": "Libya",
          "country_code": "218",
          "code": "+218",
          "flag": "🇱🇾"
      },
      {
          "key": "li",
          "ios2": "LI",
          "ios3": "LIE",
          "name": "Liechtenstein",
          "short_name": "Liechtenstein",
          "country_code": "423",
          "code": "+423",
          "flag": "🇱🇮"
      },
      {
          "key": "lt",
          "ios2": "LT",
          "ios3": "LTU",
          "name": "Lithuania (Lietuva)",
          "short_name": "Lithuania",
          "country_code": "370",
          "code": "+370",
          "flag": "🇱🇹"
      },
      {
          "key": "lu",
          "ios2": "LU",
          "ios3": "LUX",
          "name": "Luxembourg",
          "short_name": "Luxembourg",
          "country_code": "352",
          "code": "+352",
          "flag": "🇱🇺"
      },
      {
          "key": "mo",
          "ios2": "MO",
          "ios3": "MAC",
          "name": "Macau (澳門)",
          "short_name": "Macau",
          "country_code": "853",
          "code": "+853",
          "flag": "🇲🇴"
      },
      {
          "key": "mk",
          "ios2": "MK",
          "ios3": "MKD",
          "name": "Macedonia (FYROM) (Македонија)",
          "short_name": "Macedonia",
          "country_code": "389",
          "code": "+389",
          "flag": "🇲🇰"
      },
      {
          "key": "mg",
          "ios2": "MG",
          "ios3": "MDG",
          "name": "Madagascar (Madagasikara)",
          "short_name": "Madagascar",
          "country_code": "261",
          "code": "+261",
          "flag": "🇲🇬"
      },
      {
          "key": "mw",
          "ios2": "MW",
          "ios3": "MWI",
          "name": "Malawi",
          "short_name": "Malawi",
          "country_code": "265",
          "code": "+265",
          "flag": "🇲🇼"
      },
      {
          "key": "my",
          "ios2": "MY",
          "ios3": "MYS",
          "name": "Malaysia",
          "short_name": "Malaysia",
          "country_code": "60",
          "code": "+60",
          "flag": "🇲🇾"
      },
      {
          "key": "mv",
          "ios2": "MV",
          "ios3": "MDV",
          "name": "Maldives",
          "short_name": "Maldives",
          "country_code": "960",
          "code": "+960",
          "flag": "🇲🇻"
      },
      {
          "key": "ml",
          "ios2": "ML",
          "ios3": "MLI",
          "name": "Mali",
          "short_name": "Mali",
          "country_code": "223",
          "code": "+223",
          "flag": "🇲🇱"
      },
      {
          "key": "mt",
          "ios2": "MT",
          "ios3": "MLT",
          "name": "Malta",
          "short_name": "Malta",
          "country_code": "356",
          "code": "+356",
          "flag": "🇲🇹"
      },
      {
          "key": "mh",
          "ios2": "MH",
          "ios3": "MHL",
          "name": "Marshall Islands",
          "short_name": "Marshall Islands",
          "country_code": "692",
          "code": "+692",
          "flag": "🇲🇭"
      },
      {
          "key": "mr",
          "ios2": "MR",
          "ios3": "MRT",
          "name": "Mauritania (موريتانيا‎)",
          "short_name": "Mauritania",
          "country_code": "222",
          "code": "+222",
          "flag": "🇲🇷"
      },
      {
          "key": "mu",
          "ios2": "MU",
          "ios3": "MUS",
          "name": "Mauritius (Moris)",
          "short_name": "Mauritius",
          "country_code": "230",
          "code": "+230",
          "flag": "🇲🇺"
      },
      {
          "key": "yt",
          "ios2": "YT",
          "ios3": "MYT",
          "name": "Mayotte",
          "short_name": "Mayotte",
          "country_code": "262",
          "code": "+262",
          "flag": "🇾🇹"
      },

      {
          "key": "fm",
          "ios2": "FM",
          "ios3": "FSM",
          "name": "Micronesia",
          "short_name": "Micronesia",
          "country_code": "691",
          "code": "+691",
          "flag": "🇫🇲"
      },
      {
          "key": "md",
          "ios2": "MD",
          "ios3": "MDA",
          "name": "Moldova (Republica Moldova)",
          "short_name": "Moldova",
          "country_code": "373",
          "code": "+373",
          "flag": "🇲🇩"
      },
      {
          "key": "mc",
          "ios2": "MC",
          "ios3": "MCO",
          "name": "Monaco",
          "short_name": "Monaco",
          "country_code": "377",
          "code": "+377",
          "flag": "🇲🇨"
      },
      {
          "key": "mn",
          "ios2": "MN",
          "ios3": "MNG",
          "name": "Mongolia (Монгол)",
          "short_name": "Mongolia",
          "country_code": "976",
          "code": "+976",
          "flag": "🇲🇳"
      },
      {
          "key": "me",
          "ios2": "ME",
          "ios3": "MNE",
          "name": "Montenegro (Crna Gora)",
          "short_name": "Montenegro",
          "country_code": "382",
          "code": "+382",
          "flag": "🇲🇪"
      },
      {
          "key": "ms",
          "ios2": "MS",
          "ios3": "MSR",
          "name": "Montserrat",
          "short_name": "Montserrat",
          "country_code": "1-664",
          "code": "+1664",
          "flag": "🇲🇸"
      },
      {
          "key": "ma",
          "ios2": "MA",
          "ios3": "MAR",
          "name": "Morocco (المغرب‎)",
          "short_name": "Morocco",
          "country_code": "212",
          "code": "+212",
          "flag": "🇲🇦"
      },
      {
          "key": "mz",
          "ios2": "MZ",
          "ios3": "MOZ",
          "name": "Mozambique (Moçambique)",
          "short_name": "Mozambique",
          "country_code": "258",
          "code": "+258",
          "flag": "🇲🇿"
      },
      {
          "key": "mm",
          "ios2": "MM",
          "ios3": "MMR",
          "name": "Myanmar (Burma) (မြန်မာ)",
          "short_name": "Myanmar",
          "country_code": "95",
          "code": "+95",
          "flag": "🇲🇲"
      },
      {
          "key": "na",
          "ios2": "NA",
          "ios3": "NAM",
          "name": "Namibia (Namibië)",
          "short_name": "Namibia",
          "country_code": "264",
          "code": "+264",
          "flag": "🇳🇦"
      },
      {
          "key": "nr",
          "ios2": "NR",
          "ios3": "NRU",
          "name": "Nauru",
          "short_name": "Nauru",
          "country_code": "674",
          "code": "+674",
          "flag": "🇳🇷"
      },
      {
          "key": "np",
          "ios2": "NP",
          "ios3": "NPL",
          "name": "Nepal (नेपाल)",
          "short_name": "Nepal",
          "country_code": "977",
          "code": "+977",
          "flag": "🇳🇵"
      },
      {
          "key": "nl",
          "ios2": "NL",
          "ios3": "NLD",
          "name": "Netherlands (Nederland)",
          "short_name": "Netherlands",
          "country_code": "31",
          "code": "+31",
          "flag": "🇳🇱"
      },
      {
          "key": "nc",
          "ios2": "NC",
          "ios3": "NCL",
          "name": "New Caledonia (Nouvelle-Calédonie)",
          "short_name": "New Caledonia",
          "country_code": "687",
          "code": "+687",
          "flag": "🇳🇨"
      },
      {
          "key": "nz",
          "ios2": "NZ",
          "ios3": "NZL",
          "name": "New Zealand",
          "short_name": "New Zealand",
          "country_code": "64",
          "code": "+64",
          "flag": "🇳🇿"
      },
      {
          "key": "ni",
          "ios2": "NI",
          "ios3": "NIC",
          "name": "Nicaragua",
          "short_name": "Nicaragua",
          "country_code": "505",
          "code": "+505",
          "flag": "🇳🇮"
      },
      {
          "key": "ne",
          "ios2": "NE",
          "ios3": "NER",
          "name": "Niger (Nijar)",
          "short_name": "Niger",
          "country_code": "227",
          "code": "+227",
          "flag": "🇳🇪"
      },
      {
          "key": "ng",
          "ios2": "NG",
          "ios3": "NGA",
          "name": "Nigeria",
          "short_name": "Nigeria",
          "country_code": "234",
          "code": "+234",
          "flag": "🇳🇬"
      },
      {
          "key": "nu",
          "ios2": "NU",
          "ios3": "NIU",
          "name": "Niue",
          "short_name": "Niue",
          "country_code": "683",
          "code": "+683",
          "flag": "🇳🇺"
      },
      {
          "key": "kp",
          "ios2": "KP",
          "ios3": "PRK",
          "name": "North Korea (조선 민주주의 인민 공화국)",
          "short_name": "North Korea",
          "country_code": "850",
          "code": "+850",
          "flag": "🇰🇵"
      },
      {
          "key": "mp",
          "ios2": "MP",
          "ios3": "MNP",
          "name": "Northern Mariana Islands",
          "short_name": "Northern Mariana Islands",
          "country_code": "1-670",
          "code": "+1670",
          "flag": "🇲🇵"
      },
      {
          "key": "no",
          "ios2": "NO",
          "ios3": "NOR",
          "name": "Norway (Norge)",
          "short_name": "Norway",
          "country_code": "47",
          "code": "+47",
          "flag": "🇳🇴"
      },
      {
          "key": "om",
          "ios2": "OM",
          "ios3": "OMN",
          "name": "Oman (عُمان‎)",
          "short_name": "Oman",
          "country_code": "968",
          "code": "+968",
          "flag": "🇴🇲"
      },
      {
          "key": "pk",
          "ios2": "PK",
          "ios3": "PAK",
          "name": "Pakistan (پاکستان‎)",
          "short_name": "Pakistan",
          "country_code": "92",
          "code": "+92",
          "flag": "🇵🇰"
      },
      {
          "key": "pw",
          "ios2": "PW",
          "ios3": "PLW",
          "name": "Palau",
          "short_name": "Palau",
          "country_code": "680",
          "code": "+680",
          "flag": "🇵🇼"
      },
      {
          "key": "ps",
          "ios2": "PS",
          "ios3": "PSE",
          "name": "Palestine (فلسطين‎)",
          "short_name": "Palestine",
          "country_code": "970",
          "code": "+970",
          "flag": "🇵🇸"
      },
      {
          "key": "pa",
          "ios2": "PA",
          "ios3": "PAN",
          "name": "Panama (Panamá)",
          "short_name": "Panama",
          "country_code": "507",
          "code": "+507",
          "flag": "🇵🇦"
      },
      {
          "key": "pg",
          "ios2": "PG",
          "ios3": "PNG",
          "name": "Papua New Guinea",
          "short_name": "Papua New Guinea",
          "country_code": "675",
          "code": "+675",
          "flag": "🇵🇬"
      },
      {
          "key": "py",
          "ios2": "PY",
          "ios3": "PRY",
          "name": "Paraguay",
          "short_name": "Paraguay",
          "country_code": "595",
          "code": "+595",
          "flag": "🇵🇾"
      },
      {
          "key": "pe",
          "ios2": "PE",
          "ios3": "PER",
          "name": "Peru (Perú)",
          "short_name": "Peru",
          "country_code": "51",
          "code": "+51",
          "flag": "🇵🇪"
      },
      {
          "key": "ph",
          "ios2": "PH",
          "ios3": "PHL",
          "name": "Philippines",
          "short_name": "Philippines",
          "country_code": "63",
          "code": "+63",
          "flag": "🇵🇭"
      },
      {
          "key": "pl",
          "ios2": "PL",
          "ios3": "POL",
          "name": "Poland (Polska)",
          "short_name": "Poland",
          "country_code": "48",
          "code": "+48",
          "flag": "🇵🇱"
      },
      {
          "key": "pt",
          "ios2": "PT",
          "ios3": "PRT",
          "name": "Portugal",
          "short_name": "Portugal",
          "country_code": "351",
          "code": "+351",
          "flag": "🇵🇹"
      },
      {
          "key": "pr",
          "ios2": "PR",
          "ios3": "PRI",
          "name": "Puerto Rico",
          "short_name": "Puerto Rico",
          "country_code": "0787-01-01T09:39:00+00:00",
          "code": "+1",
          "flag": "🇵🇷"
      },
      {
          "key": "qa",
          "ios2": "QA",
          "ios3": "QAT",
          "name": "Qatar (قطر‎)",
          "short_name": "Qatar",
          "country_code": "974",
          "code": "+974",
          "flag": "🇶🇦"
      },
      {
          "key": "cg",
          "ios2": "CG",
          "ios3": "COG",
          "name": "Congo (Republic) (Congo-Brazzaville)",
          "short_name": "Republic of the Congo",
          "country_code": "242",
          "code": "+242",
          "flag": "🇨🇬"
      },
      {
          "key": "re",
          "ios2": "RE",
          "ios3": "REU",
          "name": "Réunion (La Réunion)",
          "short_name": "Reunion",
          "country_code": "262",
          "code": "+262",
          "flag": "🇷🇪"
      },
      {
          "key": "ro",
          "ios2": "RO",
          "ios3": "ROU",
          "name": "Romania (România)",
          "short_name": "Romania",
          "country_code": "40",
          "code": "+40",
          "flag": "🇷🇴"
      },
      {
          "key": "ru",
          "ios2": "RU",
          "ios3": "RUS",
          "name": "Russia (Россия)",
          "short_name": "Russia",
          "country_code": "7",
          "code": "+7",
          "flag": "🇷🇺"
      },
      {
          "key": "rw",
          "ios2": "RW",
          "ios3": "RWA",
          "name": "Rwanda",
          "short_name": "Rwanda",
          "country_code": "250",
          "code": "+250",
          "flag": "🇷🇼"
      },
      {
          "key": "bl",
          "ios2": "BL",
          "ios3": "BLM",
          "name": "Saint Barthélemy (Saint-Barthélemy)",
          "short_name": "Saint Barthelemy",
          "country_code": "590",
          "code": "+590",
          "flag": "🇧🇱"
      },
      {
          "key": "sh",
          "ios2": "SH",
          "ios3": "SHN",
          "name": "Saint Helena",
          "short_name": "Saint Helena",
          "country_code": "290",
          "code": "+290",
          "flag": "🇸🇭"
      },
      {
          "key": "kn",
          "ios2": "KN",
          "ios3": "KNA",
          "name": "Saint Kitts and Nevis",
          "short_name": "Saint Kitts and Nevis",
          "country_code": "1-869",
          "code": "+1869",
          "flag": "🇰🇳"
      },
      {
          "key": "lc",
          "ios2": "LC",
          "ios3": "LCA",
          "name": "Saint Lucia",
          "short_name": "Saint Lucia",
          "country_code": "1-758",
          "code": "+1758",
          "flag": "🇱🇨"
      },
      {
          "key": "mf",
          "ios2": "MF",
          "ios3": "MAF",
          "name": "Saint Martin (Saint-Martin (partie française))",
          "short_name": "Saint Martin",
          "country_code": "590",
          "code": "+590",
          "flag": "🇲🇫"
      },
      {
          "key": "pm",
          "ios2": "PM",
          "ios3": "SPM",
          "name": "Saint Pierre and Miquelon",
          "short_name": "Saint Pierre and Miquelon",
          "country_code": "508",
          "code": "+508",
          "flag": "🇵🇲"
      },
      {
          "key": "vc",
          "ios2": "VC",
          "ios3": "VCT",
          "name": "Saint Vincent and the Grenadines",
          "short_name": "Saint Vincent and the Grenadines",
          "country_code": "1-784",
          "code": "+1784",
          "flag": "🇻🇨"
      },
      {
          "key": "ws",
          "ios2": "WS",
          "ios3": "WSM",
          "name": "Samoa",
          "short_name": "Samoa",
          "country_code": "685",
          "code": "+685",
          "flag": "🇼🇸"
      },
      {
          "key": "sm",
          "ios2": "SM",
          "ios3": "SMR",
          "name": "San Marino",
          "short_name": "San Marino",
          "country_code": "378",
          "code": "+378",
          "flag": "🇸🇲"
      },
      {
          "key": "st",
          "ios2": "ST",
          "ios3": "STP",
          "name": "São Tomé and Príncipe",
          "short_name": "Sao Tome and Principe",
          "country_code": "239",
          "code": "+239",
          "flag": "🇸🇹"
      },
      {
          "key": "sa",
          "ios2": "SA",
          "ios3": "SAU",
          "name": "Saudi Arabia (المملكة العربية السعودية‎)",
          "short_name": "Saudi Arabia",
          "country_code": "966",
          "code": "+966",
          "flag": "🇸🇦"
      },
      {
          "key": "sn",
          "ios2": "SN",
          "ios3": "SEN",
          "name": "Senegal (Sénégal)",
          "short_name": "Senegal",
          "country_code": "221",
          "code": "+221",
          "flag": "🇸🇳"
      },
      {
          "key": "rs",
          "ios2": "RS",
          "ios3": "SRB",
          "name": "Serbia (Србија)",
          "short_name": "Serbia",
          "country_code": "381",
          "code": "+381",
          "flag": "🇷🇸"
      },
      {
          "key": "sc",
          "ios2": "SC",
          "ios3": "SYC",
          "name": "Seychelles",
          "short_name": "Seychelles",
          "country_code": "248",
          "code": "+248",
          "flag": "🇸🇨"
      },
      {
          "key": "sl",
          "ios2": "SL",
          "ios3": "SLE",
          "name": "Sierra Leone",
          "short_name": "Sierra Leone",
          "country_code": "232",
          "code": "+232",
          "flag": "🇸🇱"
      },
      {
          "key": "sg",
          "ios2": "SG",
          "ios3": "SGP",
          "name": "Singapore",
          "short_name": "Singapore",
          "country_code": "65",
          "code": "+65",
          "flag": "🇸🇬"
      },
      {
          "key": "sx",
          "ios2": "SX",
          "ios3": "SXM",
          "name": "Sint Maarten",
          "short_name": "Sint Maarten",
          "country_code": "1-721",
          "code": "+1721",
          "flag": "🇸🇽"
      },
      {
          "key": "sk",
          "ios2": "SK",
          "ios3": "SVK",
          "name": "Slovakia (Slovensko)",
          "short_name": "Slovakia",
          "country_code": "421",
          "code": "+421",
          "flag": "🇸🇰"
      },
      {
          "key": "si",
          "ios2": "SI",
          "ios3": "SVN",
          "name": "Slovenia (Slovenija)",
          "short_name": "Slovenia",
          "country_code": "386",
          "code": "+386",
          "flag": "🇸🇮"
      },
      {
          "key": "sb",
          "ios2": "SB",
          "ios3": "SLB",
          "name": "Solomon Islands",
          "short_name": "Solomon Islands",
          "country_code": "677",
          "code": "+677",
          "flag": "🇸🇧"
      },
      {
          "key": "so",
          "ios2": "SO",
          "ios3": "SOM",
          "name": "Somalia (Soomaaliya)",
          "short_name": "Somalia",
          "country_code": "252",
          "code": "+252",
          "flag": "🇸🇴"
      },
      {
          "key": "za",
          "ios2": "ZA",
          "ios3": "ZAF",
          "name": "South Africa",
          "short_name": "South Africa",
          "country_code": "27",
          "code": "+27",
          "flag": "🇿🇦"
      },
      {
          "key": "kr",
          "ios2": "KR",
          "ios3": "KOR",
          "name": "South Korea (대한민국)",
          "short_name": "South Korea",
          "country_code": "82",
          "code": "+82",
          "flag": "🇰🇷"
      },
      {
          "key": "ss",
          "ios2": "SS",
          "ios3": "SSD",
          "name": "South Sudan (جنوب السودان‎)",
          "short_name": "South Sudan",
          "country_code": "211",
          "code": "+211",
          "flag": "🇸🇸"
      },
      {
          "key": "es",
          "ios2": "ES",
          "ios3": "ESP",
          "name": "Spain (España)",
          "short_name": "Spain",
          "country_code": "34",
          "code": "+34",
          "flag": "🇪🇸"
      },
      {
          "key": "lk",
          "ios2": "LK",
          "ios3": "LKA",
          "name": "Sri Lanka (ශ්‍රී ලංකාව)",
          "short_name": "Sri Lanka",
          "country_code": "94",
          "code": "+94",
          "flag": "🇱🇰"
      },
      {
          "key": "sd",
          "ios2": "SD",
          "ios3": "SDN",
          "name": "Sudan (السودان‎)",
          "short_name": "Sudan",
          "country_code": "249",
          "code": "+249",
          "flag": "🇸🇩"
      },
      {
          "key": "sr",
          "ios2": "SR",
          "ios3": "SUR",
          "name": "Suriname",
          "short_name": "Suriname",
          "country_code": "597",
          "code": "+597",
          "flag": "🇸🇷"
      },
      {
          "key": "sj",
          "ios2": "SJ",
          "ios3": "SJM",
          "name": "Svalbard and Jan Mayen",
          "short_name": "Svalbard and Jan Mayen",
          "country_code": "47",
          "code": "+47",
          "flag": "🇸🇯"
      },
      {
          "key": "sz",
          "ios2": "SZ",
          "ios3": "SWZ",
          "name": "Swaziland",
          "short_name": "Swaziland",
          "country_code": "268",
          "code": "+268",
          "flag": "🇸🇿"
      },
      {
          "key": "se",
          "ios2": "SE",
          "ios3": "SWE",
          "name": "Sweden (Sverige)",
          "short_name": "Sweden",
          "country_code": "46",
          "code": "+46",
          "flag": "🇸🇪"
      },
      {
          "key": "ch",
          "ios2": "CH",
          "ios3": "CHE",
          "name": "Switzerland (Schweiz)",
          "short_name": "Switzerland",
          "country_code": "41",
          "code": "+41",
          "flag": "🇨🇭"
      },
      {
          "key": "sy",
          "ios2": "SY",
          "ios3": "SYR",
          "name": "Syria (سوريا‎)",
          "short_name": "Syria",
          "country_code": "963",
          "code": "+963",
          "flag": "🇸🇾"
      },
      {
          "key": "tw",
          "ios2": "TW",
          "ios3": "TWN",
          "name": "Taiwan (台灣)",
          "short_name": "Taiwan",
          "country_code": "886",
          "code": "+886",
          "flag": "🇹🇼"
      },
      {
          "key": "tj",
          "ios2": "TJ",
          "ios3": "TJK",
          "name": "Tajikistan",
          "short_name": "Tajikistan",
          "country_code": "992",
          "code": "+992",
          "flag": "🇹🇯"
      },
      {
          "key": "tz",
          "ios2": "TZ",
          "ios3": "TZA",
          "name": "Tanzania",
          "short_name": "Tanzania",
          "country_code": "255",
          "code": "+255",
          "flag": "🇹🇿"
      },
      {
          "key": "th",
          "ios2": "TH",
          "ios3": "THA",
          "name": "Thailand (ไทย)",
          "short_name": "Thailand",
          "country_code": "66",
          "code": "+66",
          "flag": "🇹🇭"
      },
      {
          "key": "tg",
          "ios2": "TG",
          "ios3": "TGO",
          "name": "Togo",
          "short_name": "Togo",
          "country_code": "228",
          "code": "+228",
          "flag": "🇹🇬"
      },
      {
          "key": "tk",
          "ios2": "TK",
          "ios3": "TKL",
          "name": "Tokelau",
          "short_name": "Tokelau",
          "country_code": "690",
          "code": "+690",
          "flag": "🇹🇰"
      },
      {
          "key": "to",
          "ios2": "TO",
          "ios3": "TON",
          "name": "Tonga",
          "short_name": "Tonga",
          "country_code": "676",
          "code": "+676",
          "flag": "🇹🇴"
      },
      {
          "key": "tt",
          "ios2": "TT",
          "ios3": "TTO",
          "name": "Trinidad and Tobago",
          "short_name": "Trinidad and Tobago",
          "country_code": "1-868",
          "code": "+1868",
          "flag": "🇹🇹"
      },
      {
          "key": "tn",
          "ios2": "TN",
          "ios3": "TUN",
          "name": "Tunisia (تونس‎)",
          "short_name": "Tunisia",
          "country_code": "216",
          "code": "+216",
          "flag": "🇹🇳"
      },
      {
          "key": "tr",
          "ios2": "TR",
          "ios3": "TUR",
          "name": "Turkey (Türkiye)",
          "short_name": "Turkey",
          "country_code": "90",
          "code": "+90",
          "flag": "🇹🇷"
      },
      {
          "key": "tm",
          "ios2": "TM",
          "ios3": "TKM",
          "name": "Turkmenistan",
          "short_name": "Turkmenistan",
          "country_code": "993",
          "code": "+993",
          "flag": "🇹🇲"
      },
      {
          "key": "tc",
          "ios2": "TC",
          "ios3": "TCA",
          "name": "Turks and Caicos Islands",
          "short_name": "Turks and Caicos Islands",
          "country_code": "1-649",
          "code": "+1649",
          "flag": "🇹🇨"
      },
      {
          "key": "tv",
          "ios2": "TV",
          "ios3": "TUV",
          "name": "Tuvalu",
          "short_name": "Tuvalu",
          "country_code": "688",
          "code": "+688",
          "flag": "🇹🇻"
      },
      {
          "key": "vi",
          "ios2": "VI",
          "ios3": "VIR",
          "name": "U.S. Virgin Islands",
          "short_name": "U.S. Virgin Islands",
          "country_code": "1-340",
          "code": "+1340",
          "flag": "🇻🇮"
      },
      {
          "key": "ug",
          "ios2": "UG",
          "ios3": "UGA",
          "name": "Uganda",
          "short_name": "Uganda",
          "country_code": "256",
          "code": "+256",
          "flag": "🇺🇬"
      },
      {
          "key": "ua",
          "ios2": "UA",
          "ios3": "UKR",
          "name": "Ukraine (Україна)",
          "short_name": "Ukraine",
          "country_code": "380",
          "code": "+380",
          "flag": "🇺🇦"
      },
      {
          "key": "ae",
          "ios2": "AE",
          "ios3": "ARE",
          "name": "United Arab Emirates (الإمارات العربية المتحدة‎)",
          "short_name": "United Arab Emirates",
          "country_code": "971",
          "code": "+971",
          "flag": "🇦🇪"
      },
      {
          "key": "gb",
          "ios2": "GB",
          "ios3": "GBR",
          "name": "United Kingdom",
          "short_name": "United Kingdom",
          "country_code": "44",
          "code": "+44",
          "flag": "🇬🇧"
      },
      {
          "key": "uy",
          "ios2": "UY",
          "ios3": "URY",
          "name": "Uruguay",
          "short_name": "Uruguay",
          "country_code": "598",
          "code": "+598",
          "flag": "🇺🇾"
      },
      {
          "key": "uz",
          "ios2": "UZ",
          "ios3": "UZB",
          "name": "Uzbekistan (O'zbekiston)",
          "short_name": "Uzbekistan",
          "country_code": "998",
          "code": "+998",
          "flag": "🇺🇿"
      },
      {
          "key": "vu",
          "ios2": "VU",
          "ios3": "VUT",
          "name": "Vanuatu",
          "short_name": "Vanuatu",
          "country_code": "678",
          "code": "+678",
          "flag": "🇻🇺"
      },
      {
          "key": "va",
          "ios2": "VA",
          "ios3": "VAT",
          "name": "Vatican City (Città del Vaticano)",
          "short_name": "Vatican",
          "country_code": "379",
          "code": "+39",
          "flag": "🇻🇦"
      },
      {
          "key": "ve",
          "ios2": "VE",
          "ios3": "VEN",
          "name": "Venezuela",
          "short_name": "Venezuela",
          "country_code": "58",
          "code": "+58",
          "flag": "🇻🇪"
      },
      {
          "key": "vn",
          "ios2": "VN",
          "ios3": "VNM",
          "name": "Vietnam (Việt Nam)",
          "short_name": "Vietnam",
          "country_code": "84",
          "code": "+84",
          "flag": "🇻🇳"
      },
      {
          "key": "wf",
          "ios2": "WF",
          "ios3": "WLF",
          "name": "Wallis and Futuna",
          "short_name": "Wallis and Futuna",
          "country_code": "681",
          "code": "+681",
          "flag": "🇼🇫"
      },
      {
          "key": "eh",
          "ios2": "EH",
          "ios3": "ESH",
          "name": "Western Sahara (الصحراء الغربية‎)",
          "short_name": "Western Sahara",
          "country_code": "212",
          "code": "+212",
          "flag": "🇪🇭"
      },
      {
          "key": "ye",
          "ios2": "YE",
          "ios3": "YEM",
          "name": "Yemen (اليمن‎)",
          "short_name": "Yemen",
          "country_code": "967",
          "code": "+967",
          "flag": "🇾🇪"
      },
      {
          "key": "zm",
          "ios2": "ZM",
          "ios3": "ZMB",
          "name": "Zambia",
          "short_name": "Zambia",
          "country_code": "260",
          "code": "+260",
          "flag": "🇿🇲"
      },
      {
          "key": "zw",
          "ios2": "ZW",
          "ios3": "ZWE",
          "name": "Zimbabwe",
          "short_name": "Zimbabwe",
          "country_code": "263",
          "code": "+263",
          "flag": "🇿🇼"
      }
    ]
  }
}

export default CountryCodes;