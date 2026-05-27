import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { lightTheme } from '../../theme';

interface LoadingWrapperProps {
  loading: boolean;
  error?: Error | string | null;
  empty?: boolean;
  children: React.ReactNode;
  emptyLabel?: string;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  error,
  empty,
  emptyLabel = 'Nothing here yet.',
  children,
}) => {
  const theme = lightTheme;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    const msg = typeof error === 'string' ? error : error.message;
    return (
      <View style={styles.center}>
        <Text style={[theme.typography.body, { color: theme.colors.danger, textAlign: 'center' }]}>
          {msg}
        </Text>
      </View>
    );
  }

  if (empty) {
    return (
      <View style={styles.center}>
        <Text style={[theme.typography.body, { color: theme.colors.textMuted }]}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
});
