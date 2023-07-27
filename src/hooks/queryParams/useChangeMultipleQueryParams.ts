import { useRouter } from 'next/router'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { useChangeFilterParams } from 'hooks/useChangeFilterParams'

export const useChangeMultipleQueryParams: UseChangeMultipleQueryParamsType = (
  filterKey,
  filterValue
) => {
  const { pathname, query, replace } = useRouter()

  useChangeFilterParams(filterKey)

  const setQueryParams = async (value?: boolean): Promise<void> => {
    let oldValue: string[] | string | undefined = query[filterKey]

    if (filterKey === EFilterKeys.SEARCH) {
      oldValue = filterValue || []
    } else if (filterKey === EFilterKeys.PAGE) {
      if (filterValue === '1') oldValue = []
      else oldValue = filterValue
    } else {
      if (Array.isArray(oldValue)) {
        if (value) {
          oldValue = [...oldValue, filterValue].sort()
        } else {
          oldValue = oldValue.filter(el => el !== filterValue)
        }
      }

      if (typeof oldValue === 'string') {
        if (value) {
          oldValue = [oldValue, filterValue].sort()
        } else {
          oldValue = []
        }
      }

      if (!oldValue) {
        oldValue = filterValue
      }
    }

    replace(
      {
        pathname,
        query: {
          ...query,
          [filterKey]: oldValue ?? [],
        },
      },
      undefined,
      { shallow: true }
    ).then()
  }

  return {
    setQueryParams,
    queryParams: (query[filterKey] as string) ?? '',
  }
}

type UseChangeMultipleQueryParamsType = (
  filterKey: EFilterKeys,
  filterValue: string
) => {
  queryParams: string
  setQueryParams: (value?: boolean) => void
}
