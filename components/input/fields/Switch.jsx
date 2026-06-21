import { forwardRef } from 'react';
import { View, Switch as RNSwitch } from 'react-native';
import PropTypes from 'prop-types';
import TranslatedText from '../../output/TranslatedText';
import {getUiTokens} from '../../../styles';


const SwitchField = forwardRef(
 ( {id,
  name,
  placeholder,
  style,
  labelDirection = 'right',

  onChange,
  onValueChange,
  onPress,
 ...props
  },ref ) =>  (
    (() => {
      const tokens = getUiTokens();
      const wrapperStyle = [
        {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10},
        style?.wrapper,
      ];
      const labelStyle = [
        {color: tokens.colors.text, fontSize: tokens.typography.size.md, fontWeight: tokens.typography.weight.medium},
        style?.label,
      ];
      const inputStyle = [style?.input];
      const trackColor = style?.trackColor ?? {false: tokens.colors.border, true: tokens.colors.primary};
      const thumbColor = style?.thumbColor;
      return (
        <View style={wrapperStyle}>
        {labelDirection === 'left' && <TranslatedText style={labelStyle} text={placeholder}/>}
      <RNSwitch
        id={id}
        name={name}
        style={inputStyle}
        onChange={onChange}
        onValueChange={onValueChange}
        onPress={() => (typeof onPress === 'function' ? onPress() : null)}
        trackColor={trackColor}
        thumbColor={thumbColor}
        {...props}
      />
      {labelDirection === 'right' && <TranslatedText style={labelStyle} text={placeholder}/>}

      </View>
      );
    })()
  ));


  SwitchField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    style: PropTypes.object,
    labelDirection: PropTypes.oneOf(['left', 'right']),
  };

export default SwitchField;
