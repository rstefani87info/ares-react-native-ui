
import Geolocation from 'react-native-geolocation-service';
import * as Localize from 'react-native-localize';
import {PermissionsAndroid, Platform} from 'react-native';
import * as i18n from './i18n';
import countries from './countries';
import { config } from '../config';

export const defaultCountry = countries.US;

export function getCurrentCountry() {
  const countryCode = config.locales?.countryCode || Localize.getCountry();
  return countries[countryCode] || defaultCountry;
}

export function setCurrentCountry(countryOrLanguageCode) {
  if (typeof countryOrLanguageCode === 'string' && countryOrLanguageCode.match(/^([a-z]{2})-([a-z]{2})$/i)) {
    i18n.setCurrentLanguage(countryOrLanguageCode);
    setCurrentCountry(countryOrLanguageCode.split('-')[1]);
  } else if (typeof countryOrLanguageCode === 'string' && countryOrLanguageCode.match(/^([a-z]{2})$/i)){
    config.locales = config.locales || {};
    config.locales.countryCode = countryOrLanguageCode.toUpperCase();
  }
}

export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export async function getLocation() {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    return null;
  }

  return await new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude, position});
      },
      error => {
        config.logger?.error?.(error?.message ?? String(error));
        resolve(null);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
}
