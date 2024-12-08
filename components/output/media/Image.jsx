import { Video } from "expo-av";
import PropTypes from "prop-types";
import { i18n } from "../../../locales";
import { getStyle } from "../../../styles";

Image.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
export default function Image({ content, title, description, tags, regexMap }) {
  let source = content;

  if (typeof content === "string") {
    source = {uri:content};
    for (let platform in regexMap) {
      if (platform.match(/video/i)) {
        const { pattern } = regexMap[platform];
        if (pattern.test(content)) {
          return (
            <WebView
              originWhitelist={["*"]}
              source={source}
              style={getStyle(style, "wrapper")}
            />
          );
        }
      }
    }

    return (
      <Image
        source={source}
        useNativeControls
        resizeMode="contain"
        style={[getStyle(style, "content"),getStyle(style, "wrapper"),getStyle(style, "image")]}
      />
    );
  }
  return (
    <i18n.TranslateAsTextNode
      text="ares.media.video.not_supported"
      style={getStyle(style, "error")}
    />
  );
}
