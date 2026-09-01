# Panoramica CLI @ares/react-native-ui

## Comandi espliciti

Questo modulo **non ha una CLI/binario** (nessun campo `bin` in `package.json`; `index.js` è una libreria ESM). Gli script presenti sono tipici di un progetto React Native e servono al dev/lint/test locali, non all'esposizione di comandi binari riutilizzabili.

## Script npm disponibili

| Script | Comando | Scopo |
|---|---|---|
| `android` | `react-native run-android` | Esegue l'app RN su Android |
| `ios` | `react-native run-ios` | Esegue l'app RN su iOS |
| `start` | `react-native start` | Avvia il Metro bundler |
| `lint` | `eslint .` | Analisi statica (preset `@react-native`) |
| `test` | `jest` | Esegue la suite Jest (testMatch `**/test/**/*.test.cjs`) |
| `build:ios` | `xcodebuild ...` | Build iOS (archivio + export) |
| `build:android` | `cd android && ./gradlew assembleRelease` | Build Android release |
| `deploy:ios` | `fastlane ios deploy` | Deploy iOS |
| `deploy:android` | `fastlane android deploy` | Deploy Android |

## Uso

Non esistono sottocomandi o entrypoint binari: il modulo è consumato solo come libreria di componenti via import (root e subpath).

Nota: nel dev harness `@ares/react-native-ui-dev`, `ApplicationRoot` può leggere `./.tmp/ares-rn-args.json` per scegliere il componente da renderizzare (`path | component | render`); comportamento no-op nelle app normali.
