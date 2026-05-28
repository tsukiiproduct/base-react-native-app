import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, Pressable, Text } from 'react-native';
import { useTheme } from '../theme';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  onClear?: () => void;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClear, value, placeholder = 'Search', ...rest }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: theme.colors.surfaceMuted,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.md,
          paddingHorizontal: theme.spacing.lg,
        },
      ]}
    >
      <Text style={[theme.typography.body, { color: theme.colors.textMuted, marginRight: theme.spacing.sm }]}>
        {'⌕'}
      </Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[theme.typography.body, styles.input, { color: theme.colors.textPrimary }]}
        {...rest}
      />
      {value && onClear ? (
        <Pressable onPress={onClear} accessibilityLabel="Clear search">
          <Text style={[theme.typography.body, { color: theme.colors.textMuted }]}>{'×'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 8,
  },
  input: { flex: 1, paddingVertical: 0 },
});
