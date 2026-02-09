// Task-related TypeScript types

export interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  priority: number; // 1-5 scale
  due_date?: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user_id: number;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: number; // 1-5 scale, defaults to 3
  due_date?: string; // ISO date string
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  is_completed?: boolean;
  priority?: number; // 1-5 scale
  due_date?: string; // ISO date string
}

export interface TaskListResponse {
  tasks: Task[];
  total_count: number;
  completed_count: number;
}

export interface TaskFilters {
  statusFilter?: 'all' | 'completed' | 'pending';
  priorityFilter?: number;
  searchQuery?: string;
  sortBy?: 'date' | 'priority' | 'title';
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}