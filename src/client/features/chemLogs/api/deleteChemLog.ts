import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

export const deleteChemLog = async ({ log_Id }: { log_Id: string }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.delete(`/api/v1/chemLogs/${log_Id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

type UseDeleteChemLogOptions = {
  config?: MutationConfig<typeof deleteChemLog>;
};

export const useDeleteChemLog = (
  { config }: UseDeleteChemLogOptions,
  auth: Auth0ContextInterface<User>,
  { installation_id }: { installation_id: string | null },
) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['chemLogs', { auth, installation_id }] });

      const previousChemLogs = queryClient.getQueryData(['chemLogs', { auth, installation_id }]);

      return { previousChemLogs };
    },
    onError: (_, __, context: any) => {
      if (context?.previousChemLogs) {
        queryClient.setQueryData(['chemLogs', { auth, installation_id }], context.previousChemLogs);
      }
    },
    onSuccess: () => {
      try {
        queryClient.invalidateQueries({ queryKey: ['chemLogs', { auth, installation_id }] });
        notifications.show({ message: 'Chem Log Deleted Successfully', color: 'green' });
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['deleteChemLog'],
    ...config,
    mutationFn: async ({ log_Id, auth }: { log_Id: string; auth: Auth0ContextInterface }) =>
      deleteChemLog({ log_Id }, auth),
  });
};
