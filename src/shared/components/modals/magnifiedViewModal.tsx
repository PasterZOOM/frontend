import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ModalOverlay } from 'shared/components/modals/modalOverlay'
import { EPhotoExtension, EPhotoSize } from 'shared/enums/photo'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  activePhoto: ProductPhotoType
  closeModal: () => void
  isOpen: boolean
  photos: ProductPhotoType[]
}

export const MagnifiedViewModal: FC<PropsType> = ({ closeModal, isOpen, photos, activePhoto }) => {
  const initSlide = photos.findIndex(photo => photo._id === activePhoto._id)
  const { t } = useTranslation()

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative h-[95%] w-[95%] bg-white dark:bg-anthracite-gray">
        <button className="absolute right-4 top-4 z-10 text-lg" type="button" onClick={closeModal}>
          {t('закрыть')}
        </button>
        <Swiper
          keyboard
          mousewheel
          navigation
          pagination
          className="mySwiper h-full w-full"
          initialSlide={initSlide}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        >
          {photos.map(photo => (
            <SwiperSlide key={photo._id} className="w-fit">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url(${activePhoto.path}${EPhotoSize.L}.${EPhotoExtension.WEBP})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ModalOverlay>
  )
}
