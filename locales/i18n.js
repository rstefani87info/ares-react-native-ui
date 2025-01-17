import * as Localize from 'react-native-localize';
import {getByPropertyPath} from '@ares/core/scripts'
import {filterLike} from '@ares/core/text';
import countries from './countries';
import languages from './languages';
import customStrings from '../../../../locales/languages';


const defaultCountry = countries[global.countryCode || 'US'];
if(defaultCountry && defaultCountry.defaultLanguage && !global.currentLanguage) global.currentLanguage = languages[Localize.getLocales()[0].languageTag] ?? defaultCountry.defaultLanguage;

export function getCurrentLanguage(){

  const locale =  global.currentLanguage ;
  const language = locale.languageCode ;  
  const region = locale.region || locale.countryCode || global.countryCode || defaultCountry.code ; 
  const languageTag = locale.languageTag || locale.code; 

  let ret = languages[languageTag] || languages[language] || (countries[region]?.defaultLanguage) || defaultCountry.defaultLanguage
 
  ret.strings = {...ret.strings, ...customStrings[languageTag]};
  return ret;
};

export function setCurrentLanguage(language){
  if(typeof language === 'string' && language.match(/^([a-z]{2})-([a-z]{2})$/i)) {
    global.currentLanguage = {};
    currentLanguage.language=language.split('-')[0].toLowerCase();
    currentLanguage.region=language.split('-')[1].toUpperCase();
    currentLanguage.languageTag=currentLanguage.language+'-'+currentLanguage.region;
  }
  else if(typeof language === 'string' && language.match(/^([a-z]{2})$/i) && countries[language]?.defaultLanguage) {
    setCurrentLanguage(countries[language].defaultLanguage.code);
  }
  else if(typeof language === 'string' && (keys=filterLike(Object.keys(languages),new RegExp("/^"+language+"(-[a-z]{2})?$/",'gi'))).length > 0) {
    setCurrentLanguage( keys.sort().pop() );
  }
};

export function translate(key, country = defaultCountry, language) {
  
  if(country && !language) {
    language = country.defaultLanguage;
  }

  if(typeof key === 'string') 
    return getByPropertyPath(language.strings,key) ?? key;
  else if(key instanceof Function) {
    return key(language.strings,language,country);
  }
} 
