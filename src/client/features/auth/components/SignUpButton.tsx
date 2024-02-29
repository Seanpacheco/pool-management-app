import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

export const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dashboard',
      },
      authorizationParams: {
        screen_hint: 'sign up',
      },
    });
  };

  return (
    <Button onClick={handleSignUp} variant="outline" size="lg" fullWidth>
      Sign Up
    </Button>
  );
};
