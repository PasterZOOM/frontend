import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import {
  selectFilter,
  selectSetFilter,
  useBasicProductsFilterStore,
} from 'store/useBasicProductsFilterStore'

export const useChangeFilterParams: UseChangeFilterParamsType = filterKey => {
  const { query } = useRouter()

  const setFilter = useBasicProductsFilterStore(selectSetFilter)
  const filter = useBasicProductsFilterStore(selectFilter(filterKey))

  useEffect(() => {
    if (filter !== query[filterKey]) {
      if (query[filterKey]) {
        setFilter(filterKey, query[filterKey] as string)
      }
      if (!query[filterKey]) {
        setFilter(filterKey, [])
      }
    }
  }, [filter, filterKey, query, setFilter])
}

type UseChangeFilterParamsType = (filterKey: EFilterKeys) => void
