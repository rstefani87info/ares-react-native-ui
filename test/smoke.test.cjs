const React = require('react');
const renderer = require('react-test-renderer');

jest.mock('react-native', () => {
  const React = require('react');
  const make = (name) => ({children, ...props}) => React.createElement(name, props, children);

  return {
    View: make('View'),
    Text: make('Text'),
    TouchableOpacity: make('TouchableOpacity'),
    Pressable: make('Pressable'),
    Modal: ({children}) => React.createElement(React.Fragment, null, children),
    StyleSheet: {create: (styles) => styles},
    Dimensions: {
      get: () => ({width: 0, height: 0}),
    },
    PermissionsAndroid: {
      request: jest.fn(() => Promise.resolve('granted')),
      RESULTS: {GRANTED: 'granted'},
    },
    Platform: {
      OS: 'ios',
      select: (choices) => choices?.ios ?? choices?.default,
    },
    Linking: {
      openURL: jest.fn(() => Promise.resolve()),
    },
  };
});

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  return {
    GestureHandlerRootView: ({children}) => React.createElement(React.Fragment, null, children),
    TextInput: 'TextInput',
    ScrollView: ({children}) => React.createElement(React.Fragment, null, children),
  };
});

jest.mock('react-native-modal', () => {
  const React = require('react');
  return ({children}) => React.createElement(React.Fragment, null, children);
});

jest.mock('react-native-device-info', () => ({
  getUniqueId: jest.fn(() => Promise.resolve('device-id')),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve({})),
    signOut: jest.fn(() => Promise.resolve({})),
  },
  statusCodes: {},
}));

jest.mock('react-native-localize', () => ({
  getLocales: () => [{languageTag: 'en-US', languageCode: 'en', countryCode: 'US'}],
  getCountry: () => 'US',
}));

test('ApplicationRoot renders with minimal aReS config', async () => {
  const {act} = renderer;
  const {View} = require('react-native');
  const {setConfig} = require('../config.js');
  const ApplicationRoot = require('../components/ApplicationRoot.jsx').default;

  setConfig({
    logger: {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    },
    ares: {
      datasourceListToBeInstalled: [],
      datasourceMap: {},
      initAllDatasources: jest.fn(async () => {}),
    },
  });

  await act(async () => {
    renderer.create(
      React.createElement(
        ApplicationRoot,
        {resolveChildren: () => React.createElement(View, null)},
        React.createElement(View, null),
      ),
    );
  });
});

test('Text field renders', () => {
  const {act} = renderer;
  const Text = require('../components/input/fields/Text/index.jsx').default;

  act(() => {
    renderer.create(React.createElement(Text, {id: 'text', name: 'text', options: [], style: {input: {}}}));
  });
});

test('Modal renders', () => {
  const {act} = renderer;
  const {Modal} = require('../components/output/Modal.jsx');

  act(() => {
    renderer.create(
      React.createElement(Modal, {
        title: 't',
        message: 'm',
        actions: {ok: () => {}},
        behavior: {closeOnOutClick: false, keepStatusAfterClose: false},
        reset: () => {},
      }),
    );
  });
});
