import { FC } from 'react'

import { useQuery } from 'react-query'

import { ProductCard } from './productCard/productCard'

import ActiveFilters from '@/components/pages/catalog/filters/activeFilters'
import { queryKey } from '@/enums/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'
import { useBasicProductsFilterStore } from '@/store/useBasicProductsFilterStore'

type PropsType = {
  className?: string
}
const Products: FC<PropsType> = ({ className = '' }) => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const filters = useBasicProductsFilterStore(state => state.filters)

  const { data: products } = useQuery([queryKey.GET_ALL_BASIC_PRODUCTS, filters], () =>
    basicProductsService.getAll(filters)
  )

  return (
    <div
      className={`grid w-full grid-cols-catalog-products gap-4 md:gap-6 xl:auto-rows-max xl:gap-8 ${className}`}
    >
      <ActiveFilters className="col-span-full" />
      {products && products.map(product => <ProductCard key={product._id} product={product} />)}
    </div>
  )
}

export default Products
