import { useRouter } from 'next/router'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'

export const useRemoveMultipleQueryParam: UseRemoveMultipleQueryParamType = () => {
  const { pathname, query, replace } = useRouter()

  return async (filterKey, filterValue) => {
    let value = query[filterKey]

    if (Array.isArray(value)) {
      value = value.filter(el => el !== filterValue)
    }
    if (typeof value === 'string') {
      value = []
    }

    await replace(
      {
        pathname,
        query: {
          ...query,
          [filterKey]: value,
        },
      },
      undefined,
      { shallow: true }
    )
  }
}

type UseRemoveMultipleQueryParamType = () => (
  filterKey: EFilterKeys,
  filterValue: string
) => Promise<void>
