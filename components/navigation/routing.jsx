/**
 * @author Roberto Stefani
 */

import {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PanResponder, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const SafeAreaViewStyle = {flex: 1};

const componentWrapper = (Component, swipeHandlers = {}) => props => {
  const {onSwipeRight, onSwipeLeft, onSwipeUp, onSwipeDown} = swipeHandlers || {};
  const hasSwipeHandlers =
    typeof onSwipeRight === 'function' ||
    typeof onSwipeLeft === 'function' ||
    typeof onSwipeUp === 'function' ||
    typeof onSwipeDown === 'function';

  const panResponder = useMemo(() => {
    if (!hasSwipeHandlers) {
      return null;
    }

    const minDistance = 48;
    const minVelocity = 0.3;

    const shouldSet = (_, gestureState) => {
      const {dx, dy, vx, vy} = gestureState;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const absVx = Math.abs(vx);
      const absVy = Math.abs(vy);

      return (
        (absDx >= minDistance && absVx >= minVelocity) ||
        (absDy >= minDistance && absVy >= minVelocity)
      );
    };

    return PanResponder.create({
      onMoveShouldSetPanResponder: shouldSet,
      onMoveShouldSetPanResponderCapture: shouldSet,
      onPanResponderRelease: (_, gestureState) => {
        const {dx, dy} = gestureState;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx >= absDy) {
          if (dx > 0 && typeof onSwipeRight === 'function') {
            onSwipeRight(gestureState);
          } else if (dx < 0 && typeof onSwipeLeft === 'function') {
            onSwipeLeft(gestureState);
          }
          return;
        }

        if (dy > 0 && typeof onSwipeDown === 'function') {
          onSwipeDown(gestureState);
        } else if (dy < 0 && typeof onSwipeUp === 'function') {
          onSwipeUp(gestureState);
        }
      },
    });
  }, [hasSwipeHandlers, onSwipeRight, onSwipeLeft, onSwipeUp, onSwipeDown]);

  const panHandlers = panResponder?.panHandlers || {};

  return (
    <SafeAreaView style={SafeAreaViewStyle} {...panHandlers}>
      <Component {...props} />
    </SafeAreaView>
  );
};

export function NativeStackNavigator ({pages}) {
  const Stack = createNativeStackNavigator();
  const webScreens = { };

  pages.forEach(({name}) => {
    webScreens[name] = name;
  });

  const createNativeStackPage = ({
    name,
    component,
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    onSwipeDown,
  }) => (
    <Stack.Screen
      key={name}
      name={name}
      component={componentWrapper(component, {
        onSwipeRight,
        onSwipeLeft,
        onSwipeUp,
        onSwipeDown,
      })}
    />
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={{
          prefixes: ['place4party://'],
          config: {screens: webScreens},
        }}
        fallback={<Text>Loading...</Text>}>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{headerShown: false, animation: 'fade'}}>
          {pages.map(page => createNativeStackPage(page))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
