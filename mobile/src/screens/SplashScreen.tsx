// Pure visual splash. Rendered directly by RootNavigator while bootstrapping.

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Logo } from '../components';
import { useTheme } from '../theme';

export const SplashScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Logo size={112} />
      <Text style={[theme.typography.h1, styles.title, { color: theme.colors.textPrimary }]}>
        RN Starter
      </Text>
      <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginBottom: theme.spacing['2xl'] }]}>
        Loading your experience…
      </Text>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 24, marginBottom: 4 },
});
