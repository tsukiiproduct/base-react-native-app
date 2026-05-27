import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { API_BASE_URL } from './src/config/api';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchMessage = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/message`);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(`Could not reach backend: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fb" />
      <View style={styles.container}>
        <Text style={styles.title}>RN Starter</Text>
        <Text style={styles.subtitle}>
          Welcome! Tap the button below to call the backend API.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={fetchMessage}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Call Backend'}
          </Text>
        </Pressable>

        <View style={styles.statusBox}>
          {loading && <ActivityIndicator size="large" />}

          {!loading && error && <Text style={styles.errorText}>{error}</Text>}

          {!loading && message && (
            <Text style={styles.messageText}>{message}</Text>
          )}

          {!loading && !error && !message && (
            <Text style={styles.idleText}>No response yet.</Text>
          )}
        </View>

        <Text style={styles.footer}>API: {API_BASE_URL}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1d4ed8',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBox: {
    marginTop: 32,
    minHeight: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 15,
    textAlign: 'center',
  },
  messageText: {
    color: '#065f46',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  idleText: {
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    color: '#9ca3af',
    fontSize: 12,
  },
});

export default App;
