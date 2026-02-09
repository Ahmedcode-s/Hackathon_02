'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Task, TaskCreate, TaskUpdate } from '@/types/task';

interface TaskFormProps {
  task?: Task | null; // If provided, we're editing; if null, we're creating
  onSubmit: (taskData: TaskCreate | TaskUpdate) => void;
  onCancel: () => void;
  loading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, loading = false }) => {
  const isEditing = !!task;

  const [formData, setFormData] = useState<TaskCreate | Partial<TaskUpdate>>({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 3,
    due_date: task?.due_date || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        due_date: task.due_date || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 3,
        due_date: '',
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = parseInt(e.target.value, 10);
    setFormData(prev => ({
      ...prev,
      priority
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Title is required';
    } else if (formData.title && formData.title.length > 255) {
      newErrors.title = 'Title must be less than 256 characters';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1001 characters';
    }

    if (formData.due_date && formData.due_date !== '' && isNaN(Date.parse(formData.due_date))) {
      newErrors.due_date = 'Please enter a valid date';
    }

    if (formData.priority !== undefined && (typeof formData.priority !== 'number' || formData.priority < 1 || formData.priority > 5)) {
      newErrors.priority = 'Priority must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Task' : 'Create New Task'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Title *
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className={errors.title ? 'border-red-500 dark:border-red-400' : ''}
              placeholder="Task title"
            />
            {errors.title && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className={errors.description ? 'border-red-500 dark:border-red-400' : ''}
              placeholder="Task description (optional)"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority || 3}
                onChange={handlePriorityChange}
                className={`w-full rounded-md border ${errors.priority ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-slate-600'} bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 transition-colors`}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} - {num === 1 ? 'Lowest' : num === 2 ? 'Low' : num === 3 ? 'Medium' : num === 4 ? 'High' : 'Highest'}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.priority}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="due_date" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Due Date
              </label>
              <Input
                id="due_date"
                name="due_date"
                type="date"
                value={formData.due_date || ''}
                onChange={handleChange}
                className={errors.due_date ? 'border-red-500 dark:border-red-400' : ''}
              />
              {errors.due_date && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.due_date}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? (isEditing ? 'Updating...' : 'Creating...')
              : (isEditing ? 'Update Task' : 'Create Task')
            }
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TaskForm;