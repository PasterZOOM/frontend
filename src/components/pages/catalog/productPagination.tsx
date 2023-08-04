import { FC, useEffect } from 'react'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { useChangeQueryParams } from 'shared/lib/hooks/queryParams/useChangeQueryParams'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize'
import {
  selectFilter,
  selectSetFilter,
  useBasicProductsFilterStore,
} from 'store/useBasicProductsFilterStore'
import { Pagination } from 'widgets/pagination'

export const ProductPagination: FC = () => {
  const { width } = useWindowSize()

  const { changeParam, removeParam, queryParam } = useChangeQueryParams(EFilterKeys.PAGE)
  const { data: products } = useGetAllBasicProducts()

  const pageSize = useBasicProductsFilterStore(selectFilter(EFilterKeys.PAGE_SIZE))
  const setFilter = useBasicProductsFilterStore(selectSetFilter)

  useEffect(() => {
    // eslint-disable-next-line no-magic-numbers
    if (width <= 983) {
      if (pageSize !== '8') {
        setFilter(EFilterKeys.PAGE_SIZE, '8')
      }
    } else if (pageSize !== '9') {
      setFilter(EFilterKeys.PAGE_SIZE, '9')
    }
  }, [pageSize, setFilter, width])

  const setCurrentPageHandler = (value: number): void => {
    if (value === 1) {
      removeParam()
    } else {
      changeParam(`${value}`)
    }
  }

  return products && +products.totalCount > +(pageSize as string) ? (
    <Pagination
      currentPage={Number(queryParam) || 1}
      pageSize={pageSize ? +pageSize : 1}
      setCurrentPage={setCurrentPageHandler}
      totalItemsCount={products?.totalCount || 1}
    />
  ) : null
}
