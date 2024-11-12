import {tryToDoAsync} from '@ares/core/errorHandling';
import * as assets from '../../styles/assets';
import itIT from './it-IT';
import enUS from './en-US';

const itITCustom = [];

const enUSCustom = {};

const languages = {
  enUS: {
    label: 'English (United States)',
    code: 'en-US',
    icon: assets.images.icons.flags.ic_flag_en,
    strings: en,
  },
  itIT: {
    label: 'Italiano (Italia)',
    code: 'it',
    icon:  assets.images.icons.flags.ic_flag_it,
    strings: it,
  }
};

for(v in Objects.values(languages)) {
  const root = `../../../../../locales/${v.code}.json`;
  const jsonForm = (await tryToDoAsync(async()=>import(`${root}.json`))).response?.default;
  const jsForm = (await tryToDoAsync(async()=>import(`${root}.js`))).response?.default;
  const simpleForm = (await tryToDoAsync(async()=>import(`${root}`))).response?.default;
  v.strings = Object.assign(v.strings, jsonForm ?? {}, jsForm ?? {}, simpleForm ?? {});
};

export const defaultLang = languages.enUS.code;
export default languages;