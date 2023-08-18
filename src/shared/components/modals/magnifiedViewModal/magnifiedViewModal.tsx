import { FC, memo } from 'react'

import classnames from 'classnames'
import { useTranslation } from 'next-i18next'
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules'
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
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        >
          {photos.map(photo => (
            <SwiperSlide
              key={photo._id}
              className={cls.slide}
              style={{
                backgroundImage: `url(${photo.path}${EPhotoSize.L}.${EPhotoExtension.WEBP})`,
              }}
            />
          ))}
        </Swiper>
      </div>
    </ModalOverlay>
  )
}

const Memo = memo(MagnifiedViewModal)

export { Memo as MagnifiedViewModal }
