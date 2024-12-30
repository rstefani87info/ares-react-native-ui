import React from 'react';
import PropTypes from 'prop-types';
import { Text, Linking, StyleSheet } from 'react-native';

export default function Link({ url, children, style }){
  const handlePress = () => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <Text style={[styles.link, style]} onPress={handlePress}>
      {children}
    </Text>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  link: {
    color: '#1B95E0',
    textDecorationLine: 'underline',
  },
});


