import { ComponentPropsWithoutRef, FC } from 'react'

import classnames from 'classnames'

import cls from './leatherColorButton.module.scss'

type PropsType = ComponentPropsWithoutRef<'button'> & {
  isActive: boolean
  photo: string
}

export const LeatherColorButton: FC<PropsType> = ({ isActive, onClick, photo }) => {
  return (
    <div
      className={classnames(
        cls.leatherColorButton,
        {
          [cls.isActive]: isActive,
        },
        `relative aspect-square h-8 before:bg-anthracite-gray dark:before:bg-white`
      )}
    >
      <button
        type="button"
        className={`relative h-full w-full rounded-full border border-anthracite-gray dark:border-white ${photo} ${
          // TODO: заменить бэкграунд на картинку
          isActive ? 'cursor-default' : ''
        }`}
        onClick={onClick}
      />
    </div>
  )
}
