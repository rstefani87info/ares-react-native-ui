import PropTypes from 'prop-types';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import TranslatedText from '../../output/TranslatedText';
import { getUiTokens } from '../../../styles';

function normalizeBoolish(value) {
  if (value === true || value === 1 || value === '1') {
    return 1;
  }
  if (value === false || value === 0 || value === '0') {
    return 0;
  }
  if (value === undefined || value === null) {
    return null;
  }
  return value;
}

const CheckBox = forwardRef((
  {
    id,
    name,
    placeholder,
    style,
    value: controlledValue,
    onChange,
    onValueChange,
    onPress,
    nullable = false,
    useColorOnLabel = false,
    labelDirection = 'right',
    ...props
  },
  ref,
) => {
  const tokens = useMemo(() => getUiTokens(style?.tokens), [style?.tokens]);
  const [internalValue, setInternalValue] = useState(null);
  const value = controlledValue === undefined ? internalValue : controlledValue;
  const normalized = normalizeBoolish(value);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(normalizeBoolish(controlledValue));
    }
  }, [controlledValue]);

  const nextValue = useCallback(() => {
    const current = normalizeBoolish(value);
    if (nullable) {
      if (current === 1) {return 0;}
      if (current === 0) {return null;}
      return 1;
    }
    return current === 1 ? 0 : 1;
  }, [nullable, value]);

  const applyValue = useCallback((next) => {
    if (controlledValue === undefined) {
      setInternalValue(next);
    }
    if (typeof onValueChange === 'function') {
      onValueChange(next);
    }
    if (typeof onChange === 'function') {
      onChange(next);
    }
  }, [controlledValue, onChange, onValueChange]);

  const handlePress = useCallback((...params) => {
    const next = nextValue();
    applyValue(next);
    if (typeof onPress === 'function') {
      onPress(...params);
    }
  }, [applyValue, nextValue, onPress]);

  useImperativeHandle(ref, () => ({
    getValue: () => normalizeBoolish(value),
    setValue: (v) => applyValue(normalizeBoolish(v)),
    toggle: () => handlePress(),
  }), [applyValue, handlePress, value]);

  const isChecked = normalized === 1;
  const isIndeterminate = normalized === null && nullable;
  const markText = isChecked ? '\u2714' : (isIndeterminate ? '?' : '');

  const wrapperStyle = [
    {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.sm},
    style?.wrapper,
  ];

  const baseBoxStyle = {
    width: 24,
    height: 24,
    borderRadius: tokens.radii.sm,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: tokens.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const stateBoxStyle = isChecked
    ? {backgroundColor: tokens.colors.primary, borderColor: tokens.colors.primary}
    : isIndeterminate
      ? {backgroundColor: tokens.colors.surface2, borderColor: tokens.colors.border}
      : null;

  const boxStyle = [
    baseBoxStyle,
    stateBoxStyle,
    style?.box,
    isChecked ? style?.boxChecked : null,
    isIndeterminate ? style?.boxIndeterminate : null,
  ];

  const labelColor = useColorOnLabel
    ? (isChecked ? tokens.colors.success : (isIndeterminate ? tokens.colors.textMuted : tokens.colors.danger))
    : tokens.colors.text;

  const labelStyle = [
    {color: labelColor, fontSize: tokens.typography.size.md, fontWeight: tokens.typography.weight.medium},
    style?.label,
  ];

  const markStyle = [
    {color: isChecked ? tokens.colors.onPrimary : tokens.colors.textMuted, fontSize: 14, fontWeight: tokens.typography.weight.bold},
    style?.mark,
  ];

  return (
    <View style={wrapperStyle}>
      {labelDirection === 'left' ? (
        <Pressable onPress={handlePress} hitSlop={8}>
          <TranslatedText text={placeholder} style={labelStyle} />
        </Pressable>
      ) : null}
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{checked: isChecked}}
        onPress={handlePress}
        hitSlop={8}
        style={boxStyle}
        {...props}
      >
        <TranslatedText text={markText} style={markStyle} />
      </Pressable>
      {labelDirection === 'right' ? (
        <Pressable onPress={handlePress} hitSlop={8}>
          <TranslatedText text={placeholder} style={labelStyle} />
        </Pressable>
      ) : null}
    </View>
  );
});

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onPress : PropTypes.func,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  nullable: PropTypes.bool,
  useColorOnLabel: PropTypes.bool,
  labelDirection: PropTypes.oneOf(['left', 'right']),
  value: PropTypes.any,
};

export default CheckBox;
