import { FC } from 'react'

import { ProductCard } from './productCard/productCard'

import { products } from '@/mocks/products'

type PropsType = {
  className?: string
}
const Products: FC<PropsType> = ({ className = '' }) => {
  return (
    <div className={`grid w-full grid-cols-catalog-products gap-4 md:gap-6 lg:gap-8 ${className}`}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Products
