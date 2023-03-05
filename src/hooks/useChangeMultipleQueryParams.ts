import { ChangeEvent } from 'react'

import { useRouter } from 'next/router'

import { useChangeFilterParams } from '@/hooks/useChangeFilterParams'
import { useRemoveMultipleQueryParam } from '@/hooks/useRemoveMultipleQueryParam'
import { EFilterKeys } from '@/mocks/filters'

export const useChangeMultipleQueryParams = (
  filterKey: EFilterKeys,
  filterValue: string
): { setQueryParams: (e: ChangeEvent<HTMLInputElement>) => void; queryParams: boolean } => {
  const { pathname, query, replace } = useRouter()

  const removeQueryParam = useRemoveMultipleQueryParam()

  useChangeFilterParams(filterKey)

  const setQueryParams = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.checked) {
      replace(
        {
          pathname,
          query: {
            ...query,
            [filterKey]: query[filterKey] ? `${query[filterKey]},${filterValue}` : filterValue,
          },
        },
        undefined,
        { shallow: true }
      ).then()
    } else {
      removeQueryParam(filterKey, filterValue)
    }
  }

  return { setQueryParams, queryParams: !!query[filterKey]?.includes(filterValue) }
}
