import { Video } from "expo-av";
import PropTypes from "prop-types";
import { i18n } from "../../../locales";
import { getStyle } from "../../../styles";

Video.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
export default function Video({ content, title, description, tags }) {
  let source = content;

  if (typeof content === "string") {
    source = {uri:content};
    for (let platform in regexMap) {
      if (platform.match(/video/i)) {
        const { pattern } = regexMap[platform];
        if (pattern.test(content)) {
          return (
            <HTML
              originWhitelist={["*"]}
              source={source}
              style={getStyle(style, "wrapper")}
            />
          );
        }
      }
    }

    return (
      <Video
        source={source}
        useNativeControls
        resizeMode="contain"
        style={[getStyle(style, "content"),getStyle(style, "wrapper"),getStyle(style, "video")]}
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
