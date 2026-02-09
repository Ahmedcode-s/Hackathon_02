// Authentication-related TypeScript types

export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_id: number;
  email: string;
}

export interface SignupData {
  email: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}