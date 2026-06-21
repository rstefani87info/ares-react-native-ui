import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { translate } from '../../locales/i18n';
import {getElevationStyle, getUiTokens} from '../../styles';

Map.propTypes = {
  center: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    marker: PropTypes.any,
  }),
  radius: PropTypes.number.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    address: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    media: PropTypes.array,
    color: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.any,
  })).isRequired,
  style: PropTypes.object,
};
export default function Map ({ center, radius,centerMarker, places, style, ...props }) {
  const tokens = getUiTokens();
  const cardStyle = {
    borderRadius: tokens.radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: tokens.colors.surface,
    ...getElevationStyle(1),
  };
  return (
    <View
      style={[
        styles.container,
        cardStyle,
        style?.container,
      ]}>
      <MapView
        customMapStyle={style?.customMapTheme || customMapStyle}
        style={[styles.map, style?.wrapper]}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {center.marker && <Marker key="_center" coordinate={center}  />}
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={translate(place.title)}
            description={translate(place.description)}
            onPress={() => (typeof place.onPress === 'function' ? place.onPress(place) : null)}
          />
        ))}
        <Circle
          center={center}
          radius={radius}
          strokeColor={style?.circle?.strokeColor ?? tokens.colors.primary}
          fillColor={style?.circle?.fillColor ?? tokens.colors.primary}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const customMapStyle = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#FFFFFFFF',
      },
    ],
  },
  {
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575',
      },
    ],
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#212121',
      },
    ],
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#757575',
      },
    ],
  },
  {
    'featureType': 'poi',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#2c2c2c',
      },
    ],
  },
  {
    'featureType': 'road',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#3e3e3e',
      },
    ],
  },
  {
    'featureType': 'water',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#0195D9FF',
      },
    ],
  },
];
