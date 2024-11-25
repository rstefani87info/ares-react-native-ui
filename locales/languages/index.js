
import en_us from './en-US';
import it_it from './it-IT';
import custom from '../../../../../locales/languages/index';

const languages = {
  enUS: {
    label: 'English (United States)',
    code: 'en-US',
    strings: Object.assign({},custom.enUS,en_us ),
  },
  itIT: {
    label: 'Italiano (Italia)',
    code: 'it',
    strings: Object.assign({},it_it,custom.itIT ),
  },
};

 

export const defaultLang = languages.enUS.code;
export default languages;
