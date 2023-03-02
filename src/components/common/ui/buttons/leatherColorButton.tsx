import { FC } from 'react'

import { DefaultButtonPropsType } from '@/components/common/ui/buttons/defaultButtonType'

type PropsType = DefaultButtonPropsType & {
  isActive: boolean
  photo: string
}

export const LeatherColorButton: FC<PropsType> = ({ isActive, onClick, photo }) => {
  return (
    <div
      className={`relative aspect-square h-6 before:inset-0 before:transform before:rounded-full before:bg-anthracite-gray before:duration-300 hover:before:absolute hover:before:-inset-0.5 dark:before:bg-white ${
        isActive ? 'before:absolute before:-inset-0.5' : ''
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`relative h-full w-full rounded-full border border-anthracite-gray dark:border-white ${photo} ${
          // TODO: заменить бэграунды на картинки
          isActive ? 'cursor-default' : ''
        }`}
      />
    </div>
  )
}
