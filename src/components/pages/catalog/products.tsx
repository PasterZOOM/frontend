import { FC } from 'react'

import { useQuery } from 'react-query'

import { ProductCard } from './productCard/productCard'

import ActiveFilters from '@/components/pages/catalog/filters/activeFilters'
import { useServiceStore } from '@/store/servises'
import { useFilterStore } from '@/store/useFilterStore'

type PropsType = {
  className?: string
}
const Products: FC<PropsType> = ({ className = '' }) => {
  const productsService = useServiceStore(state => state.productsService)

  const filters = useFilterStore(state => state.filters)

  const { data: products } = useQuery(['getAllFactories', filters], () =>
    productsService.getProducts(filters)
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
