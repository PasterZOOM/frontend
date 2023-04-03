import { ChangeEvent } from 'react'

import { useRouter } from 'next/router'

import { useRemoveMultipleQueryParam } from '@/hooks/queryParams/useRemoveMultipleQueryParam'
import { useChangeFilterParams } from '@/hooks/useChangeFilterParams'
import { EFilterKeys } from '@/mocks/filters'

export const useChangeMultipleQueryParams = (
  filterKey: EFilterKeys,
  filterValue: string
): {
  setQueryParams: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  queryParams: boolean
} => {
  const { pathname, query, replace } = useRouter()

  const removeQueryParam = useRemoveMultipleQueryParam()

  useChangeFilterParams(filterKey)

  const setQueryParams = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.currentTarget.checked) {
      replace(
        {
          pathname,
          query: {
            ...query,
            [filterKey]: query[filterKey]
              ? `${query[filterKey]},${filterValue}`.split(',').sort().join(',') // сортировка нужна чтобы не было лишних запросов из-за того, что параметры поменялись местами
              : filterValue,
          },
        },
        undefined,
        { shallow: true }
      ).then()
    } else {
      await removeQueryParam(filterKey, filterValue)
    }
  }

  return { setQueryParams, queryParams: !!query[filterKey]?.includes(filterValue) }
}
