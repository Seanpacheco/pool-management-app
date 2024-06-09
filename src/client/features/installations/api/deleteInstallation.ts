import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

export const deleteInstallation = async (
  { installation_Id }: { installation_Id: string | null },
  auth: Auth0ContextInterface<User>,
) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.delete(`/api/v1/installations/${installation_Id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

type UseDeleteInstallationOptions = {
  config?: MutationConfig<typeof deleteInstallation>;
};

export const useDeleteInstallation = (
  { config }: UseDeleteInstallationOptions,
  auth: Auth0ContextInterface<User>,
  { site_id }: { site_id: string },
) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['installations', { auth, site_id }] });

      const previousInstallations = queryClient.getQueryData(['installations', { auth, site_id }]);

      return { previousInstallations };
    },
    onError: (_, __, context: any) => {
      if (context?.previousInstallations) {
        queryClient.setQueryData(['installations', { auth, site_id }], context.previousInstallations);
      }
    },
    onSuccess: () => {
      try {
        queryClient.invalidateQueries({ queryKey: ['installations', { auth, site_id }] });
        notifications.show({ message: 'Installation Deleted Successfully', color: 'green' });
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['deleteInstallation'],
    ...config,
    mutationFn: async ({ installation_Id, auth }: { installation_Id: string | null; auth: Auth0ContextInterface }) =>
      deleteInstallation({ installation_Id }, auth),
  });
};
