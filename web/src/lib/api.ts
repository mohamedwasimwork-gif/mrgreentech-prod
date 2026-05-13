'use client';

// Thin client around the Python FastAPI backend. Base URL is configurable via
// NEXT_PUBLIC_API_BASE; defaults to http://localhost:8000 for local dev.

export const API_BASE: string =
  (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE) ||
  'http://localhost:8000';

const TOKEN_KEY = 'mrg.admin.token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t: string | null) {
  if (typeof window === 'undefined') return;
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  detail: string;
  constructor(status: number, detail: string) {
    super(detail || `HTTP ${status}`);
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body?.detail ?? detail;
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res.status, detail);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

/* ---------- Types ---------- */

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
export type LeadSide = 'sell' | 'buy';

export interface ApiUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface ApiLeadNote {
  id: number;
  author: string;
  body: string;
  created_at: string;
}

export interface ApiLead {
  id: number;
  ref: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  side: LeadSide;
  material: string;
  volume_mt: number;
  port: string;
  origin: string;
  destination: string;
  incoterm: string;
  frequency: string;
  customer_notes: string;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
  internal_notes: ApiLeadNote[];
}

export interface LeadCreatePayload {
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  side?: LeadSide;
  material?: string;
  volume_mt?: number;
  port?: string;
  origin?: string;
  destination?: string;
  incoterm?: string;
  frequency?: string;
  customer_notes?: string;
}

/* ---------- Calls ---------- */

export const api = {
  health: () => request<{ status: string }>('/api/health'),

  login: (email: string, password: string) =>
    request<{ access_token: string; token_type: string; expires_in: number; user: ApiUser }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),

  me: () => request<ApiUser>('/api/auth/me'),

  createLead: (payload: LeadCreatePayload) =>
    request<ApiLead>('/api/leads', { method: 'POST', body: JSON.stringify(payload) }),

  listLeads: () => request<ApiLead[]>('/api/leads'),

  patchLead: (id: number, patch: { status?: LeadStatus }) =>
    request<ApiLead>(`/api/leads/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),

  addNote: (leadId: number, body: string) =>
    request<ApiLeadNote>(`/api/leads/${leadId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    }),
};
