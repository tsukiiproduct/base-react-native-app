// Stub hook. Returns the light theme today; will resolve from the theme store
// once that's wired in (or Zustand once installed). Components should call
// this instead of importing `lightTheme` directly so the switch is automatic.

import { lightTheme, Theme } from '../theme';

export function useTheme(): Theme {
  return lightTheme;
}
