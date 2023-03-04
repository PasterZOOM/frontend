import { FC, useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/common/ui/buttons/button'
import { LeatherColorButton } from '@/components/common/ui/buttons/leatherColorButton'
import { ProductCardView } from '@/components/pages/catalog/productCard/productCardView'
import { ProductCardViewMobile } from '@/components/pages/catalog/productCard/productCardViewMobile'
import { DESKTOP } from '@/constants/sizes/screenSizes'
import { ECost } from '@/enums/cost'
import { useGetPriceInCurrentCurrency } from '@/hooks/useGetPriceInCurrentCurrency'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useGetPriceInCurrency } from '@/store/useGetPriceInCurrency'
import { useUserSettings } from '@/store/useUserSettings'
import { ProductType } from '@/types/productType'
import { getProductColors } from '@/utils/getProductColors'

type PropsType = {
  product: ProductType
  defPrice?: ECost
}

export const ProductCard: FC<PropsType> = ({ defPrice = ECost.USD, product }) => {
  const { width } = useWindowSize()
  const [activeColor, setActiveColor] = useState(Object.keys(product.photos)[0])

  const currentCurrency = useUserSettings(state => state.currentCurrency)

  const priceInCurrentCurrency = useGetPriceInCurrentCurrency(product.cost, product.costCurrency)
  const priceInDefaultCurrency = useGetPriceInCurrency(product.cost, product.costCurrency, defPrice)

  const productColors = getProductColors(Object.keys(product.photos), product.leather)

  return (
    <div>
      {width > DESKTOP ? (
        <ProductCardView photos={product.photos[activeColor]} />
      ) : (
        <ProductCardViewMobile photos={product.photos[activeColor]} />
      )}
      <div className="mt-10">
        <Link href={`/products/${product.category}`}>
          <div className="mt-4 mb-3 text-custom-xl font-bold">{product.title}</div>
          <div className="my-3 font-light">{product.description}</div>
        </Link>
        <div className={`flex flex-wrap gap-3 ${productColors.length === 1 ? 'hidden' : ''}`}>
          {productColors.map(color => (
            <LeatherColorButton
              key={color._id}
              photo={color.photo}
              isActive={color._id === activeColor}
              onClick={() => setActiveColor(color.code)}
            />
          ))}
        </div>
        <div className="mt-3">
          <div className="flex gap-2 pb-3 text-custom-lg font-light">
            <div>{priceInCurrentCurrency}</div>
            {defPrice !== currentCurrency && (
              <div className="opacity-60">{priceInDefaultCurrency}</div>
            )}
          </div>
          <Button>Подробнее</Button>
        </div>
      </div>
    </div>
  )
}
