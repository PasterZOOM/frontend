import { useEffect, useMemo, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { v1 } from 'uuid'

import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { EFilterKeys, GeneralFilterType } from 'shared/components/pages/catalog/filters/filters'
import { ELeatherColor } from 'shared/enums/materials'
import { EProductAssignment, EProductCategory } from 'shared/enums/product'
import { useGetPriceInCurrency } from 'shared/lib/hooks/useGetPriceInCurrency'
import { leatherColors } from 'shared/objects/colors/leatherColors'
import { productAssignments } from 'shared/objects/products/productAssignments'
import { productCategories } from 'shared/objects/products/productCategories'
import { productSort } from 'shared/objects/products/productSort'
import { ObjectForSelectType } from 'shared/types/objectForSelectType'
import { QueryParam } from 'shared/types/queryParam'
import { selectFilters, useBasicProductsFilterStore } from 'store/useBasicProductsFilterStore'

export const useActiveFilters = (): { activeFilters: GeneralFilterType[] } => {
  const { t } = useTranslation('catalog')
  const [articles, setArticles] = useState<ObjectForSelectType<string>>({})
  const [activeFilters, setActiveFilters] = useState<GeneralFilterType[]>([])

  const { data: leatherArticles } = useGetAllLeatherArticles()

  const filtersInStore = useBasicProductsFilterStore(selectFilters)

  const filters: Record<
    EFilterKeys,
    ObjectForSelectType<ELeatherColor | EProductAssignment | EProductCategory | string>
  > = useMemo(
    () => ({
      [EFilterKeys.ASSIGNMENTS]: productAssignments,
      [EFilterKeys.CATEGORIES]: productCategories,
      [EFilterKeys.LEATHERS]: articles,
      [EFilterKeys.LEATHER_COLORS]: leatherColors,
      [EFilterKeys.SORT]: productSort,
      [EFilterKeys.SEARCH]: {
        search: {
          _id: v1(),
          title: '',
          value: '',
          component: <>{t('Search tag')}: </>,
        },
      },
      [EFilterKeys.PAGE]: { page: { _id: v1(), title: '', value: '' } },
      [EFilterKeys.PAGE_SIZE]: { pageSize: { _id: v1(), title: '', value: '' } },
      [EFilterKeys.MIN_PRICE]: {
        minPrice: { _id: v1(), title: '', value: '', component: <>{t('Max price')}: </> },
      },
      [EFilterKeys.MAX_PRICE]: {
        maxPrice: { _id: v1(), title: '', value: '', component: <>{t('Max price')}: </> },
      },
    }),
    [articles, t]
  )

  const minPriceValue = useGetPriceInCurrency(Number(filtersInStore.minPrice))
  const maxPriceValue = useGetPriceInCurrency(Number(filtersInStore.maxPrice))

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

    const filtersArray = Object.entries(filtersInStore) as [EFilterKeys, QueryParam][]

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
      } else if (filterKey === EFilterKeys.MAX_PRICE) {
        temp = [
          {
            ...filters[filterKey][filterKey],
            value: filterValue ?? '',
            title: maxPriceValue.title || '',
            filterKey,
          },
        ]
      } else if (filterKey === EFilterKeys.MIN_PRICE) {
        temp = [
          {
            ...filters[filterKey][filterKey],
            value: filterValue ?? '',
            title: minPriceValue.title || '',
            filterKey,
          },
        ]
      } else if (filterKey === EFilterKeys.PAGE) {
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
  }, [filtersInStore, articles, filters, maxPriceValue.title, minPriceValue.title, t])

  return { activeFilters }
}
