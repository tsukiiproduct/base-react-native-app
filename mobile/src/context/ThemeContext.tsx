// Theme preference state. Holds the user's choice (light/dark/system).
// useTheme() reads this together with useColorScheme() to compute the
// effective theme. Settings screen flips the preference.

import React, { createContext, useContext, useMemo, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  preference: 'system',
  setPreference: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreference] = useState<ThemePreference>('system');
  const value = useMemo(() => ({ preference, setPreference }), [preference]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useThemePreference() {
  return useContext(ThemeContext);
}
