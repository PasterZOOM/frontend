import { ChangeEvent, useEffect } from 'react'

import { useRouter } from 'next/router'

import { FiltersKeysType, useFilterStore } from '@/store/useFilterStore'

export const useChangeQueryParams = (
  filterKey: FiltersKeysType,
  filterValue: string
): { setQueryParams: (e: ChangeEvent<HTMLInputElement>) => void; queryParams: boolean } => {
  const { pathname, query, replace } = useRouter()
  const setFilter = useFilterStore(state => state.setFilter)

  useEffect(() => {
    if (query[filterKey]) {
      setFilter(filterKey, [query[filterKey] as string])
    }
    if (Array.isArray(query[filterKey])) {
      setFilter(filterKey, query[filterKey] as string[])
    }
    if (!query[filterKey]) {
      setFilter(filterKey, [])
    }
  }, [query[filterKey]])

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
      const param = `${query[filterKey]}`
        .replace(`,${filterValue}`, '')
        .replace(filterValue, '')
        .replace(/^,/, '')

      replace(
        {
          pathname,
          query: {
            ...query,
            [filterKey]: param.length ? param : [],
          },
        },
        undefined,
        { shallow: true }
      ).then()
    }
  }

  return { setQueryParams, queryParams: !!query[filterKey]?.includes(filterValue) }
}
