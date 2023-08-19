import { FC, KeyboardEventHandler, useRef, useState } from 'react'

import classnames from 'classnames'
import Image from 'next/image'

import cls from './productCardView.module.scss'

import { MagnifiedViewModal } from 'shared/components/modals/magnifiedViewModal'
import { EPhotoExtension, EPhotoSize } from 'shared/enums/photo'
import { useModal } from 'shared/lib/hooks/useModal'
import { ProductPhotoType } from 'shared/types/productType'
import { PhotoSlider } from 'shared/ui/photoSlider'

type PropsType = {
  activePhoto: ProductPhotoType
  photos: ProductPhotoType[]
  setActivePhoto: (activeItem: ProductPhotoType) => void
}

export const ProductCardView: FC<PropsType> = ({ photos, activePhoto, setActivePhoto }) => {
  const [isHover, setIsHover] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const { openModal, closeModal, isOpen } = useModal()

  const onFocusHandler = (): void => {
    setIsHover(true)
  }

  const onBlurHandler = (): void => {
    if (ref.current !== document.activeElement) {
      setIsHover(false)
    }
  }

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter') {
      openModal()
    }
    if (e.key === 'ArrowRight') {
      const index = photos.findIndex(value => value._id === activePhoto._id)

      if (index + 1 <= photos.length - 1) {
        setActivePhoto(photos[index + 1])
      }
    }
    if (e.key === 'ArrowLeft') {
      const index = photos.findIndex(value => value._id === activePhoto._id)

      if (index > 0) {
        setActivePhoto(photos[index - 1])
      }
    }
  }

  return (
    <div
      ref={ref}
      className={classnames(cls.productCardView)}
      role="button"
      tabIndex={0}
      onBlur={onBlurHandler}
      onClick={openModal}
      onFocus={onFocusHandler}
      onKeyDown={onKeyDownHandler}
      onMouseLeave={onBlurHandler}
      onMouseMove={onFocusHandler}
    >
      <Image
        fill
        alt={activePhoto.path}
        className="h-full w-full object-cover"
        quality={100}
        src={`${activePhoto.path}${EPhotoSize.XS}.${EPhotoExtension.WEBP}`}
      />
      <PhotoSlider<ProductPhotoType>
        activeItem={activePhoto}
        className="relative"
        isHover={isHover}
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
