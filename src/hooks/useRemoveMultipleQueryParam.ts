import { useRouter } from 'next/router'

import { EFilterKeys } from '@/mocks/filters'

export const useRemoveMultipleQueryParam = (): ((
  filterKey: EFilterKeys,
  filterValue: string
) => void) => {
  const { pathname, query, replace } = useRouter()

  return (filterKey, filterValue): void => {
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
