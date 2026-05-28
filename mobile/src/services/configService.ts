import { request } from './client';
import type { AppConfig } from '../types';

export const configService = {
  getConfig: () => request<AppConfig>('/api/config'),
};
