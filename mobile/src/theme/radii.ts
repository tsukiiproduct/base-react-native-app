// Border-radius tokens. Use these instead of literal numbers.
export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
} as const;

export type RadiusToken = keyof typeof radii;
