import { useTranslation } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { languages, defaultLang } from './languages';

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const locales = RNLocalize.getLocales();
  const currentLanguage = locales[0]?.languageTag || 'en';

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    currentLang,
    allLangs: languages,
  };
}
