import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

export type UseMutationHook<TData = unknown, TError = unknown, TVariables = unknown> = (
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) => UseMutationResult<TData, TError, TVariables>
