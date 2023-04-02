import { FC, useEffect, useState } from 'react'

import { useClearAllQueryParams } from '@/hooks/queryParams/useClearAllQueryParams'
import { useRemoveMultipleQueryParam } from '@/hooks/queryParams/useRemoveMultipleQueryParam'
import { EFilterKeys, filters as filtersMock, GeneralFilterType } from '@/mocks/filters'
import { useBasicProductsFilterStore } from '@/store/useBasicProductsFilterStore'

type PropsType = {
  className?: string
}
const ActiveFilters: FC<PropsType> = ({ className = '' }) => {
  const clearAll = useClearAllQueryParams()

  const filters = useBasicProductsFilterStore(state => state.filters)
  const [activeFilters, setActiveFilters] = useState<GeneralFilterType[]>([])

  const removeQueryParam = useRemoveMultipleQueryParam()

  useEffect(() => {
    let newFilters: GeneralFilterType[] = []

    Object.entries(filters).forEach(([filterKey, filterValue]) => {
      const temp = filterValue
        .split(',')
        .map(filter => filtersMock[filterKey as EFilterKeys].find(el => el.value === filter))
        .filter(filter => !!filter)

      newFilters = [...newFilters, ...temp] as GeneralFilterType[]
    })
    setActiveFilters(newFilters)
  }, [filters])

  return (
    <div className={`flex flex-wrap gap-2 ${className} ${activeFilters.length ? '' : 'hidden'}`}>
      {activeFilters.map(activeFilter => (
        <button
          type="button"
          className="h-fit rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
          key={activeFilter.id}
          onClick={() => removeQueryParam(activeFilter.filterKey, activeFilter.value)}
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
