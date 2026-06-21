import { Image as ImageComponent, View} from 'react-native';
import PropTypes from 'prop-types';
import  Base  from './Base';
import {getElevationStyle, getUiTokens} from '../../../styles';


Image.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.object,PropTypes.number]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  regexMap: PropTypes.object,
  style: PropTypes.object,
};
export default function Image({ content, title, description, tags, regexMap = {}, embeddingRegexMap, style, ...props }) {
  const tokens = getUiTokens(style?.tokens);
  const wrapperBaseStyle = {
    borderRadius: tokens.radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: tokens.colors.surface,
    ...getElevationStyle(1),
  };
  const contentBaseStyle = {width: '100%', height: '100%'};

  const baseComponent = ()=>(
    <View
      style={[
        wrapperBaseStyle,
        style?.wrapper ?? {},
      ]}>
        <ImageComponent
          source={content}
          useNativeControls
          resizeMode="cover"
          style={[
            contentBaseStyle,
            style?.content ?? {},
          ]}
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
