import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
  const theme = useTheme();
  const dynamicStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.base, dynamicStyle, pressed && { opacity: 0.7 }, style]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.base, dynamicStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: { borderWidth: StyleSheet.hairlineWidth },
});
