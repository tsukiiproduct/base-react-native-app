// Thin wrapper around React Native's Modal with theme-aware backdrop and surface.

import React from 'react';
import { Modal as RNModal, View, StyleSheet, Pressable, Text } from 'react-native';
import { useTheme } from '../theme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children }) => {
  const theme = useTheme();
  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.lg,
              padding: theme.spacing.xl,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {title ? (
            <Text style={[theme.typography.h3, { color: theme.colors.textPrimary, marginBottom: theme.spacing.md }]}>
              {title}
            </Text>
          ) : null}
          {children}
          <View style={{ marginTop: theme.spacing.lg, alignItems: 'flex-end' }}>
            <Pressable onPress={onClose}>
              <Text style={[theme.typography.button, { color: theme.colors.primary }]}>Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  sheet: { width: '100%', maxWidth: 480 },
});
