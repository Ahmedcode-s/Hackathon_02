// Task Management Service for API interactions
import { apiClient } from './apiClient';
import { Task, TaskCreate, TaskUpdate, TaskFilters } from '@/types/task';

class TaskService {
  async getAllTasks(filters?: TaskFilters): Promise<Task[]> {
    try {
      const params = new URLSearchParams();

      if (filters?.statusFilter) {
        params.append('status', filters.statusFilter);
      }
      if (filters?.priorityFilter) {
        params.append('priority', filters.priorityFilter.toString());
      }
      if (filters?.searchQuery) {
        params.append('search', filters.searchQuery);
      }
      if (filters?.sortBy) {
        params.append('sort', filters.sortBy);
      }

      const queryString = params.toString();
      const url = `/tasks${queryString ? '?' + queryString : ''}`;

      const response = await apiClient.get<{ tasks: Task[] }>(url);
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
      throw new Error(error.response?.data?.detail || `Failed to fetch task with id ${id}`);
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
      throw new Error(error.response?.data?.detail || `Failed to update task with id ${id}`);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await apiClient.delete(`/tasks/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || `Failed to delete task with id ${id}`);
    }
  }

  async toggleTaskCompletion(id: number): Promise<Task> {
    try {
      const task = await this.getTaskById(id);
      const response = await apiClient.put<Task>(`/tasks/${id}`, {
        ...task,
        is_completed: !task.is_completed
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || `Failed to toggle completion for task with id ${id}`);
    }
  }
}

export const taskService = new TaskService();
export default TaskService;