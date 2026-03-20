import type { auth } from '@/lib/auth/auth';

// Infer the session type from the auth configuration.
export type Session = typeof auth.$Infer.Session;

// Data Transfer Object for user information sent from server to client.
export type UserDTO = {
  id: string;
  name: string | null;
  email: string;
};

// Client-side user type, which can be null when not authenticated.
export type ClientUser = {
  id: string;
  name: string;
  email: string;
} | null;

// Standard shape for server action responses.
export type ActionResponse<T = Record<string, unknown>> = {
  success?: boolean;
  message?: string;
  errors?: {
    [K in keyof T]?: string[];
  };
};
