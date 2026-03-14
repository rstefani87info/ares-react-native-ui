import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as ARESContext from '@ares/react-native-ui/contexts/ARESContext';

export default function ApplicationRoot({ children }) {
  let components = children??[];
  try {
    const config = require("../../../../.tmp/ares-rn-args.json");
    if (config?.path) {
      const resolvedPath = require(config.path);
      let testingComponents = resolvedPath.default() || Object.values(resolvedPath).filter((c) => typeof c === "function").map(c=>c())[0];
      if (testingComponents) {
        components = testingComponents;
      }
    }
  } catch (e) {
    console.warn("No custom component found or error in path.", e);
  }
  console.log("components", components);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ARESContext.ARESProvider>
          {children}
      </ARESContext.ARESProvider>
    </GestureHandlerRootView>
  );
}
