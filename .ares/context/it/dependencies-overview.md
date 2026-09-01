# Dipendenze @ares/react-native-ui

## Dipendenze aReS (@ares/*) dichiarate

### `@ares/core` (di runtime)
Base del framework aReS: il modulo integra i componenti con l'istanza runtime (`aReSInitialize`, `setConfig`), usa le utility del core (`scripts`, `objects`, `arrays`) e inizializza i datasource tramite `aReS.initAllDatasources`.

### `@ares/scd` (devDependency)
Toolchain di sviluppo aReS (dev-only).

## Dipendenze esterne principali (runtime)

`@formatjs/intl-locale`, `i18next`/`react-i18next` (i18n), `@react-native-async-storage/async-storage`, `@react-native-community/datetimepicker`, `@react-native-google-signin/google-signin`, `@react-navigation/native-stack`, Redux (`redux`, `react-redux`, `@reduxjs/toolkit`, `redux-saga`), `axios`, `expo-av`, `expo-linking`, `lodash`, `prop-types`, `react-hook-form`, `react-native-*` (device-info, geolocation, linear-gradient, localize, maps, modal, reanimated-carousel, safe-area-context, screens, vector-icons, web, webview), `uuid`, `yup`, `moment`.

## Chi dipende da questo modulo

Dall'analisi delle `package.json` del workspace, **`@ares/react-native-ui` è dipendenza di**:

- **`@ares/react-native-geo`** — per il componente `ItalianAddress` (address input integrazione UI).
- **`@ares/react-native-social`** — per i componenti social (`Post` usa i18n e `SlideShow` di react-native-ui; navigation per l'utente).
- **`@ares/react-native-ui-dev`** — il dev harness UI RN dipende dal modulo UI per il rendering.

La catena fa di `@ares/react-native-ui` un hub UI condiviso dai moduli React Native di aReS.
