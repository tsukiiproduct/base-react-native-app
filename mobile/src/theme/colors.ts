// Color tokens. Reference these names from components - never hard-code hex.
// Adding a new color? Add it once here, then use `colors.foo` everywhere.

export const palette = {
  white: '#ffffff',
  black: '#000000',

  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',

  green500: '#10b981',
  red500: '#ef4444',
  red600: '#dc2626',
  amber500: '#f59e0b',
} as const;

// Shape both schemes share. Using an interface keeps both `lightColors` and
// `darkColors` typed as plain `string` fields - they can hold any hex value
// without TypeScript demanding they be literally equal.
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
}

export const lightColors: ColorScheme = {
  background: palette.gray50,
  surface: palette.white,
  surfaceMuted: palette.gray100,
  border: palette.gray200,

  textPrimary: palette.gray900,
  textSecondary: palette.gray600,
  textMuted: palette.gray400,
  textInverse: palette.white,

  primary: palette.blue600,
  primaryPressed: palette.blue700,
  primaryDisabled: palette.gray300,

  success: palette.green500,
  warning: palette.amber500,
  danger: palette.red600,
};

export const darkColors: ColorScheme = {
  background: palette.gray900,
  surface: palette.gray800,
  surfaceMuted: palette.gray700,
  border: palette.gray700,

  textPrimary: palette.gray50,
  textSecondary: palette.gray300,
  textMuted: palette.gray500,
  textInverse: palette.gray900,

  primary: palette.blue500,
  primaryPressed: palette.blue600,
  primaryDisabled: palette.gray600,

  success: palette.green500,
  warning: palette.amber500,
  danger: palette.red500,
};
