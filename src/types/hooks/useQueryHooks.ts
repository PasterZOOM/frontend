import { UseQueryOptions } from 'react-query'
import { QueryKey } from 'react-query/types/core/types'
import { UseQueryResult } from 'react-query/types/react/types'

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
