// Standard screen wrapper. Use on every screen for consistent padding,
// background, and safe-area handling.

import React from 'react';
import { StyleSheet, ScrollView, View, ViewStyle, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  keyboardAvoiding?: boolean;
  style?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scroll = false,
  padded = true,
  keyboardAvoiding = false,
  style,
}) => {
  const theme = useTheme();

  const innerStyle: ViewStyle = {
    flexGrow: 1,
    padding: padded ? theme.spacing.lg : 0,
  };

  const content = scroll ? (
    <ScrollView contentContainerStyle={[innerStyle, style]} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={[innerStyle, style]}>{children}</View>
  );

  const inner = keyboardAvoiding ? (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      {inner}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
