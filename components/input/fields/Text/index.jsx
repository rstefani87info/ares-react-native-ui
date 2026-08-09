import {
  createRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { View } from 'react-native';

import ReactNativeModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import Button from '@ares/react-native-ui/components/input/actions/Button';
import { isDynamicArray } from '@ares/core/arrays.js';
import { isPrimitive } from '@ares/core/scripts';
import { fuseObjects } from '@ares/core/objects';
import Loading from '../../../output/Loading.jsx';
import Options from './Options';
import { getElevationStyle, getUiTokens } from '../../../../styles';
import useLocales from '../../../../locales/useLocales';

function normalizeOptions(options) {
  if (typeof options === 'string') {
    try {
      options = JSON.parse(options);
    } catch {
      options = [];
    }
  }

  if (!options) {
    return [];
  }
  if (Array.isArray(options)) {
    return options;
  }
  // Dynamic arrays are resolved asynchronously via toArray().
  if (isDynamicOptionsSource(options)) {
    return [];
  }

  if (typeof options?.[Symbol.iterator] === 'function') {
    return Array.from(options);
  }

  if (typeof options === 'object') {
    return Object.keys(options).map((k) => ({ value: k, text: options[k] }));
  }

  return [];
}

function isDynamicOptionsSource(options) {
  return isDynamicArray(options);
}

function areArraysShallowEqual(left, right) {
  if (left === right) {
    return true;
  }
  if (
    !Array.isArray(left) ||
    !Array.isArray(right) ||
    left.length !== right.length
  ) {
    return false;
  }
  return left.every((value, index) => value === right[index]);
}

function areOptionListsEqual(left, right, getOptionValue) {
  if (left === right) {
    return true;
  }
  if (
    !Array.isArray(left) ||
    !Array.isArray(right) ||
    left.length !== right.length
  ) {
    return false;
  }
  return left.every((option, index) => {
    const other = right[index];
    return (
      getOptionValue(option) === getOptionValue(other) &&
      option?.selected === other?.selected &&
      option?.disabled === other?.disabled &&
      option?.hidden === other?.hidden
    );
  });
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
      value: controlledValue,
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
      getOptionValue = (o) => (isPrimitive(o) ? o : o.value),
      getOptionText = (o) => (isPrimitive(o) ? o : o.text ?? o.name),
      getOptionIcon = (o) =>
        isPrimitive(o) ? null : o.icon ?? o.image ?? null,
      addOption = true,
      sortOptions = null,
      distinct = false,
      showOptionList = true,
      ignoreCase = true,
      multiple = false,
      dynamicOptionsDelay = 300,
      ...props
    },
    ref,
  ) => {
    id = id ?? name;
    const {translate} = useLocales();
    sortOptions = sortOptions ?? ((a, b) =>
        getOptionText(a, translate)?.localeCompare(getOptionText(b, translate)) ?? -1);
    const tokens = useMemo(() => getUiTokens(style?.tokens), [style?.tokens]);
    const defaultStyle = useMemo(() => {
      const rowBase = {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: tokens.colors.border,
        borderRadius: tokens.radii.md,
        backgroundColor: tokens.colors.surface,
        overflow: 'hidden',
        ...getElevationStyle(1),
      };
      const inputContainer = {
        gap: tokens.spacing.sm,
      };
      const displayWrapper = {
        flex: 1,
        minHeight: 42,
        justifyContent: 'center',
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        backgroundColor: 'transparent',
      };
      const displayText = {
        color: tokens.colors.text,
        fontSize: tokens.typography.size.md,
        fontWeight: tokens.typography.weight.medium,
      };
      const cancelButton = {
        wrapper: {
          width: 42,
          minHeight: 42,
          alignItems: 'center',
          justifyContent: 'center',
          borderLeftWidth: 1,
          borderColor: tokens.colors.border,
          backgroundColor: tokens.colors.surface,
        },
        wrapperOnPress: { backgroundColor: tokens.colors.surface2 },
        text: {
          color: tokens.colors.danger,
          fontWeight: tokens.typography.weight.bold,
        },
      };
      const addButton = {
        wrapper: {
          alignSelf: 'flex-start',
          width: 42,
          minHeight: 42,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radii.md,
          backgroundColor: tokens.colors.primary,
          ...getElevationStyle(1),
        },
        wrapperOnPress: { backgroundColor: tokens.colors.primary },
        text: {
          color: tokens.colors.onPrimary,
          fontSize: tokens.typography.size.lg,
          fontWeight: tokens.typography.weight.bold,
        },
      };
      const modalBackdrop = {
        justifyContent: 'center',
        alignItems: 'center',
        padding: tokens.spacing.lg,
      };
      const modalCard = {
        width: '100%',
        maxWidth: 520,
        borderRadius: tokens.radii.lg,
        borderWidth: 1,
        borderColor: tokens.colors.border,
        backgroundColor: tokens.colors.surface,
        overflow: 'hidden',
        ...getElevationStyle(2),
      };
      const modalRow = { flexDirection: 'row', alignItems: 'center' };
      const textInput = {
        flex: 1,
        minHeight: 46,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        color: tokens.colors.text,
        backgroundColor: tokens.colors.surface,
      };
      return {
        input: inputContainer,
        row: rowBase,
        display: { wrapper: displayWrapper, text: displayText },
        cancelButton,
        addButton,
        modalBackdrop,
        modalCard,
        modalRow,
        textInput,
      };
    }, [tokens]);

    const resolvedStyle = useMemo(
      () => fuseObjects(defaultStyle, style ?? {}),
      [defaultStyle, style],
    );
    const [realValues, setRealValues] = useState(['']);
    const [values, setValues] = useState(['']);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [optionsOverride, setOptionsOverride] = useState(null);
    const [resolvedDynamicOptions, setResolvedDynamicOptions] = useState(null);
    const [loadingDynamicOptions, setLoadingDynamicOptions] = useState(false);
    const currentOptionsSource = optionsOverride ?? options;
    const optionList = useMemo(() => {
      if (resolvedDynamicOptions !== null) {
        return normalizeOptions(resolvedDynamicOptions);
      }
      return normalizeOptions(currentOptionsSource);
    }, [currentOptionsSource, resolvedDynamicOptions]);

    const [focusedIndex, setFocusedIndex] = useState(null);

    addOption =
      addOption === true
        ? {
            byText: (text) => ({ text, value: text }),
            byValue: (value) => ({ value, text: value }),
          }
        : addOption;
    const getValueForComparison = useCallback(
      (value) => {
        const next = value ?? '';
        if (ignoreCase && next?.toLowerCase) {
          return String(next).toLowerCase();
        }
        return value;
      },
      [ignoreCase],
    );

    const textRef = useRef([]);
    const dynamicRequestSequenceRef = useRef(0);
    const dynamicOptionsTimeoutRef = useRef(null);

    const clearPendingDynamicOptionsRefresh = useCallback(() => {
      if (dynamicOptionsTimeoutRef.current) {
        clearTimeout(dynamicOptionsTimeoutRef.current);
        dynamicOptionsTimeoutRef.current = null;
      }
    }, []);

    useEffect(() => {
      textRef.current = textRef.current.slice(0, values.length);
      while (textRef.current.length <= values.length) {
        textRef.current.push(createRef());
      }
    }, [values]);

    useEffect(() => {
      clearPendingDynamicOptionsRefresh();
      setResolvedDynamicOptions(null);
      setLoadingDynamicOptions(false);
    }, [currentOptionsSource, clearPendingDynamicOptionsRefresh]);

    useEffect(() => {
      if (controlledValue === undefined) {
        return;
      }
      const inputValues = multiple
        ? Array.isArray(controlledValue)
          ? controlledValue
          : controlledValue == null
          ? ['']
          : [controlledValue]
        : [controlledValue ?? ''];
      const nextRealValues = inputValues.map((v) =>
        v && typeof v === 'object' ? v.value ?? v.text ?? '' : v,
      );
      const nextValues = nextRealValues.map((rv) => {
        const option = (optionList ?? []).find((o) => getOptionValue(o) === rv);
        return option ? getOptionText(option,null,translate) : rv;
      });
      const normalizedRealValues = nextRealValues.length
        ? nextRealValues
        : [''];
      const normalizedValues = nextValues.length
        ? nextValues.map((v) => (v == null ? '' : String(v)))
        : [''];
      setRealValues((prev) =>
        areArraysShallowEqual(prev, normalizedRealValues)
          ? prev
          : normalizedRealValues,
      );
      setValues((prev) =>
        areArraysShallowEqual(prev, normalizedValues) ? prev : normalizedValues,
      );
    }, [controlledValue, multiple, optionList, getOptionValue, getOptionText, translate]);

    const filterOptions = useCallback(
      (option) => {
        const oText = getValueForComparison(getOptionText(option,null,translate));
        return (
          values.filter((v) => {
            v = getValueForComparison(v ?? '');
            return !v || (oText?.includes(v) && (!distinct || oText !== v));
          }).length > 0
        );
      },
      [values, getOptionText, getValueForComparison, distinct, translate],
    );

    const getOptionByText = useCallback(
      (text) => {
        return optionList.find(
          (o) =>
            getValueForComparison(getOptionText(o,null,translate)) ===
            getValueForComparison(text),
        );
      },
      [optionList, getOptionText, getValueForComparison, translate],
    );

    const getSelectedOptions = useCallback(() => {
      const opts =
        values.map(
          (v) => getOptionByText(v) ?? (addOption ? addOption.byText(v) : null),
        ) ?? [];
      if (multiple) {
        return opts;
      }
      return opts.pop();
    }, [values, getOptionByText, addOption, multiple]);

    const getValue = useCallback(() => {
      const selected = getSelectedOptions();
      if (multiple) {
        return (selected ?? []).map((o) => getOptionValue(o));
      }
      return selected ? getOptionValue(selected) : null;
    }, [getSelectedOptions, getOptionValue, multiple]);

    const getLastInsertText = useCallback(
      () => values[values.length - 1],
      [values],
    );

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
      [
        textRef,
        getValue,
        getSelectedOptions,
        setRealValues,
        setValues,
        setOptionsOverride,
        getLastInsertText,
      ],
    );

    const placeholderPress = useCallback((index) => {
      setFocusedIndex(index);
      setOptionsVisible(true);
    }, []);

    const onClose = useCallback(() => {
      clearPendingDynamicOptionsRefresh();
      dynamicRequestSequenceRef.current += 1;
      setFocusedIndex(null);
      setLoadingDynamicOptions(false);
      setOptionsVisible(false);
    }, [clearPendingDynamicOptionsRefresh]);
    const onOptionPress = useCallback(
      (option) => {
        const newValues = [...values];
        const newRealValues = [...realValues];

        // Ottieni le opzioni selezionate prima della modifica
        const currentSelectedOptions = getSelectedOptions();

        newValues[focusedIndex] = getOptionText(option, null,translate);
        newRealValues[focusedIndex] = getOptionValue(option);

        // Notify parent component about the value change
        if (onChangeValue) {
          onChangeValue(multiple ? newRealValues : newRealValues[0]);
        }
        if (
          onChangeOption &&
          realValues[focusedIndex] !== getOptionValue(option)
        ) {
          onChangeOption(currentSelectedOptions, option);
        }
        setValues(newValues);
        setRealValues(newRealValues);
        onClose();
      },
      [
        values,
        focusedIndex,
        onClose,
        onChangeValue,
        multiple,
        realValues,
        getSelectedOptions,
        getOptionText,
        getOptionValue,
        onChangeOption,
        translate
      ],
    );

    const [displayedOptions, setDisplayedOptions] = useState([]);

    const refreshDynamicOptions = useCallback(
      async (searchText = '') => {
        const requestId = dynamicRequestSequenceRef.current + 1;
        dynamicRequestSequenceRef.current = requestId;

        if (!isDynamicOptionsSource(currentOptionsSource)) {
          setResolvedDynamicOptions(null);
          setLoadingDynamicOptions(false);
          return;
        }

        const selectedRealValue =
          focusedIndex == null ? null : realValues[focusedIndex];
        if (typeof currentOptionsSource.setParam === 'function') {
          currentOptionsSource.setParam(selectedRealValue, searchText);
        }
        setLoadingDynamicOptions(true);
        try {
          const nextOptions = await currentOptionsSource.toArray();
          if (dynamicRequestSequenceRef.current !== requestId) {
            return;
          }
          setResolvedDynamicOptions(
            Array.isArray(nextOptions)
              ? nextOptions
              : normalizeOptions(nextOptions),
          );
        } catch {
          if (dynamicRequestSequenceRef.current !== requestId) {
            setLoadingDynamicOptions(false);
            return;
          }
          setResolvedDynamicOptions([]);
        } finally {
          if (dynamicRequestSequenceRef.current === requestId) {
            setLoadingDynamicOptions(false);
          }
        }
      },
      [currentOptionsSource, focusedIndex, realValues],
    );

    const updateOptions = useCallback(() => {
      const res = (optionList ?? []).filter(filterOptions).sort(sortOptions);
      setDisplayedOptions((prev) =>
        areOptionListsEqual(prev, res ?? [], getOptionValue) ? prev : res ?? [],
      );
    }, [
      optionList,
      filterOptions,
      sortOptions,
      getOptionValue,
    ]);

    useEffect(() => {
      if (optionsVisible) {
        updateOptions();
      }
    }, [optionsVisible, updateOptions, values, focusedIndex]);

    useEffect(() => {
      if (!optionsVisible) {
        return;
      }
      if (focusedIndex == null) {
        return;
      }
      clearPendingDynamicOptionsRefresh();
      if (!dynamicOptionsDelay || dynamicOptionsDelay <= 0) {
        refreshDynamicOptions(values[focusedIndex] ?? '');
        return;
      }

      dynamicOptionsTimeoutRef.current = setTimeout(() => {
        dynamicOptionsTimeoutRef.current = null;
        refreshDynamicOptions(values[focusedIndex] ?? '');
      }, dynamicOptionsDelay);

      return clearPendingDynamicOptionsRefresh;
    }, [
      optionsVisible,
      focusedIndex,
      values,
      refreshDynamicOptions,
      dynamicOptionsDelay,
      clearPendingDynamicOptionsRefresh,
    ]);

    useEffect(
      () => clearPendingDynamicOptionsRefresh,
      [clearPendingDynamicOptionsRefresh],
    );

    const changeText = useCallback(
      (text) => {
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
      },
      [focusedIndex, values, realValues, onChangeValue, multiple],
    );
    const deleteIcon = ({ style: iconStyle }) => (
      <Icon
        name="trash-can-outline"
        size={18}
        color={tokens.colors.danger}
        style={iconStyle}
      />
    );

    return (
      <View style={resolvedStyle?.input}>
        {values.map((value, index) => (
          <View
            key={index}
            style={[resolvedStyle.row, resolvedStyle?.rowByIndex?.[index]]}
          >
            <Button
              icon={getOptionIcon(value)}
              text={value ?? placeholder ?? '...'}
              // variant="ghost"
              style={{
                wrapper: [
                  style?.multipleInputElement ?? { flex: 1, height: 40 },
                  { backgroundColor: 'white' },
                ],
                text: { color: 'black' },
              }}
              onPress={() => placeholderPress(index)}
            />
            <Button
              icon={deleteIcon}
              style={fuseObjects(
                resolvedStyle.cancelButton,
                style?.multipleInputButton,
                style?.multipleInputButtonCancel,
              )}
              onPress={() => {
                const newValues = values.filter((v, i) => i !== index);
                setValues(newValues.length > 0 ? newValues : ['']);
              }}
            />
            <ReactNativeModal
              isVisible={focusedIndex === index}
              onBackdropPress={onClose}
              // onRequestClose={() => setFocusedIndex(null)}
            >
              <View style={resolvedStyle.modalBackdrop}>
                <View style={[resolvedStyle.modalCard, style?.modalCard]}>
                  <View style={[resolvedStyle.modalRow, style?.modalRow]}>
                    <TextInput
                      ref={(el) => {
                        if (el) {
                          textRef.current[index] = el;
                          setTimeout(() => el.focus(), 60);
                        }
                      }}
                      value={value}
                      style={[
                        resolvedStyle.textInput,
                        style?.multipleInputElement,
                        style?.textInput,
                      ]}
                      onChangeText={changeText}
                      {...props}
                    />
                    <Button
                      text="x"
                      style={fuseObjects(
                        resolvedStyle.cancelButton,
                        style?.multipleInputButton,
                        style?.multipleInputButtonCancel,
                      )}
                      onPress={() => {
                        const newValues = values.filter((v, i) => i !== index);
                        const newRealValues = realValues.filter(
                          (v, i) => i !== index,
                        );

                        setValues(newValues.length > 0 ? newValues : ['']);
                        setRealValues(
                          newRealValues.length > 0 ? newRealValues : [''],
                        );

                        if (onChangeValue) {
                          onChangeValue(
                            multiple ? newRealValues : newRealValues[0],
                          );
                        }
                      }}
                    />
                  </View>
                  <View
                    style={[
                      { padding: tokens.spacing.md },
                      style?.optionsWrapper,
                    ]}
                  >
                    {loadingDynamicOptions && displayedOptions.length === 0 ? (
                      <Loading style={style?.loadingOptions} />
                    ) : (
                      <>
                        {loadingDynamicOptions && (
                          <Loading style={style?.loadingOptions} />
                        )}
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
                        style={style?.options ?? resolvedStyle?.options}
                      />
                        )}
                      </>
                    )}
                  </View>
                </View>
              </View>
            </ReactNativeModal>
          </View>
        ))}
        {multiple && (
          <Button
            text="+"
            style={fuseObjects(
              resolvedStyle.addButton,
              style?.multipleInputButton,
            )}
            onPress={() => setValues([...values, ''])}
          />
        )}
      </View>
    );
  },
);

Text.propTypes = {
  id: PropTypes.string,
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
  dynamicOptionsDelay: PropTypes.number,
  showOptionList: PropTypes.bool, // Cambiato da showList a showOptionList
};
export default Text;
