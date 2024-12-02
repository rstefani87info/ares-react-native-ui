
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import * as i18n from './i18n';
import * as countries from './countries';

export const defaultCountry = countries.US;

export function getCurrentCountry() {
  const countryCode = global.countryCode || Localize.getCountry();
  return countries[countryCode] || defaultCountry;
}

export function setCurrentCountry(countryOrLanguageCode) {
  if (typeof countryOrLanguageCode === 'string' && countryOrLanguageCode.match(/^([a-z]{2})-([a-z]{2})$/i)) {
    i18n.setCurrentLanguage(countryOrLanguageCode);
    setCurrentCountry(countryOrLanguageCode.split('-')[1]);
  } else if (typeof countryOrLanguageCode === 'string' && countryOrLanguageCode.match(/^([a-z]{2})$/i)){
    global.countryCode = countryOrLanguageCode.toUpperCase();
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
    console.warn(i18n.translate('ares.geolocation.permission_denied'));
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      console.log(
        i18n.translate('ares.geolocation.current_coordinates') + ':',
        latitude,
        longitude,
      );
      reverseGeocode(latitude, longitude);
    },
    error => {
      console.error(error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
}
