import { FC } from 'react'

import Products from '@/components/pages/catalog/products'

const Catalog: FC = () => {
  return (
    <div className="flex gap-2">
      <div className="max-w-lg">filters</div>
      <Products />
    </div>
  )
}

export default Catalog
