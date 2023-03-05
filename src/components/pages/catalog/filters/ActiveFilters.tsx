import { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useRemoveMultipleQueryParam } from '@/hooks/useRemoveMultipleQueryParam'
import { EFilterKeys, filters as filtersMock, GeneralFilterType } from '@/mocks/filters'
import { useFilterStore } from '@/store/useFilterStore'

type PropsType = {
  className?: string
}
const ActiveFilters: FC<PropsType> = ({ className = '' }) => {
  const { replace, pathname } = useRouter()
  const filters = useFilterStore(state => state.filters)
  const [activeFilters, setActiveFilters] = useState<GeneralFilterType[]>([])

  const clearAll = (): void => {
    replace(pathname, undefined, { shallow: true }).then()
  }

  const removeQueryParam = useRemoveMultipleQueryParam()

  useEffect(() => {
    let newFilters: GeneralFilterType[] = []

    Object.entries(filters).forEach(([filterKey, filterValue]) => {
      const filt = filterValue
        .split(',')
        .map(filter => filtersMock[filterKey as EFilterKeys].find(el => el.value === filter))
        .filter(filter => !!filter)

      newFilters = [...newFilters, ...filt] as GeneralFilterType[]
    })
    setActiveFilters(newFilters)
  }, [filters])

  return (
    <div className={`flex flex-wrap gap-2 ${className} ${activeFilters.length ? '' : 'hidden'}`}>
      {activeFilters.map(activeFilter => (
        <button
          type="button"
          className="rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
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
          className="rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
        >
          Очистить все
        </button>
      )}
    </div>
  )
}

export default ActiveFilters
