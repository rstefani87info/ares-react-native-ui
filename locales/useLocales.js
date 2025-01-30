import { defaultLang } from './languages';

import {translate as t, getCurrentLanguage, languages} from './i18n'
import countries from './countries';


export default function useLocales() {
  const currentLang = getCurrentLanguage();
  const country = countries[currentLang.region] || countries.US;

  return {
    translate: (text) => { 
      const language = getCurrentLanguage();
      const ret =  typeof text === 'string' ? 
      t( text, null, {strings:language.strings}  ) : 
      (typeof text === 'object' ? (text[language.code] ?? text[language.region] ?? text[language.languageCode] ??text[defaultLang]) : '');
      return ret;
    },
    currentLanguage: currentLang,
    allLanguages: languages,
  };
}
