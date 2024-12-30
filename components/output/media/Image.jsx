import { Image as ImageComponent, View} from "react-native";
import PropTypes from "prop-types";
import  Base  from "./Base";


Image.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.object,PropTypes.number]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  regexMap: PropTypes.object,
  style: PropTypes.object,
};
export default function Image({ content, title, description, tags, regexMap = {}, embeddingRegexMap, style, ...props }) {
 
  const baseComponent = ()=>(
    <View style={style?.wrapper ?? {}}>
        <ImageComponent
          source={content}
          useNativeControls
          resizeMode="cover"
          style={style?.content ?? {}}
        />
        </View>
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
         { ...props}
        />
      );
}
