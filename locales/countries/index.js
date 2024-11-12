import languages, { defaultLang } from '../languages';
import * as assets from '../../styles/assets';
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
    icon: assets.images.icons.flags.ic_flag_us,
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
    icon:  assets.images.icons.flags.ic_flag_it,
  }
};


export default countries;