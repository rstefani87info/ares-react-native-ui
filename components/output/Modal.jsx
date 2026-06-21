import {useState} from 'react';
import {
  Modal as RNModal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {getElevationStyle, getUiTokens} from '../../styles';

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
  visible: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
};

export function Modal({title, message, actions, behavior, reset, children, visible: controlledVisible, style, onClose}) {
  const tokens = getUiTokens();
  const [visible, setVisible] = useState(false);
  const actualVisible = controlledVisible ?? visible;

  const handleModal = () => {
    if (behavior.closeOnOutClick) {
      setVisible(false);
    }
    if (!behavior.keepStatusAfterClose) {
      reset();
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <RNModal
      visible={actualVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModal}>
      <View style={[styles.container(tokens), style?.container]}>
        <View style={[styles.modal(tokens), style?.modal]}>
          <Text style={[styles.title(tokens), style?.title]}>{title}</Text>
          <Text style={[styles.message(tokens), style?.message]}>{message}</Text>
          {children}
          <View style={[styles.actions(tokens), style?.actions]}>
            {Object.entries(actions).map(
              ([actionTitle, actionFunction], key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    if (typeof actionFunction === 'function') {
                      actionFunction();
                    }
                    if (!behavior.keepStatusAfterClose) {
                      reset();
                    }
                  }}>
                  <Text style={[styles.action(tokens), style?.action]}>{actionTitle}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </View>
    </RNModal>
  );
}

export default Modal;

const styles = {
  container: (tokens) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.overlay,
    padding: tokens.spacing.lg,
  }),
  modal: (tokens) => ({
    width: '100%',
    maxWidth: 520,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radii.lg,
    padding: tokens.spacing.lg,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    ...getElevationStyle(2),
  }),
  title: (tokens) => ({
    fontSize: tokens.typography.size.xl,
    fontWeight: tokens.typography.weight.bold,
    color: tokens.colors.text,
    marginBottom: tokens.spacing.xs,
  }),
  message: (tokens) => ({
    fontSize: tokens.typography.size.md,
    color: tokens.colors.textMuted,
    marginBottom: tokens.spacing.md,
  }),
  actions: (tokens) => ({
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  }),
  action: (tokens) => ({
    fontSize: tokens.typography.size.md,
    color: tokens.colors.link,
    fontWeight: tokens.typography.weight.semibold,
  }),
};
