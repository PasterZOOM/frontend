import { FC, memo } from 'react'

import classnames from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Keyboard, Mousewheel, Navigation, Pagination, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import cls from './magnifiedViewModal.module.scss'

import { ModalOverlay } from 'shared/components/modals/modalOverlay'
import { EPhotoExtension, EPhotoSize } from 'shared/enums/photo'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  activePhoto: ProductPhotoType
  className?: string
  closeModal: () => void
  isOpen: boolean
  photos: ProductPhotoType[]
}

const MagnifiedViewModal: FC<PropsType> = ({
  className,
  closeModal,
  photos,
  activePhoto,
  isOpen,
}) => {
  const initSlide = photos.findIndex(photo => photo._id === activePhoto._id)

  const { t } = useTranslation()

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className={classnames(cls.magnifiedViewModal, className)}>
        <button className={cls.closeButton} type="button" onClick={closeModal}>
          {t('закрыть')}
        </button>
        <Swiper
          keyboard
          mousewheel
          navigation
          pagination
          className={cls.mySwiper}
          initialSlide={initSlide}
          modules={[Zoom, Navigation, Pagination, Mousewheel, Keyboard]}
          zoom={{
            zoomedSlideClass: cls.swiperSlideZoomed,
            containerClass: cls.swiperZoomContainer,
          }}
        >
          {photos.map(photo => (
            <SwiperSlide key={photo._id} className={cls.slide}>
              <div className={cls.swiperZoomContainer}>
                <Image
                  fill
                  alt={activePhoto.path}
                  className="h-full w-full object-cover"
                  quality={100}
                  src={`${photo.path}${EPhotoSize.XL}.${EPhotoExtension.WEBP}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ModalOverlay>
  )
}

const Memo = memo(MagnifiedViewModal)

export { Memo as MagnifiedViewModal }
