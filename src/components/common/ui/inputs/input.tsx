import { ComponentPropsWithoutRef, FC } from 'react'

type PropsType = ComponentPropsWithoutRef<'input'>
export const Input: FC<PropsType> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      type="text"
      className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`}
    />
  )
}
