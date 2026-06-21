import PropTypes from 'prop-types';
import {
  Dimensions,
} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import Image from './Image';
import Video from './Video';
import Base from './Base';
import {getElevationStyle, getUiTokens} from '../../../styles';



SlideShow.propTypes = {
  id: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
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
export default function SlideShow({
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

  width = width && width > 0 ? width : Dimensions.get('window').width;
  height = height && height > 0 ? height : Dimensions.get('window').height;

 const renderItem = ({ item }) => {
  const itemStyle = style && style.items && item.id ? style.items[item.id] ?? {} : {};
  const mainStyle = {width:item.width ?? width,height:item.height ?? height};

  switch (item.type) {
    case 'image':
      const imageStyle = [style?.image ?? {}, itemStyle, mainStyle ];
      return <Image content={item.content ?? {}} {...item.config} style={imageStyle} />;
    case 'video':
      const videoStyle = [style?.video ?? {}, itemStyle, mainStyle];
      return <Video content={item.content ?? {}} {...item.config} style={videoStyle} />;
    case 'array':
      const arrayStyle = [style?.slideShow ?? {}, itemStyle, mainStyle];
      return <SlideShow content={item.content ?? {}} {...item.config} style={arrayStyle} />;
    case 'component':
      return item.content;
    default:
      return null;
  }
};

 const realStyle = Object.assign(
  {
    width,
    height,
    borderRadius: tokens.radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: tokens.colors.surface,
    ...getElevationStyle(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  style?.wrapper ?? {},
);
  const baseComponent = ()=>(
    <Carousel
      autoPlayInterval={2000}
      data={content}
      renderItem={renderItem}
      width={width}
      height={height}
      loop={true}
      snapEnabled={true}
				pagingEnabled={true}
				// defaultScrollOffsetValue={scrollOffsetValue}
				customConfig={() => ({ type: 'positive', viewCount: 5 })}
      style={realStyle}
      {...props}
    />
  );

  return (
    <Base
    content={content}
    title={title}
    type="array"
    description={description}
    tags={tags}
    embeddingRegexMap={embeddingRegexMap}
    style={style}
    baseComponent={baseComponent}
     { ...props}
    />
  );
}
