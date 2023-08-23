import { FC } from 'react'

import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import ActiveFilters from 'shared/components/pages/catalog/filters/activeFilters'
import { ProductCard } from 'shared/components/pages/catalog/productCard/productCard/productCard'
import { Loader } from 'widgets/loader'

type PropsType = {
  className?: string
}

const Products: FC<PropsType> = ({ className = '' }) => {
  const {
    data: products,
    isLoading,
    isRefetching,
  } = useGetAllBasicProducts({ keepPreviousData: true })

  if (!products) {
    return null
  }

  return (
    <div
      className={`grid w-full grid-cols-catalog-products gap-4 md:gap-6 xl:auto-rows-max xl:gap-8 ${className}`}
    >
      <ActiveFilters className="col-span-full" />

      {isLoading || isRefetching ? (
        <Loader className="col-span-full h-96 w-full" />
      ) : (
        products.data.map(product => <ProductCard key={product._id} product={product} />)
      )}
    </div>
  )
}

export default Products
