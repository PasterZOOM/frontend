import { FC, ReactNode } from 'react'

type PropsType = {
  children: ReactNode
  title: string
  wrapperClassName?: string
  childrenClassName?: string
}

export const PropertyPreviewWrapper: FC<PropsType> = ({
  children,
  title,
  wrapperClassName,
  childrenClassName,
}) => {
  return (
    <div
      className={`border-b border-anthracite-gray border-opacity-20 dark:border-white ${
        wrapperClassName || ''
      }`}
    >
      <div>{title}</div>
      <div className={childrenClassName}>{children}</div>
    </div>
  )
}
