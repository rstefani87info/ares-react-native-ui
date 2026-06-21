import * as Localize from 'react-native-localize';
import {getByPropertyPath} from '@ares/core/scripts';
import countries from './countries';
import languages from './languages';
import { config } from '../config';

const customStrings = new Proxy({}, {
    get: (target, prop) => config.locales?.[prop] || {},
});


function findLanguageByCode(code) {
  if (!code) {
    return null;
  }
  const normalized = String(code).toLowerCase();
  return (
    Object.values(languages).find((language) => String(language?.code ?? '').toLowerCase() === normalized) ||
    Object.values(languages).find((language) => String(language?.languageCode ?? '').toLowerCase() === normalized) ||
    null
  );
}

function getCountryCode() {
  return String(config.locales?.countryCode ?? 'US').toUpperCase();
}

const defaultCountry = countries[getCountryCode()] || countries.US;
config.locales = config.locales || {};
if (defaultCountry?.defaultLanguage && !config.locales.currentLanguage) {
  const deviceTag = Localize.getLocales?.()?.[0]?.languageTag;
  config.locales.currentLanguage = findLanguageByCode(deviceTag) || defaultCountry.defaultLanguage;
}

export function getCurrentLanguage(){

  const locale = config.locales.currentLanguage || defaultCountry.defaultLanguage;
  const language = locale.languageCode || String(locale.code || '').split('-')[0].toLowerCase();
  const region = locale.region || String(locale.code || '').split('-')[1] || getCountryCode() || defaultCountry.code;
  const languageTag = locale.languageTag || locale.code || `${language}-${region}`;

  let ret =
    findLanguageByCode(languageTag) ||
    findLanguageByCode(language) ||
    (countries[region]?.defaultLanguage) ||
    defaultCountry.defaultLanguage;

  ret.strings = {...ret.strings, ...customStrings[languageTag]};
  return ret;
}

export function setCurrentLanguage(language){
  if(typeof language === 'string' && language.match(/^([a-z]{2})-([a-z]{2})$/i)) {
    const candidate = findLanguageByCode(language);
    if (candidate) {
      config.locales.currentLanguage = candidate;
      return;
    }
    const [languageCode, region] = language.split('-');
    config.locales.currentLanguage = {
      languageCode: languageCode.toLowerCase(),
      region: region.toUpperCase(),
      code: `${languageCode.toLowerCase()}-${region.toUpperCase()}`,
    };
  }
  else if(typeof language === 'string' && language.match(/^([a-z]{2})$/i) && countries[language]?.defaultLanguage) {
    setCurrentLanguage(countries[language].defaultLanguage.code);
  }
  else if(typeof language === 'string') {
    const normalized = language.toLowerCase();
    const matches = Object.values(languages).filter((lang) => String(lang?.code ?? '').toLowerCase().startsWith(normalized));
    if (matches.length > 0) {
      const next = matches.sort((a, b) => String(a.code).localeCompare(String(b.code))).pop();
      setCurrentLanguage(next.code);
    }
  }
}

export function translate(key, country = defaultCountry, language) {

  if(country && !language) {
    language = country.defaultLanguage;
  }
  if (key && typeof key === 'object' && typeof key.key === 'string') {
    const resolved = getByPropertyPath(language.strings, key.key) ?? key.key;
    const params = key.params;
    if (typeof resolved === 'function') {
      if (Array.isArray(params)) {
        return resolved(...params);
      }
      if (params && typeof params === 'object') {
        return resolved(params);
      }
      if (params !== undefined) {
        return resolved(params);
      }
      return resolved();
    }
    if (typeof resolved === 'string') {
      if (params && typeof params === 'object' && !Array.isArray(params)) {
        return resolved.replace(/\{(\w+)\}/g, (_, p1) => (params[p1] ?? `{${p1}}`));
      }
      if (Array.isArray(params)) {
        return resolved.replace(/\{(\d+)\}/g, (_, p1) => (params[Number(p1)] ?? `{${p1}}`));
      }
      return resolved;
    }
    return resolved ?? key.key;
  }
  if (Array.isArray(key) && typeof key[0] === 'string') {
    const [k, ...params] = key;
    return translate({key: k, params}, country, language);
  }
  if(typeof key === 'string') {
    return getByPropertyPath(language.strings,key) ?? key;
 } else if(key instanceof Function) {
    return key(language.strings,language,country);
  }
}
