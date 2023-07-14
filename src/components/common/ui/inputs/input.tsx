import { ComponentPropsWithoutRef, FC } from 'react'

type PropsType = ComponentPropsWithoutRef<'input'>
export const Input: FC<PropsType> = ({ className, type = 'text', ...props }) => {
  return (
    <input
      type={type}
      {...props}
      className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`}
    />
  )
}
