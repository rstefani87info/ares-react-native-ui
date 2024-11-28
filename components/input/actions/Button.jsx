import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import {getStyle} from '../../../styles';
import {i18n} from '../../../locales';

Button.propTypes = {
  url: PropTypes.string,
  icon:  PropTypes.any,
  style: PropTypes.object,
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
  const [wrapperStyle, setWrapperStyle] = React.useState(getStyle(style) ?? {});
  const [iconStyle, setIconStyle] = React.useState(getStyle(style,'icon') ?? {});
  const [textStyle, setTextStyle] = React.useState(getStyle(style,'text') ?? {textAlign: 'center'});
  // const handlePress = async () => {
  //   console.log('pressed');
  //   setIsPressed(true);
  //   await onPress();
  //   setTimeout(() => setIsPressed(false), 500);
  // };

  useEffect(() => {
    if(isPressed){    
      setWrapperStyle(Object.assign({},getStyle(style) ?? {},getStyle(style[':onPress']) ?? {}));
      setIconStyle(Object.assign({}, getStyle(style,'icon') ?? {},getStyle(style[':onPress'],'icon') ?? {}));
      setTextStyle(Object.assign({} , getStyle(style,'text') ?? {},getStyle(style[':onPress'],'text') ?? {textAlign: 'center'}));
    }
    else {
      setWrapperStyle(getStyle(style) ?? {});
      setIconStyle(getStyle(style,'icon') ?? {});
      setTextStyle(getStyle(style,'text') ?? {textAlign: 'center'});
    }
  }, [isPressed,style,getStyle]);
  
  return (
    <Pressable
      style={wrapperStyle}
      onPress={
        onPress
        } >
      {icon && icon instanceof Function &&  icon({style:iconStyle}) }
      {text && i18n.TranslateAsTextNode({text,style:textStyle}) } 
    </Pressable>

  );
}
