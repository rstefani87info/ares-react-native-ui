import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../actions/Button';
import TranslatedText from '../../../output/TranslatedText';
import { isPrimitive } from '@ares/core/scripts';
import { getElevationStyle, getUiTokens } from '../../../../styles';

const {width, height} = Dimensions.get('screen');

export default function Options({
    options,
    hideSelected = false,
    getOptionValue,
    getOptionText,
    getOptionIcon,
    onOptionPress,
    style,
    multiple = false,
    ...props }) {
        const tokens = useMemo(() => getUiTokens(style?.tokens), [style?.tokens]);
        getOptionValue = getOptionValue ?? ((o) => isPrimitive(o) ? o : o.value);
        getOptionText = getOptionText ?? ((o) => isPrimitive(o) ? o : o.text);
    getOptionIcon = getOptionIcon ?? ((o) => isPrimitive(o) ? null : o.icon ?? o.image ?? null);

    const baseOptionStyle = useMemo(() => ({
      wrapper: {
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        borderRadius: tokens.radii.md,
        backgroundColor: tokens.colors.surface,
        borderWidth: 1,
        borderColor: tokens.colors.border,
        alignItems: 'flex-start',
        justifyContent: 'center',
        ...getElevationStyle(0),
      },
      wrapperOnPress: {backgroundColor: tokens.colors.surface2},
      text: {color: tokens.colors.text, fontSize: tokens.typography.size.md, fontWeight: tokens.typography.weight.medium},
      textOnPress: {color: tokens.colors.text},
    }), [tokens]);

    const renderedOptions = useMemo(() => {
      const ret = options
        ?.filter(o => !o?.hidden && (!hideSelected || !o?.selected))
        .map(o => (
          <Option
            getOptionValue={getOptionValue}
            getOptionText={getOptionText}
            getOptionIcon={getOptionIcon}
            onOptionPress={onOptionPress}
            disabled={o.disabled ?? false}
            key={getOptionValue(o)}
            option={o}
            multiple={multiple}
            options={options}
            style={style?.option ?? baseOptionStyle}
          />
        ));

      if (!ret || ret.length === 0) {
        return (
          <TranslatedText
            text="ares.components.input.options.no_available_options"
            style={[
              {color: tokens.colors.textMuted, fontSize: tokens.typography.size.sm},
              style?.options?.disabled,
            ]}
          />
        );
      }
      return ret;
    }, [options, hideSelected, getOptionValue, getOptionText, getOptionIcon, onOptionPress, style?.option, style?.options?.disabled, multiple, baseOptionStyle, tokens]);

    const scrollViewBaseStyle = {
      flexDirection: 'column',
      maxHeight: height * 0.35,
      width: width * 0.92,
      overflow: 'hidden',
      borderRadius: tokens.radii.lg,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      backgroundColor: tokens.colors.surface,
      ...getElevationStyle(2),
    };
    const contentContainerBaseStyle = {padding: tokens.spacing.sm, gap: tokens.spacing.sm};

    return (

        // <Modal
        //     animationIn="slideInUp"
        //     animationOut="slideOutDown"
        //     animationInTiming={1000}
        //     animationOutTiming={1000}
        //     isVisible={props.visible}
        //     style={style?.modal}
        //     {...props}
        // >
            <ScrollView
            showsVerticalScrollIndicator
                horizontal={false}
                persistentScrollbar={true}
                indicatorStyle="black"
                  style={[
                    scrollViewBaseStyle,
                    style?.scrollView,
                  ]}
                  contentContainerStyle={[
                    contentContainerBaseStyle,
                    style?.scrollViewContent,
                  ]}>
                {
                    renderedOptions
                }
            </ScrollView>
        // </Modal>
    );
}

export function Option({ option, multiple = false, options, style, getOptionValue, getOptionText, getOptionIcon, onOptionPress,  ...props }) {
    const optionInOptions = options?.find(o1 => getOptionValue(o1) === getOptionValue(option));
    return <Button
        text={getOptionText(option)}
        icon={getOptionIcon(option)}
        onPress={() => {
        if (!multiple && !option.selected) {
            options.forEach(o1 => {
              o1.selected = false;
            });
        }
        option.selected = !option.selected;
        if (optionInOptions) {
            optionInOptions.selected = option.selected;
        }
        onOptionPress(optionInOptions ?? option, options);
        }}
        style={style}
    />;
}
