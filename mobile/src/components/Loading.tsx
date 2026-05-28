import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface LoadingProps {
  label?: string;
  fullscreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ label, fullscreen = false }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        fullscreen ? styles.fullscreen : styles.inline,
        fullscreen && { backgroundColor: theme.colors.background },
      ]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {label ? (
        <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: theme.spacing.sm }]}>
          {label}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inline: { alignItems: 'center', justifyContent: 'center', padding: 16 },
  fullscreen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
