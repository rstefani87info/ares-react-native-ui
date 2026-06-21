import React from 'react';
import {View} from 'react-native';
import * as ARESContext from '@ares/react-native-ui/contexts/ARESContext';

export default function ApplicationRoot({children, resolveChildren}) {
  let RootView = View;
  try {
    const gestureHandler = require('react-native-gesture-handler');
    if (typeof gestureHandler?.GestureHandlerRootView === 'function') {
      RootView = gestureHandler.GestureHandlerRootView;
    }
  } catch {}

  let resolved = typeof resolveChildren === 'function' ? resolveChildren(children) : children;
  // if (typeof resolveChildren !== 'function') {
  //   try {
  //     const rawArgs = require('../../../../.tmp/ares-rn-args.json');
  //     const args = Array.isArray(rawArgs) ? Object.fromEntries(rawArgs) : rawArgs;
  //     const resolvedNode = args?.resolvedChildren;
  //     if (resolvedNode !== undefined && resolvedNode !== null) {
  //       resolved = resolvedNode;
  //     }
  //   } catch {}
  // }

  const normalizedChildren = React.Children.toArray(resolved);
  const rootStyle = {flex: 1};
  return (
    <RootView style={rootStyle}>
      <ARESContext.ARESProvider>
        {normalizedChildren}
      </ARESContext.ARESProvider>
    </RootView>
  );
}
