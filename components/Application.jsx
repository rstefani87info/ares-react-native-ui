import React from "react";
import { SafeAreaView } from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ARESProvider} from '@ares/react-native-ui/contexts/ARESContext';

export default function Application({ children }) {
  let Component = () => <>{...children}</>;

  try {
    const config = require("./.tmp/ares-rn-args.json");
    if (config?.path) {
      const resolvedPath = require(config.path);
      Component = resolvedPath.default || resolvedPath;
    }
  } catch (e) {
    console.warn("No custom component found or error in path.", e);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ARESProvider>
        <SafeAreaView>
          <Component />
        </SafeAreaView>
      </ARESProvider>
    </GestureHandlerRootView>
  );
}
