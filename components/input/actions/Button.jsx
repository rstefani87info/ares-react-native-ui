import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View, Alert} from 'react-native';
import {globalStyle, themes} from '../../../styles';
import * as i18n from '../../../locales/i18n';
import {getStyle} from "../../../utils/style";

Button.propTypes = {
  url: PropTypes.string,
  showIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  onPressStyle: PropTypes.object,
  onPress: PropTypes.func,
  text: PropTypes.string,
  textStyle: PropTypes.object,
};
export default function Button({
  showIcon=null,
  style,
  onPress,
  text,
  textStyle,
  height = 24,
}) {
  const [isPressed, setIsPressed] = React.useState(false);
  const handlePress = () => {
    setIsPressed(true);
    onPress();
    setTimeout(() => setIsPressed(false), 1000);
  };
  return (
    <TouchableOpacity
      style={ 
        [isPressed ? getStyle(style[':onPress']) : getStyle(style), {height}]
        [getStyle(style)]

      }
      onPressIn={handlePress} >
      {showIcon && (
        <Image 
          source={showIcon} 
          style={ 
            [isPressed ? getStyle(style[':onPress'],'icon') : getStyle(style), {height}]
            [getStyle(style,'icon')]} 
        />
      )}
      <View style={
        [isPressed ? getStyle(style[':onPress'],'text') : getStyle(style), {height}]
        [getStyle(style,'text')]
        } >
        {text && i18n.TranslateAsTextNode(text,undefined,[textStyle, { textAlign: 'center' }])}
      </View>
    </TouchableOpacity>

  );
}
