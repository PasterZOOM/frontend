import { FC, memo } from 'react'

import { ProductCardView } from './productCardView'
import { ProductCardViewMobile } from './productCardViewMobile'

import { useDevice } from 'shared/lib/hooks/windowSize/useDevise'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  activePhoto: ProductPhotoType
  photos: ProductPhotoType[]
  setActivePhoto: (activeItem: ProductPhotoType) => void
}

const ProductCardPhoto: FC<PropsType> = ({ photos, activePhoto, setActivePhoto }) => {
  const { widerLaptopS } = useDevice()

  return widerLaptopS ? (
    <ProductCardView activePhoto={activePhoto} photos={photos} setActivePhoto={setActivePhoto} />
  ) : (
    <ProductCardViewMobile photos={photos} />
  )
}

const Memo = memo(ProductCardPhoto)

export { Memo as ProductCardPhoto }
