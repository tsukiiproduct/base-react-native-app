import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Screen, Header, Input, Button } from '../components';
import { useTheme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import type { AuthScreenProps } from '../navigation/types';

export const RegisterScreen: React.FC<AuthScreenProps<'Register'>> = ({ navigation }) => {
  const theme = useTheme();
  const { signIn } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => signIn();

  return (
    <Screen scroll keyboardAvoiding>
      <Header title="Create account" subtitle="Sign up to get started." />

      <Input label="Name" placeholder="Your name" value={name} onChangeText={setName} />
      <View style={{ height: theme.spacing.md }} />
      <Input
        label="Email"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={{ height: theme.spacing.md }} />
      <Input label="Password" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />

      <Button label="Create account" fullWidth onPress={onRegister} style={{ marginTop: theme.spacing.xl }} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.lg }}>
        <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={[theme.typography.bodySm, { color: theme.colors.primary }]}>Log in</Text>
        </Pressable>
      </View>
    </Screen>
  );
};
