import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { axios } from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { chemLog } from '@/client/types/ChemLog';

export const getChemLogs = async (
  { installation_id }: { installation_id: string | null },
  startDate: Date,
  endDate: Date,
  auth: Auth0ContextInterface<User>,
) => {
  const token = await auth.getAccessTokenSilently();
  const response = await axios.get(
    `/api/v1/chemLogs/${installation_id}/dates/${startDate.toISOString()}/${endDate?.toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
export const useChemLogs = (
  auth: Auth0ContextInterface<User>,
  installation_id: string | null,
  [startDate, endDate]: [Date, Date],
) => {
  const {
    data: chemLogs,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['chemLogs', { auth, installation_id, startDate, endDate }],
    queryFn: async () => getChemLogs({ installation_id }, startDate, endDate, auth),
    enabled: !!installation_id,
  });
  return { chemLogs, error, isLoading, isSuccess };
};
