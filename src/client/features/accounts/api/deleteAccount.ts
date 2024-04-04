import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { queryClient, MutationConfig } from '../../../lib/react-query';
import { notifications } from '@mantine/notifications';
import { Auth0ContextInterface, User } from '@auth0/auth0-react';

import { ServerAccountResponse } from '../../../types/Account';

export const deleteAccount = async ({ account_id }: { account_id: string }, auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.delete(`/api/v1/accounts/${account_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};

type UseDeleteAccountOptions = {
  config?: MutationConfig<typeof deleteAccount>;
};

export const useDeleteAccount = ({ config }: UseDeleteAccountOptions, auth: Auth0ContextInterface<User>) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['accounts', { auth }] });

      const previousAccounts = queryClient.getQueryData<ServerAccountResponse>(['accounts', { auth }]);

      // queryClient.setQueryData(
      //   ['accounts', { auth }],
      //   previousAccounts?.data.filter((account) => account.account_id !== deletedAccount.account_id),
      // );
      console.log('onMutate success');
      return { previousAccounts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousAccounts) {
        queryClient.setQueryData(['accounts', { auth }], context.previousAccounts);
      }
    },
    onSuccess: () => {
      try {
        queryClient.invalidateQueries({ queryKey: ['accounts', { auth }] });
        notifications.show({ message: 'Account Deleted Successfully', color: 'green' });
      } catch (e) {
        console.log(e);
      }
    },
    mutationKey: ['deleteAccount'],
    ...config,
    mutationFn: async ({ account_id, auth }: { account_id: string; auth: Auth0ContextInterface }) =>
      deleteAccount({ account_id }, auth),
  });
};
