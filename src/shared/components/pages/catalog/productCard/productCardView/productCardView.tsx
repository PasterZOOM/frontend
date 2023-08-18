import { FC, useEffect, useState } from 'react'

import classnames from 'classnames'

import cls from './productCardView.module.scss'

import { MagnifiedViewModal } from 'shared/components/modals/magnifiedViewModal'
import { EPhotoExtension, EPhotoSize } from 'shared/enums/photo'
import { useModal } from 'shared/lib/hooks/useModal'
import { ProductPhotoType } from 'shared/types/productType'
import { PhotoSlider } from 'shared/ui/photoSlider'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardView: FC<PropsType> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<ProductPhotoType>(photos[0])

  const { openModal, closeModal, isOpen } = useModal()

  useEffect(() => {
    setActivePhoto(photos[0])
  }, [photos])

  return (
    <div
      className={classnames(cls.productCardView)}
      role="button"
      tabIndex={0}
      style={{
        backgroundImage: `url(${activePhoto.path}${EPhotoSize.XS}.${EPhotoExtension.WEBP})`,
      }}
      onClick={openModal}
      onKeyDown={e => e.key === 'Enter' && openModal()}
    >
      <PhotoSlider<ProductPhotoType>
        activeItem={activePhoto}
        items={photos}
        setActiveItem={setActivePhoto}
      />
      <MagnifiedViewModal
        activePhoto={activePhoto}
        closeModal={closeModal}
        isOpen={isOpen}
        photos={photos}
      />
    </div>
  )
}
