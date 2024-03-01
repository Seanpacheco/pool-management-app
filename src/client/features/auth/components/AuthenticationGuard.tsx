import React, { ComponentType } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner';

interface AuthenticationGuardProps {
  component: ComponentType;
}

export const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoadSpinner />,
    returnTo: '/dashboard',
  });

  return <Component />;
};
