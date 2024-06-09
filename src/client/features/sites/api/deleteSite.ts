import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

import ServerSiteResponse from '../../../types/Site';

export const deleteSite = async ({ site_Id }: { site_Id: string }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.delete(`/api/v1/sites/${site_Id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

type UseDeleteSiteOptions = {
  config?: MutationConfig<typeof deleteSite>;
};

export const useDeleteSite = (
  { config }: UseDeleteSiteOptions,
  auth: Auth0ContextInterface<User>,
  { account_id }: { account_id: string },
) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['sites', { auth, account_id }] });

      const previousSites = queryClient.getQueryData<ServerSiteResponse>(['sites', { auth, account_id }]);

      return { previousSites };
    },
    onError: (_, __, context: any) => {
      if (context?.previousSites) {
        queryClient.setQueryData(['sites', { auth, account_id }], context.previousSites);
      }
    },
    onSuccess: () => {
      try {
        queryClient.invalidateQueries({ queryKey: ['sites', { auth, account_id }] });
        notifications.show({ message: 'Site Deleted Successfully', color: 'green' });
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['deleteSite'],
    ...config,
    mutationFn: async ({ site_Id, auth }: { site_Id: string; auth: Auth0ContextInterface }) =>
      deleteSite({ site_Id }, auth),
  });
};
