import PropTypes from 'prop-types';
import { Text, Linking, StyleSheet } from 'react-native';
import { config } from '../../config';
import {getUiTokens} from '../../styles';

export default function Link({ url, children, style }){
  const tokens = getUiTokens();
  const handlePress = () => {
    Linking.openURL(url).catch(err => config.logger?.error?.("Couldn't load page", err));
  };

  return (
    <Text style={[styles.link(tokens), style]} onPress={handlePress}>
      {children}
    </Text>
  );
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const styles = {
  link: (tokens) => StyleSheet.create({
    link: {
      color: tokens.colors.link,
      textDecorationLine: 'underline',
      textDecorationColor: tokens.colors.link,
      fontWeight: tokens.typography.weight.medium,
    },
  }).link,
};
