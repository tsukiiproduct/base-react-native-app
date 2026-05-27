// App-wide constants. Resist the urge to dump random magic numbers here —
// most things belong in theme/, types/, or a feature module.

export const APP_NAME = 'Base App';

// AsyncStorage keys. Centralizing avoids typos when reading vs writing.
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@base_app/auth_token',
  USER: '@base_app/user',
  SETTINGS: '@base_app/settings',
  THEME_MODE: '@base_app/theme_mode',
} as const;

// Network timeouts.
export const API_TIMEOUT_MS = 15_000;

// Pagination defaults.
export const DEFAULT_PAGE_SIZE = 20;
