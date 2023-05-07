import { FC, useEffect } from 'react'

import { ProductCard } from './productCard/productCard'

import ActiveFilters from 'components/pages/catalog/filters/activeFilters'
import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { useLocale } from 'hooks/useLocale'

type PropsType = {
  className?: string
}

const Products: FC<PropsType> = ({ className = '' }) => {
  const locale = useLocale()
  const { data: products, refetch } = useGetAllBasicProducts({ keepPreviousData: true })

  useEffect(() => {
    refetch().then()
  }, [locale])

  if (!products) {
    return null
  }

  return (
    <div
      className={`grid w-full grid-cols-catalog-products gap-4 md:gap-6 xl:auto-rows-max xl:gap-8 ${className}`}
    >
      <ActiveFilters className="col-span-full" />
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Products
