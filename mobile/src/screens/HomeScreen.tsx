import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen, Header, Card, Button, useToast } from '../components';
import { useTheme } from '../theme';
import { API_BASE_URL } from '../config/api';
import type { HomeScreenProps } from '../navigation/types';

// Sample list items so Home isn't empty. Real apps replace with real data.
const ITEMS = [
  { id: '1', title: 'Welcome to your starter', body: 'Tap any card to see Details screen.' },
  { id: '2', title: 'Second item', body: 'Each card pushes a stack route with the item id.' },
  { id: '3', title: 'Third item', body: 'Back arrow / swipe-back works automatically.' },
];

export const HomeScreen: React.FC<HomeScreenProps<'HomeMain'>> = ({ navigation }) => {
  const theme = useTheme();
  const toast = useToast();
  const [pinging, setPinging] = useState(false);

  const pingBackend = async () => {
    setPinging(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/message`);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      toast.show(data.message ?? 'OK', 'success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.show('Backend: ' + msg, 'error');
    } finally {
      setPinging(false);
    }
  };

  return (
    <Screen scroll>
      <Header title="Home" subtitle="Your starting point." />

      <Card style={styles.card}>
        <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>Backend check</Text>
        <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: theme.spacing.xs }]}>
          {API_BASE_URL}
        </Text>
        <Button
          label={pinging ? 'Pinging…' : 'Ping /api/message'}
          loading={pinging}
          onPress={pingBackend}
          style={{ marginTop: theme.spacing.md }}
        />
      </Card>

      <View style={{ marginTop: theme.spacing.lg }}>
        {ITEMS.map((item) => (
          <Card
            key={item.id}
            onPress={() => navigation.navigate('Details', { id: item.id, title: item.title })}
            style={styles.card}
          >
            <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>{item.title}</Text>
            <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: theme.spacing.xs }]}>
              {item.body}
            </Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
});
