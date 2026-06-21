import { View } from 'react-native';
import TranslatedText from './output/TranslatedText';
import {getElevationStyle, getUiTokens} from '../styles';

export default function Flash({text, style, variant = 'info'}) {
    const tokens = getUiTokens();
    const hasStructuredStyle = !!style && (style.wrapper || style.text);
    const wrapperStyle = hasStructuredStyle ? style.wrapper : null;
    const textStyle = hasStructuredStyle ? style.text : style;
    const variantStyle =
      variant === 'danger'
        ? {backgroundColor: '#FEF2F2', borderColor: '#FECACA', textColor: tokens.colors.danger}
        : variant === 'success'
          ? {backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', textColor: tokens.colors.success}
          : variant === 'warning'
            ? {backgroundColor: '#FFFBEB', borderColor: '#FDE68A', textColor: tokens.colors.warning}
            : {backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border, textColor: tokens.colors.text};
    const baseWrapperStyle = {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radii.md,
      borderWidth: 1,
      backgroundColor: variantStyle.backgroundColor,
      borderColor: variantStyle.borderColor,
      ...getElevationStyle(1),
    };

    return (
            <View
              style={[
                baseWrapperStyle,
                wrapperStyle,
              ]}>
              <TranslatedText
                text={text}
                style={[
                  {color: variantStyle.textColor, fontSize: tokens.typography.size.sm, fontWeight: tokens.typography.weight.medium},
                  textStyle,
                ]}
              />
            </View>
    );
}
