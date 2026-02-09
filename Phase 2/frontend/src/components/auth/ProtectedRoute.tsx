'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = <div>Loading...</div>
}) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // If auth is still loading, show fallback
  if (loading) {
    return fallback;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // Store the attempted route for redirect after login
    router.push('/login');
    return null;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;