import { useCallback } from 'react'

import { useRouter } from 'next/router'

export const useChangeQueryParams = (
  queryKey: string
): {
  changeParam: (value?: string) => void
  queryParam: string[] | string | undefined
  removeParam: () => void
} => {
  const { pathname, query, replace } = useRouter()

  const changeParam = useCallback(
    async (value?: string): Promise<void> => {
      await replace(
        {
          pathname,
          query: {
            ...query,
            page: [],
            [queryKey]: value ?? [],
          },
        },
        undefined,
        { shallow: true }
      )
    },
    [queryKey, pathname, query, replace]
  )

  const removeParam = useCallback(async (): Promise<void> => {
    await changeParam()
  }, [changeParam])

  return { changeParam, removeParam, queryParam: query[queryKey] ?? '' }
}
