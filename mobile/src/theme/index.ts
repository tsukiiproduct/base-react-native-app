// Theme entry point. Import `theme` to get the resolved theme object, or
// pull individual token modules directly. Light/dark switching happens
// downstream via the theme store / useTheme hook.

import { lightColors, darkColors, ColorScheme } from './colors';
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

export { lightColors, darkColors, spacing, typography, radii };
export type { ColorScheme };
