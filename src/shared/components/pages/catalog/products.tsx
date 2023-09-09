import { FC } from 'react'

import ActiveFilters from 'shared/components/pages/catalog/filters/activeFilters'
import { ProductsItems } from 'shared/components/pages/catalog/productsItems'

type PropsType = {
  className?: string
}

const Products: FC<PropsType> = ({ className = '' }) => {
  return (
    <div
      className={`grid w-full grid-cols-catalog-products gap-4 md:gap-6 xl:auto-rows-max xl:gap-8 ${className}`}
    >
      <ActiveFilters className="col-span-full" />
      <ProductsItems className="col-span-full" />
    </div>
  )
}

export default Products
