// Authentication utilities for token management and state persistence

// Get token from storage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

// Set token in storage
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
};

// Remove token from storage
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
  }
};

// Get refresh token from storage
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

// Set refresh token in storage
export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('refresh_token', token);
  }
};

// Remove refresh token from storage
export const removeRefreshToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('refresh_token');
  }
};

// Clear all auth-related storage
export const clearAuthStorage = (): void => {
  removeToken();
  removeRefreshToken();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  // Check if token is expired
  try {
    const payload = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    return false; // If we can't parse it, assume it's invalid/expired
  }
};

// Parse JWT token to extract payload
export const parseJwt = (token: string): any => {
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
};

// Check if JWT token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return true; // If we can't parse it, assume it's invalid/expired
  }
};

// Validate email format
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

// Validate password strength
export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  return { isValid: true };
};

// Store user session data
export const storeUserSession = (userData: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_session', JSON.stringify(userData));
  }
};

// Get user session data
export const getUserSession = (): any => {
  if (typeof window !== 'undefined') {
    const sessionData = localStorage.getItem('user_session');
    return sessionData ? JSON.parse(sessionData) : null;
  }
  return null;
};

// Clear user session data
export const clearUserSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_session');
  }
};

// Get token expiration time
export const getTokenExpiration = (token: string): Date | null => {
  try {
    const payload = parseJwt(token);
    return new Date(payload.exp * 1000); // Convert seconds to milliseconds
  } catch (error) {
    return null;
  }
};

// Check if token is about to expire (within 5 minutes)
export const isTokenAboutToExpire = (token: string, minutesThreshold: number = 5): boolean => {
  try {
    const payload = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const threshold = minutesThreshold * 60; // Convert minutes to seconds
    return (payload.exp - currentTime) < threshold;
  } catch (error) {
    return true; // If we can't parse it, assume it's about to expire
  }
};