# @ares/react-native-ui

## Descrizione

Il modulo `@ares/react-native-ui` è una libreria completa di componenti UI per lo sviluppo di applicazioni React Native, integrata con il framework aReS.

## Installazione

```bash
npm install @ares/react-native-ui
```

## Peer Dependencies

Questo package si aspetta che l'app consumer fornisca (peer dependencies):

- `react`
- `react-native`
- `react-native-gesture-handler`
- `react-native-reanimated`

Se mancano, installale nell'app (versioni coerenti con il tuo setup RN):

```bash
npm install react-native-gesture-handler react-native-reanimated
```

## Caratteristiche Principali

### Componenti Disponibili

#### Componenti di Input

##### Actions
- **Button** - Pulsante personalizzabile con stili e azioni

##### Fields (Campi di Input)
- **Text** - Campo di testo avanzato con supporto per opzioni, validazione e autocompletamento
- **CheckBox** - Casella di controllo
- **Switch** - Interruttore on/off
- **Field** - Campo generico base

##### Forms (Moduli)
- **Form** - Contenitore per moduli con gestione validazione
- **Field** - Campo modulo integrato

#### Componenti di Output

##### Base
- **Error** - Visualizzazione errori
- **Link** - Collegamenti ipertestuali
- **Loading** - Indicatori di caricamento
- **Map** - Componente mappa
- **Modal** - Finestre modali
- **Rate** - Componente valutazione
- **TranslatedText** - Testo tradotto automaticamente

##### Media
- **Base** - Componente media base
- **HTML** - Rendering contenuto HTML
- **Image** - Gestione immagini avanzata
- **MediaList** - Lista elementi media
- **SlideShow** - Presentazione slide
- **Video** - Riproduzione video

##### Messaging
- **Alert** - Avvisi e notifiche

##### Debugging
- **Console** - Console di debug integrata

#### Componenti di Sistema
- **ApplicationRoot** - Componente radice applicazione
- **Cache** - Gestione cache
- **Flash** - Messaggi flash temporanei

## Utilizzo

### Configurazione (aReS + Provider)

Il modulo usa una configurazione globale (vedi [config.js](file:///c:/Users/rstef/workspace/rs/aReS/react-native-ui/config.js)). Per usare i provider e l’integrazione con aReS devi impostare `config.ares` prima del render.

```javascript
import React from 'react';
import {setConfig, ApplicationRoot, AuthProvider} from '@ares/react-native-ui';
import {aReSInitialize} from '@ares/core';

const aReS = aReSInitialize({
  name: 'my-rn-app',
  environments: [],
});

setConfig({ares: aReS});

export default function App() {
  return (
    <ApplicationRoot>
      <AuthProvider>
        {/* ... */}
      </AuthProvider>
    </ApplicationRoot>
  );
}
```

`ARESProvider` viene già applicato dentro `ApplicationRoot` e inizializza i datasource chiamando `aReS.initAllDatasources(aReS.datasourceListToBeInstalled)`.

Per abilitare i log interni (opt-in), passa un logger:

```javascript
setConfig({ares: aReS, logger: console});
```

### Integrazione Auth (`aReS.contextSettings.auth`)

`AuthProvider` delega le operazioni di autenticazione a `aReS.contextSettings.auth` (se presente). Le funzioni attese sono:

- `initialState` (opzionale): stato iniziale custom
- `login(aresState, dispatch, storage)`
- `logout(aresState, dispatch, storage)`
- `getProfile(aresState, dispatch, storage)`
- `refreshToken(aresState, dispatch, storage)`
- `validateToken(aresState, dispatch, storage, refreshToken)`

### Componente Text Avanzato

```javascript
import {Text} from '@ares/react-native-ui';

export function MyField() {
  return (
    <Text
      id="username"
      name="username"
      type="text"
      placeholder="Inserisci username"
      required={true}
      regex={/^[a-zA-Z0-9_]+$/}
      onChangeValue={() => {}}
    />
  );
}
```

### Componente Button

```javascript
import {Button} from '@ares/react-native-ui';

function MyComponent() {
    return (
        <Button
            text="Clicca qui"
            onPress={() => {}}
            style={{ wrapper: { backgroundColor: '#007AFF' }, text: { color: 'white' } }}
        />
    );
}
```

### Componente TranslatedText

```javascript
import {TranslatedText} from '@ares/react-native-ui';

export function MyLabel() {
  return <TranslatedText text="ares.submit" />;
}
```

### Componenti Media

```javascript
import { Image } from '@ares/react-native-ui/components/output/media/Image';
import { Video } from '@ares/react-native-ui/components/output/media/Video';
import { SlideShow } from '@ares/react-native-ui/components/output/media/SlideShow';

function MediaGallery() {
    const images = [
        { uri: 'https://example.com/image1.jpg' },
        { uri: 'https://example.com/image2.jpg' },
        { uri: 'https://example.com/image3.jpg' }
    ];
    
    return (
        <>
            <Image
                source={{ uri: 'https://example.com/image.jpg' }}
                style={{ width: 200, height: 200 }}
            />
            
            <Video
                source={{ uri: 'https://example.com/video.mp4' }}
                controls={true}
                autoplay={false}
            />
            
            <SlideShow
                images={images}
                autoPlay={true}
                interval={3000}
            />
        </>
    );
}
```

## Caratteristiche Avanzate

### Integrazione con aReS Core
Tutti i componenti sono integrati con le utilità del framework aReS:

```javascript
import { isPrimitive } from '@ares/core/scripts';
import { fuseObjects } from '@ares/core/objects';
import { DynamicArray, isIterable } from '@ares/core/arrays';

// Utilizzati internamente nei componenti per funzionalità avanzate
```

### Gestione Opzioni Dinamiche
Il componente Text supporta opzioni dinamiche per autocompletamento:

```javascript
<Text
    name="country"
    type="select"
    options={[
        { key: 'it', value: 'Italia' },
        { key: 'us', value: 'Stati Uniti' },
        { key: 'fr', value: 'Francia' }
    ]}
/>
```

### Validazione Avanzata
Supporto per validazione regex e regole personalizzate:

```javascript
<Text
    name="phone"
    type="tel"
    regex={/^\+?[1-9]\d{1,14}$/}
    required={true}
    errorMessage="Numero di telefono non valido"
/>
```

### Internazionalizzazione
Supporto per testi tradotti automaticamente:

```javascript
import {TranslatedText} from '@ares/react-native-ui';

<TranslatedText
  text="welcome.message"
/>
```

## Note Setup Nativo

Alcuni componenti richiedono configurazione nativa nell'app consumer:

- `react-native-gesture-handler`: seguire la documentazione RN (import in entry + integrazione Babel/Metro dove richiesto).
- `react-native-reanimated`: abilitare il plugin Babel nell'app (`react-native-reanimated/plugin`).
- `react-native-maps`: richiede configurazione nativa e spesso API key.
- `@react-native-google-signin/google-signin`: richiede configurazione nativa (client id iOS/Android).
- `react-native-vector-icons`: richiede linking/font setup a seconda della versione RN.
- `react-native-webview`: richiesto dai media component che renderizzano HTML/embeds.

## Dev Harness

Quando si usa `@ares/react-native-ui-dev`, `ApplicationRoot` può leggere `./.tmp/ares-rn-args.json` per scegliere quale componente renderizzare. Chiavi supportate: `path | component | render`. Nelle app normali questo file è tipicamente assente e il comportamento è un no-op.

## Integrazione con Librerie Esterne

### React Hook Form
Integrazione nativa con React Hook Form per gestione form avanzata.

### React Native Modal
Utilizzo di react-native-modal per modali avanzate.

### React Native Gesture Handler
Supporto per gesture e input touch avanzati.

## Dipendenze Principali

- `@react-native-async-storage/async-storage` - Storage asincrono
- `@react-native-community/datetimepicker` - Selettore data/ora
- `@react-native-google-signin/google-signin` - Autenticazione Google
- `@react-navigation/native-stack` - Navigazione
- `@reduxjs/toolkit` - Gestione stato
- `expo-av` - Audio/Video
- `expo-linking` - Deep linking
- `i18next` - Internazionalizzazione
- `lodash` - Utilità JavaScript
- `prop-types` - Validazione props

## Struttura Progetto

```
components/
├── ApplicationRoot.jsx          # Componente radice
├── Cache.jsx                    # Gestione cache
├── Flash.jsx                    # Messaggi flash
├── input/                       # Componenti di input
│   ├── actions/                 # Azioni (pulsanti, ecc.)
│   ├── fields/                  # Campi di input
│   └── forms/                   # Gestione form
├── navigation/                  # Componenti navigazione
└── output/                      # Componenti di output
    ├── debugging/               # Strumenti debug
    ├── media/                   # Componenti media
    └── messaging/               # Messaggistica
```

## Licenza

MIT

## Autore

Roberto Stefani

## Repository

[GitHub - ares-react-native-ui](https://github.com/rstefani87info/ares-react-native-ui)

## Note

Questo modulo è progettato per accelerare lo sviluppo di applicazioni React Native fornendo componenti UI pronti all'uso, completamente integrati con l'ecosistema aReS. È particolarmente utile per:

- Sviluppo rapido di app mobile
- Prototipazione UI
- Applicazioni enterprise
- App con requisiti di internazionalizzazione
- Progetti che richiedono componenti UI consistenti
