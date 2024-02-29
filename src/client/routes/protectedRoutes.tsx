import * as React from 'react';
import { Dashboard, Callback } from '../features/pages';
import { AuthenticationGuard } from '../features/auth/components/AuthenticationGuard';

export const protectedRoutes = [
  { path: '/callback', element: <Callback /> },
  { path: '/dashboard', element: <AuthenticationGuard component={Dashboard} /> },
];
