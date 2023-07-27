import { FC, ReactNode } from 'react'

type PropsType = {
  children: ReactNode
  className?: string
  title: string
}

export const PropertyPreviewWrapper: FC<PropsType> = ({ children, title, className }) => {
  return (
    <div
      className={`border-b border-anthracite-gray border-opacity-20 dark:border-white ${
        className || ''
      }`}
    >
      <div>{title}</div>
      <div>{children}</div>
    </div>
  )
}
