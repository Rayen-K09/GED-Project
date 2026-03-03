import React from 'react';
import { createBrowserRouter } from 'react-router';
import { Login } from './pages/Login';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { Documents } from './components/Documents';
import { Upload } from './components/Upload';
import { Validation } from './components/Validation';
import { Settings } from './components/Settings';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/upload',
        element: <Upload />,
      },
      {
        path: '/documents',
        element: <Documents />,
      },
      {
        path: '/validation',
        element: <Validation />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);