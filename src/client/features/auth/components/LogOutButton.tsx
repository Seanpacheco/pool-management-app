import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

export const LogOutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Log Out
    </Button>
  );
};
