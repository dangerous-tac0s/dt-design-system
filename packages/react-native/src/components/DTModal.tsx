/**
 * DT Modal Component
 *
 * Wraps React Native Paper's Modal + Portal with the Dangerous Things
 * aesthetic. Content is rendered inside a DTCard for the beveled look.
 *
 * Web CSS reference (Modal.tsx):
 * - Centered overlay with dark backdrop
 * - Content in beveled card container
 */

import {StyleSheet, ViewStyle, StyleProp, KeyboardAvoidingView, Platform} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import {DTColors} from '../theme/colors';
import {type DTVariant} from '../utils/variantColors';
import {DTCard} from './DTCard';

interface DTModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  /**
   * Called when the modal is dismissed
   */
  onDismiss: () => void;
  /**
   * Optional title for the modal header
   */
  title?: string;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Whether the modal can be dismissed by tapping the backdrop
   * @default true
   */
  dismissable?: boolean;
  /**
   * Additional styles for the card content area
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the modal container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled Modal wrapping React Native Paper Modal + Portal
 *
 * @example
 * <DTModal visible={showModal} onDismiss={() => setShowModal(false)} title="Confirm">
 *   <Text>Are you sure?</Text>
 * </DTModal>
 *
 * @example
 * <DTModal visible={isOpen} onDismiss={close} variant="warning" title="Error">
 *   <Text>Something went wrong</Text>
 * </DTModal>
 */
export function DTModal({
  visible,
  onDismiss,
  title,
  variant = 'normal',
  children,
  dismissable = true,
  contentStyle,
  style,
}: DTModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        dismissable={dismissable}
        contentContainerStyle={[styles.container, style]}
        style={styles.modal}
        theme={{
          colors: {
            backdrop: DTColors.overlay,
          },
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}>
          <DTCard
            mode={variant}
            title={title}
            showHeader={!!title}
            contentStyle={contentStyle}>
            {children}
          </DTCard>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {},
  container: {
    marginHorizontal: 24,
  },
  keyboardAvoid: {
    width: '100%',
  },
});
