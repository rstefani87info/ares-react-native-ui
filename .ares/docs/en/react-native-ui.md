# @ares/react-native-ui

## Description

The `@ares/react-native-ui` module is a comprehensive UI component library for React Native application development, integrated with the aReS framework.

## Installation

```bash
npm install @ares/react-native-ui
```

## Peer Dependencies

This package expects the host app to provide (they are peer dependencies):

- `react`
- `react-native`
- `react-native-gesture-handler`
- `react-native-reanimated`

Install them in the app if missing (versions must match your RN setup):

```bash
npm install react-native-gesture-handler react-native-reanimated
```

## Key Features

### Available Components

#### Input Components

##### Actions
- **Button** - Customizable button with styles and actions

##### Fields (Input Fields)
- **Text** - Advanced text field with support for options, validation, and autocomplete
- **CheckBox** - Checkbox control
- **Switch** - On/off toggle switch
- **Field** - Generic base field

##### Forms
- **Form** - Form container with validation management
- **Field** - Integrated form field

#### Output Components

##### Base
- **Error** - Error display
- **Link** - Hyperlinks
- **Loading** - Loading indicators
- **Map** - Map component
- **Modal** - Modal windows
- **Rate** - Rating component
- **TranslatedText** - Automatically translated text

##### Media
- **Base** - Base media component
- **HTML** - HTML content rendering
- **Image** - Advanced image management
- **MediaList** - Media item list
- **SlideShow** - Slide presentation
- **Video** - Video playback

##### Messaging
- **Alert** - Alerts and notifications

##### Debugging
- **Console** - Integrated debug console

#### System Components
- **ApplicationRoot** - Application root component
- **Cache** - Cache management
- **Flash** - Temporary flash messages

## Usage

### Configuration (aReS + Providers)

This module uses a global configuration object (see [config.js](file:///c:/Users/rstef/workspace/rs/aReS/react-native-ui/config.js)). To use providers and aReS integration you must set `config.ares` before rendering.

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

`ARESProvider` is already applied inside `ApplicationRoot` and initializes datasources by calling `aReS.initAllDatasources(aReS.datasourceListToBeInstalled)`.

To enable internal logs (opt-in), pass a logger:

```javascript
setConfig({ares: aReS, logger: console});
```

### Auth Integration (`aReS.contextSettings.auth`)

`AuthProvider` delegates authentication operations to `aReS.contextSettings.auth` (if present). Expected functions:

- `initialState` (optional): custom initial state
- `login(aresState, dispatch, storage)`
- `logout(aresState, dispatch, storage)`
- `getProfile(aresState, dispatch, storage)`
- `refreshToken(aresState, dispatch, storage)`
- `validateToken(aresState, dispatch, storage, refreshToken)`

### Advanced Text Component

```javascript
import {Text} from '@ares/react-native-ui';

export function MyField() {
  return (
    <Text
      id="username"
      name="username"
      type="text"
      placeholder="Enter username"
      required={true}
      regex={/^[a-zA-Z0-9_]+$/}
      onChangeValue={() => {}}
    />
  );
}
```

### Button Component

```javascript
import {Button} from '@ares/react-native-ui';

function MyComponent() {
    return (
        <Button
            text="Click here"
            onPress={() => {}}
            style={{ wrapper: { backgroundColor: '#007AFF' }, text: { color: 'white' } }}
        />
    );
}
```

### TranslatedText Component

```javascript
import {TranslatedText} from '@ares/react-native-ui';

export function MyLabel() {
  return <TranslatedText text="ares.submit" />;
}
```

### Media Components

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

## Advanced Features

### Integration with aReS Core
All components are integrated with aReS framework utilities:

```javascript
import { isPrimitive } from '@ares/core/scripts';
import { fuseObjects } from '@ares/core/objects';
import { DynamicArray, isIterable } from '@ares/core/arrays';

// Used internally in components for advanced functionality
```

### Dynamic Options Management
The Text component supports dynamic options for autocomplete:

```javascript
<Text
    name="country"
    type="select"
    options={[
        { key: 'it', value: 'Italy' },
        { key: 'us', value: 'United States' },
        { key: 'fr', value: 'France' }
    ]}
/>
```

### Advanced Validation
Support for regex validation and custom rules:

```javascript
<Text
    name="phone"
    type="tel"
    regex={/^\+?[1-9]\d{1,14}$/}
    required={true}
    errorMessage="Invalid phone number"
/>
```

### Internationalization
Support for automatically translated text:

```javascript
import {TranslatedText} from '@ares/react-native-ui';

<TranslatedText
  text="welcome.message"
/>
```

## Native Setup Notes

Some components require additional native setup in the host app:

- `react-native-gesture-handler`: follow RN docs (entry import + Babel/Metro integration as required by your setup).
- `react-native-reanimated`: enable the Babel plugin in the app (`react-native-reanimated/plugin`).
- `react-native-maps`: requires native configuration and (often) API keys.
- `@react-native-google-signin/google-signin`: requires native configuration (iOS/Android client ids).
- `react-native-vector-icons`: requires linking/font setup depending on your RN version.
- `react-native-webview`: required by media components that render HTML/embeds.

## Dev Harness

When using `@ares/react-native-ui-dev`, `ApplicationRoot` can read `./.tmp/ares-rn-args.json` to choose which component to render. Supported keys: `path | component | render`. In normal apps this file is typically absent and the behavior is a no-op.

## Integration with External Libraries

### React Hook Form
Native integration with React Hook Form for advanced form management.

### React Native Modal
Uses react-native-modal for advanced modals.

### React Native Gesture Handler
Support for advanced gestures and touch input.

## Main Dependencies

- `@react-native-async-storage/async-storage` - Async storage
- `@react-native-community/datetimepicker` - Date/time picker
- `@react-native-google-signin/google-signin` - Google authentication
- `@react-navigation/native-stack` - Navigation
- `@reduxjs/toolkit` - State management
- `expo-av` - Audio/Video
- `expo-linking` - Deep linking
- `i18next` - Internationalization
- `lodash` - JavaScript utilities
- `prop-types` - Props validation

## Project Structure

```
components/
├── ApplicationRoot.jsx          # Root component
├── Cache.jsx                    # Cache management
├── Flash.jsx                    # Flash messages
├── input/                       # Input components
│   ├── actions/                 # Actions (buttons, etc.)
│   ├── fields/                  # Input fields
│   └── forms/                   # Form management
├── navigation/                  # Navigation components
└── output/                      # Output components
    ├── debugging/               # Debug tools
    ├── media/                   # Media components
    └── messaging/               # Messaging
```

## License

MIT

## Author

Roberto Stefani

## Repository

[GitHub - ares-react-native-ui](https://github.com/rstefani87info/ares-react-native-ui)

## Notes

This module is designed to accelerate React Native application development by providing ready-to-use UI components, fully integrated with the aReS ecosystem. It's particularly useful for:

- Rapid mobile app development
- UI prototyping
- Enterprise applications
- Apps with internationalization requirements
- Projects requiring consistent UI components
