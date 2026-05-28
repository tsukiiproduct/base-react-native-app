// Pure-View logo. Three layered shapes that read as an abstract brand mark.
// No SVG / no native deps. Scales with the `size` prop.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 96 }) => {
  const theme = useTheme();

  const inner = size * 0.58;
  const dot = size * 0.22;
  const outerRadius = size * 0.22;
  const innerRadius = size * 0.16;
  const dotInset = size * 0.12;

  return (
    <View
      style={[
        styles.outer,
        {
          width: size,
          height: size,
          borderRadius: outerRadius,
          backgroundColor: theme.colors.primary,
        },
      ]}
    >
      <View
        style={{
          width: inner,
          height: inner,
          borderRadius: innerRadius,
          backgroundColor: theme.colors.primaryPressed,
          transform: [{ rotate: '15deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: dotInset,
          right: dotInset,
          width: dot,
          height: dot,
          borderRadius: dot / 2,
          backgroundColor: theme.colors.surface,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
