import { FC, memo } from 'react'

import { ProductCardView } from './productCardView'
import { ProductCardViewMobile } from './productCardViewMobile'

import { DESKTOP } from 'shared/constants/sizes/screenSizes'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  activePhoto: ProductPhotoType
  photos: ProductPhotoType[]
  setActivePhoto: (activeItem: ProductPhotoType) => void
}

const ProductCardPhoto: FC<PropsType> = ({ photos, activePhoto, setActivePhoto }) => {
  const { width } = useWindowSize()

  return width > DESKTOP ? (
    <ProductCardView activePhoto={activePhoto} photos={photos} setActivePhoto={setActivePhoto} />
  ) : (
    <ProductCardViewMobile photos={photos} />
  )
}

const Memo = memo(ProductCardPhoto)

export { Memo as ProductCardPhoto }
