import { EFilterKeys } from '@/shared/components/pages/catalog/filters/filters'
import { useChangeQueryParams } from '@/shared/lib/hooks/queryParams/useChangeQueryParams'
import { useChangeFilterParams } from '@/shared/lib/hooks/useChangeFilterParams'
import { QueryParam } from '@/shared/types/queryParam'

export const useChangeQueryFiltersParams = (
  filterKey: EFilterKeys
): {
  changeParam: (value?: string) => void
  queryParam: QueryParam
  removeParam: () => void
} => {
  const { queryParam, changeParam, removeParam } = useChangeQueryParams(filterKey)

  useChangeFilterParams(filterKey)

  return { changeParam, removeParam, queryParam }
}
