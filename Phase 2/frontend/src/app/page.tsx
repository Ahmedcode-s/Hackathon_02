'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 font-sans transition-colors">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to Todo App
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Manage your tasks efficiently with our secure, responsive todo application.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-md border border-indigo-200 dark:border-slate-600 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                Log In
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Secure</h3>
            <p className="text-gray-600 dark:text-gray-400">JWT-based authentication with secure token handling</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Responsive</h3>
            <p className="text-gray-600 dark:text-gray-400">Works seamlessly on mobile, tablet, and desktop devices</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Simple</h3>
            <p className="text-gray-600 dark:text-gray-400">Intuitive interface for effortless task management</p>
          </div>
        </div>
      </main>
    </div>
  );
}