import { FC, useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/common/ui/buttons/button'
import { LeatherColorButton } from '@/components/common/ui/buttons/leatherColorButton'
import { NoPhoto } from '@/components/common/ui/noPhoto'
import { ProductCardPhoto } from '@/components/pages/catalog/productCard/productCardPhoto'
import { ECost } from '@/enums/cost'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useGetAllLeatherColors } from '@/features/leatherColors/hooks/useGetAllLeatherColors'
import { useGetPriceInCurrency } from '@/hooks/useGetPriceInCurrency'
import { useGetPriceInCurrentCurrency } from '@/hooks/useGetPriceInCurrentCurrency'
import { selectCurrentCurrency, useUserSettings } from '@/store/useUserSettings'
import { cutText } from '@/utils/text/cutText'

type PropsType = {
  product: BasicProductType
  defPrice?: ECost
}

export const ProductCard: FC<PropsType> = ({ defPrice = ECost.USD, product }) => {
  const [activeColor, setActiveColor] = useState(Object.keys(product.photos)[0] || '')

  const currentCurrency = useUserSettings(selectCurrentCurrency)

  const priceInCurrentCurrency = useGetPriceInCurrentCurrency(product.cost, product.costCurrency)
  const priceInDefaultCurrency = useGetPriceInCurrency(product.cost, product.costCurrency, defPrice)

  const { data: productColors } = useGetAllLeatherColors(Object.keys(product.photos), {
    enabled: !!activeColor,
  })

  return (
    <div>
      {product.photos[activeColor] ? (
        <ProductCardPhoto photos={product.photos[activeColor]} />
      ) : (
        <NoPhoto />
      )}

      <div className="mt-10">
        <Link href={`/products/${product.category}/${product._id}`}>
          <div className="mt-4 mb-3 text-custom-xl font-bold">{product.title}</div>
          <div className="my-3 font-light">{cutText(product.description)}</div>
        </Link>
        {productColors && (
          <div className={`flex flex-wrap gap-3 ${productColors.length === 1 ? 'hidden' : ''}`}>
            {productColors.map(color => (
              <LeatherColorButton
                key={color._id}
                photo={color.photo}
                isActive={color._id === activeColor}
                onClick={() => setActiveColor(color._id)}
              />
            ))}
          </div>
        )}
        <div className="mt-3 cursor-default">
          <div className="flex gap-2 pb-3 text-custom-lg font-light">
            {priceInCurrentCurrency && <div>{priceInCurrentCurrency}</div>}
            {(defPrice !== currentCurrency || !priceInCurrentCurrency) && (
              <div className="opacity-60">{priceInDefaultCurrency}</div>
            )}
            {!priceInCurrentCurrency && (
              <div className="text-sm text-red-500">Не удалось загрузить курсы валют</div>
            )}
          </div>
          <Button>Подробнее</Button>
        </div>
      </div>
    </div>
  )
}
