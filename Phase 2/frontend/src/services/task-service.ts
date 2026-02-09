// Task Management Service for API interactions
import { apiClient } from './api-client';

export interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  priority: number;
  due_date?: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: number;
  due_date?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  is_completed?: boolean;
  priority?: number;
  due_date?: string;
}

class TaskService {
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await apiClient.get<{ tasks: Task[] }>('/tasks');
      return response.data.tasks;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch tasks');
    }
  }

  async getTaskById(id: number): Promise<Task> {
    try {
      const response = await apiClient.get<Task>(`/tasks/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch task');
    }
  }

  async createTask(taskData: TaskCreate): Promise<Task> {
    try {
      const response = await apiClient.post<Task>('/tasks', taskData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to create task');
    }
  }

  async updateTask(id: number, taskData: TaskUpdate): Promise<Task> {
    try {
      const response = await apiClient.put<Task>(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update task');
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await apiClient.delete(`/tasks/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to delete task');
    }
  }

  async toggleTaskCompletion(id: number): Promise<Task> {
    try {
      const task = await this.getTaskById(id);
      const response = await apiClient.put<Task>(`/tasks/${id}`, {
        is_completed: !task.is_completed
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update task status');
    }
  }
}

export const taskService = new TaskService();
export default TaskService;