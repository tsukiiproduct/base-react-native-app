import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Screen, Header, Card, Button, Modal } from '../components';
import { useTheme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import type { ProfileScreenProps } from '../navigation/types';

export const ProfileScreen: React.FC<ProfileScreenProps<'ProfileMain'>> = ({ navigation }) => {
  const theme = useTheme();
  const { signOut } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Screen scroll>
      <Header
        title="Profile"
        subtitle="Your account info."
        right={<Button label="Settings" variant="ghost" size="sm" onPress={() => navigation.navigate('Settings')} />}
      />

      <Card>
        <View style={styles.avatarRow}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={[theme.typography.h3, { color: theme.colors.textInverse }]}>U</Text>
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>Guest User</Text>
            <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>guest@example.com</Text>
          </View>
        </View>
      </Card>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Button label="Edit profile (placeholder)" variant="secondary" fullWidth onPress={() => {}} />
        <View style={{ height: 8 }} />
        <Button label="Log out" variant="danger" fullWidth onPress={() => setConfirmOpen(true)} />
      </View>

      <Modal visible={confirmOpen} onClose={() => setConfirmOpen(false)} title="Log out?">
        <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>
          You'll be signed out and returned to the welcome screen.
        </Text>
        <View style={{ marginTop: theme.spacing.lg }}>
          <Button label="Yes, log me out" variant="danger" fullWidth onPress={() => { setConfirmOpen(false); signOut(); }} />
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});
