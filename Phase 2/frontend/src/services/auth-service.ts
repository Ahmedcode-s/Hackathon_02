// Authentication Service integrating with Better Auth
import { apiClient } from './api-client';

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

class AuthService {
  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signup', userData);
      this.setTokens(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Signup failed');
    }
  }

  async signin(credentials: SigninData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signin', credentials);
      this.setTokens(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Signin failed');
    }
  }

  async signout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/users/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user data');
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Check if token is expired
    try {
      const payload = this.parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  private setTokens(authData: AuthResponse): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', authData.access_token);
      // If refresh token is provided, store it too
      if (authData.refresh_token) {
        localStorage.setItem('refresh_token', authData.refresh_token);
      }
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export const authService = new AuthService();
export default AuthService;