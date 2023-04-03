import { FC, useEffect, useState } from 'react'

import { useGetArticlesForSelect } from '@/features/leatherArticles/hooks/useGetArticlesForSelect'
import { useClearAllQueryParams } from '@/hooks/queryParams/useClearAllQueryParams'
import { useRemoveMultipleQueryParam } from '@/hooks/queryParams/useRemoveMultipleQueryParam'
import {
  EFilterKeys,
  GeneralFilterType,
  leatherColorFilters,
  productAssignmentsFilters,
  productCategoriesFilters,
} from '@/mocks/filters'
import { useBasicProductsFilterStore } from '@/store/useBasicProductsFilterStore'

type PropsType = {
  className?: string
}
const ActiveFilters: FC<PropsType> = ({ className = '' }) => {
  const articles = useGetArticlesForSelect()

  const clearAll = useClearAllQueryParams()
  const removeQueryParam = useRemoveMultipleQueryParam()

  const filtersInStore = useBasicProductsFilterStore(state => state.filters)
  const [activeFilters, setActiveFilters] = useState<GeneralFilterType[]>([])

  const filters: Record<EFilterKeys, GeneralFilterType[]> = {
    [EFilterKeys.ASSIGNMENTS]: productAssignmentsFilters,
    [EFilterKeys.CATEGORIES]: productCategoriesFilters,
    [EFilterKeys.LEATHERS]: articles,
    [EFilterKeys.LEATHER_COLORS]: leatherColorFilters,
  }

  useEffect(() => {
    let newFilters: GeneralFilterType[] = []

    Object.entries(filtersInStore).forEach(([filterKey, filterValue]) => {
      const temp = filterValue
        .split(',')
        .map(filter => filters[filterKey as EFilterKeys].find(el => el.value === filter))
        .filter(filter => !!filter)

      newFilters = [...newFilters, ...temp] as GeneralFilterType[]
    })
    setActiveFilters(newFilters)
  }, [filtersInStore])

  return (
    <div className={`flex flex-wrap gap-2 ${className} ${activeFilters.length ? '' : 'hidden'}`}>
      {activeFilters.map(activeFilter => (
        <button
          type="button"
          className="h-fit rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
          key={activeFilter._id}
          onClick={() => removeQueryParam(activeFilter.filterKey!, activeFilter.value)}
        >
          {activeFilter.title}
        </button>
      ))}
      {activeFilters.length && (
        <button
          type="button"
          onClick={clearAll}
          className="h-fit rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
        >
          Очистить все
        </button>
      )}
    </div>
  )
}

export default ActiveFilters
