import { FC } from 'react'

import { ProductCard } from './productCard/productCard'

import { products } from '@/mocks/products'

const Products: FC = () => {
  return (
    <div className="grid w-full grid-cols-catalog-products">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Products
