import React, {useState} from 'react';
import {
  Modal as RNModal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  behavior: PropTypes.shape({
    closeOnOutClick: PropTypes.bool,
    keepStatusAfterClose: PropTypes.bool,
  }).isRequired,
  reset: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export function Modal({title, message, actions, behavior, reset, children}) {
  const [visible, setVisible] = useState(false);

  const handleModal = () => {
    if (behavior.closeOnOutClick) {
      setVisible(false);
    }
    if (!behavior.keepStatusAfterClose) {
      reset();
    }
  };

  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModal}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          {children}
          <View style={styles.actions}>
            {Object.entries(actions).map(
              ([actionTitle, actionFunction], key) => (
                <TouchableOpacity key={key} onPress={actionFunction}>
                  <Text style={styles.action}>{actionTitle}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    fontSize: 16,
    color: '#007AFF',
  },
});
