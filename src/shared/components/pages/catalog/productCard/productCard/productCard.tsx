import { FC, useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { BasicProductType } from 'features/basicProducts/api/types'
import cls from 'shared/components/pages/catalog/productCard/productCard/productCard.module.scss'
import { ProductCardPhoto } from 'shared/components/pages/catalog/productCard/productCardPhoto'
import { DEFAULT_PRODUCT_CURRENCY } from 'shared/constants/currancy/defaultProductCurrency'
import { CurrencySign } from 'shared/enums/currencySign'
import { useGetPriceInCurrency } from 'shared/lib/hooks/useGetPriceInCurrency'
import { ProductPhotoType } from 'shared/types/productType'
import { Button } from 'shared/ui/buttons/button'
import { LeatherColorButton } from 'shared/ui/buttons/leatherColorButton'
import { NoPhoto } from 'shared/ui/noPhoto'
import { selectRate, useCurrencyRatesStore } from 'store/useCurrencyRatesStore'
import { selectCurrentCurrency, useUserSettings } from 'store/useUserSettings'

type PropsType = {
  product: BasicProductType
}

const defaultActivePhoto = {
  _id: '',
  path: '',
}

export const ProductCard: FC<PropsType> = ({ product }) => {
  const { t } = useTranslation('catalog')

  const [activeColor, setActiveColor] = useState(product.productColors[0]?._id ?? '')
  const [activePhoto, setActivePhoto] = useState<ProductPhotoType>(
    product.photos?.[activeColor][0] || defaultActivePhoto
  )

  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const rate = useCurrencyRatesStore(selectRate(currentCurrency))

  const currentCurrencyPrice = useGetPriceInCurrency(product.cost)

  useEffect(() => {
    setActiveColor(product.productColors[0]?._id ?? '')
  }, [product])

  const activeColorsPhotos = useMemo(
    () => product.photos?.[activeColor],
    [activeColor, product.photos]
  )

  const chaneActiveColor = (id: string): void => {
    setActiveColor(id)
    setActivePhoto(product.photos?.[id][0] || defaultActivePhoto)
  }

  return (
    <div className={`${cls.card}`}>
      <div className={`${cls.photo}`}>
        {activeColorsPhotos ? (
          <ProductCardPhoto
            activePhoto={activePhoto}
            photos={activeColorsPhotos}
            setActivePhoto={setActivePhoto}
          />
        ) : (
          <NoPhoto />
        )}
      </div>

      <Link
        className={`${cls.info} row-auto`}
        href={`/products/${product.category}/${product._id}`}
      >
        <div className="mb-3 mt-4 text-custom-xl font-bold">{product.title}</div>
        {product.description && (
          <div className="my-3 line-clamp-2 font-light">{product.description}</div>
        )}
      </Link>

      <div className={`${cls.buttons} row-span-1 self-end`}>
        {product.productColors.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {product.productColors.map(color => {
              return (
                <LeatherColorButton
                  key={color._id}
                  isActive={color._id === activeColor}
                  photo={color.photo}
                  onClick={() => chaneActiveColor(color._id)}
                />
              )
            })}
          </div>
        )}

        <div className="mt-3 cursor-default">
          <div className="flex gap-2 pb-3 text-custom-lg font-light">
            <div>{currentCurrencyPrice.title}</div>
            {DEFAULT_PRODUCT_CURRENCY !== currentCurrency && !!rate && (
              <div className="opacity-60">{`${CurrencySign[DEFAULT_PRODUCT_CURRENCY]}${product.cost}`}</div>
            )}
            {!rate && (
              <div className="text-sm text-red-500">{t('Failed to load exchange rates')}</div>
            )}
          </div>
          <Button as="a" href={`/products/${product.category}/${product._id}`}>
            {t('more')}
          </Button>
        </div>
      </div>
    </div>
  )
}
