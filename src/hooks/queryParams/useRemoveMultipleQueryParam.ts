import { useRouter } from 'next/router'

import { EFilterKeys } from '@/mocks/filters'

export const useRemoveMultipleQueryParam = (): ((
  filterKey: EFilterKeys,
  filterValue: string
) => Promise<void>) => {
  const { pathname, query, replace } = useRouter()

  return async (filterKey, filterValue) => {
    const param = `${query[filterKey]}`
      .replace(`,${filterValue}`, '')
      .replace(filterValue, '')
      .replace(/^,/, '')

    await replace(
      {
        pathname,
        query: {
          ...query,
          [filterKey]: param.length ? param : [],
        },
      },
      undefined,
      { shallow: true }
    )
  }
}
