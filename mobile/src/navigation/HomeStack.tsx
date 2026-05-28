import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { useTheme } from '../theme';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTitleStyle: { color: theme.colors.headerText },
        headerTintColor: theme.colors.primary,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params?.title ?? 'Details' })}
      />
    </Stack.Navigator>
  );
};
