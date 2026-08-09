
import en_us from './en-US';
import it_it from './it-IT';
import { config } from '../../config';
import { en_us as en_us_geo, it_it as it_it_geo } from '@ares/react-native-geo/locales/languages';

const languages = {
  enUS: {
    label: 'English (United States)',
    code: 'en-US',
    region: 'US',
    languageCode: 'en',
    threeLanguageCode: 'eng',
    strings:  {...en_us_geo, ...en_us},
  },
  itIT: {
    label: 'Italiano (Italia)',
    code: 'it-IT',
    region: 'IT',
    languageCode: 'it',
    threeLanguageCode: 'ita',
    strings:  {...it_it_geo, ...it_it},
  },
};



export const defaultLang = languages.enUS.code;
export default new Proxy(languages, {
  get: (target, prop) => config.locales?.languages?.[prop] ?? target[prop],
});
