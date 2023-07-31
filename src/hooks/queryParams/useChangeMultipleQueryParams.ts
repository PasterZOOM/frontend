import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { useChangeFilterParams } from 'hooks/useChangeFilterParams'

export const useChangeMultipleQueryParams: UseChangeMultipleQueryParamsType = filterKey => {
  const { pathname, query, replace } = useRouter()

  useChangeFilterParams(filterKey)

  const changeQuery = useCallback(
    (newValue: string[] | string): void => {
      replace(
        {
          pathname,
          query: {
            ...query,
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
      let oldValue: string[] | string | undefined = query[filterKey]

      if (filterKey === EFilterKeys.SEARCH) {
        oldValue = value || []
      } else if (filterKey === EFilterKeys.PAGE) {
        if (value === '1') oldValue = []
        else oldValue = value
      } else {
        if (Array.isArray(oldValue)) {
          if (value) {
            oldValue = [...oldValue, value].sort()
          }
        }

        if (typeof oldValue === 'string') {
          if (value) {
            oldValue = [oldValue, value].sort()
          } else {
            oldValue = []
          }
        }

        if (!oldValue) {
          oldValue = value
        }
      }

      changeQuery(oldValue)
    },
    [changeQuery, filterKey, query]
  )

  const removeQueryParams = useCallback(
    (value: string) => {
      let oldValue: string[] | string | undefined = query[filterKey]

      if (Array.isArray(oldValue)) {
        oldValue = oldValue.filter(el => el !== value)
      }
      if (typeof oldValue === 'string') {
        if (value) {
          oldValue = []
        }
      }
      if (!oldValue) {
        oldValue = []
      }

      changeQuery(oldValue)
    },
    [changeQuery, filterKey, query]
  )

  return {
    removeQueryParams,
    setQueryParams,
    queryParams: (query[filterKey] as string) ?? '',
  }
}

type UseChangeMultipleQueryParamsType = (filterKey: EFilterKeys) => {
  queryParams: string
  removeQueryParams: (value: string) => void
  setQueryParams: (value: string) => void
}
