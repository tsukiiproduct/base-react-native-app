import React from 'react';
import { View, StyleSheet } from 'react-native';
import { lightTheme } from '../../theme';

interface DividerProps {
  vertical?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ vertical = false }) => {
  const theme = lightTheme;
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
  horizontal: { height: StyleSheet.hairlineWidth, alignSelf: 'stretch' },
  vertical: { width: StyleSheet.hairlineWidth, alignSelf: 'stretch' },
});
