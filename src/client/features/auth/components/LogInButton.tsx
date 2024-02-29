import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

export const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dashboard',
      },
    });
  };
  return (
    <Button
      onClick={handleLogin}
      variant="gradient"
      gradient={{ from: 'seaGreen.4', to: 'seaGreen.8', deg: 90 }}
      size="lg"
      fullWidth
    >
      Log In
    </Button>
  );
};
