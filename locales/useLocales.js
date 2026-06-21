import { defaultLang } from './languages';

import {translate as t, getCurrentLanguage, languages} from './i18n';


export default function useLocales() {
  const currentLang = getCurrentLanguage();

  return {
    translate: (text) => {
      const language = getCurrentLanguage();
      const ret =
      typeof text === 'string' || typeof text === 'function' ?
      t( text, null, {strings:language.strings}  ) :
      (text && typeof text === 'object' && typeof text.key === 'string' ?
        t(text, null, {strings: language.strings}) :
        (typeof text === 'object' ? (text[language.code] ?? text[language.region] ?? text[language.languageCode] ?? text[defaultLang]) : ''));
      return ret;
    },
    currentLanguage: currentLang,
    allLanguages: languages,
  };
}
