import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Screen, SearchBar, Card, EmptyState } from '../components';
import { useTheme } from '../theme';
import type { TabScreenProps } from '../navigation/types';

const SAMPLE = [
  'Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries',
  'Figs', 'Grapes', 'Honeydew', 'Kiwi', 'Lemons',
  'Mangos', 'Nectarines', 'Oranges', 'Papayas', 'Peaches',
];

export const SearchScreen: React.FC<TabScreenProps<'Search'>> = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return SAMPLE;
    return SAMPLE.filter((s) => s.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <Screen padded={false}>
      <View style={{ padding: theme.spacing.lg }}>
        <Text style={[theme.typography.h2, { color: theme.colors.textPrimary, marginBottom: theme.spacing.md }]}>
          Search
        </Text>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Search fruits…"
        />
      </View>

      {results.length === 0 ? (
        <EmptyState title="No matches" description="Try a different search term." />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.lg }}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Text style={[theme.typography.body, { color: theme.colors.textPrimary }]}>{item}</Text>
            </Card>
          )}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 8 },
});
