import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
} from "react-native";

import Carousel from 'react-native-reanimated-carousel';
import {getStyle} from '../../../styles';
import Image from './Image';
import Video from './Video';
import Base from "./Base";



SlideShow.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.object,PropTypes.number]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  embeddingRegexMap: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
};
export default function SlideShow({
  content,
  title,
  description,
  tags,
  embeddingRegexMap,
  onPress,
  width = Dimensions.get("window").width,
  height = Dimensions.get("window").height,
  style,
  ...props
}) {
  
 const renderItem = ({ item }) => ( 
  <>{item.type==="image" && <Image content={item.content} {...item.config} style={[{width:item.width??width*0.75,height:item.height??height*0.75},getStyle(style, "image", item.id)]} />}
  {item.type==="video" && <Video content={item.content} {...item.config} style={[{width:item.width??width*0.75,height:item.height??height*0.75},getStyle(style, "video", item.id)]} />}
  {item.type==="array" && <SlideShow content={item.content} {...item.config} style={[{width:item.width??width*0.75,height:item.height??height*0.75},getStyle(style, "video", item.id)]} />}
  {item.type==="component" && item.content }</> 
);

 const realStyle = Object.assign({width, height},getStyle(style, "wrapper")??{
  alignItems: "center",
  justifyContent: "center",
  width,
  height,
});
  const baseComponent = ()=>(
    <Carousel
      autoPlayInterval={2000}
      data={content}
      renderItem={renderItem}
      width={width * 0.75}
      height={height}
      loop={true}
				mode={"horizontal-stack"}
				modeConfig={{
					snapDirection: "left",
					stackInterval: 18,
				}}
				customConfig={() => ({ type: "positive", viewCount: 5 })}
      style={realStyle}
      {...props}
    />
  );

  return (
    <Base
    content={content}
    title={title}
    type="array"
    description={description}
    tags={tags}
    embeddingRegexMap={embeddingRegexMap}
    style={style}
    baseComponent={baseComponent}
     { ...props}
    />
  );
}
 