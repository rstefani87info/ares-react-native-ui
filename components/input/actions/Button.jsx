import {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import TranslatedText from '../../output/TranslatedText';
import {getElevationStyle, getUiTokens} from '../../../styles';

Button.propTypes = {
  icon:  PropTypes.any,
  style: PropTypes.shape({
    wrapper: PropTypes.any,
    wrapperOnPress: PropTypes.any,
    icon: PropTypes.any,
    iconOnPress: PropTypes.any,
    text: PropTypes.any,
    textOnPress: PropTypes.any,
  }),
  onPress: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
};
export default function Button({
  icon,
  style,
  onPress,
  text,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) {
  const tokens = useMemo(() => getUiTokens(style?.tokens), [style?.tokens]);
  const sizeStyle = useMemo(() => {
    if (size === 'sm') {
      return {paddingVertical: 8, paddingHorizontal: 12, minHeight: 36};
    }
    if (size === 'lg') {
      return {paddingVertical: 14, paddingHorizontal: 16, minHeight: 48};
    }
    return {paddingVertical: 11, paddingHorizontal: 14, minHeight: 42};
  }, [size]);

  const variantStyle = useMemo(() => {
    if (variant === 'secondary') {
      return {
        wrapper: {
          backgroundColor: tokens.colors.surface,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        },
        wrapperOnPress: {backgroundColor: tokens.colors.surface2},
        text: {color: tokens.colors.text},
      };
    }
    if (variant === 'ghost') {
      return {
        wrapper: {backgroundColor: 'transparent'},
        wrapperOnPress: {backgroundColor: tokens.colors.surface2},
        text: {color: tokens.colors.text},
      };
    }
    if (variant === 'danger') {
      return {
        wrapper: {backgroundColor: tokens.colors.danger},
        wrapperOnPress: {backgroundColor: tokens.colors.danger},
        text: {color: tokens.colors.onDanger},
      };
    }
    return {
      wrapper: {backgroundColor: tokens.colors.primary},
      wrapperOnPress: {backgroundColor: tokens.colors.primary},
      text: {color: tokens.colors.onPrimary},
    };
  }, [tokens, variant]);

  const baseStyle = useMemo(() => {
    const baseWrapper = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: tokens.radii.md,
      ...sizeStyle,
      ...getElevationStyle(1),
      opacity: disabled ? 0.55 : 1,
    };
    const baseText = {
      textAlign: 'center',
      fontSize: tokens.typography.size.md,
      fontWeight: tokens.typography.weight.semibold,
      color: tokens.colors.onPrimary,
    };
    return {
      wrapper: [baseWrapper, variantStyle.wrapper, style?.wrapper],
      wrapperOnPress: [variantStyle.wrapperOnPress, style?.wrapperOnPress],
      icon: [style?.icon],
      iconOnPress: [style?.icon, style?.iconOnPress],
      text: [baseText, variantStyle.text, style?.text],
      textOnPress: [variantStyle.text, style?.text, style?.textOnPress],
    };
  }, [disabled, sizeStyle, tokens, variantStyle, style]);

  const handlePress = useCallback(
    () => {
    if (disabled) {
      return;
    }
    if (typeof onPress === 'function') {
      onPress();
    }
  }, [disabled, onPress]);

  return (
    <Pressable
      style={({pressed}) => [
        baseStyle.wrapper,
        pressed ? baseStyle.wrapperOnPress : null,
      ]}
      onPress={
        handlePress
        }
      disabled={disabled}>
      {({pressed}) => (
        <>
          {icon && icon instanceof Function && icon({
            style: pressed ? baseStyle.iconOnPress : baseStyle.icon,
          })}
          {text && typeof text === 'string' && (
            <TranslatedText
              style={[baseStyle.text, pressed ? baseStyle.textOnPress : null]}
              text={text}
            />
          )}
          {text && typeof text !== 'string' && text}
        </>
      )}
    </Pressable>

  );
}
