import React, { ComponentType } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Loader } from '@mantine/core';

interface AuthenticationGuardProps {
  component: ComponentType;
}

export const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <Loader size={'xl'} />
      </div>
    ),
    returnTo: '/dashboard',
  });

  return <Component />;
};
