import { forwardRef } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import TranslatedText from "../../output/TranslatedText";


const CheckBox = forwardRef(
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
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    {labelDirection === 'left' && <TranslatedText text={placeholder}/>}
      <Switch
        id={id}
        name={name}
        style={style?.input}
        onChange={() => onChange}
        onValueChange={() => onValueChange}
        onPress={() => onPress && onPress instanceof Function ? onPress() : null}
        {...props}
      />
      {labelDirection === 'right' && <TranslatedText text={placeholder}/>}

      </View>
  ));
 

  CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    style: PropTypes.object,
    labelDirection: PropTypes.oneOf(['left', 'right']),
  };