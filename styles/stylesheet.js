import { StyleSheet } from "react-native";
export * from './styleGroups/blocks';
export * from './styleGroups/typography';

export const icons = StyleSheet.create({
  icon:{width: 24, height: 24, resizeMode: 'contain'},
  icon100: {width: 100, height: 100, resizeMode: 'contain'},
})

export const buttons = fontSize => StyleSheet.create({
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize,
    height: fontSize + 20,
    minHeight: fontSize + 20,
    maxHeight: fontSize + 20,
  },
  icon: {
      // ...icon.style,
      width: fontSize + 20,
      height: fontSize + 20,
      marginTop: -20,
      marginBottom: -20,
    },
});
