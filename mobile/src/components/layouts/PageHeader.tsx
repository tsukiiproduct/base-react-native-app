import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme } from '../../theme';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, right }) => {
  const theme = lightTheme;
  return (
    <View style={[styles.row, { marginBottom: theme.spacing.lg }]}>
      <View style={styles.titleBlock}>
        <Text style={[theme.typography.h2, { color: theme.colors.textPrimary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
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
  titleBlock: { flexShrink: 1 },
});
