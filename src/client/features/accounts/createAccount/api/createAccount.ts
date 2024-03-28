import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../../lib/axios';
import { queryClient, MutationConfig } from '../../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

import Account from '../../../../types/Account';

//Data Transfer Object
export type CreateAccountDTO = {
  data: {
    account_name: string;
    phone: string;
    email: string;
  };
};

export const createAccount = async ({ data }: CreateAccountDTO) => {
  return axios.post('/api/v1/accounts', data);
};

type UseCreateAccountOptions = {
  config?: MutationConfig<typeof createAccount>;
};

export const useCreateAccount = ({ config }: UseCreateAccountOptions = {}) => {
  return useMutation({
    onMutate: async (newAccount) => {
      await queryClient.cancelQueries({ queryKey: ['accounts'] });

      const previousAccounts = queryClient.getQueryData<Account[]>(['accounts']);

      queryClient.setQueryData(['accounts'], [...(previousAccounts || []), newAccount]);

      return { previousAccounts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousAccounts) {
        queryClient.setQueriesData({ queryKey: ['accounts'] }, context.previousAccounts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      notifications.show({ message: 'Account created', color: 'green' });
    },
    ...config,
    mutationFn: (data) => createAccount(data),
  });
};
