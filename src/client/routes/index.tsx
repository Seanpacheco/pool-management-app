import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { LandingPage } from '../features/pages/Landing';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <LandingPage /> }];

  const element = useRoutes(commonRoutes);

  return <>{element}</>;
};
