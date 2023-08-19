import { FC } from 'react'

import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { useChangeQueryFiltersParams } from 'shared/lib/hooks/queryParams/useChangeQueryFiltersParams'
import { selectFilter, useBasicProductsFilterStore } from 'store/useBasicProductsFilterStore'
import { Pagination } from 'widgets/pagination'

export const ProductPagination: FC = () => {
  const { changeParam, removeParam, queryParam } = useChangeQueryFiltersParams(EFilterKeys.PAGE)
  const { data: products } = useGetAllBasicProducts()

  const pageSize = useBasicProductsFilterStore(selectFilter(EFilterKeys.PAGE_SIZE))

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
