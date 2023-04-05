import { ParsedUrlQuery } from 'querystring'

import { EFilterKeys } from '@/mocks/filters'

export const getQueryFilters: GetFiltersFnType = query => {
  const filters: Record<EFilterKeys, string> = {
    assignments: '',
    leathers: '',
    leatherColors: '',
    categories: '',
  }

  const filterKeys = Object.keys(filters) as EFilterKeys[]

  filterKeys.forEach(filterKey => {
    if (query && Array.isArray(query[filterKey])) {
      filters[filterKey] = (query[filterKey] as string[]).join()
    } else {
      filters[filterKey] = (query[filterKey] as string) ?? ''
    }
  })

  return filters
}

type GetFiltersFnType = (query: ParsedUrlQuery) => Record<EFilterKeys, string>
