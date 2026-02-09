// User Service for API interactions
import { apiClient } from './apiClient';

export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface UserUpdateData {
  email?: string;
}

class UserService {
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get('/users/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user data');
    }
  }

  async updateUser(userId: number, userData: UserUpdateData): Promise<User> {
    try {
      const response = await apiClient.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update user');
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await apiClient.delete(`/users/${userId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to delete user');
    }
  }
}

export const userService = new UserService();
export default UserService;