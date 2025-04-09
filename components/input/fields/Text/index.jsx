import React, {
  createRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import {
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text as Label,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import {useFormContext} from 'react-hook-form';
import PropTypes from 'prop-types';

import Button from '@ares/react-native-ui/components/input/actions/Button';
import {isPrimitive} from '@ares/core/scripts';
import {fuseObjects} from '@ares/core/objects';
import Options from './Options';

const Text = forwardRef(
  (
    {
      id,
      name,
      type = 'text',
      regex,
      required,
      placeholder,
      style,
      onChangeValue,
      onKeyPress,
      onFocus,
      onBlur,
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      onLayout,
      options = [],
      getOptionValue,
      getOptionText,
      getOptionIcon,
      addOption = true,
      sortOptions,
      distinct = false,
      showOptionList = true,
      ignoreCase = true,
      multiple = false,
      ...props
    },
    ref,
  ) => {    
    getOptionValue = getOptionValue ?? (o => (isPrimitive(o) ? o : o.value));
    getOptionText = getOptionText ?? (o => (isPrimitive(o) ? o : o.text));
    sortOptions = sortOptions ?? ((a, b) => getOptionText(a)?.localeCompare(getOptionText(b)) ?? -1);
    const [realValues, setRealValues] = useState(['']);
    const [values, setValues] = useState(['']);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [errors, setErrors] = useState([null]);
    const [optionList, setOptionList] = useState(options);
    const [focusedIndex, setFocusedIndex] = useState(null);


    getOptionIcon =
      getOptionIcon ??
      (o => (isPrimitive(o) ? null : (o.icon ?? o.image ?? null)));
    addOption =
      addOption === true
        ? {
            byText: text => ({text, value: text}),
            byValue: value => ({value, text: value}),
          }
        : addOption;
    const getValueForComparison = value => {
      return ignoreCase && value.toLowerCase ? value.toLowerCase() : value;
    };

    const textRef = useRef([]);

    useEffect(() => {
      textRef.current = textRef.current.slice(0, values.length);
      while (textRef.current.length <= values.length) {
        textRef.current.push(createRef());
      }
    }, [values]);

    // Aggiungi questo useEffect per aggiornare optionList quando cambiano le options
    useEffect(() => {
      setOptionList(options);
    }, [options]);

    const filterOptions = useCallback(
      option => {
        const oText = getValueForComparison(getOptionText(option));
        return values.filter(
          v => { 
            v = getValueForComparison(v ?? '') ;
            return !v || 
            oText?.includes(v) &&
            (!distinct ||
              oText !== v);
        }).length > 0;
      },
      [values, getOptionText, getValueForComparison, distinct],
    );

    const getOptionByText = useCallback(
      text => {
        return optionList.find(
          o => getValueForComparison(o.text) == getValueForComparison(text),
        );
      },
      [optionList],
    );

    const getSelectedOptions = useCallback(() => {
      const opts =
        values.map(
          v => getOptionByText(v) ?? (addOption ? addOption.byText(v) : null),
        ) ?? [];
      if (multiple) {
        return opts;
      }
      return opts.pop();
    }, [values]);

    const getValue = useCallback(() => {
      return getSelectedOptions().map(o => getOptionValue(o));
    }, [getSelectedOptions, getOptionValue]);

    useImperativeHandle(
      ref,
      () => ({
        getReferences: () => {
          return textRef;
        },
        getValue,
        getSelectedOptions,
        setValues: setRealValues,
        setText: setValues,
        setOptions: setOptionList,
      }),
      [textRef],
    );

    const placeholderPress = useCallback((index) => {
      setFocusedIndex(index);
    }, []);

    const onClose = useCallback(() => {
      setFocusedIndex(null)
    }, []);
    const onOptionPress = useCallback(
      option => {
        const newValues = [...values];
        const newRealValues = [...realValues];
        newValues[focusedIndex] = getOptionText(option);
        newRealValues[focusedIndex] = getOptionValue(option);

        const mergedValues = newValues.map((text, i) => ({
          value: newRealValues[i],
          text: text,
        }));
        setValues(newValues);
        setRealValues(newRealValues);
        
        // Notify parent component about the value change
        if (onChangeValue) {
          onChangeValue(multiple ? mergedValues : mergedValues[0]);
        }
        
        onClose();
      },
      [values, focusedIndex, onClose, onChangeValue, multiple, realValues],
    )
    return (
      <View style={style.input}>
        {values.map((value, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              marginBottom: 2,
              marginTop: 2,
              borderWidth: 1,
              borderColor: 'silver',
              borderStyle: 'solid',
              borderRadius: 5,
            }}>
            <Button
              icon={getOptionIcon(value)}
              text={value ?? placeholder ?? '...'}
              style={{wrapper: (style?.multipleInputElement ?? {flex: 1, height:40}), text: {color:'black'}}}
              onPress={()=>placeholderPress(index)}></Button>
              <Button
                  text="x"
                  style={fuseObjects(
                    style?.multipleInputButton,
                    style?.multipleInputButtonCancel,
                    {
                      text: {color: 'red'},
                      wrapper: {
                        width: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderLeftWidth: 1,
                        borderColor: 'silver',
                        borderStyle: 'solid',
                      },
                    },
                  )}
                  onPress={() => {
                    const newValues = values.filter((v, i) => i !== index);
                    setValues(newValues.length > 0 ? newValues : ['']);
                  }}
                />
            <ReactNativeModal
              isVisible={focusedIndex == index}
              onBackdropPress={onClose}
              // onRequestClose={() => setFocusedIndex(null)}
              >
              <View style={{  justifyContent: 'center', alignItems: 'center'}}>
              <View style={[style?.input,{ flexDirection: 'row', height:60}]}>
                <TextInput
                  ref={(el) => { 
                      if (el) {
                        textRef.current[index]=el;
                        setTimeout(() => el.focus(), 60);
                      }
                    }
                  }
                  value={value}
                  style={
                    style?.multipleInputElement ?? {
                      marginLeft: 5,
                      color: 'black',
                      width: '80%',
                      height: 40,
                      backgroundColor: 'white',
                    }
                  }
                  onChangeText={text => {
                    const newValues = values.map((v, i) => (i === index ? text : v));
                    setValues(newValues);
                    
                    // Update real values and notify parent component
                    const newRealValues = [...realValues];
                    newRealValues[index] = text;
                    setRealValues(newRealValues);
                    
                    if (onChangeValue) {
                      onChangeValue(multiple ? newRealValues : newRealValues[0]);
                    }
                    
                    if (text.length > 0) {
                      setOptionsVisible(true);
                    }
                  }}
                  {...props}
                />
                <Button
                  text="x"
                  style={fuseObjects(
                    style?.multipleInputButton,
                    style?.multipleInputButtonCancel,
                    {
                      text: {color: 'red'},
                      wrapper: {
                        width: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderLeftWidth: 1,
                        borderColor: 'silver',
                        borderStyle: 'solid',
                      },
                    },
                  )}
                  onPress={() => {
                    const newValues = values.filter((v, i) => i !== index);
                    const newRealValues = realValues.filter((v, i) => i !== index);
                    
                    setValues(newValues.length > 0 ? newValues : ['']);
                    setRealValues(newRealValues.length > 0 ? newRealValues : ['']);
                    
                    if (onChangeValue) {
                      const mergedValues = newValues.map((text, i) => ({
                        value: newRealValues[i],
                        text: text,
                      }));
                      onChangeValue(multiple ? mergedValues : mergedValues[0]);
                    }
                  }}
                />
              </View>
              <View style={[style?.input,{ flexDirection: 'row'}]}>
              {showOptionList && (
                <Options
                  options={options.filter(filterOptions).sort(sortOptions)}
                  getOptionValue={getOptionValue}
                  getOptionText={getOptionText}
                  getOptionIcon={getOptionIcon}
                  onOptionPress={onOptionPress}
                  addOption={addOption}
                  ignoreCase={ignoreCase}
                  multiple={multiple}
                  visible={optionsVisible}
                  onDismiss={() => setOptionsVisible(false)}
                  style={style?.options}
                />
              )}

              </View>
              </View>
            </ReactNativeModal>
          </View>
        ))}
        {multiple && (
          <Button
            text="+"
            style={
              style?.multipleInputButton ?? {
                wrapper: {
                  color: 'white',
                  backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }
            }
            onPress={() => setValues([...values, ''])}
          />
        )}
        
      </View>
    );
  },
);

Text.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  regex: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  onReset: PropTypes.func,
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
  getOptionIcon: PropTypes.func,
  addOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  sortOptions: PropTypes.func,
  ignoreCase: PropTypes.bool,
  showOptionList: PropTypes.bool, // Cambiato da showList a showOptionList
};
export default Text;
