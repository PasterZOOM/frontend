import { ReactElement } from 'react'

import classnames from 'classnames'

import cls from './photoSlide.module.scss'

import { Thumb } from '@/shared/ui/thumb'

type PropsType<T extends { _id: string }> = {
  activeItem: T
  className?: string
  item: T
  setActiveItem: (activeItem: T) => void
  totalItems: number
}

export const PhotoSlide = <T extends { _id: string }>({
  className,
  item,
  setActiveItem,
  activeItem,
  totalItems,
}: PropsType<T>): ReactElement => {
  const mouseMoveHandler = (newActiveItem: T): void => {
    setActiveItem(newActiveItem)
  }

  return (
    <div
      className={classnames(cls.photoSlide, className)}
      onMouseMove={() => mouseMoveHandler(item)}
    >
      {totalItems > 1 && <Thumb isActive={activeItem._id === item._id} />}
    </div>
  )
}
