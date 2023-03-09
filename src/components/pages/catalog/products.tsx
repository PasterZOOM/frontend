import { FC, useEffect } from 'react'

import { ProductCard } from './productCard/productCard'

import ActiveFilters from '@/components/pages/catalog/filters/activeFilters'
import { useServiceStore } from '@/store/servises'
import { useFilterStore } from '@/store/useFilterStore'
import { useProductStore } from '@/store/useProductStore'

type PropsType = {
  className?: string
}
const Products: FC<PropsType> = ({ className = '' }) => {
  const productsService = useServiceStore(state => state.productsService)

  const filters = useFilterStore(state => state.filters)

  const products = useProductStore(store => store.products)
  const setProducts = useProductStore(store => store.setProducts)

  useEffect(() => {
    productsService.getProducts(filters).then(res => setProducts(res))
  }, [filters])

  return (
    <div className={`grid w-full grid-cols-catalog-products gap-4 md:gap-6 lg:gap-8 ${className}`}>
      <ActiveFilters className="col-span-full" />
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Products
