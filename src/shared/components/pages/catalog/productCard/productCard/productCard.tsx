import { FC, useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { BasicProductType } from 'features/basicProducts/api/types'
import cls from 'shared/components/pages/catalog/productCard/productCard/productCard.module.scss'
import { ProductCardPhoto } from 'shared/components/pages/catalog/productCard/productCardPhoto'
import { ProductPhotoType } from 'shared/types/productType'
import { Button } from 'shared/ui/buttons/button'
import { NoPhoto } from 'shared/ui/noPhoto'
import { Price } from 'shared/ui/price/price'
import { ProductColorsButtons } from 'widgets/productColorsButtons'

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
  const href = `/products/${product.category}/${product._id}?active_color=${activeColor}`

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

      <Link className={`${cls.info} row-auto`} href={href}>
        <div className="mb-3 mt-4 text-custom-xl font-bold">{product.title}</div>
        {product.description && (
          <div className="my-3 line-clamp-2 font-light">{product.description}</div>
        )}
      </Link>

      <div className={`${cls.buttons} row-span-1 self-end`}>
        <ProductColorsButtons
          activeColor={activeColor}
          chaneActiveColor={chaneActiveColor}
          colors={product.productColors}
        />

        <div className="mt-3 cursor-default">
          <Price className="text-custom-lg" cost={product.cost} />
          <Button as="a" href={href}>
            {t('more')}
          </Button>
        </div>
      </div>
    </div>
  )
}
