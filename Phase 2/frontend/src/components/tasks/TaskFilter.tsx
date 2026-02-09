'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { TaskFilters } from '@/types/task';

interface TaskFilterProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onResetFilters: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filters, onFiltersChange, onResetFilters }) => {
  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      statusFilter: value as 'all' | 'completed' | 'pending'
    });
  };

  const handlePriorityChange = (value: string) => {
    onFiltersChange({
      ...filters,
      priorityFilter: value === 'all' ? undefined : Number(value)
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortBy: value as 'date' | 'priority' | 'title'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg transition-colors">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
        <Select
          value={filters.statusFilter || 'all'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
        <Select
          value={filters.priorityFilter?.toString() || 'all'}
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Priority</SelectItem>
            <SelectItem value="1">Priority 1 (Lowest)</SelectItem>
            <SelectItem value="2">Priority 2 (Low)</SelectItem>
            <SelectItem value="3">Priority 3 (Medium)</SelectItem>
            <SelectItem value="4">Priority 4 (High)</SelectItem>
            <SelectItem value="5">Priority 5 (Highest)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
        <Select
          value={filters.sortBy || 'date'}
          onValueChange={handleSortChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
        <Input
          type="text"
          placeholder="Search tasks..."
          value={filters.searchQuery || ''}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex items-end">
        <Button
          type="button"
          variant="outline"
          onClick={onResetFilters}
          className="w-full"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default TaskFilter;