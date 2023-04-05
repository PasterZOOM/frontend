import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { EFilterKeys } from '@/mocks/filters'
import { useBasicProductsFilterStore } from '@/store/useBasicProductsFilterStore'

export const useChangeFilterParams: UseChangeFilterParamsType = filterKey => {
  const { query } = useRouter()

  const setFilter = useBasicProductsFilterStore(state => state.setFilter)
  const filter = useBasicProductsFilterStore(state => state.filters[filterKey])

  useEffect(() => {
    if (filter !== query[filterKey]) {
      if (query[filterKey]) {
        setFilter(filterKey, query[filterKey] as string)
      }
      if (!query[filterKey]) {
        setFilter(filterKey, '')
      }
    }
  }, [query[filterKey]])
}

type UseChangeFilterParamsType = (filterKey: EFilterKeys) => void
