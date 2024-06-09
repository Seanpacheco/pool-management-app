import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { axios } from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getAccounts = async (auth: Auth0ContextInterface<User>, page: number, searchValue: string) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.get(`/api/v1/accounts/search/${searchValue}/page/${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const useAccounts = (auth: Auth0ContextInterface<User>, page: number, searchValue: string) => {
  const {
    data: accounts,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['accounts', { auth, page, searchValue }],
    queryFn: async () => getAccounts(auth, page, searchValue),
  });
  return { accounts, error, isLoading, isSuccess };
};
