import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, right }) => {
  const theme = useTheme();
  return (
    <View style={[styles.row, { marginBottom: theme.spacing.lg }]}>
      <View style={styles.titles}>
        <Text style={[theme.typography.h2, { color: theme.colors.textPrimary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: theme.spacing.xs }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  titles: { flexShrink: 1 },
});
