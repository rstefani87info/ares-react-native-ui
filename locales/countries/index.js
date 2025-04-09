import languages, { defaultLang } from '../languages';
const countries = {
  US: {
    label: 'United_States',
    code: 'US',
    zipCode: true,
    shortDateFormat: 'MM/DD/YYYY',
    longDateFormat: 'MMMM D, YYYY',
    shortTimeFormat: 'hh:mm A',
    longTimeFormat: 'hh:mm:ss A',
    longTimeFormatToMilliseconds: 'hh:mm:ss.SSS A',
    ssn: /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/,
    languages: [languages.enUS],
    defaultLanguage: languages.enUS,
    streetAddressFormat: {
      street: {...dataDescriptors.text, maxLength: 255, ignoreCase:true, viewPosition: 0},
      streetNumber: {...dataDescriptors.text, maxLength: 255, pattern: /^.*[0-9]+.*/, ignoreCase:true, viewPosition: 1},
      internalDetails: {...dataDescriptors.text, maxLength: 255, ignoreCase:true, viewPosition: 2},
      postalCode: {...dataDescriptors.text, maxLength: 255, pattern: /^[0-9]+$/, ignoreCase:true , viewPosition: 3},
      city: {...dataDescriptors.text, maxLength: 255,  ignoreCase:true , viewPosition: 4},
      state: {...dataDescriptors.text, maxLength: 255, ignoreCase:true , viewPosition: 5},
      nation: {...dataDescriptors.text, maxLength: 255,ignoreCase:true, pattern: /^US$/i , viewPosition: 6},
    },
    phoneNumberPrefix: '+1',
  },
  IT: {
    label: 'Italy',
    code: 'IT',
    shortDateFormat: 'DD/MM/YYYY',
    longDateFormat: 'DD MMMM YYYY',
    shortTimeFormat: 'HH:mm',
    longTimeFormat: 'HH:mm:ss',
    longTimeFormatToMilliseconds: 'HH:mm:ss.SSS',
    zipCode: true,
    ssn: /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/,
    languages: [languages.itIT],
    defaultLanguage: languages.itIT,
    streetAddressFormat: {
      internalDetails: {...dataDescriptors.text, maxLength: 255, ignoreCase:true , viewPosition: 0},
      streetNumber: {...dataDescriptors.text, maxLength: 255, pattern: /^.*[0-9]+.*/, ignoreCase:true, viewPosition: 1},
      street: {...dataDescriptors.text, maxLength: 255, ignoreCase:true, viewPosition: 2},
      city: {...dataDescriptors.text, maxLength: 255,  ignoreCase:true , viewPosition: 3},
      province: {...dataDescriptors.text, maxLength: 255, ignoreCase:true , viewPosition: 4},
      postalCode: {...dataDescriptors.text, maxLength: 255, pattern: /^[0-9]+$/, ignoreCase:true  , viewPosition: 5},
      nation: {...dataDescriptors.text, maxLength: 255,ignoreCase:true, pattern: /^IT$/i , viewPosition: 6},
    },
    phoneNumberPrefix: '+39',
  }
};


export default countries;

export function getCountry(nation){
  nation = nation.toUpperCase();
  return countries[nation] || countries.US;
}