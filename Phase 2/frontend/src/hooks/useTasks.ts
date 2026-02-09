import { useState, useEffect } from 'react';
import { Task, TaskFilters } from '@/types/task';
import { taskService } from '@/services/taskService';

export interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: TaskCreate) => Promise<void>;
  updateTask: (id: number, taskData: TaskUpdate) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskCompletion: (id: number) => Promise<void>;
}

export const useTasks = (initialFilters?: TaskFilters): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>(initialFilters || {});

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getAllTasks(filters);
      setTasks(tasksData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: TaskCreate) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number, taskData: TaskUpdate) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      setLoading(true);
      setError(null);
      const updatedTask = await taskService.updateTask(id, { is_completed: !task.is_completed });
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
    } catch (err: any) {
      setError(err.message || 'Failed to update task status');
      console.error('Error toggling task completion:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when component mounts or filters change
  useEffect(() => {
    fetchTasks();
  }, [JSON.stringify(filters)]); // Using JSON.stringify to compare object equality

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
};

export default useTasks;