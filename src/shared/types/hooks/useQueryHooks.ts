import { QueryKey, UseQueryOptions, UseQueryResult } from 'react-query'

export type UseQueryAllHook<
  TQueryFnData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TData = TQueryFnData,
> = (
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryFn' | 'queryKey'>
) => UseQueryResult<TData, TError>

export type UseQueryOneHook<
  TQueryFnData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TData = TQueryFnData,
> = (
  id: string,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryFn' | 'queryKey'>
) => UseQueryResult<TData, TError>
