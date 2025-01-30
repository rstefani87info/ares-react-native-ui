import React, {
  createRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import {
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import Modal from 'react-native-modal';
import { TextInput } from "react-native-gesture-handler";
import _ from "lodash";
import PropTypes from "prop-types";
import DateTimePicker from '@react-native-community/datetimepicker';
import dateAndTime from '@ares/core/datesAndTime';
import { useFormContext } from "react-hook-form";
import Button from "../actions/Button";
import useLocales from "../../../locales/useLocales";


const Text = forwardRef(( {
  id,
  name,
  type="text",
  placeholder,
  options=[],
  style,
  onChange,
  onChangeValue,
  onKeyPress,
  onFocus,
  onBlur,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  onLayout,
  getOptionValue,
  getOptionText,
  addOption=true,
  sortOptions,
  ignoreCase=true,
  showList=true,
  ...props
},ref) => {
  if (!getOptionValue) getOptionValue = (item) => item;
  if (!getOptionText) getOptionText = (item) => item;
  if (!sortOptions) sortOptions = (a, b) => 0;
  const { translate } = useLocales();
  let typeAsset = {
    keyboardType: "default",
  };

  const [optionList, setOptionList] = useState(options.sort(sortOptions) ?? []);
  const [open, setOpen] = useState(false);


  const getItemByValue = (value) => {
    const filtered = optionList.filter((x) => value === getOptionValue(x));
    return filtered?.length === 1 ? filtered[0]: null;
  };

  const setFieldValue = (item) => {
    if (item && typeof item === "string") {
      item = getItemByText(item);
      if (!item && addOption) {
        item = addOption(item);
        setOptionList([...optionList, item].sort(sortOptions));
      }
    }
    if (item) {
      if (formContext.setValue)formContext.setValue(name, getOptionValue(item));
      setTextInputValue(getOptionText(item));
    }
  };
  const getTextInputValue = () => {
    const currentValue =
      reference?.current?.value || reference?.current?._lastNativeText;
    return currentValue;
  };
  const setTextInputValue = (value) => {
    reference?.current?.setNativeProps({ text: value });
  };

  React.useEffect(() => {
    if (true === addOption && addOption instanceof Function)
      addOption = (item) => {
        setOptionList([...optionList, item].sort(sortOptions));
      };
  }, [options, sortOptions]);

  const comparer = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
  if (!sortOptions)
    sortOptions = (a, b) =>
      ignoreCase
        ? comparer(`${a}`.toLowerCase(), `${b}`.toLowerCase())
        : comparer(`${b}`, `${a}`);

        const formContext = useFormContext();
  const initialValue = formContext.getValues ? formContext.getValues(name) : "";
  setTextInputValue(getItemByValue(initialValue));
  const watchedValue = formContext.watch ? formContext.watch(name) :null;
  useEffect(() => {
    if (watchedValue !== getTextInputValue()) {
      setTextInputValue(getItemByValue(watchedValue));
    }
  }, [watchedValue]);
  React.useEffect(() => {
    if(formContext.register) formContext.register(name);
  }, [formContext, name]);

  const reference = ref ?? createRef();

  const handleOutsideClick = () => {
    setOpen(false);
    Keyboard.dismiss();
  };

  const handleInputChange = useCallback(
    _.debounce((text) => {
      if (onChangeValue) onChangeValue({ targetRef: reference, value: text });
      if(optionList.length > 0) setOpen(true);
    }, 300),
    [reference, onChangeValue]
  );


  const filterData = () =>
    optionList.filter((item) => {
      const itemString = `${getOptionText(item)}`;
      const currentValue = `${getTextInputValue()}`;
      return ignoreCase
        ? itemString.toLowerCase().includes(currentValue.toLowerCase())
        : itemString.includes(currentValue);
    }) ?? [];

  const filteredOptions = useMemo(() => {
    return filterData();
  }, [optionList]);


  const isCurrent = (item) => {
    const itemString = getOptionText(item);
    const currentValue = getTextInputValue();
    return isEqual(itemString, currentValue);
  };

  const isEqual = (a, b) =>
    ignoreCase
      ? `${a}`.toLowerCase() === `${b}`.toLowerCase()
      : `${b}` === `${a}`;

  const getCurrentItem = () => {
    const currentValue = getTextInputValue();
    return getItemByText(currentValue);
  };

  const getItemByText = (text) => {
    const filtered = optionList.filter((x) => isEqual(text, getOptionText(x)));
    if (filtered && filtered.length === 1) return filtered[0];
    else if (!filtered || filtered.length === 0) return null;
  };

  
 

  const getCurrentItemIndex = () => {
    const currentValue = getTextInputValue();
    let index = -1;
    optionList.forEach((x, i) => {
      const equals = index === -1 && isEqual(currentValue, getOptionText(x));
      index = equals ? i : index;
      return equals;
    });
    return index;
  };

  const getNext = () => {
    const index = getCurrentItemIndex();
    if (index === -1) throw new Error("No current item");
    let nextIndex = index + 1;
    if (nextIndex >= optionList.length) nextIndex = 0;
    const nextItem = optionList[nextIndex];
    return nextItem;
  };

  useImperativeHandle(ref, () => ({
    isCurrent,
    setValue: setFieldValue,
    getItemByText,
    getItemByValue,
    getCurrentItem,
    getCurrentItemIndex,
    getNext,
    open,
    setOpen,
    optionList,
    setOptionList,
  }));


  let regex = null;
  let additionalComponent = {render:null,trigger:null};

  const types={
    number:{typeAsset:{keyboardType:"numeric"},regex:/^[0-9]*$/},
    tel:{typeAsset:{keyboardType:"phone-pad"},regex:/^[+\d-\s\.\\\/]$/},
    email:{typeAsset:{keyboardType:"email-address"},regex:/^[\w\._%+-@]$/},
    password:{typeAsset:{secureTextEntry:true}},
    url:{typeAsset:{keyboardType:"url"}},
    date:{typeAsset:{keyboardType:"phone-pad"}, onLoad: onTimingType},
    datetime:{typeAsset:{keyboardType:"phone-pad"}}, onLoad: onTimingType,
    time:{typeAsset:{keyboardType:"phone-pad"}, onLoad: onTimingType},
    countdown:{typeAsset:{keyboardType:"phone-pad"}, onLoad: onTimingType},
  };
  
  const onTimingType =()=>{
      const {currentLanguage} = useLocales();
      props.editable = false;
      const [show, setShow] = useState(false);
      const dateFormat = currentLanguage[type];
      const is24Hour = dateFormat.includes("HH");
      const getDateTime = () => {
        const stringDate = getTextInputValue();
        const date = dateAndTime.parse(stringDate,dateFormat);
        return date;
      }
      const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setTextInputValue(dateAndTime.format(currentDate,dateFormat,dateFormat));
      };

      const pickerTrigger = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

      const showDatepicker = () => {
        {show && (type==='date'||type==='datetime'||type==='time') && (
         <> <Button showIcon={() => <Icon name="calendar-alt"/> } onPress={pickerTrigger} />
          <DateTimePicker
            testID="dateTimePicker"
            value={getDateTime()}
            mode={mode}
            is24Hour={is24Hour}
            onChange={onDateChange}
          /></>
        )}      
      }
      additionalComponent = showDatepicker();
  }
    
  typeAsset = type in types ?types[type].typeAsset :typeAsset;
  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View><View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <TextInput
          key={`${id}-input${new Date().getTime()}`}
          ref={reference}
          {...typeAsset}
          placeholder={translate(placeholder)}
          onChange={() => {
            if (onChange)
              onChange({ targetRef: reference, value: getTextInputValue() });
          }}
          onChangeText={handleInputChange}
          onBlur={() => {
            setOpen(false);
            if (onBlur)
              onBlur({
                targetRef: reference,
                value: getTextInputValue(),
                target: e.nativeEvent.target,
              });

            const item = getCurrentItem();
            if (!item && !addOption) {
              setTextInputValue("");
            }
          }}
          onFocus={(e) => {
            if (!addOption) setOpen(true);
            if (onFocus)
              onFocus({
                targetRef: reference,
                value: getTextInputValue(),
                target: e.nativeEvent.target,
              });
          }}
          onKeyPress={(e) => {
            const text = getTextInputValue();
            if (regex &&!regex.test(e.nativeEvent.key)) {
              setTextInputValue(text.replace(e.nativeEvent.key, ""));
              return;
            }
            setFieldValue(text);
            handleInputChange(text);
            if (onKeyPress)
              onKeyPress({
                targetRef: reference,
                value: text,
                key: e.nativeEvent.key,
              });
          }}
          onPress={() => {
            if (!addOption) setOpen(showList && !open);
            if (onPress)
              onPress({ targetRef: reference, value: getTextInputValue() });
          }}
          onPressIn={(e) => {
            if (onPressIn)
              onPressIn({
                targetRef: reference,
                value: getTextInputValue(),
                locationX: e.nativeEvent.locationX,
                locationY: e.nativeEvent.locationY,
              });
          }}
          onPressOut={(e) => {
            if (onPressOut)
              onPressOut({
                targetRef: reference,
                value: getTextInputValue(),
                locationX: e.nativeEvent.locationX,
                locationY: e.nativeEvent.locationY,
              });
          }}
          onLongPress={(e) => {
            if (onLongPress)
              onLongPress({
                targetRef: reference,
                value: getTextInputValue(),
                locationX: e.nativeEvent.locationX,
                locationY: e.nativeEvent.locationY,
              });
          }}
          onLayout={(e) => {
            if (onLayout)
              onLayout({
                targetRef: reference,
                value: getTextInputValue(),
                locationX: e.nativeEvent.x,
                locationY: e.nativeEvent.y,
                width: e.nativeEvent.width,
                height: e.nativeEvent.height,
              });
          }}
          style={style?.input ?? {minWidth: '100%', backgroundColor:'WHITE', borderColor:'GREY', borderWidth: 1}}
          {...props}
        />
        {!addOption && showList && (
          <Button
            id={`${id}_open_action`}
            text={open ? "\u25B2" : "\u25BC"}
            onPress={() => {
              setOpen(!open);
            }}
            style={[style?.button, style?.action, style?.actions['add']]}
          />
        )}
      </View>

      <Modal
        isVisible={open}
        // transparent={true}
        animationIn="slideInUp" 
        animationOut="slideOutDown"
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList
            id={`${id}_options`}
            keyExtractor={(x) => getOptionValue(x)}
            data={filteredOptions}
            style={style?.options}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            renderItem={({ item }) => (
              <Button
                id={`${id}_option[${getOptionValue}]`}
                text={getOptionText(item)}
                onPress={() => {
                  setFieldValue(item);
                  setOpen(false);
                }}
                style={[
                  ...style?.option,
                  isCurrent(item)
                    ? {
                        ...style?.selectedOption,
                      }
                    : {},
                ]}
              />
            )}
          />
        </View>
      </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
});

Text.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  style: PropTypes.object,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onLongPress: PropTypes.func,
  onLayout: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.any),
  getOptionValue: PropTypes.func,
  getOptionText: PropTypes.func,
  addOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  sortOptions: PropTypes.func,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ignoreCase: PropTypes.bool,
  showList: PropTypes.bool,
};
export default Text;
