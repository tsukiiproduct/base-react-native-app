import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  PressableProps,
} from 'react-native';
import { lightTheme } from '../../theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...pressableProps
}) => {
  const theme = lightTheme;
  const isDisabled = disabled || loading;

  const visuals = getVisuals(theme, variant, isDisabled);
  const padding = getPadding(theme, size);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        padding,
        {
          backgroundColor: pressed && !isDisabled ? visuals.pressedBg : visuals.bg,
          borderColor: visuals.border,
          borderRadius: theme.radii.md,
        },
        fullWidth && { width: '100%' },
        style,
      ]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={visuals.fg} />
      ) : (
        <Text style={[theme.typography.button, { color: visuals.fg }]}>{label}</Text>
      )}
    </Pressable>
  );
};

function getVisuals(theme: typeof lightTheme, variant: Variant, disabled: boolean) {
  const { colors } = theme;
  if (disabled) {
    return {
      bg: colors.primaryDisabled,
      pressedBg: colors.primaryDisabled,
      border: colors.primaryDisabled,
      fg: colors.textInverse,
    };
  }
  switch (variant) {
    case 'secondary':
      return {
        bg: colors.surfaceMuted,
        pressedBg: colors.border,
        border: colors.border,
        fg: colors.textPrimary,
      };
    case 'ghost':
      return {
        bg: 'transparent',
        pressedBg: colors.surfaceMuted,
        border: 'transparent',
        fg: colors.primary,
      };
    case 'danger':
      return {
        bg: colors.danger,
        pressedBg: colors.danger,
        border: colors.danger,
        fg: colors.textInverse,
      };
    case 'primary':
    default:
      return {
        bg: colors.primary,
        pressedBg: colors.primaryPressed,
        border: colors.primary,
        fg: colors.textInverse,
      };
  }
}

function getPadding(theme: typeof lightTheme, size: Size) {
  switch (size) {
    case 'sm':
      return { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md };
    case 'lg':
      return { paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.xl };
    case 'md':
    default:
      return { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg };
  }
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
