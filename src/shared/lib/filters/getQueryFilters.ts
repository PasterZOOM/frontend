import { EFilterKeys } from '@/shared/components/pages/catalog/filters/filters'
import { FiltersType } from '@/store/useBasicProductsFilterStore'

export const getQueryFilters: GetFiltersFnType = query => {
  const filters: Partial<FiltersType> = {}

  const filterKeys = Object.keys(filters) as EFilterKeys[]

  filterKeys.forEach(filterKey => {
    if (Array.isArray(query[filterKey])) {
      filters[filterKey] = (query[filterKey] as string[]).join()
    } else {
      filters[filterKey] = query[filterKey] ?? ''
    }
  })

  return query
}

type GetFiltersFnType = (query: FiltersType) => FiltersType
