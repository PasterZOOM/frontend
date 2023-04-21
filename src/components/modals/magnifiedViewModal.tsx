import { FC } from 'react'

import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ModalOverlay } from 'components/modals/modalOverlay'
import { ProductPhotoType } from 'types/productType'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  photos: ProductPhotoType[]
  activePhoto: ProductPhotoType
}

export const MagnifiedViewModal: FC<PropsType> = ({ closeModal, isOpen, photos, activePhoto }) => {
  const initSlide = photos.findIndex(photo => photo._id === activePhoto._id)

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative h-[95%] w-[95%] bg-white dark:bg-anthracite-gray">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 z-10 text-lg">
          закрыть
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
            <SwiperSlide key={photo._id} className="w-fit">
              <div className={`${photo.url} h-full w-full`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ModalOverlay>
  )
}
