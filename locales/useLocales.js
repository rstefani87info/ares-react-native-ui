import '@formatjs/intl-pluralrules/polyfill';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {Text} from 'react-native';
import languages,{  defaultLang } from './languages';

// ----------------------------------------------------------------------
i18n.use(initReactI18next).init({
  resources:  Object.values(languages).map(({strings, code}) => ({[code]: strings})).reduce((acc, val) => ({...acc, ...val}), {}),
  lng: "en", // Lingua di default
  fallbackLng: "en", // Lingua di fallback
  interpolation: {
    escapeValue: false // React già esegue l'escape
  }
});
export default function useLocales() {
  const { i18n, t } = useTranslation();
  const locales = RNLocalize.getLocales();
  const currentLang = (locales[0]?.languageTag || defaultLang) || 'en';

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => { 
      console.debug("currentLang", currentLang); 
      return typeof text === 'string' ? 
      t(text, options) : 
      (typeof text === 'object' ? (text[currentLang] ?? text[currentLang.split('-')[0]] ??text[defaultLang]) : '');
    },
    currentLang,
    allLangs: languages,
  };
}
