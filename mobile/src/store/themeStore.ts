import { create } from './createStore';
import type { ThemeMode } from '../theme';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light',
  setMode: (mode) => set({ mode }),
  toggle: () => set({ mode: get().mode === 'light' ? 'dark' : 'light' }),
}));
