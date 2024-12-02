import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Carousel from 'react-native-snap-carousel';

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

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width}
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