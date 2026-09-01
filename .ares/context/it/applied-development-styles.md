# Stili di sviluppo applicati @ares/react-native-ui

## Standard di programmazione

- Package **ESM puro** con mappa `exports` ampia e tipi TypeScript (`index.d.ts`): ogni componente ha un subpath dedicato oltre all'entrypoint root.
- Package pensato per React Native: campi `module`/`react-native` → `index.js`; peer dependencies su `react`, `react-native`, `react-native-gesture-handler`, `react-native-reanimated`.
- Componenti in `.jsx` con `PropTypes`; organizzazione per `components/input`, `components/output` (con sotto-cartelle `media`, `messaging`, `debugging`), `components/navigation`.
- Configurazione globale mutabile via `setConfig` (`config.js`); integrazione dello stato con Redux Toolkit + redux-saga.
- Lint/ESLint con preset `@react-native`; test con Jest (preset React Native) in `test/*.test.cjs`.

## Contratto directory / file

```text
react-native-ui/
├── .ares/
│   ├── context/          # Contestualizzazione (manuale)
│   ├── docs/             # Documentazione (manuale)
│   └── tasks/            # Ticket/note (manuale)
├── .git/  .vscode/
├── components/
│   ├── ApplicationRoot.jsx
│   ├── Cache.jsx
│   ├── Flash.jsx
│   ├── input/{actions,fields,forms}
│   └── output/{media,messaging,debugging,Error.jsx,Link.jsx,...}
├── contexts/
│   ├── ARESContext.js
│   └── AuthContext.js
├── effects/query.js
├── locales/{i18n.js,index.js,location.js,useLocales.js,countries/,languages/}
├── social/google.js
├── store/{actions.js,cache-slice.js,index.js,sagas.js}
├── styles/{colors.js,index.js}
├── utils/{local-db-log.js,localAvailableStorage.js,style.js}
├── test/smoke.test.cjs
├── config.js                       # Contestualizzazione (manuale)
├── index.js                        # Entrypoint root (manuale)
├── index.d.ts                      # Tipi TypeScript (manuale)
├── babel.config.cjs
├── .gitignore
├── LICENSE
├── package.json                    # Manuale/autogenerato da yarn
└── README.md                       # Manuale
```

## Distinzione GENERATO vs MANUALE

**Generato automaticamente (non versionare/rigenerare a mano):**

- `node_modules/` e lockfile di Yarn.
- Output di build nativa RN: `ios/build`, `android/build`, `dist`, `coverage`, `.nyc_output`, `*.tgz`.

**Manuale (scritto a mano, NON rigenerare/sovrascrivere):**

- tutto il codice sorgente: `components/`, `contexts/`, `effects/`, `locales/`, `social/`, `store/`, `styles/`, `utils/`, `test/`
- `config.js`, `index.js`, `index.d.ts`, `babel.config.cjs`
- `README.md`, `.gitignore`, `LICENSE`, `package.json` (iniziale)
- intera sottocartella `.ares/` (docs, context, tasks)
