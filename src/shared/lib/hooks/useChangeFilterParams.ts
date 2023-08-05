import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { selectSetFilter, useBasicProductsFilterStore } from 'store/useBasicProductsFilterStore'

export const useChangeFilterParams: UseChangeFilterParamsType = filterKey => {
  const { query } = useRouter()

  const setFilter = useBasicProductsFilterStore(selectSetFilter)

  useEffect(() => {
    if (query[filterKey]) {
      setFilter(filterKey, query[filterKey])
    }
    if (!query[filterKey]) {
      setFilter(filterKey, [])
    }
  }, [filterKey, query, setFilter])
}

type UseChangeFilterParamsType = (filterKey: EFilterKeys) => void
