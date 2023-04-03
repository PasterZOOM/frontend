import { FC, useEffect, useState } from 'react'

import { ELeatherColor } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { useClearAllQueryParams } from '@/hooks/queryParams/useClearAllQueryParams'
import { useRemoveMultipleQueryParam } from '@/hooks/queryParams/useRemoveMultipleQueryParam'
import { EFilterKeys, GeneralFilterType } from '@/mocks/filters'
import { leatherColorValues } from '@/objects/colors/leatherColorValues'
import { productAssignments } from '@/objects/products/productAssignments'
import { productCategories } from '@/objects/products/productCategories'
import { useBasicProductsFilterStore } from '@/store/useBasicProductsFilterStore'
import { ObjectForSelectType } from '@/types/objectForSelectType'

type PropsType = {
  className?: string
}
const ActiveFilters: FC<PropsType> = ({ className = '' }) => {
  const articles = {} as ObjectForSelectType<string>

  useGetAllLeatherArticles().forEach(({ _id, title }) => {
    articles[title] = { _id, title, value: title }
  })

  const clearAll = useClearAllQueryParams()
  const removeQueryParam = useRemoveMultipleQueryParam()

  const filtersInStore = useBasicProductsFilterStore(state => state.filters)
  const [activeFilters, setActiveFilters] = useState<GeneralFilterType[]>([])

  const filters: Record<
    EFilterKeys,
    ObjectForSelectType<EProductAssignment | EProductCategory | ELeatherColor | string>
  > = {
    [EFilterKeys.ASSIGNMENTS]: productAssignments,
    [EFilterKeys.CATEGORIES]: productCategories,
    [EFilterKeys.LEATHERS]: articles,
    [EFilterKeys.LEATHER_COLORS]: leatherColorValues,
  }

  useEffect(() => {
    let newFilters: GeneralFilterType[] = []

    Object.entries(filtersInStore).forEach(([filterKey, filterValue]) => {
      const temp = filterValue
        .split(',')
        .map(filter => filters[filterKey as EFilterKeys][filter])
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
