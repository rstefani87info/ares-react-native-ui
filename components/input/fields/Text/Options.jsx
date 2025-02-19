import React, { useCallback } from "react";
import { Dimensions, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../actions/Button";
import TranslatedText from "../../../output/TranslatedText";

const {width, height} = Dimensions.get('screen');

export default function Options({ 
    options, 
    hideSelected = false, 
    getOptionValue, 
    getOptionText, 
    getOptionIcon, 
    onOptionPress, 
    style,
    multiple=false, 
    ...props }) {
        getOptionValue = getOptionValue ?? ((o) => isPrimitive(o) ? o : o.value);
        getOptionText = getOptionText ?? ((o) => isPrimitive(o) ? o : o.text);
    getOptionIcon = getOptionIcon ?? ((o) => isPrimitive(o) ? null : o.icon??o.image??null);

    const showOptions = useCallback(() => {
        
        const ret = options?.filter(o => !o.hidden || (hideSelected && !o.selected)).map(o => (
        <Option getOptionValue={getOptionValue}
         getOptionText={getOptionText}
         getOptionIcon={getOptionIcon}
         onOptionPress={onOptionPress}
         disabled={o.disabled ?? false}
         key={getOptionValue(o)} option={o} multiple={multiple} options={options} style={style?.option ?? {text:{color:"black"}}} />));
         
         if(ret.length === 0) {
             return (
                <TranslatedText text="ares.components.input.options.no_available_options" style={[style?.options?.disabled ?? {} , {color:"silver"}]}/>
            ) ;
         }
        return ret;
    }, [options]
    );



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
                  style={[style?.scrollView, {flexDirection: 'column', maxHeight: height*0.3, width: width*0.9, overflow: 'hidden'}]}
                  contentContainerStyle={style?.scrollViewContent}>
                {
                    showOptions()
                }
            </ScrollView>
        // </Modal>
    )
}

export function Option({ option, multiple=false, options, style, getOptionValue, getOptionText, getOptionIcon, onOptionPress,  ...props }) {
    const optionInOptions = options?.find(o1 => getOptionValue(o1) === getOptionValue(option));
    return <Button
        text={getOptionText(option)}
        icon={getOptionIcon(option)}
        onPress={() => {
        if (!multiple && !option.selected) {
            options.forEach(o1 => o1.selected = false);
        }
        option.selected = !option.selected;
        if (optionInOptions) {
            optionInOptions.selected = option.selected;
        }
        onOptionPress(optionInOptions??option, options);
        }}
        style={style}
    />
}