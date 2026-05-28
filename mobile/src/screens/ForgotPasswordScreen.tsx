import React, { useState } from 'react';
import { View } from 'react-native';
import { Screen, Header, Input, Button, useToast } from '../components';
import { useTheme } from '../theme';
import type { AuthScreenProps } from '../navigation/types';

export const ForgotPasswordScreen: React.FC<AuthScreenProps<'ForgotPassword'>> = ({ navigation }) => {
  const theme = useTheme();
  const toast = useToast();
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    toast.show('Reset link sent (placeholder)', 'success');
    setTimeout(() => navigation.goBack(), 600);
  };

  return (
    <Screen scroll keyboardAvoiding>
      <Header title="Forgot password?" subtitle="Enter your email to receive a reset link." />
      <Input
        label="Email"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={{ height: theme.spacing.xl }} />
      <Button label="Send reset link" fullWidth onPress={onSubmit} />
      <View style={{ height: theme.spacing.md }} />
      <Button label="Back to login" variant="ghost" fullWidth onPress={() => navigation.goBack()} />
    </Screen>
  );
};
