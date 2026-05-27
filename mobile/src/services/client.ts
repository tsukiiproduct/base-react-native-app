// Tiny HTTP client built on fetch + AbortController. No external deps yet.
//
// When you're ready for interceptors, retries, and progress tracking,
// swap this for axios:
//   1. `npm i axios`
//   2. Replace the `request` body with an axios instance + interceptors.
// All hooks/services on top stay the same shape.

import { API_BASE_URL } from '../config/api';
import { API_TIMEOUT_MS } from '../constants';
import type { ApiErrorBody } from '../types';

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: string[];

  constructor(message: string, opts: { status: number; code?: string; details?: string[] }) {
    super(message);
    this.name = 'ApiError';
    this.status = opts.status;
    this.code = opts.code;
    this.details = opts.details;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
  signal?: AbortSignal;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, timeoutMs = API_TIMEOUT_MS, signal } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Chain caller's signal with our timeout signal.
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    const data = text ? safeParseJson(text) : undefined;

    if (!res.ok) {
      const errBody = data as ApiErrorBody | undefined;
      throw new ApiError(errBody?.error?.message || `HTTP ${res.status}`, {
        status: res.status,
        code: errBody?.error?.code,
        details: errBody?.error?.details,
      });
    }

    return data as T;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

function safeParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
