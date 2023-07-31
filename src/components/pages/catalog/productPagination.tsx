import { FC, useEffect, useState } from 'react'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { useChangeMultipleQueryParams } from 'hooks/queryParams/useChangeMultipleQueryParams'
import { useWindowSize } from 'hooks/useWindowSize'
import {
  selectFilter,
  selectSetFilter,
  useBasicProductsFilterStore,
} from 'store/useBasicProductsFilterStore'
import { Pagination } from 'widgets/pagination'

export const ProductPagination: FC = () => {
  const { width } = useWindowSize()
  const [currentPage, setCurrentPage] = useState(1)
  const { setQueryParams } = useChangeMultipleQueryParams(EFilterKeys.PAGE)
  const { data: products, refetch } = useGetAllBasicProducts()

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
    setCurrentPage(value)
    setQueryParams(`${value}`)
  }

  useEffect(() => {
    refetch().then()
  }, [pageSize, refetch])

  return products && +products.totalCount > +(pageSize as string) ? (
    <Pagination
      currentPage={currentPage}
      pageSize={pageSize ? +pageSize : 1}
      setCurrentPage={setCurrentPageHandler}
      totalItemsCount={products?.totalCount || 1}
    />
  ) : null
}
