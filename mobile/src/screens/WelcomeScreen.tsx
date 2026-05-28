import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen, Button, Logo } from '../components';
import { useTheme } from '../theme';
import type { AuthScreenProps } from '../navigation/types';

export const WelcomeScreen: React.FC<AuthScreenProps<'Welcome'>> = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Logo size={96} />
          <Text style={[theme.typography.h1, styles.title, { color: theme.colors.textPrimary }]}>
            Welcome
          </Text>
          <Text
            style={[
              theme.typography.bodyLg,
              styles.subtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
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
          <Text
            style={[
              theme.typography.caption,
              styles.legal,
              { color: theme.colors.textMuted },
            ]}
          >
            By continuing you agree to the placeholder Terms and Privacy Policy.
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  hero: { alignItems: 'center', marginTop: 64 },
  title: { marginTop: 24, marginBottom: 8 },
  subtitle: { textAlign: 'center', paddingHorizontal: 24 },
  actions: { paddingBottom: 16 },
  legal: { textAlign: 'center', marginTop: 16, paddingHorizontal: 24 },
});
