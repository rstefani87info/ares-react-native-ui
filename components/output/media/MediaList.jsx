import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Dimensions,
} from 'react-native';

import SlideShow from '@ares/react-native-ui/components/output/media/SlideShow';
import Image from '@ares/react-native-ui/components/output/media/Image';
import Video from '@ares/react-native-ui/components/output/media/Video';
import {fuseObjects} from '@ares/core/objects';

import { ScrollView } from 'react-native-gesture-handler';
import {getElevationStyle, getUiTokens} from '../../../styles';



MediaList.propTypes = {
  id: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  embeddingRegexMap: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  loop: PropTypes.bool,
  showIndicators: PropTypes.bool,
};
export default function MediaList({
  id,
  content,
  title,
  description,
  tags,
  embeddingRegexMap,
  onPress,
  width,
  height,
  style,
  ...props
}) {
  const tokens = getUiTokens(style?.tokens);
  const flex1Style = {flex: 1};

  width = width && width > 0 ? width : Dimensions.get('window').width;
  height = height && height > 0 ? height : Dimensions.get('window').height - 100;

 const renderItem = ( item , index) => {
  const itemStyle = style && style.item && item.id ? style.items[item.id] ?? {} : {};

  switch (item.type) {
    case 'image':
      const imageStyle = fuseObjects(style?.image ?? {}, itemStyle);
      return <Image key={index} content={item.content ?? {}} {...item.config} style={imageStyle} />;
    case 'video':
      const videoStyle = {...(style?.video ?? {}), ...itemStyle, flex:1};
      return <Video key={index} content={item.content ?? {}} {...item.config} style={videoStyle} />;
    case 'array':
      const arrayStyle = {...(style?.slideShow ?? {}), ...itemStyle, flex:1};
      return <SlideShow key={index} content={item.content ?? {}} {...item.config} style={arrayStyle} />;
    case 'component':
      return <View key={index} style={flex1Style}>{item.content}</View>;
    default:
      return null;
  }
};
const contentContainerStyle = {
  justifyContent: 'center',
  padding: tokens.spacing.sm,
  gap: tokens.spacing.sm,
  ...(style?.contentContainer ?? {}),
};
 const realStyle = {
  width,
  height,
  flex: 1,
  borderRadius: tokens.radii.lg,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: tokens.colors.border,
  backgroundColor: tokens.colors.surface,
  ...getElevationStyle(1),
  ...(style?.wrapper ?? {}),
};

const renderedList = content.map(renderItem);


  return (
    <ScrollView
      width={width}
      height={height}
      loop={true}
      style={realStyle}
      contentContainerStyle={contentContainerStyle}
      {...props}
    >
    {renderedList}
    </ScrollView>
  );
}
