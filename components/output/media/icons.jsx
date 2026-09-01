
import PropTypes from 'prop-types';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

Reset.propTypes = {
  style: PropTypes.object,
};

export function Reset({style, ...props}) {
  return (
    <FontAwesome6
      name="rotate-left"
      solid
      style={style}
      {...props}
    />
  );
}