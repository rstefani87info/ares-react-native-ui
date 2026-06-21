import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config';

export default function localAvailableStorage() {
  if (!AsyncStorage) {
    config.logger?.error?.('AsyncStorage is not available');
    return null;
  }
  return AsyncStorage;
}
