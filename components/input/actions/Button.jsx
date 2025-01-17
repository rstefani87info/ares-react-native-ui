import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Pressable, View} from 'react-native';
import TranslatedText from '../../output/TranslatedText';

Button.propTypes = {
  icon:  PropTypes.any,
  style: PropTypes.shape({
    wrapper: PropTypes.any,
    wrapperOnPress: PropTypes.any,
    icon: PropTypes.any,
    iconOnPress: PropTypes.any,
    text: PropTypes.any,
    textOnPress: PropTypes.any
  }),
  onPress: PropTypes.func,
  text: PropTypes.string,
};
export default function Button({
  icon,
  style,
  onPress,
  text,
}) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [wrapperStyle, setWrapperStyle] = React.useState(style?.wrapper );
  const [iconStyle, setIconStyle] = React.useState(style?.icon);
  const [textStyle, setTextStyle] = React.useState(style?.text ?? {textAlign: 'center'});
  const handlePress = useCallback(
    () => {
    setIsPressed(true);
    onPress();
    setTimeout(() => setIsPressed(false), 500);
  });

  useEffect(() => {
    if(isPressed){    
      setWrapperStyle({...style?.wrapper,...style?.wrapperOnPress} );
      setIconStyle({...style?.icon,...style?.iconOnPress} );
      setTextStyle({...style?.text,...style?.text}  ?? {textAlign: 'center'});
    }
    else {
      setWrapperStyle(style?.wrapper);
      setIconStyle(style?.icon);
      setTextStyle(style?.text ?? {textAlign: 'center'});
    }
  }, [isPressed,style]);
  
  return (
    <Pressable
      style={wrapperStyle}
      onPress={
        handlePress
        } >
      {icon && icon instanceof Function &&  icon({style:iconStyle}) }
      {text && <TranslatedText style={textStyle} text={text}/> } 
    </Pressable>

  );
}
