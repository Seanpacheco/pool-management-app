import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

import Site from '../../../types/Site';

// Data Transfer Object
export type CreateSiteDTO = {
  address: string;
  postal_code: string;
  phone: string;
  email: string;
  account_id: string;
};

export const createSite = async ({ data }: { data: CreateSiteDTO }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.post('/api/v1/sites', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

type UseCreateSiteOptions = {
  config?: MutationConfig<typeof createSite>;
};

export const useCreateSite = (
  { config }: UseCreateSiteOptions = {},
  auth: Auth0ContextInterface<User>,
  account_id: string,
) => {
  return useMutation({
    onMutate: async (newSite) => {
      await queryClient.cancelQueries({ queryKey: ['sites', { auth, account_id }] });

      const previousSites = queryClient.getQueryData<Site[]>(['sites', { auth, account_id }]);

      queryClient.setQueryData(['sites', { auth }], [previousSites || [], newSite.data]);
      console.log(previousSites);
      console.log(newSite.data);

      return { previousSites };
    },
    onError: (_, __, context: any) => {
      if (context?.previousSites) {
        queryClient.setQueriesData({ queryKey: ['sites', { auth, account_id }] }, context.previousSites);
      }
    },
    onSuccess: () => {
      console.log('mutate success');

      try {
        queryClient.invalidateQueries({ queryKey: ['sites', { auth, account_id }] });
        notifications.show({ message: 'Site created', color: 'green' });
        console.log('mutate success 2');
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['createSite'],
    ...config,
    mutationFn: async ({ data, auth }: { data: CreateSiteDTO; auth: Auth0ContextInterface<User> }) =>
      createSite({ data }, auth),
  });
};
