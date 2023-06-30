import { FC, ReactNode } from 'react'

import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'

type PropsType = {
  children: ReactNode
  title: string
  className?: string
}

export const PropertyInOneRow: FC<PropsType> = ({ children, title, className = '' }) => {
  return (
    <PropertyPreviewWrapper
      title={title}
      className={`flex items-end justify-between gap-10 ${className}`}
    >
      {children}
    </PropertyPreviewWrapper>
  )
}
