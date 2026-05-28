import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { lightTheme } from '../../theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, hint, containerStyle, ...textInputProps }, ref) => {
    const theme = lightTheme;
    const hasError = Boolean(error);

    return (
      <View style={[styles.container, containerStyle]}>
        {label ? (
          <Text
            style={[
              theme.typography.bodySm,
              { color: theme.colors.textSecondary, marginBottom: theme.spacing.xs },
            ]}
          >
            {label}
          </Text>
        ) : null}

        <TextInput
          ref={ref}
          placeholderTextColor={theme.colors.textMuted}
          style={[
            styles.input,
            theme.typography.body,
            {
              color: theme.colors.textPrimary,
              backgroundColor: theme.colors.surface,
              borderColor: hasError ? theme.colors.danger : theme.colors.border,
              borderRadius: theme.radii.md,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
            },
          ]}
          {...textInputProps}
        />

        {hasError ? (
          <Text
            style={[
              theme.typography.caption,
              { color: theme.colors.danger, marginTop: theme.spacing.xs },
            ]}
          >
            {error}
          </Text>
        ) : hint ? (
          <Text
            style={[
              theme.typography.caption,
              { color: theme.colors.textMuted, marginTop: theme.spacing.xs },
            ]}
          >
            {hint}
          </Text>
        ) : null}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: { borderWidth: 1 },
});
