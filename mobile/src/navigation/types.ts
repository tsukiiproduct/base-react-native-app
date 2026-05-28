// Centralized navigation typings. Every screen reads its props from these.

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Details: { id: string; title?: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  Search: undefined;
  Notifications: undefined;
  ProfileTab: undefined;
};

// Top-level stack only contains the post-bootstrap subtrees. Splash is
// rendered outside the navigator while bootstrapping, so it doesn't need
// a route entry here.
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type ProfileScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type TabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
