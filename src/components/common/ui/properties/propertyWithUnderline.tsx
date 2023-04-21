import { FC, ReactNode } from 'react'

import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'

type PropsType = {
  children: ReactNode
  title: string
  childrenClassName?: string
}

export const PropertyWithUnderline: FC<PropsType> = ({ children, title, childrenClassName }) => {
  return (
    <PropertyPreviewWrapper
      title={title}
      wrapperClassName="flex items-end justify-between gap-10 border-b border-anthracite-gray border-opacity-20 dark:border-white"
      childrenClassName={childrenClassName}
    >
      {children}
    </PropertyPreviewWrapper>
  )
}
