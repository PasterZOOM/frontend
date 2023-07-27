import { ComponentPropsWithoutRef, FC } from 'react'

type PropsType = ComponentPropsWithoutRef<'button'> & {
  isActive: boolean
  photo: string
}

export const LeatherColorButton: FC<PropsType> = ({ isActive, onClick, photo }) => {
  return (
    <div
      className={`relative aspect-square h-6 before:rounded-full before:bg-anthracite-gray hover:before:absolute hover:before:-inset-0.5 dark:before:bg-white ${
        isActive ? 'before:absolute before:-inset-0.5' : 'before:hover:animate-hover-button'
      }`}
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
