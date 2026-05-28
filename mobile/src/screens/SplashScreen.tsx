// Pure visual splash. NOT registered as a stack screen — RootNavigator
// renders this directly (outside any navigator) while the app bootstraps.
// When AuthContext flips isBootstrapping to false, RootNavigator swaps to
// the Auth or Main stack on its own.

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme';

export const SplashScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[theme.typography.h1, { color: theme.colors.textPrimary }]}>RN Starter</Text>
      <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: 8, marginBottom: 32 }]}>
        Loading…
      </Text>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
