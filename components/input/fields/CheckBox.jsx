import PropTypes from "prop-types";
import { View } from "react-native";
import { createRef } from "react";
import { Text } from "./Text.jsx";
import { Button } from "../actions/Button";

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    onValueChange: PropTypes.func,
    onPress : PropTypes.func,
    ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    nullable: PropTypes.bool,
    useColorOnLabel: PropTypes.bool,
    labelDirection: PropTypes.oneOf(['left', 'right']),
  };
export function CheckBox(
  {id,
  name,
  placeholder,
  style,
  onChange,
  onValueChange,
  onPress,
  sortOptions,
  ref,
  nullable,
  useColorOnLabel,
  labelDirection='right',
  }
) {

  const [newStyle, setNewStyle] = useState({input:{ [name]: {width:10, height:10 , borderColor:'grey', borderWidth:1 , ...(style?.input ?? {}) }}});
  const [newLabelStyle, setNewLabelStyle] = useState({label:{ [`${name}_label`]: {width:10, height:10 , borderColor:'grey', borderWidth:1 , ...(style?.placeholder ?? {})}}});
    const getOptionValue = (item) => item.value;
    const getOptionText = (item) => item.text;
    const options = [
      {value:1, text:'\u2714', color:'lime'}, 
      {value:0,  text:' ', color:'red'}
    ];
    if(nullable)options.push({value:undefined, text:'?', color:'silver'});
    const reference = ref ?? createRef();
    const newOnPress = (...params) => {
      const item = reference.next();
      reference.setValue(item);
      if(item.color){
        const overridden = {...newStyle};
        overridden.input[name].color = item.color;
        setNewStyle(overridden);
        if(useColorOnLabel){
          const overriddenLabel = {...newStyle};
          overriddenLabel.input[name].color = item.color;
          setNewLabelStyle(overriddenLabel);
        }
      }
      if(onPress)onPress(...params);
    }

    return <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    { labelDirection === 'left' && <Button
      id={`${id}_label`}
      text={placeholder}
      onPress={newOnPress}
      style={newLabelStyle}
      multiline={false}
      />}
    <Text
      id={id}
      name={name}
      readonly
      style={newStyle}
      onChange={onChange}
      onValueChange={onValueChange}
      onPress={newOnPress}
      sortOptions={sortOptions}
      ref={reference}
      options={options}
      getOptionValue={getOptionValue}
      getOptionText={getOptionText}
      showList={false}
      {...props}
      />{ labelDirection === 'right' && <Button
      id={`${id}_label`}
      text={placeholder}
      onPress={newOnPress}
      style={newLabelStyle}
      multiline={false}
      />}
    </View>
}

 