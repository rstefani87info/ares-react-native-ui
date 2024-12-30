import React from 'react';
import * as numbers from '@ares/core/numbers';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/BootstrapIcons';
import PropTypes from 'prop-types';

Rate.propTypes = {
    range: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string,PropTypes.number])),
    size: PropTypes.number.isRequired,
    iconSet: PropTypes.object,
    icon: PropTypes.any,
    halfFilledIcon: PropTypes.any,
    filledIcon: PropTypes.any,
    color: PropTypes.string,
    filledColor: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func,
    data:PropTypes.any,
    dataGetter: PropTypes.func,
    dataProcessor: PropTypes.func,
    useNullAs: PropTypes.number,
}
export default function Rate({range, size=20, iconSet, icon, halfFilledIcon, filledIcon, color, filledColor, style, onPress, data, dataGetter,dataProcessor, useNullAs})  {
    iconSet = iconSet??Icon;
    icon = icon??(
          <Icon name="star" size={size} color={color} /> 
    );
    filledIcon = filledIcon??(
        <Icon name="star-fill" size={size} color={filledColor} /> 
    );
    halfFilledIcon = halfFilledIcon??(
        <Icon name="star-half" size={size} color={filledColor} /> 
    );
    const dataGetterSafe = dataGetter instanceof Function ? dataGetter : (d) => d;
    const dataProcessorSafe = dataProcessor instanceof Function ? dataProcessor : (d) => numbers.asNumber(d);
    data=!Array.isArray(data) && typeof data ==='object'? Object.entries(data) : data;
    data=data.map(dataGetterSafe);
    data=useNullAs===undefined || useNullAs===null?data.filter(d=>d!==null && d!==undefined):data.map(d=>d===null || d===undefined? dataProcessorSafe(useNullAs) :dataProcessorSafe(d));
    const rate=dataProcessor(data);
    const rateFloor= numbers.floor(rate);
    const realStyle = {...(style?.container || {}), flexDirection:'row'};
    let resolvedRate = 0;
    const content = range.map((level,index)=>{
        if(rate===index+1 || rateFloor>index+1){
            resolvedRate=level??rate;
            return filledIcon;
        }
        if(numbers.floor(rate)===index+1){
            resolvedRate=level??rate;
            return halfFilledIcon;
        }
        return icon;
    });

    if(onPress && onPress instanceof Function)return (
        <Pressable style={realStyle} onPress={onPress}>
            {...content}
            <Text>{rate}</Text>
        </Pressable>
    );
    return (
        <View style={realStyle}>
            {...content}
            <Text>{rate}</Text>
        </View>
    );
};


HalfFilledIcon.propTypes = {
    size: PropTypes.number.isRequired,
    iconSet: PropTypes.object,
    iconName: PropTypes.string,
    filledIconName: PropTypes.string,
    style: PropTypes.object,
}
export function HalfFilledIcon({size,iconSet, iconName, filledIconName, style, color="grey", filledColor="yellow", ...prop}){
    const styles = StyleSheet.create({
        container: {
          position: 'relative',
          width: size??20,
          height: size??20,
          padding:0
        },
        fullStar: {
          position: 'absolute',
        },
        halfStar: {
          position: 'absolute',
          width: size?size/2:10, 
          height: size??20,
          overflow: 'hidden',
          padding:0
        },
      });

    return (
        <View style={styles.container}>
          <iconSet name={iconName} size={width} color={color} style={{...(style?.filledIcon||{}),...styles.fullStar}} />
          <View style={styles.halfStar}>
            <iconSet name={filledIconName} size={width} color={filledColor} style={{...(style?.icon||{})}}/>
          </View>
        </View>
      );
    };
    
    
