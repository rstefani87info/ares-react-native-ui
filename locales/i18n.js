import { Text } from 'react-native';
import PropTypes from 'prop-types';
import * as Localize from 'react-native-localize';
import {getByPropertyPath} from '@ares/core/scripts'
import {filterLike} from '@ares/core/text';
import countries from './countries';
import languages from './languages';


const defaultCountry = countries.US;

export function getCurrentLanguage(){
  const locales =  global.countryCode || Localize.getLocales();

  const language = locales[0].languageCode;  
  const region = locales[0].countryCode; 
  const languageTag = locales[0].languageTag; 

  let ret = languages[languageTag] || languages[language] || (countries[region]?.defaultLanguage) ||getCurrentCountry().defaultLanguage
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

TranslateAsTextNode.propTypes = {
  style: PropTypes.any,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.func]) ,
  country: PropTypes.object,
  language: PropTypes.string,
};
export function TranslateAsTextNode({text, country, language, ...props}) {
  if (!country ) {
    country = global.countryCode? countries[global.countryCode]: defaultCountry;
  }
  return <Text {...props}>{translate(text, country)}</Text>;
} 
