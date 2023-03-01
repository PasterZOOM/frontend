import { FC } from 'react'

import { v1 } from 'uuid'

import { ProductCard } from '@/components/pages/catalog/productCard'
import { ECost } from '@/enums/cost'
import { EPunchPitch } from '@/enums/materials'
import { EProductCategory, EProductType } from '@/enums/product'
import { ProductType } from '@/types/productType'

const products: ProductType[] = [
  {
    _id: v1(),
    photo: '',
    title: 'Бифолд из кожи Buttero',
    description: 'Компактный склодной кошелек с монетницей',
    type: EProductType.CARD_HOLDER,
    cost: 60,
    costCurrency: ECost.USD,
    category: [EProductCategory.FOR_CASH, EProductCategory.FOR_CARDS],
    comment: 'Комментарий',
    punchPitch: EPunchPitch.LARGE,
    size: '12x9x2',
    leather: 'buttero',
  },
  {
    _id: v1(),
    photo: '',
    title: 'Бифолд из кожи Buttero',
    description: 'Компактный склодной кошелек с монетницей',
    type: EProductType.CARD_HOLDER,
    cost: 169,
    costCurrency: ECost.BYN,
    category: [EProductCategory.FOR_CASH, EProductCategory.FOR_CARDS],
    comment: 'Комментарий',
    punchPitch: EPunchPitch.LARGE,
    size: '12x9x2',
    leather: 'buttero',
  },
  {
    _id: v1(),
    photo: '',
    title: 'Бифолд из кожи Buttero',
    description: 'Компактный склодной кошелек с монетницей',
    type: EProductType.CARD_HOLDER,
    cost: 4500,
    costCurrency: ECost.RUB,
    category: [EProductCategory.FOR_CASH, EProductCategory.FOR_CARDS],
    comment: 'Комментарий',
    punchPitch: EPunchPitch.LARGE,
    size: '12x9x2',
    leather: 'buttero',
  },
]
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
