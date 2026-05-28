import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Screen, Header, Card, Button, Modal, Divider, useToast } from '../components';
import { useTheme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import type { ProfileScreenProps } from '../navigation/types';

export const ProfileScreen: React.FC<ProfileScreenProps<'ProfileMain'>> = ({ navigation }) => {
  const theme = useTheme();
  const toast = useToast();
  const { signOut } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const placeholder = (label: string) => () => toast.show(label + ' (coming soon)', 'info');

  return (
    <Screen scroll>
      <Header
        title="Profile"
        subtitle="Your account at a glance."
        right={
          <Button label="Settings" variant="ghost" size="sm" onPress={() => navigation.navigate('Settings')} />
        }
      />

      {/* Identity card */}
      <Card>
        <View style={styles.identityRow}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={[theme.typography.h2, { color: theme.colors.textInverse }]}>GU</Text>
          </View>
          <View style={styles.identityText}>
            <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>Guest User</Text>
            <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
              guest@example.com
            </Text>
            <Text
              style={[
                theme.typography.caption,
                { color: theme.colors.textMuted, marginTop: theme.spacing.xs },
              ]}
            >
              Member since today
            </Text>
          </View>
        </View>
      </Card>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatTile label="Posts" value="0" />
        <StatTile label="Following" value="0" />
        <StatTile label="Followers" value="0" />
      </View>

      {/* Account quick actions */}
      <Text
        style={[
          theme.typography.caption,
          styles.sectionLabel,
          { color: theme.colors.textMuted },
        ]}
      >
        ACCOUNT
      </Text>
      <Card>
        <ActionRow title="Edit profile" subtitle="Update your name and photo." onPress={placeholder('Edit profile')} />
        <Divider />
        <ActionRow title="Saved items" subtitle="Bookmarks, drafts, history." onPress={placeholder('Saved items')} />
        <Divider />
        <ActionRow title="Settings" subtitle="App preferences and theme." onPress={() => navigation.navigate('Settings')} />
      </Card>

      <Text
        style={[
          theme.typography.caption,
          styles.sectionLabel,
          { color: theme.colors.textMuted },
        ]}
      >
        SUPPORT
      </Text>
      <Card>
        <ActionRow title="Help center" onPress={placeholder('Help center')} />
        <Divider />
        <ActionRow title="Send feedback" onPress={placeholder('Send feedback')} />
      </Card>

      <View style={{ marginTop: theme.spacing.lg }}>
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

      <View style={{ height: theme.spacing.xl }} />
    </Screen>
  );
};

// -- inline helpers ------------------------------------------------------

const StatTile: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.statTile,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
        },
      ]}
    >
      <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>{value}</Text>
      <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>{label}</Text>
    </View>
  );
};

const ActionRow: React.FC<{
  title: string;
  subtitle?: string;
  onPress: () => void;
}> = ({ title, subtitle, onPress }) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}
    >
      <View style={{ flex: 1, marginRight: 12 }}>
        <Text style={[theme.typography.body, { color: theme.colors.textPrimary, fontWeight: '600' }]}>{title}</Text>
        {subtitle ? (
          <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: 2 }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Text style={[theme.typography.body, { color: theme.colors.textMuted }]}>{'›'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  identityRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  identityText: { marginLeft: 16, flex: 1 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  statTile: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sectionLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
});
