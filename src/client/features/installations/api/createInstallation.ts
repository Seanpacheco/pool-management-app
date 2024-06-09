import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

import Installation from '@/server/db/schemas/public/Installation';

// Data Transfer Object
export type CreateInstallationDTO = {
  site_id: string;
  name: string | null;
  type: string | null;
  shape: string | null;
  length: number | null;
  width: number | null;
  depth: number | null;
  gallons: number | null;
};

export const createInstallation = async (
  { data }: { data: CreateInstallationDTO },
  auth: Auth0ContextInterface<User>,
) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.post('/api/v1/installations', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

type UseCreateInstallationOptions = {
  config?: MutationConfig<typeof createInstallation>;
};

export const UseCreateInstallation = (
  { config }: UseCreateInstallationOptions = {},
  auth: Auth0ContextInterface<User>,
  site_id: string,
) => {
  return useMutation({
    onMutate: async (newInstallation) => {
      await queryClient.cancelQueries({ queryKey: ['installations', { auth, site_id }] });

      const previousInstallations = queryClient.getQueryData<Installation[]>(['installations', { auth, site_id }]);

      queryClient.setQueryData(['installations', { auth }], [previousInstallations || [], newInstallation.data]);

      return { previousInstallations };
    },
    onError: (_, __, context: any) => {
      if (context?.previousInstallations) {
        queryClient.setQueriesData({ queryKey: ['installations', { auth, site_id }] }, context.previousInstallations);
      }
    },
    onSuccess: () => {
      try {
        queryClient.invalidateQueries({ queryKey: ['installations', { auth, site_id }] });
        notifications.show({ message: 'Installation created', color: 'green' });
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['createInstallation'],
    ...config,
    mutationFn: async ({ data, auth }: { data: CreateInstallationDTO; auth: Auth0ContextInterface<User> }) =>
      createInstallation({ data }, auth),
  });
};
