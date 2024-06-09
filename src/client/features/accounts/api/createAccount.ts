import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { getAccounts } from './getAccounts';
import useAuth0 from '@auth0/auth0-react';

import Account from '../../../types/Account';

// Data Transfer Object
export type CreateAccountDTO = {
  account_name: string;
  phone: string;
  email: string;
};

export const createAccount = async ({ data }: { data: CreateAccountDTO }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.post('/api/v1/accounts', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

type UseCreateAccountOptions = {
  config?: MutationConfig<typeof createAccount>;
};

export const useCreateAccount = ({ config }: UseCreateAccountOptions = {}, auth: Auth0ContextInterface<User>) => {
  return useMutation({
    onMutate: async (newAccount) => {
      await queryClient.cancelQueries({ queryKey: ['accounts', { auth }] });

      const previousAccounts = queryClient.getQueryData<Account[]>(['accounts', { auth }]);

      queryClient.setQueryData(['accounts', { auth }], [previousAccounts || [], newAccount.data]);

      return { previousAccounts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousAccounts) {
        queryClient.setQueriesData({ queryKey: ['accounts', { auth }] }, context.previousAccounts);
      }
    },
    onSuccess: () => {
      try {
        queryClient.invalidateQueries({ queryKey: ['accounts', { auth }] });
        notifications.show({ message: 'Account created', color: 'green' });
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['createAccount'],
    ...config,
    mutationFn: async ({ data, auth }: { data: CreateAccountDTO; auth: Auth0ContextInterface<User> }) =>
      createAccount({ data }, auth),
    //   mutationFn: ({ data, auth }: { data: any; auth: Auth0ContextInterface<User> }) => createAccount(data, auth),
  });
};
