import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "./Text.jsx";

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    labelDirection: PropTypes.oneOf(['left', 'right']),
  };
export function CheckBox(
  {id,
  name,
  placeholder,
  style,
  labelDirection = 'right',
  ref,
  onChange,
  onValueChange,
  onPress,
 ...props
  }
) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    {labelDirection === 'left' && <Text>{placeholder}</Text>}
      <Switch
        id={id}
        name={name}
        style={style?.input}
        onChange={() => onChange}
        onValueChange={() => onValueChange}
        onPress={() => onPress && onPress instanceof Function ? onPress() : null}
        {...props}
      />
      {labelDirection === 'right' && <Text>{placeholder}</Text>}

      </View>
  );
}

 