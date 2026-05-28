// Cross-app type definitions. Keep these light; resource-specific types
// belong next to their service / store.

export interface User {
  id: string;
  displayName: string;
  email: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  language: string;
}

export interface AppConfig {
  appName: string;
  apiVersion: string;
  environment: string;
  featureFlags: Record<string, boolean>;
}

// Standard shape returned by errorHandler middleware on the backend.
export interface ApiErrorBody {
  error: {
    message: string;
    code?: string;
    stack?: string;
    details?: string[];
  };
}

// Helpers for component prop typing.
export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;
