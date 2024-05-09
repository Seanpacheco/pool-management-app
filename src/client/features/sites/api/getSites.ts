import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { axios } from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getSites = async ({ account_id }: { account_id: string }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.get(`/api/v1/sites${account_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const useSites = (auth: Auth0ContextInterface<User>, account_id: string) => {
  const {
    data: sites,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['sites', { auth, account_id }],
    queryFn: async () => getSites({ account_id }, auth),
  });
  return { sites, error, isLoading, isSuccess };
};
