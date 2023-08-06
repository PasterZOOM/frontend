import { FC, ReactNode } from 'react'

import { PropertyPreviewWrapper } from 'shared/components/common/wrappers/propertyPreviewWrapper'

type PropsType = {
  children: ReactNode
  className?: string
  title: string
}

export const PropertyInOneRow: FC<PropsType> = ({ children, title, className = '' }) => {
  return (
    <PropertyPreviewWrapper
      className={`flex items-end justify-between gap-10 ${className}`}
      title={title}
    >
      {children}
    </PropertyPreviewWrapper>
  )
}
