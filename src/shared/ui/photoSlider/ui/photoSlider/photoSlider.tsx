import { ReactElement, useState } from 'react'

import classnames from 'classnames'

import { PhotoSlide } from '../photoSlide/photoSlide'

import cls from './photoSlider.module.scss'

type PropsType<T extends { _id: string }> = {
  activeItem: T
  className?: string
  items: T[]
  setActiveItem: (activeItem: T) => void
}

export const PhotoSlider = <T extends { _id: string }>({
  className,
  items,
  activeItem,
  setActiveItem,
}: PropsType<T>): ReactElement => {
  const [isHover, setIsHover] = useState(false)
  const mouseMoveHandler = (): void => {
    setIsHover(true)
  }

  const leaveMouseHandler = (): void => {
    setIsHover(false)
  }

  return (
    <div
      className={classnames(cls.photoSlider, className)}
      onMouseLeave={leaveMouseHandler}
      onMouseMove={mouseMoveHandler}
    >
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
