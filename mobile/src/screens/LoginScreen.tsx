import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Screen, Header, Input, Button } from '../components';
import { useTheme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import type { AuthScreenProps } from '../navigation/types';

export const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({ navigation }) => {
  const theme = useTheme();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // No real auth — pressing the button flips the auth flag and RootNavigator
  // re-renders the Main tabs.
  const onLogin = () => signIn();

  return (
    <Screen scroll keyboardAvoiding>
      <Header title="Log in" subtitle="Sign in with your account." />

      <Input
        label="Email"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={{ height: theme.spacing.md }} />

      <Input
        label="Password"
        placeholder="••••••••"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={{ marginTop: theme.spacing.sm, alignSelf: 'flex-end' }}>
        <Text style={[theme.typography.bodySm, { color: theme.colors.primary }]}>Forgot password?</Text>
      </Pressable>

      <Button label="Log in" fullWidth onPress={onLogin} style={{ marginTop: theme.spacing.xl }} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.lg }}>
        <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>No account? </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={[theme.typography.bodySm, { color: theme.colors.primary }]}>Sign up</Text>
        </Pressable>
      </View>
    </Screen>
  );
};
