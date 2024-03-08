import { AxiosError } from 'axios';
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from '@tanstack/react-query';
import { PromiseValue } from 'type-fest';

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
/* eslint-disable */
export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

type Fn = (...args: any[]) => any;

type GetTVariables<T> = T extends (...args: infer R) => any ? (R extends [infer TVar, ...any] ? TVar : void) : never;
/* eslint-disable */
export type MutationConfig<MutationFnType extends Fn> = UseMutationOptions<
  ExtractFnReturnType<Awaited<ReturnType<MutationFnType>>>,
  AxiosError,
  GetTVariables<MutationFnType>
>;
