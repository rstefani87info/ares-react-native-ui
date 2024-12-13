import { Image as ImageComponent, Pressable} from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import { i18n } from "../../../locales";
import { getStyle } from "../../../styles";


Image.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.object,PropTypes.number]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  regexMap: PropTypes.object,
  style: PropTypes.object,
};
export default function Image({ content, title, description, tags, regexMap = {}, style, ...props }) {
 
  const baseComponent = ()=>(
        <ImageComponent
          source={content}
          useNativeControls
          resizeMode="cover"
          style={[{width: '80%', height: '80%'},getStyle(style, "content"),getStyle(style, "wrapper"),getStyle(style, "image")]}
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
         { ...props}
        />
      );
}
