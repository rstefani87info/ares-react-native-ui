import { ActivityIndicator, View } from 'react-native';
import TranslatedText from './TranslatedText';
import {getUiTokens} from '../../styles';

export default function Loading({text = 'Loading...', style}) {
    const tokens = getUiTokens();
    const baseWrapperStyle = {
      padding: tokens.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
    };
    return (
        <View
          style={[
            baseWrapperStyle,
            style?.wrapper,
          ]}>
            <ActivityIndicator size="small" color={tokens.colors.primary} />
            <TranslatedText
              text={text}
              style={[
                {color: tokens.colors.textMuted, fontSize: tokens.typography.size.sm},
                style?.text,
              ]}
            />
        </View>
    );
}
