import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStack';
import { SearchScreen } from '../screens/SearchScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { useTheme } from '../theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Text-glyph "icons" so we don't need a vector icon library. Swap in
// react-native-vector-icons or expo-symbols later for real icons.
const tabIcon = (glyph: string) => ({ color, size }: { color: string; size: number }) => (
  <Text style={{ color, fontSize: size }}>{glyph}</Text>
);

export const MainTabs: React.FC = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: { backgroundColor: theme.colors.tabBar, borderTopColor: theme.colors.tabBarBorder },
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home', tabBarIcon: tabIcon('⌂') }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search', tabBarIcon: tabIcon('⌕'), headerShown: true, headerStyle: { backgroundColor: theme.colors.headerBackground }, headerTitleStyle: { color: theme.colors.headerText } }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Inbox', tabBarIcon: tabIcon('✉'), headerShown: true, headerStyle: { backgroundColor: theme.colors.headerBackground }, headerTitleStyle: { color: theme.colors.headerText } }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile', tabBarIcon: tabIcon('☺') }} />
    </Tab.Navigator>
  );
};
