import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { Dashboard, LandingPage } from '../features/pages';

export const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/dashboard', element: <Dashboard /> },
  ];

  const element = useRoutes(commonRoutes);

  return <>{element}</>;
};
