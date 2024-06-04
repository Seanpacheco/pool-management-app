import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

import chemLog from '@/server/db/schemas/public/ChemLog';

// Data Transfer Object
export type CreateChemLogDTO = {
  installation_id: string | null;
  sanitizer_level: number;
  sanitizer_type: string;
  ph_level: number | null;
  alkalinity_level: number | null;
  cynauric_acid_level: number | null;
  total_dissolved_solids_level: number | null;
  calcium_level: number | null;
  log_date: Date | null;
};

export const createChemLog = async ({ data }: { data: CreateChemLogDTO }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.post('/api/v1/chemLogs', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

type UseCreateChemLogOptions = {
  config?: MutationConfig<typeof createChemLog>;
};

export const UseCreateChemLog = (
  { config }: UseCreateChemLogOptions = {},
  auth: Auth0ContextInterface<User>,
  installation_id: string | null,
) => {
  return useMutation({
    onMutate: async (newChemLog) => {
      await queryClient.cancelQueries({ queryKey: ['chemLogs', { auth, installation_id }] });

      const previousChemLogs = queryClient.getQueryData<chemLog[]>(['chemLogs', { auth, installation_id }]);

      queryClient.setQueryData(['chemLogs', { auth }], [previousChemLogs || [], newChemLog.data]);
      console.log(previousChemLogs);
      console.log(newChemLog.data);

      return { previousChemLogs };
    },
    onError: (_, __, context: any) => {
      if (context?.previousChemLogs) {
        queryClient.setQueriesData({ queryKey: ['chemLogs', { auth, installation_id }] }, context.previousChemLogs);
      }
    },
    onSuccess: () => {
      console.log('mutate success');

      try {
        queryClient.invalidateQueries({ queryKey: ['chemLogs', { auth, installation_id }] });
        notifications.show({ message: 'chemLog created', color: 'green' });
        console.log('mutate success 2');
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['createChemLog'],
    ...config,
    mutationFn: async ({ data, auth }: { data: CreateChemLogDTO; auth: Auth0ContextInterface<User> }) =>
      createChemLog({ data }, auth),
  });
};
