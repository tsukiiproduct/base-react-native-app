// Typography scale. Pair font sizes with line heights so vertical rhythm
// stays consistent. Font family is left as the system default — switch to a
// custom font by adding a `fontFamily` field here once it's linked.

import { TextStyle } from 'react-native';

export const typography = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: '700' } satisfies TextStyle,
  h2: { fontSize: 24, lineHeight: 32, fontWeight: '700' } satisfies TextStyle,
  h3: { fontSize: 20, lineHeight: 28, fontWeight: '600' } satisfies TextStyle,
  bodyLg: { fontSize: 18, lineHeight: 28, fontWeight: '400' } satisfies TextStyle,
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' } satisfies TextStyle,
  bodySm: { fontSize: 14, lineHeight: 20, fontWeight: '400' } satisfies TextStyle,
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' } satisfies TextStyle,
  button: { fontSize: 16, lineHeight: 20, fontWeight: '600' } satisfies TextStyle,
} as const;

export type TypographyToken = keyof typeof typography;
