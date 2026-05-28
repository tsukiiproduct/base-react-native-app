// Top-level screen wrapper. Handles safe-area padding and theme background.
// Wrap every screen in this — gives a consistent layout baseline.

import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, ViewStyle, StatusBar } from 'react-native';
import { lightTheme } from '../../theme';

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scroll = false,
  padded = true,
  style,
}) => {
  // TODO: pull from useTheme() once the theme store is wired up.
  const theme = lightTheme;

  const inner = (
    <View style={[padded && { padding: theme.spacing.lg }, style]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scrollContent: { flexGrow: 1 },
});
