import { Video as VideoComponent } from "expo-av";
import PropTypes from "prop-types";
import Base from "./Base";

Video.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.object,PropTypes.number]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  embeddingRegexMap: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
};
export default function Video({ content, title, description, tags, embeddingRegexMap = {}, style, onPress, ...props }) {
  
   const baseComponent = ()=>(
      <VideoComponent
        source={content}
        useNativeControls
        resizeMode="contain"
        style={[style?.content,style?.wrapper,style?.video]}
      />
   );
 
return (
    <Base
    content={content}
    title={title}
    description={description}
    tags={tags}
    embeddingRegexMap={embeddingRegexMap}
    style={style}
    baseComponent={baseComponent}
    onPress={onPress}
     { ...props}
    />
  );
}
