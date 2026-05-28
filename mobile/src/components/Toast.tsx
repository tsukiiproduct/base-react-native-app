// Tiny self-managed toast. Call show(message) from anywhere via the hook.
// For more advanced needs swap with react-native-toast-message later.

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../theme';

type Tone = 'info' | 'success' | 'error';

interface ToastContextValue {
  show: (message: string, tone?: Tone) => void;
}

const ToastContext = createContext<ToastContextValue>({ show: () => {} });

export const useToast = () => useContext(ToastContext);

interface ToastState {
  message: string;
  tone: Tone;
  visible: boolean;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [state, setState] = useState<ToastState>({ message: '', tone: 'info', visible: false });
  const fade = useMemo(() => new Animated.Value(0), []);

  const show = useCallback((message: string, tone: Tone = 'info') => {
    setState({ message, tone, visible: true });
    Animated.timing(fade, { toValue: 1, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }).start();
    setTimeout(() => {
      Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setState((s) => ({ ...s, visible: false }));
      });
    }, 2500);
  }, [fade]);

  const bg = state.tone === 'success' ? theme.colors.success : state.tone === 'error' ? theme.colors.danger : theme.colors.textPrimary;

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {state.visible ? (
        <Animated.View pointerEvents="none" style={[styles.wrap, { opacity: fade }]}>
          <View style={[styles.toast, { backgroundColor: bg, borderRadius: theme.radii.md, paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.lg }]}>
            <Text style={[theme.typography.bodySm, { color: theme.colors.textInverse }]}>{state.message}</Text>
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toast: { maxWidth: '90%' },
});
