import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { axios } from '../../../../lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getAccounts = async (auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.get('/api/v1/accounts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const useAccounts = (auth: Auth0ContextInterface<User>) => {
  const {
    data: accounts,
    error,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ['accounts', { auth }], queryFn: async () => getAccounts(auth) });
  return { accounts, error, isLoading, isSuccess };
};
