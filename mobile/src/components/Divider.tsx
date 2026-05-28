import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export const Divider: React.FC<{ vertical?: boolean }> = ({ vertical = false }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        { backgroundColor: theme.colors.border },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: { height: StyleSheet.hairlineWidth, alignSelf: 'stretch', marginVertical: 8 },
  vertical: { width: StyleSheet.hairlineWidth, alignSelf: 'stretch', marginHorizontal: 8 },
});
