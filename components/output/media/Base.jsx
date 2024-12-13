import PropTypes from "prop-types";
import { i18n } from "@ares/react-native-ui/locales";
import { getStyle } from "@ares/react-native-ui/styles";

Base.propTypes = {
  baseComponent: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.object,PropTypes.number]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  embeddingRegexMap: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
  category: PropTypes.string
};
export default function Base({ content, title, description, tags, embeddingRegexMap = {}, style, category, ...props }) {
  if(content){
    let ret = null;
    if (typeof content === "string" || content instanceof URL) {
      content = {uri:content.toString()};
    }
    let platform = null;
    
    if(content.uri && embeddingRegexMap && category && (platform = Object.keys(embeddingRegexMap).filter(
      (p) => p.match(new RegExp(category))
    ).find((p) => embeddingRegexMap[p].pattern.test(content.uri)))!=null){ 
          ret = (
            <WebView
              originWhitelist={["*"]}
              source={content.uri}
              style={getStyle(style, "wrapper")}
            />
          );
    } else {
      ret = baseComponent();
    } 
    if(ret){
      return (
        <> 
          { onPress ? <Pressable onPress={() => onPress(content)}>{ret} </Pressable> : ret}
        </>
      );
    }
  }
  return (
    <i18n.TranslateAsTextNode
      text={`ares.media.${category}.not_supported`}
      style={getStyle(style, "error")}
    />
  );
}
