import { create } from './createStore';
import type { AppSettings } from '../types';

interface SettingsState {
  settings: AppSettings;
  setSettings: (next: Partial<AppSettings>) => void;
  reset: () => void;
}

const DEFAULTS: AppSettings = {
  theme: 'system',
  notificationsEnabled: true,
  language: 'en',
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: DEFAULTS,
  setSettings: (next) => set((state) => ({ settings: { ...state.settings, ...next } })),
  reset: () => set({ settings: DEFAULTS }),
}));
