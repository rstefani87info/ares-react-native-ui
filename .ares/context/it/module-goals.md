# Obiettivi del modulo @ares/react-native-ui

## Introduzione

`@ares/react-native-ui` è la **libreria completa di componenti UI React Native** del framework aReS. Fornisce componenti di input, output, media, navigazione e sistema, contesti (`ARESProvider`, `AuthProvider`), store Redux, localizzazione (i18next) e integrazione profondamente collegata al runtime di `@ares/core`.

È il livello UI riusabile su cui si basano gli altri moduli React Native di aReS (geografia, social, ecc.).

## Obiettivi

- Fornire componenti UI pronti all'uso e coerenti per lo sviluppo rapido di app mobile/enterprise.
- Integrare i componenti con il runtime aReS (`setConfig`, `ARESProvider`, inizializzazione datasource).
- Gestire autenticazione, stato (Redux Toolkit/Saga), cache, i18n e media.
- Esporre una superficie pubblica stabile (root `index.js` + numerosi subpath di componenti).

## Responsabilità

- Componenti di input: `Button`, `Text`, `CheckBox`, `Switch`, `Field`, `Form`.
- Componenti di output: `Error`, `Link`, `Loading`, `Map`, `Modal`, `Rate`, `TranslatedText`, media (`Image`, `Video`, `SlideShow`, `MediaList`, `HTML`), messaging (`Alert`), debugging (`Console`).
- Componenti di sistema: `ApplicationRoot`, `Cache`, `Flash`, `routing`.
- Context: `ARESProvider`/`aReSContext` e `AuthProvider`/`useAuth` (delegano a `aReS.contextSettings.auth`).
- Store Redux (`store/`) con azioni, sagas e cache-slice; config globale (`config.js` + `setConfig`).
- Localizzazione (`locales/`) e social (Google sign-in in `social/google.js`).

## Cosa il modulo NON fa

- Non fornisce una CLI/binario: è una libreria UI (gli script RN servono al progetto dev standalone).
- Non implementa la logica di business del datasource: delega a `@ares/core`.
- Alcuni componenti richiedono configurazione nativa nell'app consumer (maps, google-signin, vector-icons, webview, gesture-handler, reanimated).
