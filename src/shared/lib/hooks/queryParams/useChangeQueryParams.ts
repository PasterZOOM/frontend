import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { useChangeFilterParams } from 'shared/lib/hooks/useChangeFilterParams'

export const useChangeQueryParams = (
  filterKey: EFilterKeys
): {
  changeParam: (value?: string) => void
  queryParam: string[] | string | undefined
  removeParam: () => void
} => {
  const { pathname, query, replace } = useRouter()

  useChangeFilterParams(filterKey)

  const changeParam = useCallback(
    async (value?: string): Promise<void> => {
      await replace(
        {
          pathname,
          query: {
            ...query,
            page: [],
            [filterKey]: value ?? [],
          },
        },
        undefined,
        { shallow: true }
      )
    },
    [filterKey, pathname, query, replace]
  )

  const removeParam = useCallback(async (): Promise<void> => {
    await changeParam()
  }, [changeParam])

  return { changeParam, removeParam, queryParam: query[filterKey] ?? '' }
}
