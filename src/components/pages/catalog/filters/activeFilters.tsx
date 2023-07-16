import { FC, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { v1 } from 'uuid'

import { EFilterKeys, GeneralFilterType } from 'components/pages/catalog/filters/filters'
import { ELeatherColor } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { useClearAllQueryParams } from 'hooks/queryParams/useClearAllQueryParams'
import { useRemoveMultipleQueryParam } from 'hooks/queryParams/useRemoveMultipleQueryParam'
import { useRefetchAfterChangeLocale } from 'hooks/useRefetchAfterChangeLocale'
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

  const { data: leatherArticles, refetch } = useGetAllLeatherArticles()
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
    [EFilterKeys.SEARCH]: { search: { _id: v1(), title: '', value: '' } },
    [EFilterKeys.PAGE]: { page: { _id: v1(), title: '', value: '' } },
    [EFilterKeys.PAGE_SIZE]: { pageSize: { _id: v1(), title: '', value: '' } },
  }

  useRefetchAfterChangeLocale(refetch)

  useEffect(() => {
    if (leatherArticles) {
      const temp = {} as ObjectForSelectType<string>

      leatherArticles.forEach(article => {
        temp[article.value] = article
      })
      setArticles(temp)
    }
  }, [leatherArticles])

  useEffect(() => {
    let newFilters: GeneralFilterType[] = []

    const filtersArray = Object.entries(filtersInStore) as [
      EFilterKeys,
      string | string[] | undefined
    ][]

    filtersArray.forEach(([filterKey, filterValue]) => {
      let temp: GeneralFilterType[] = []

      if (Array.isArray(filterValue)) {
        temp = filterValue.map(filter => ({ ...filters[filterKey][filter], filterKey }))
      } else if (filterKey === EFilterKeys.SEARCH) {
        temp = [
          {
            ...filters[filterKey][filterKey],
            value: filterValue ?? '',
            title: filterValue ?? '',
            filterKey,
          },
        ]
      } else if (filterKey === EFilterKeys.PAGE || filterKey === EFilterKeys.PAGE_SIZE) {
        temp = []
      } else if (typeof filterValue === 'string') {
        temp = [{ ...filters[filterKey][filterValue], filterKey }]
      }
      newFilters = [...newFilters, ...temp].filter(filter => !!filter.value)
    })

    setActiveFilters(prevFilters => {
      if (
        newFilters.length !== prevFilters.length ||
        !newFilters.every((filter, index) => filter === prevFilters[index])
      ) {
        return newFilters
      }

      return prevFilters
    })
  }, [filtersInStore, articles])

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
