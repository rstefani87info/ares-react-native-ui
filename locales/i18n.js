import { Text } from 'react-native';
import {getByPropertyPath} from '@ares/core/scripts'
import countries from './countries';
import PropTypes from 'prop-types';


export const defaultCountry = countries.US;

export function translate(key, country = defaultCountry, language) {
  
  if(country && !language) {
    language = country.defaultLanguage;
  }
  console.debug('translate', key, language,language?.strings);

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
export function TranslateAsTextNode({text, country = defaultCountry, language, ...props}) {
  return <Text {...props}>{translate(text, country)}</Text>;
} 
