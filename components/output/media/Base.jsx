import PropTypes from 'prop-types';
import { i18n } from '@ares/react-native-ui/locales';
import { WebView } from 'react-native-webview';
import {getUiTokens} from '../../../styles';

Base.propTypes = {
  baseComponent: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.object,PropTypes.number]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  embeddingRegexMap: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
  category: PropTypes.string,
};
export default function Base({ content, title, description, tags, embeddingRegexMap = {},baseComponent, style, category,onPress, ...props }) {
  const tokens = getUiTokens(style?.tokens);
  if(content){
    let ret = null;
    if (typeof content === 'string' || content instanceof URL) {
      content = {uri:content.toString()};
    }
    const platform = content.uri && embeddingRegexMap && category
      ? Object.keys(embeddingRegexMap)
        .filter((p) => p.match(new RegExp(category)))
        .find((p) => embeddingRegexMap[p].pattern.test(content.uri))
      : null;
    if (platform != null) {
          ret = (
            <WebView
              originWhitelist={['*']}
              source={content}
              style={style?.wrapper}
              onPress={onPress}
            />
          );
    } else {
      ret = baseComponent();
    }
    return  ret;
  }
  return (
    <i18n.TranslateAsTextNode
      text={`ares.media.${category}.not_supported`}
      style={[
        {color: tokens.colors.textMuted, fontSize: tokens.typography.size.sm},
        style?.error,
      ]}
    />
  );
}
