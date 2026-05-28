// Theme entry point. useTheme() resolves to lightTheme or darkTheme based on:
//   1. The user's preference from ThemeContext, OR
//   2. The OS color scheme when the preference is 'system'.

import { useColorScheme } from 'react-native';
import { ColorScheme, lightColors, darkColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radii } from './radii';
import { useThemePreference } from '../context/ThemeContext';

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
  const systemScheme = useColorScheme();
  const { preference } = useThemePreference();

  const effective: ThemeMode =
    preference === 'system'
      ? (systemScheme === 'dark' ? 'dark' : 'light')
      : preference;

  return effective === 'dark' ? darkTheme : lightTheme;
}

export { lightColors, darkColors, spacing, typography, radii };
export type { ColorScheme };
