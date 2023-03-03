import { FC, useEffect, useState } from 'react'

import { MagnifiedViewModal } from '@/components/modals/magnifiedViewModal'
import { useModal } from '@/hooks/useModal'
import { ProductPhotoType } from '@/types/productType'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardView: FC<PropsType> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<ProductPhotoType>(photos[0])
  const [isHover, setIsHover] = useState(false)

  const { open, close, isOpen } = useModal()

  const mouseMoveHandler = (photo: ProductPhotoType): void => {
    setActivePhoto(photo)
    setIsHover(true)
  }

  const leaveMouseHandler = (): void => {
    setActivePhoto(photos[0])
    setIsHover(false)
  }

  useEffect(() => {
    setActivePhoto(photos[0])
  }, [photos])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={e => e.key === 'Enter' && open()}
      className={`flex aspect-square w-full justify-between ${activePhoto.url}`}
    >
      {photos.map(photo => (
        <div
          key={photo.id}
          onMouseMove={() => mouseMoveHandler(photo)}
          onMouseLeave={leaveMouseHandler}
          className="relative flex w-full cursor-zoom-in justify-center"
        >
          <div
            className={`absolute bottom-1 h-1 w-11/12 rounded-full bg-white dark:bg-anthracite-gray ${
              isHover ? '' : 'hidden'
            } ${activePhoto.id !== photo.id ? 'opacity-50' : ''}`}
          />
        </div>
      ))}
      <MagnifiedViewModal
        closeModal={close}
        isOpen={isOpen}
        photos={photos}
        activePhoto={activePhoto}
      />
    </div>
  )
}
