import { FC, useEffect, useState } from 'react'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/common/ui/buttons/button'
import { LeatherColorButton } from 'components/common/ui/buttons/leatherColorButton'
import { NoPhoto } from 'components/common/ui/noPhoto'
import { ProductCardPhoto } from 'components/pages/catalog/productCard/productCardPhoto'
import { ECost } from 'enums/cost'
import { BasicProductType } from 'features/basicProducts/api/types'
import { useGetPriceInCurrency } from 'hooks/useGetPriceInCurrency'
import { selectRate, useCurrencyRatesStore } from 'store/useCurrencyRatesStore'
import { selectCurrentCurrency, useUserSettings } from 'store/useUserSettings'
import { cutText } from 'utils/text/cutText'

type PropsType = {
  defCurrency?: ECost
  product: BasicProductType
}

export const ProductCard: FC<PropsType> = ({ defCurrency = ECost.USD, product }) => {
  const { t } = useTranslation('catalog')

  const [activeColor, setActiveColor] = useState(product.productColors[0]?._id ?? '')

  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const rate = useCurrencyRatesStore(selectRate(currentCurrency))

  const currentCurrencyPrice = useGetPriceInCurrency(
    product.cost,
    product.costCurrency,
    currentCurrency
  )
  const defaultCurrencyPrice = useGetPriceInCurrency(
    product.cost,
    product.costCurrency,
    defCurrency
  )

  useEffect(() => {
    setActiveColor(product.productColors[0]?._id ?? '')
  }, [product])

  return (
    <div>
      {product.photos?.[activeColor] ? (
        <ProductCardPhoto photos={product.photos[activeColor]} />
      ) : (
        <NoPhoto />
      )}

      <div className="mt-10">
        <Link href={`/products/${product.category}/${product._id}`}>
          <div className="mb-3 mt-4 text-custom-xl font-bold">{product.title}</div>
          <div className="my-3 font-light">{cutText(product.description)}</div>
        </Link>
        {product.productColors.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {product.productColors.map(color => (
              <LeatherColorButton
                key={color._id}
                isActive={color._id === activeColor}
                photo={color.photo}
                onClick={() => setActiveColor(color._id)}
              />
            ))}
          </div>
        )}
        <div className="mt-3 cursor-default">
          <div className="flex gap-2 pb-3 text-custom-lg font-light">
            <div>{currentCurrencyPrice.title}</div>
            {defCurrency !== currentCurrency && !!rate && (
              <div className="opacity-60">{defaultCurrencyPrice.title}</div>
            )}
            {!rate && (
              <div className="text-sm text-red-500">{t('Не удалось загрузить курсы валют')}</div>
            )}
          </div>
          <Link href={`/products/${product.category}/${product._id}`}>
            <Button>{t('more')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
