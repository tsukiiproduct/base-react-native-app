import React from 'react';
import { Text, View } from 'react-native';
import { Screen, Card, Button } from '../components';
import { useTheme } from '../theme';
import type { HomeScreenProps } from '../navigation/types';

export const DetailsScreen: React.FC<HomeScreenProps<'Details'>> = ({ route, navigation }) => {
  const theme = useTheme();
  const { id, title } = route.params;

  return (
    <Screen scroll>
      <Text style={[theme.typography.h1, { color: theme.colors.textPrimary }]}>
        {title ?? 'Details'}
      </Text>
      <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: theme.spacing.xs }]}>
        Item ID: {id}
      </Text>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text style={[theme.typography.body, { color: theme.colors.textPrimary }]}>
          This is a placeholder Details screen. Route params are typed via{' '}
          <Text style={{ fontWeight: '600' }}>HomeStackParamList['Details']</Text>.
        </Text>
      </Card>

      <View style={{ marginTop: theme.spacing.xl }}>
        <Button label="Back" variant="secondary" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
};
