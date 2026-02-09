'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { validateEmail } from '@/utils/validation';
import { useAuth } from './AuthProvider';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateLoginForm = (): boolean => {
    const emailValidation = validateEmail(formData.email);

    const newErrors: Record<string, string> = {};

    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error || '';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);

      // Redirect to dashboard or home after successful login
      router.push('/dashboard');
      router.refresh(); // Force refresh to update UI based on auth state
    } catch (error: any) {
      setErrors({
        submit: error.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {errors.submit && (
            <div className="text-red-600 dark:text-red-400 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
              {errors.submit}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500 dark:border-red-400' : ''}
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500 dark:border-red-400' : ''}
            />
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-slate-800"
              />
              <label htmlFor="remember-me" className="text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              Forgot password?
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="underline underline-offset-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              Sign up
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;