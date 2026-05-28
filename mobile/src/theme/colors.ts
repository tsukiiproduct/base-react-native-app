// Color tokens. Use the named tokens, not raw hex.
export interface ColorScheme {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  primary: string;
  primaryPressed: string;
  primaryDisabled: string;

  success: string;
  warning: string;
  danger: string;

  // Navigation chrome
  tabBar: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  headerBackground: string;
  headerText: string;
}

export const lightColors: ColorScheme = {
  background: '#f9fafb',
  surface: '#ffffff',
  surfaceMuted: '#f3f4f6',
  border: '#e5e7eb',

  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textMuted: '#9ca3af',
  textInverse: '#ffffff',

  primary: '#2563eb',
  primaryPressed: '#1d4ed8',
  primaryDisabled: '#93c5fd',

  success: '#10b981',
  warning: '#f59e0b',
  danger: '#dc2626',

  tabBar: '#ffffff',
  tabBarBorder: '#e5e7eb',
  tabBarActive: '#2563eb',
  tabBarInactive: '#6b7280',
  headerBackground: '#ffffff',
  headerText: '#111827',
};

export const darkColors: ColorScheme = {
  background: '#0b1220',
  surface: '#111827',
  surfaceMuted: '#1f2937',
  border: '#1f2937',

  textPrimary: '#f9fafb',
  textSecondary: '#d1d5db',
  textMuted: '#6b7280',
  textInverse: '#111827',

  primary: '#3b82f6',
  primaryPressed: '#2563eb',
  primaryDisabled: '#4b5563',

  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',

  tabBar: '#111827',
  tabBarBorder: '#1f2937',
  tabBarActive: '#3b82f6',
  tabBarInactive: '#9ca3af',
  headerBackground: '#111827',
  headerText: '#f9fafb',
};
