import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

Map.propTypes = {
  center: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    marker: PropTypes.any,
  }),
  radius: PropTypes.number.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    media: PropTypes.array,
    color: PropTypes.string,
    marker: PropTypes.shape({
        
    })
  })).isRequired,
};
const Map = ({ center, radius,centerMarker, places,...props }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {center.marker && <Marker coordinate={center} ></Marker>}
        <Circle 
          center={center} 
          radius={radius} 
          strokeColor="purple" 
          fillColor="purple" 
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
