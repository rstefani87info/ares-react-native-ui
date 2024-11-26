
import en_us from './en-US';
import it_it from './it-IT';
import custom from '../../../../../locales/languages/index';

const languages = {
  enUS: {
    label: 'English (United States)',
    code: 'en-US',
    region: 'US',
    languageCode: 'en',
    strings: Object.assign({},en_us,custom.enUS ),
  },
  itIT: {
    label: 'Italiano (Italia)',
    code: 'it-IT',
    region: 'IT',
    languageCode: 'it',
    strings: Object.assign({},it_it,custom.itIT ),
  },
};

 

export const defaultLang = languages.enUS.code;
export default languages;
