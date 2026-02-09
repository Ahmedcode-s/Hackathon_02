'use client';

import React from 'react';
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';
import { Button } from '@/components/ui/Button';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="text-gray-600 mt-2">
            Join us to manage your tasks efficiently
          </p>
        </div>

        <SignupForm />

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By signing up, you agree to our{' '}
            <Link href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;