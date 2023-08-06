import { UseMutationOptions, UseMutationResult } from 'react-query'

export type UseMutationHook<TData = unknown, TError = unknown, TVariables = unknown> = (
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) => UseMutationResult<TData, TError, TVariables>
