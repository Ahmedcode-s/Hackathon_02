import { apiClient } from './apiClient';

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
      this.setToken(response.data.access_token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Signup failed');
    }
  }

  async signin(credentials: SigninData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signin', credentials);
      this.setToken(response.data.access_token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Signin failed');
    }
  }

  async signout(): Promise<void> {
    try {
      // Remove token from storage
      this.removeToken();
    } catch (error: any) {
      console.error('Error during signout:', error);
      // Even if the API call fails, we should clear the local token
      this.removeToken();
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

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Check if token is expired
    try {
      const payload = this.parseJWT(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false; // If we can't parse it, assume it's invalid/expired
    }
  }

  private parseJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
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