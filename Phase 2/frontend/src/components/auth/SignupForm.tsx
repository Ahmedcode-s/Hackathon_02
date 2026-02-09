'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { validateEmail, validatePassword, validateForm } from '@/utils/validation';
import { useAuth } from './AuthProvider';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const { register } = useAuth();

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

  const validateSignupForm = (): boolean => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    const newErrors: Record<string, string> = {};

    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error || '';
    }

    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error || '';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateSignupForm()) {
      return;
    }

    setLoading(true);

    try {
      await register(formData.email, formData.password);
      setSuccessMessage('Account created successfully! Redirecting...');

      // Redirect to dashboard or home after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      setErrors({
        submit: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Sign up for a new account to manage your tasks
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {errors.submit && (
            <div className="text-red-600 dark:text-red-400 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
              {errors.submit}
            </div>
          )}

          {successMessage && (
            <div className="text-green-600 dark:text-green-400 text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              {successMessage}
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

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'border-red-500 dark:border-red-400' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="underline underline-offset-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              Sign in
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignupForm;