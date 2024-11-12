import { Text } from 'react-native';
import {getByPropertyPath} from '@ares/core/scripts'
import countries from './countries';
import PropTypes from 'prop-types';


export const defaultCountry = countries.US;

export function translate(key, country = defaultCountry) {
  let language;
  if(country) {
    language = country.defaultLanguage;
  }
  if(typeof key === 'function' ) return key(
    language?.strings, language
  );
  return getByPropertyPath(language.strings,key) ?? key;
} 

TranslateAsTextNode.propTypes = {
  style: PropTypes.any,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.func]) ,
  country: PropTypes.object,
  language: PropTypes.string,
};
export function TranslateAsTextNode({key, country = defaultCountry, ...props}) {
  return <Text {...props}>{translate(key instanceof Function ? key() : key, country)}</Text>;
} 