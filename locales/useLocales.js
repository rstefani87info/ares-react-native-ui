import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
;
import { defaultLang } from './languages';

import {translate, getCurrentLanguage, languages} from './i18n'
import countries from './countries';


// export function initLocales(strings={}, defaultLanguage= null, fallbackLanguage= 'en') {
//   const systemCurrentLanguage = getCurrentLanguage();
//   strings = {...systemCurrentLanguage.strings, ...strings}  ;
//   console.debug ('initLocales',{A:systemCurrentLanguage, B:strings});
//   i18next.use(initReactI18next).init({
//   resources:  strings,
//   lng: defaultLanguage ?? systemCurrentLanguage?.code, 
//   fallbackLng: fallbackLanguage, 
//   interpolation: {
//     escapeValue: false  
//   },
// });
// }

export default function useLocales() {
  // if(!global.isI18NInitialized) {
  //   initLocales();
  //   global.isI18NInitialized = true;
  // }
  const currentLang = getCurrentLanguage();
  const country = countries[currentLang.region] || countries.US;

  return {
    // changeLanguage: i18n.changeLanguage,
    translate: (text, options) => { 
      const language = getCurrentLanguage().strings;
      return typeof text === 'string' ? 
      translate( text, country, {strings:language}  ) : 
      (typeof text === 'object' ? (text[language.code] ?? text[language.region] ?? text[language.languageCode] ??text[defaultLang]) : '');
    },
    currentLanguage: currentLang,
    allLanguages: languages,
  };
}
