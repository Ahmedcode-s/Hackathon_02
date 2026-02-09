'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Task } from '@/types/task';
import { formatDate } from '@/utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const handleToggleComplete = (checked: boolean) => {
    // The Checkbox component passes a boolean to the onCheckedChange callback
    // So we need to ensure we're calling onToggleComplete only when the task should be toggled
    if (checked !== task.is_completed) {
      onToggleComplete(task.id);
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return 'border-l-green-500';
      case 2:
        return 'border-l-blue-500';
      case 3:
        return 'border-l-yellow-500';
      case 4:
        return 'border-l-orange-500';
      case 5:
        return 'border-l-red-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <Card className={`border-l-4 ${getPriorityColor(task.priority)}`}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Checkbox
            checked={task.is_completed}
            onCheckedChange={handleToggleComplete}
            aria-label={`Mark task "${task.title}" as ${task.is_completed ? 'incomplete' : 'complete'}`}
          />
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-medium truncate ${task.is_completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                {task.description}
              </p>
            )}
            {task.due_date && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Due: {formatDate(new Date(task.due_date))}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Priority: {task.priority}/5
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;