import { Text as RNText, StyleSheet, Platform, StyleProp, TextStyle } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type TextProps = {
  content?: string | number | React.ReactNode;
  type?: string
  style?: StyleProp<TextStyle> | undefined;
};

export function Text({
  content,
  type = 'default',
  style = undefined,
}: TextProps) {
  if (Platform.OS === 'web') {
    return (
      type === 'default' && <h1>{content}</h1>
    );
  } else {
    return (
      <RNText
        style={[
          style,
        ]}>
        {content}
      </RNText>
    );
  }
}


