import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { EFilterKeys } from '@/mocks/filters'
import { useFilterStore } from '@/store/useFilterStore'

export const useChangeFilterParams = (filterKey: EFilterKeys): void => {
  const { query } = useRouter()
  const setFilter = useFilterStore(state => state.setFilter)
  const filter = useFilterStore(state => state.filters[filterKey])

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
