import { ReactElement } from 'react'

import classnames from 'classnames'

import { PhotoSlide } from '../photoSlide/photoSlide'

import cls from './photoSlider.module.scss'

type PropsType<T extends { _id: string }> = {
  activeItem: T
  className?: string
  isHover: boolean
  items: T[]
  setActiveItem: (activeItem: T) => void
}

export const PhotoSlider = <T extends { _id: string }>({
  className,
  items,
  activeItem,
  setActiveItem,
  isHover,
}: PropsType<T>): ReactElement => {
  return (
    <div className={classnames(cls.photoSlider, className)}>
      {isHover &&
        items.map(item => (
          <PhotoSlide<T>
            key={item._id}
            activeItem={activeItem}
            item={item}
            setActiveItem={setActiveItem}
            totalItems={items.length}
          />
        ))}
    </div>
  )
}
