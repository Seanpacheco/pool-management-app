import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { axios } from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { site } from '@/client/types/Site';

export const getInstallations = async ({ site_id }: { site_id: string }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.get(`/api/v1/installations/${site_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const useInstallations = (auth: Auth0ContextInterface<User>, site_id: string) => {
  const {
    data: installations,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['installations', { auth, site_id }],
    queryFn: async () => getInstallations({ site_id }, auth),
    enabled: !!site_id,
  });
  return { installations, error, isLoading, isSuccess };
};
