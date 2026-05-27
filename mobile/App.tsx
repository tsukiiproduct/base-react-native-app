import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { API_BASE_URL } from './src/config/api';
import {
  Screen,
  Card,
  Button,
  Badge,
  PageHeader,
  Divider,
} from './src/components';
import { lightTheme } from './src/theme';
import { healthService } from './src/services/healthService';
import { configService } from './src/services/configService';
import { profileService } from './src/services/profileService';
import type { AppConfig, User } from './src/types';

interface AsyncSlot<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const initial = <T,>(): AsyncSlot<T> => ({ data: null, error: null, loading: false });

const App = () => {
  const theme = lightTheme;

  const [message, setMessage] = useState<AsyncSlot<string>>(initial());
  const [config, setConfig] = useState<AsyncSlot<AppConfig>>(initial());
  const [profile, setProfile] = useState<AsyncSlot<User>>(initial());

  const run = async <T,>(
    label: string,
    set: React.Dispatch<React.SetStateAction<AsyncSlot<T>>>,
    fn: () => Promise<T>
  ) => {
    set({ data: null, error: null, loading: true });
    try {
      const data = await fn();
      set({ data, error: null, loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      set({ data: null, error: label + ' failed: ' + msg, loading: false });
    }
  };

  const fetchMessage = () =>
    run('Message', setMessage, async () => {
      const res = await healthService.getMessage();
      return res.message;
    });

  const fetchConfig = () =>
    run('Config', setConfig, () => configService.getConfig());

  const fetchProfile = () =>
    run('Profile', setProfile, async () => {
      const res = await profileService.getProfile();
      return res.profile;
    });

  return (
    <Screen scroll>
      <PageHeader
        title="RN Starter"
        subtitle="Tap a button to call the matching backend endpoint."
      />

      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>
            /api/message
          </Text>
          <Badge label="GET" tone="info" />
        </View>
        <Button
          label={message.loading ? 'Loading...' : 'Fetch message'}
          loading={message.loading}
          onPress={fetchMessage}
          style={styles.button}
        />
        <ResultBlock slot={message} render={(m) => <KV label="message" value={m} />} emptyHint="No response yet." />
      </Card>

      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>
            /api/config
          </Text>
          <Badge label="GET" tone="info" />
        </View>
        <Button
          label={config.loading ? 'Loading...' : 'Fetch config'}
          variant="secondary"
          loading={config.loading}
          onPress={fetchConfig}
          style={styles.button}
        />
        <ResultBlock
          slot={config}
          emptyHint="No response yet."
          render={(c) => (
            <View>
              <KV label="appName" value={c.appName} />
              <KV label="apiVersion" value={c.apiVersion} />
              <KV label="environment" value={c.environment} />
              <Divider />
              <Text style={[theme.typography.bodySm, styles.flagsLabel, { color: theme.colors.textSecondary }]}>
                Feature flags:
              </Text>
              {Object.entries(c.featureFlags).map(([k, v]) => (
                <KV key={k} label={k} value={String(v)} />
              ))}
            </View>
          )}
        />
      </Card>

      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={[theme.typography.h3, { color: theme.colors.textPrimary }]}>
            /api/profile
          </Text>
          <Badge label="GET" tone="info" />
        </View>
        <Button
          label={profile.loading ? 'Loading...' : 'Fetch profile'}
          variant="secondary"
          loading={profile.loading}
          onPress={fetchProfile}
          style={styles.button}
        />
        <ResultBlock
          slot={profile}
          emptyHint="No response yet."
          render={(p) => (
            <View>
              <KV label="id" value={p.id} />
              <KV label="displayName" value={p.displayName} />
              <KV label="email" value={p.email == null ? '(null)' : p.email} />
              <KV label="createdAt" value={p.createdAt} />
            </View>
          )}
        />
      </Card>

      <Text style={[styles.footer, { color: theme.colors.textMuted }]}>
        API base: {API_BASE_URL}
      </Text>
    </Screen>
  );
};

function ResultBlock<T>(props: {
  slot: AsyncSlot<T>;
  render: (data: T) => React.ReactNode;
  emptyHint: string;
}) {
  const theme = lightTheme;
  const { slot, render, emptyHint } = props;
  if (slot.loading) return null;
  if (slot.error) {
    return (
      <Text style={[theme.typography.bodySm, styles.errorText, { color: theme.colors.danger }]}>
        {slot.error}
      </Text>
    );
  }
  if (slot.data === null) {
    return (
      <Text style={[theme.typography.bodySm, styles.emptyText, { color: theme.colors.textMuted }]}>
        {emptyHint}
      </Text>
    );
  }
  return <View style={styles.resultBox}>{render(slot.data)}</View>;
}

function KV(props: { label: string; value: string }) {
  const theme = lightTheme;
  return (
    <View style={styles.kv}>
      <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
        {props.label}
      </Text>
      <Text
        style={[theme.typography.bodySm, styles.kvValue, { color: theme.colors.textPrimary }]}
        numberOfLines={2}
      >
        {props.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  button: { marginTop: 12 },
  kv: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  kvValue: { flexShrink: 1, marginLeft: 12, textAlign: 'right' },
  resultBox: { marginTop: 12 },
  errorText: { marginTop: 8 },
  emptyText: { marginTop: 8, fontStyle: 'italic' },
  flagsLabel: { marginTop: 8 },
  footer: { marginTop: 8, textAlign: 'center', fontSize: 12 },
});

export default App;
