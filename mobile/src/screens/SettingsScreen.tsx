import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Screen, Header, Card, Divider } from '../components';
import { useTheme } from '../theme';
import type { ProfileScreenProps } from '../navigation/types';

export const SettingsScreen: React.FC<ProfileScreenProps<'Settings'>> = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <Screen scroll>
      <Header title="Settings" subtitle="App preferences." />

      <Card>
        <SettingRow
          title="Push notifications"
          subtitle="Allow notifications from this app."
          value={notifications}
          onChange={setNotifications}
        />
        <Divider />
        <SettingRow
          title="Anonymous analytics"
          subtitle="Help improve the app with anonymous usage data."
          value={analytics}
          onChange={setAnalytics}
        />
      </Card>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Text style={[theme.typography.bodySm, { color: theme.colors.textMuted }]}>
          Light/dark mode follows the system setting.
        </Text>
      </View>
    </Screen>
  );
};

const SettingRow: React.FC<{
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ title, subtitle, value, onChange }) => {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1, marginRight: 12 }}>
        <Text style={[theme.typography.body, { color: theme.colors.textPrimary, fontWeight: '600' }]}>{title}</Text>
        <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: 2 }]}>{subtitle}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
});
