import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen, Header, Card, Divider } from '../components';
import { useTheme } from '../theme';
import type { TabScreenProps } from '../navigation/types';

const NOTIFICATIONS = [
  { id: '1', title: 'Welcome aboard', body: 'Your account is ready.', time: '2m ago' },
  { id: '2', title: 'New feature', body: 'Check out the latest update.', time: '1h ago' },
  { id: '3', title: 'Reminder', body: 'You have an item to review.', time: 'Yesterday' },
];

export const NotificationsScreen: React.FC<TabScreenProps<'Notifications'>> = () => {
  const theme = useTheme();
  return (
    <Screen scroll>
      <Header title="Notifications" subtitle="Recent updates and alerts." />
      <Card>
        {NOTIFICATIONS.map((n, idx) => (
          <View key={n.id}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={[theme.typography.body, { color: theme.colors.textPrimary, fontWeight: '600' }]}>{n.title}</Text>
                <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: 2 }]}>{n.body}</Text>
              </View>
              <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginLeft: 12 }]}>{n.time}</Text>
            </View>
            {idx < NOTIFICATIONS.length - 1 ? <Divider /> : null}
          </View>
        ))}
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8 },
});
