import { FC, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { EFilterKeys, GeneralFilterType } from 'components/pages/catalog/filters/filters'
import { ELeatherColor } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { useClearAllQueryParams } from 'hooks/queryParams/useClearAllQueryParams'
import { useRemoveMultipleQueryParam } from 'hooks/queryParams/useRemoveMultipleQueryParam'
import { leatherColorsValues } from 'objects/colors/leatherColorsValues'
import { productAssignments } from 'objects/products/productAssignments'
import { productCategories } from 'objects/products/productCategories'
import { selectFilters, useBasicProductsFilterStore } from 'store/useBasicProductsFilterStore'
import { ObjectForSelectType } from 'types/objectForSelectType'

type PropsType = {
  className?: string
}
const ActiveFilters: FC<PropsType> = ({ className = '' }) => {
  const { t } = useTranslation(['catalog', 'common'])
  const [articles, setArticles] = useState<ObjectForSelectType<string>>({})
  const [activeFilters, setActiveFilters] = useState<GeneralFilterType[]>([])

  const { data: leatherArticles } = useGetAllLeatherArticles()
  const clearAll = useClearAllQueryParams()
  const removeQueryParam = useRemoveMultipleQueryParam()

  const filtersInStore = useBasicProductsFilterStore(selectFilters)

  const filters: Record<
    EFilterKeys,
    ObjectForSelectType<EProductAssignment | EProductCategory | ELeatherColor | string>
  > = {
    [EFilterKeys.ASSIGNMENTS]: productAssignments,
    [EFilterKeys.CATEGORIES]: productCategories,
    [EFilterKeys.LEATHERS]: articles,
    [EFilterKeys.LEATHER_COLORS]: leatherColorsValues,
  }

  useEffect(() => {
    if (leatherArticles) {
      const temp = {} as ObjectForSelectType<string>

      leatherArticles.forEach(({ _id, title }) => {
        temp[title] = { _id, title, value: title }
      })
      setArticles(temp)
    }
  }, [leatherArticles])

  useEffect(() => {
    let newFilters: GeneralFilterType[] = []

    const filtersArray = Object.entries(filtersInStore) as [EFilterKeys, string][]

    filtersArray.forEach(([filterKey, filterValue]) => {
      const temp: GeneralFilterType[] = filterValue
        .split(',')
        .map(filter => ({ ...filters[filterKey][filter], filterKey }))
        .filter(filter => !!filter.value)

      newFilters = [...newFilters, ...temp]
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
          onClick={() => removeQueryParam(activeFilter.filterKey, activeFilter.value)}
        >
          {t(activeFilter.title, { ns: 'common' })}
        </button>
      ))}
      {activeFilters.length && (
        <button
          type="button"
          onClick={clearAll}
          className="h-fit rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
        >
          {t('clear-all')}
        </button>
      )}
    </div>
  )
}

export default ActiveFilters
