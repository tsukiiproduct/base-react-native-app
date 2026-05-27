import { request } from './client';
import type { User } from '../types';

export const profileService = {
  getProfile: () => request<{ profile: User }>('/api/profile'),
  updateProfile: (changes: Partial<User>) =>
    request<{ profile: User }>('/api/profile', { method: 'PUT', body: changes }),
};
