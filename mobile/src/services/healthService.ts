import { request } from './client';

interface HealthResponse {
  status: string;
  uptime: number;
  environment: string;
  timestamp: string;
}

interface MessageResponse {
  message: string;
}

export const healthService = {
  getHealth: () => request<HealthResponse>('/api/health'),
  getMessage: () => request<MessageResponse>('/api/message'),
};
