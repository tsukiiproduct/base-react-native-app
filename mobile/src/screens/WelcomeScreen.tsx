import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen, Button } from '../components';
import { useTheme } from '../theme';
import type { AuthScreenProps } from '../navigation/types';

export const WelcomeScreen: React.FC<AuthScreenProps<'Welcome'>> = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={[theme.typography.h1, { color: theme.colors.textPrimary }]}>Welcome</Text>
          <Text style={[theme.typography.bodyLg, { color: theme.colors.textSecondary, marginTop: theme.spacing.sm }]}>
            A clean React Native starter to build from.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button label="Log in" fullWidth onPress={() => navigation.navigate('Login')} />
          <Button
            label="Create account"
            variant="secondary"
            fullWidth
            onPress={() => navigation.navigate('Register')}
            style={{ marginTop: theme.spacing.md }}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  hero: { alignItems: 'flex-start', marginTop: 48 },
  actions: { paddingBottom: 16 },
});
