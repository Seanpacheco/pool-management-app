import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { Dashboard, LandingPage, Callback } from '../features/pages';
import { AuthenticationGuard } from '../features/auth/components/AuthenticationGuard';

export const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/callback', element: <Callback /> },
    { path: '/dashboard', element: <AuthenticationGuard component={Dashboard} /> },
  ];

  const element = useRoutes(commonRoutes);

  return <>{element}</>;
};
