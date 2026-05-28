import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme } from '../../theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  const theme = lightTheme;
  return (
    <View style={[styles.container, { padding: theme.spacing.xl }]}>
      <Text style={[theme.typography.h3, { color: theme.colors.textPrimary, textAlign: 'center' }]}>
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            theme.typography.body,
            { color: theme.colors.textSecondary, marginTop: theme.spacing.sm, textAlign: 'center' },
          ]}
        >
          {description}
        </Text>
      ) : null}
      {action ? <View style={{ marginTop: theme.spacing.lg }}>{action}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
