import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { padding: theme.spacing.xl }]}>
      <Text style={[theme.typography.h3, styles.center, { color: theme.colors.textPrimary }]}>{title}</Text>
      {description ? (
        <Text style={[theme.typography.body, styles.center, { color: theme.colors.textSecondary, marginTop: theme.spacing.sm }]}>
          {description}
        </Text>
      ) : null}
      {action ? <View style={{ marginTop: theme.spacing.lg }}>{action}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  center: { textAlign: 'center' },
});
