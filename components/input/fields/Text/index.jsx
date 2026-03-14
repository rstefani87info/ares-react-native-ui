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
  View,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import Button from '@ares/react-native-ui/components/input/actions/Button';
import {isPrimitive} from '@ares/core/scripts';
import {fuseObjects} from '@ares/core/objects';
import Options from './Options';


function normalizeOptions(options) {
  if (typeof options === 'string') {
    try {
      options = JSON.parse(options);
    } catch {
      options = [];
    }
  }

  if (!options) return [];
  if (Array.isArray(options)) return options;

  if (typeof options?.[Symbol.iterator] === 'function') {
    return Array.from(options);
  }

  if (typeof options === 'object') {
    return Object.keys(options).map(k => ({value: k, text: options[k]}));
  }

  return [];
}

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
      onChangeOption,
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
    const [optionsOverride, setOptionsOverride] = useState(null);
    const optionList = useMemo(() => {
      return normalizeOptions(optionsOverride ?? options);
    }, [options, optionsOverride]);

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
      return ignoreCase && (value??'').toLowerCase ? (value??'').toLowerCase() : value;
    };

    const textRef = useRef([]);

    useEffect(() => {
      textRef.current = textRef.current.slice(0, values.length);
      while (textRef.current.length <= values.length) {
        textRef.current.push(createRef());
      }
    }, [values]);
    
      
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
              return optionList.find(o => (
                getValueForComparison(getOptionText(o)) ==
                getValueForComparison(text)
              ));
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
    }, [values, getOptionByText, addOption, multiple]);
    
    const getValue = useCallback(() => {
      const selected = getSelectedOptions();
      if (multiple) {
        return (selected ?? []).map(o => getOptionValue(o));
      }
      return selected ? getOptionValue(selected) : null;
    }, [getSelectedOptions, getOptionValue]);
    
    const getLastInsertText = useCallback( 
      () => values[values.length - 1]
      , [values]);

      

      
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
        setOptions: setOptionsOverride,
        getLastInsertText,
      }),
      [textRef, getValue, getSelectedOptions, setRealValues, setValues, setOptionsOverride, getLastInsertText],
    );

    const placeholderPress = useCallback((index) => {
      setFocusedIndex(index);
      setOptionsVisible(true);
    }, []);

    const onClose = useCallback(() => {
      setFocusedIndex(null)
      setOptionsVisible(false);
    }, []);
    const onOptionPress = useCallback(
      option => {
        const newValues = [...values];
        const newRealValues = [...realValues];
        
        // Ottieni le opzioni selezionate prima della modifica
        const currentSelectedOptions = getSelectedOptions();
        
        newValues[focusedIndex] = getOptionText(option);
        newRealValues[focusedIndex] = getOptionValue(option);

        const mergedValues = newValues.map((text, i) => ({
          value: newRealValues[i],
          text: text,
        }));
        
        
        // Notify parent component about the value change
        if (onChangeValue) {
          onChangeValue(multiple ? mergedValues : mergedValues[0]);
        }
        if (onChangeOption && realValues[focusedIndex] !== getOptionValue(option)) {
          onChangeOption(currentSelectedOptions, option);
        }
        setValues(newValues);
        setRealValues(newRealValues);
        onClose();
      },
      [values, focusedIndex, onClose, onChangeValue, multiple, realValues, getSelectedOptions, getOptionText, getOptionValue, onChangeOption],
    );

    const [displayedOptions, setDisplayedOptions] = useState([]);

    const updateOptions = useCallback(() => {
      const res = (optionList ?? []).filter(filterOptions).sort(sortOptions);
      setDisplayedOptions(res ?? []);
    }, [optionList, filterOptions, sortOptions]);

    useEffect(() => {
      if (optionsVisible) {
        updateOptions();
      }
    }, [optionsVisible, updateOptions, values, focusedIndex]);


const changeText = useCallback(text => {
                    const newValues = values.map((v, i) => (i === focusedIndex ? text : v));
                    setValues(newValues);
                    
                    // Update real values and notify parent component
                    const newRealValues = [...realValues];
                    newRealValues[focusedIndex] = text;
                    setRealValues(newRealValues);
                    
                    if (onChangeValue) {
                      onChangeValue(multiple ? newRealValues : newRealValues[0]);
                    }
                    
                    setOptionsVisible(text.length > 0);
                  }, [focusedIndex, values, realValues, onChangeValue, multiple]);

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
                  onChangeText={changeText}
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
                  options={displayedOptions}
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
  options: PropTypes.any,
  getOptionValue: PropTypes.func,
  getOptionText: PropTypes.func,
  getOptionIcon: PropTypes.func,
  addOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  sortOptions: PropTypes.func,
  ignoreCase: PropTypes.bool,
  showOptionList: PropTypes.bool, // Cambiato da showList a showOptionList
};
export default Text;
