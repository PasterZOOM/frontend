import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { useChangeFilterParams } from 'shared/lib/hooks/useChangeFilterParams'

export const useChangeMultipleQueryParams = (
  filterKey: EFilterKeys
): {
  queryParam: string[] | string | undefined
  removeQueryParams: (value: string) => void
  setQueryParams: (value: string) => void
} => {
  const { pathname, query, replace } = useRouter()

  useChangeFilterParams(filterKey)

  const changeQuery = useCallback(
    (newValue: string[] | string): void => {
      replace(
        {
          pathname,
          query: {
            ...query,
            page: [],
            [filterKey]: newValue ?? [],
          },
        },
        undefined,
        { shallow: true }
      ).then()
    },
    [filterKey, pathname, query, replace]
  )

  const setQueryParams = useCallback(
    (value: string): void => {
      let queryValues: string[] | string | undefined = query[filterKey]

      if (Array.isArray(queryValues)) {
        queryValues = [...queryValues, value].sort()
      }

      if (typeof queryValues === 'string') {
        queryValues = [queryValues, value].sort()
      }

      if (!queryValues) {
        queryValues = value
      }

      changeQuery(queryValues)
    },
    [changeQuery, filterKey, query]
  )

  const removeQueryParams = useCallback(
    (value: string) => {
      let oldValue: string[] | string | undefined = query[filterKey]

      if (Array.isArray(oldValue)) {
        oldValue = oldValue.filter(el => el !== value)
      } else {
        oldValue = []
      }

      changeQuery(oldValue)
    },
    [changeQuery, filterKey, query]
  )

  return {
    removeQueryParams,
    setQueryParams,
    queryParam: query[filterKey] ?? '',
  }
}
