
import en_us from './en-US';
import it_it from './it-IT';
import { config } from '../../config';

const languages = {
  enUS: {
    label: 'English (United States)',
    code: 'en-US',
    region: 'US',
    languageCode: 'en',
    strings:  en_us,
  },
  itIT: {
    label: 'Italiano (Italia)',
    code: 'it-IT',
    region: 'IT',
    languageCode: 'it',
    strings: it_it,
  },
};



export const defaultLang = languages.enUS.code;
export default new Proxy(languages, {
  get: (target, prop) => config.locales?.languages?.[prop] ?? target[prop],
});
