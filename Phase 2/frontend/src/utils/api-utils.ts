// API request/response utilities

// Handle API response errors
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return data.detail || 'Bad request - check your input';
      case 401:
        return 'Unauthorized - please log in again';
      case 403:
        return 'Forbidden - insufficient permissions';
      case 404:
        return 'Resource not found';
      case 409:
        return data.detail || 'Conflict - resource already exists';
      case 422:
        return 'Validation error - check your input';
      case 500:
        return 'Server error - please try again later';
      default:
        return data.detail || `Request failed with status ${status}`;
    }
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error - please check your connection';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

// Normalize API response data
export const normalizeApiResponse = <T>(data: any): T => {
  // If the API returns data wrapped in a property, unwrap it
  if (data && typeof data === 'object' && data.hasOwnProperty('data')) {
    return data.data;
  }
  return data;
};

// Build query parameters from an object
export const buildQueryParams = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString();
};

// Construct API URL with query parameters
export const constructApiUrl = (baseUrl: string, params?: Record<string, any>): string => {
  if (!params) return baseUrl;

  const queryString = buildQueryParams(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

// Retry failed API requests with exponential backoff
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let i = 0; i < retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;

      if (i < retries - 1) {
        // Exponential backoff: wait longer after each retry
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
};

// Check if the response indicates success
export const isSuccessfulResponse = (status: number): boolean => {
  return status >= 200 && status < 300;
};

// Format error message for user display
export const formatErrorMessage = (error: any, defaultMessage: string = 'An error occurred'): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    if (error.message) {
      return error.message;
    }

    if (error.detail) {
      return error.detail;
    }

    if (error.error) {
      return error.error;
    }
  }

  return defaultMessage;
};

// Debounce API calls to prevent excessive requests
export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<F>): Promise<ReturnType<F>> {
    const later = () => {
      clearTimeout(timeout);
      return func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    // Return a promise that resolves when the debounced function is called
    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        resolve(func(...args));
      }, wait);
    }) as Promise<ReturnType<F>>;
  };
};