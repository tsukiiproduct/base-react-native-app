// Theme entry point. Components call useTheme() to read the active theme.
// Light/dark resolves automatically from the OS via useColorScheme().

import { useColorScheme } from 'react-native';
import { ColorScheme, lightColors, darkColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radii } from './radii';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: ColorScheme;
  spacing: typeof spacing;
  typography: typeof typography;
  radii: typeof radii;
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  typography,
  radii,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  spacing,
  typography,
  radii,
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}

export { lightColors, darkColors, spacing, typography, radii };
export type { ColorScheme };
