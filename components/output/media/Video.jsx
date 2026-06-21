import { Video as VideoComponent } from 'expo-av';
import PropTypes from 'prop-types';
import Base from './Base';
import {getElevationStyle, getUiTokens} from '../../../styles';

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
  const tokens = getUiTokens(style?.tokens);
  const wrapperBaseStyle = {
    borderRadius: tokens.radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: tokens.colors.surface,
    ...getElevationStyle(1),
  };

   const baseComponent = ()=>(
      <VideoComponent
        source={content}
        useNativeControls
        resizeMode="contain"
        style={[
          wrapperBaseStyle,
          style?.content,
          style?.wrapper,
          style?.video,
        ]}
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
