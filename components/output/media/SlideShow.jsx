import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Carousel from 'react-native-reanimated-carousel';

export default function SlideShow({
  items,
  width = Dimensions.get("window").width,
  height = Dimensions.get("window").height,
  style
}) {
  
  const renderItem = ({ item }) => (
    <View style={[getStyle(style, "item")??styles.slide, { backgroundColor: item.color , height, width}]}>
      <Text>{item.title}</Text>
      <Image
        source={item.image}
        style={[getStyle(style, "image")??{}]} />
    </View>
  );
 const realStyle = Object.assign({},getStyle(style, "image")??{},  styles.slide);
  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      width={realStyle.width}
      height={realStyle.height} 
      mode="stack" 
      modeConfig={{
        stackInterval: 30,  
        scaleInterval: 0.08, 
      }}
      style={realStyle}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
});