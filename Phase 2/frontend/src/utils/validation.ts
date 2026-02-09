// Input validation utilities

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

// Validate task title
export const validateTaskTitle = (title: string): { isValid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'Task title is required' };
  }

  if (title.length > 255) {
    return { isValid: false, error: 'Task title must be less than 256 characters' };
  }

  return { isValid: true };
};

// Validate task priority
export const validateTaskPriority = (priority: number): { isValid: boolean; error?: string } => {
  if (priority === undefined || priority === null) {
    return { isValid: false, error: 'Task priority is required' };
  }

  if (priority < 1 || priority > 5) {
    return { isValid: false, error: 'Task priority must be between 1 and 5' };
  }

  return { isValid: true };
};

// Validate date format
export const validateDate = (dateString: string): { isValid: boolean; error?: string } => {
  if (!dateString) {
    return { isValid: true }; // Optional field
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Please enter a valid date' };
  }

  // Check if date is in the past (optional validation)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time to compare only dates
  if (date < currentDate) {
    return { isValid: false, error: 'Date cannot be in the past' };
  }

  return { isValid: true };
};

// Validate task description
export const validateTaskDescription = (description: string): { isValid: boolean; error?: string } => {
  if (description && description.length > 1000) {
    return { isValid: false, error: 'Task description must be less than 1001 characters' };
  }

  return { isValid: true };
};

// Generic form validator
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (fields: Record<string, any>, rules: Record<string, (value: any) => { isValid: boolean; error?: string }>): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: {}
  };

  Object.keys(rules).forEach(field => {
    const value = fields[field];
    const validation = rules[field](value);

    if (!validation.isValid) {
      result.isValid = false;
      result.errors[field] = validation.error || `Invalid ${field}`;
    }
  });

  return result;
};

// Validate user registration form
export const validateRegistrationForm = (formData: { email: string; password: string }): ValidationResult => {
  return validateForm(formData, {
    email: validateEmail,
    password: validatePassword
  });
};

// Validate task form
export const validateTaskForm = (formData: { title: string; priority?: number; due_date?: string; description?: string }): ValidationResult => {
  const validations: ValidationResult = {
    isValid: true,
    errors: {}
  };

  // Validate title (required)
  const titleValidation = validateTaskTitle(formData.title);
  if (!titleValidation.isValid) {
    validations.isValid = false;
    validations.errors.title = titleValidation.error!;
  }

  // Validate priority if provided
  if (formData.priority !== undefined) {
    const priorityValidation = validateTaskPriority(formData.priority);
    if (!priorityValidation.isValid) {
      validations.isValid = false;
      validations.errors.priority = priorityValidation.error!;
    }
  }

  // Validate due date if provided
  if (formData.due_date) {
    const dateValidation = validateDate(formData.due_date);
    if (!dateValidation.isValid) {
      validations.isValid = false;
      validations.errors.due_date = dateValidation.error!;
    }
  }

  // Validate description if provided
  if (formData.description) {
    const descValidation = validateTaskDescription(formData.description);
    if (!descValidation.isValid) {
      validations.isValid = false;
      validations.errors.description = descValidation.error!;
    }
  }

  return validations;
};