import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme } from '../../theme';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  label: string;
  tone?: Tone;
}

export const Badge: React.FC<BadgeProps> = ({ label, tone = 'neutral' }) => {
  const theme = lightTheme;
  const { bg, fg } = getTone(theme, tone);

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: bg,
          borderRadius: theme.radii.pill,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        },
      ]}
    >
      <Text style={[theme.typography.caption, { color: fg }]}>{label}</Text>
    </View>
  );
};

function getTone(theme: typeof lightTheme, tone: Tone) {
  const { colors } = theme;
  switch (tone) {
    case 'success':
      return { bg: colors.success, fg: colors.textInverse };
    case 'warning':
      return { bg: colors.warning, fg: colors.textInverse };
    case 'danger':
      return { bg: colors.danger, fg: colors.textInverse };
    case 'info':
      return { bg: colors.primary, fg: colors.textInverse };
    case 'neutral':
    default:
      return { bg: colors.surfaceMuted, fg: colors.textSecondary };
  }
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start' },
});
