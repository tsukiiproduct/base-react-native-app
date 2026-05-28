import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Screen, Header, Card, Divider, useToast } from '../components';
import { useTheme } from '../theme';
import { useThemePreference, ThemePreference } from '../context/ThemeContext';
import type { ProfileScreenProps } from '../navigation/types';

export const SettingsScreen: React.FC<ProfileScreenProps<'Settings'>> = () => {
  const theme = useTheme();
  const toast = useToast();
  const { preference, setPreference } = useThemePreference();

  const [notifications, setNotifications] = useState(true);
  const [emailSummary, setEmailSummary] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const placeholder = (label: string) => () => toast.show(label + ' (coming soon)', 'info');

  return (
    <Screen scroll>
      <Header title="Settings" subtitle="App preferences and account actions." />

      <SectionLabel>Appearance</SectionLabel>
      <Card>
        <Text style={[theme.typography.body, styles.label, { color: theme.colors.textPrimary }]}>
          Theme
        </Text>
        <Text
          style={[
            theme.typography.bodySm,
            { color: theme.colors.textSecondary, marginBottom: theme.spacing.md },
          ]}
        >
          Choose Light, Dark, or follow the system setting.
        </Text>
        <ThemeSegmented value={preference} onChange={setPreference} />
      </Card>

      <SectionLabel>Notifications</SectionLabel>
      <Card>
        <SettingRow
          title="Push notifications"
          subtitle="Allow notifications from this app."
          value={notifications}
          onChange={setNotifications}
        />
        <Divider />
        <SettingRow
          title="Email summary"
          subtitle="A weekly digest delivered to your inbox."
          value={emailSummary}
          onChange={setEmailSummary}
        />
      </Card>

      <SectionLabel>Privacy</SectionLabel>
      <Card>
        <SettingRow
          title="Anonymous analytics"
          subtitle="Share anonymous usage data to help improve the app."
          value={analytics}
          onChange={setAnalytics}
        />
      </Card>

      <SectionLabel>Account</SectionLabel>
      <Card>
        <ActionRow title="Edit profile" subtitle="Update your name and photo." onPress={placeholder('Edit profile')} />
        <Divider />
        <ActionRow title="Change password" subtitle="Set a new sign-in password." onPress={placeholder('Change password')} />
        <Divider />
        <ActionRow title="Linked devices" subtitle="See where you're signed in." onPress={placeholder('Linked devices')} />
      </Card>

      <SectionLabel>About</SectionLabel>
      <Card>
        <View style={styles.row}>
          <Text style={[theme.typography.body, { color: theme.colors.textPrimary }]}>Version</Text>
          <Text style={[theme.typography.body, { color: theme.colors.textMuted }]}>0.1.0</Text>
        </View>
        <Divider />
        <ActionRow title="Terms of service" onPress={placeholder('Terms')} />
        <Divider />
        <ActionRow title="Privacy policy" onPress={placeholder('Privacy')} />
      </Card>

      <View style={{ height: theme.spacing.xl }} />
    </Screen>
  );
};

// -- inline helpers ------------------------------------------------------

const SectionLabel: React.FC<{ children: string }> = ({ children }) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        theme.typography.caption,
        {
          color: theme.colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.sm,
          marginLeft: theme.spacing.xs,
        },
      ]}
    >
      {children}
    </Text>
  );
};

const SettingRow: React.FC<{
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ title, subtitle, value, onChange }) => {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1, marginRight: 12 }}>
        <Text style={[theme.typography.body, { color: theme.colors.textPrimary, fontWeight: '600' }]}>{title}</Text>
        {subtitle ? (
          <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: 2 }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Switch value={value} onValueChange={onChange} />
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
      style={({ pressed }) => [
        styles.row,
        pressed && { opacity: 0.6 },
      ]}
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

const ThemeSegmented: React.FC<{
  value: ThemePreference;
  onChange: (v: ThemePreference) => void;
}> = ({ value, onChange }) => {
  const theme = useTheme();
  const options: { key: ThemePreference; label: string }[] = [
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
    { key: 'system', label: 'System' },
  ];

  return (
    <View
      style={[
        styles.segmented,
        {
          backgroundColor: theme.colors.surfaceMuted,
          borderRadius: theme.radii.md,
          padding: 4,
        },
      ]}
    >
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            style={[
              styles.segment,
              {
                backgroundColor: active ? theme.colors.surface : 'transparent',
                borderRadius: theme.radii.sm,
              },
            ]}
          >
            <Text
              style={[
                theme.typography.bodySm,
                {
                  color: active ? theme.colors.textPrimary : theme.colors.textSecondary,
                  fontWeight: active ? '600' : '400',
                },
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  label: { fontWeight: '600' },
  segmented: { flexDirection: 'row' },
  segment: { flex: 1, paddingVertical: 8, alignItems: 'center' },
});
