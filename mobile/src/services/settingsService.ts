import { request } from './client';
import type { AppSettings } from '../types';

export const settingsService = {
  getSettings: () => request<{ settings: AppSettings }>('/api/settings'),
  updateSettings: (changes: Partial<AppSettings>) =>
    request<{ settings: AppSettings }>('/api/settings', { method: 'PUT', body: changes }),
};
