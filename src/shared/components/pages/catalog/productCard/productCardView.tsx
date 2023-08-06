import { FC, useEffect, useState } from 'react'

import { MagnifiedViewModal } from 'shared/components/modals/magnifiedViewModal'
import { useModal } from 'shared/lib/hooks/useModal'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardView: FC<PropsType> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<ProductPhotoType>(photos[0])
  const [isHover, setIsHover] = useState(false)

  const { openModal, closeModal, isOpen } = useModal()

  const mouseMoveHandler = (photo: ProductPhotoType): void => {
    setActivePhoto(photo)
    setIsHover(true)
  }

  const leaveMouseHandler = (): void => {
    setActivePhoto(photos[0])
    setIsHover(false)
  } // ? TODO UI: нужно ли показывать первое поле, когда мыш покидает зону с фото

  useEffect(() => {
    setActivePhoto(photos[0])
  }, [photos])

  return (
    <div
      className={`flex aspect-square w-full justify-between ${activePhoto.url}`}
      role="button"
      tabIndex={0}
      onClick={openModal}
      onKeyDown={e => e.key === 'Enter' && openModal()}
    >
      {photos.map(photo => (
        <div
          key={photo._id}
          className="relative flex w-full cursor-zoom-in justify-center"
          onMouseLeave={leaveMouseHandler}
          onMouseMove={() => mouseMoveHandler(photo)}
        >
          <div
            className={`absolute bottom-1 h-1 w-11/12 rounded-full bg-white dark:bg-anthracite-gray ${
              isHover && photos.length > 1 ? '' : 'hidden'
            } ${activePhoto._id !== photo._id ? 'opacity-50' : ''}`}
          />
        </div>
      ))}
      <MagnifiedViewModal
        activePhoto={activePhoto}
        closeModal={closeModal}
        isOpen={isOpen}
        photos={photos}
      />
    </div>
  )
}
