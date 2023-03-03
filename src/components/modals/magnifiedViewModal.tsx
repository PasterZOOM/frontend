import { FC } from 'react'

import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ModalOverlay } from './overlay'

import { ProductPhotoType } from '@/types/productType'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  photos: ProductPhotoType[]
  activePhoto: ProductPhotoType
}

export const MagnifiedViewModal: FC<PropsType> = ({ closeModal, isOpen, photos, activePhoto }) => {
  const initSlide = photos.findIndex(photo => photo.id === activePhoto.id)

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative h-[45rem] w-[64rem] border-2 border-anthracite-gray bg-white dark:border-white dark:bg-anthracite-gray">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 z-10 text-lg">
          close
        </button>
        <Swiper
          initialSlide={initSlide}
          navigation
          pagination
          mousewheel
          keyboard
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper h-full w-full"
        >
          {photos.map(photo => (
            <SwiperSlide key={photo.id} className="w-fit">
              <div className={`${photo.url} h-full w-full`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ModalOverlay>
  )
}
