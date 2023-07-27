import { FC, ReactNode } from 'react'

import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'

type PropsType = {
  children: ReactNode
  className?: string
  form: ReactNode
  title: string
}

export const CreateFormAndListWrapper: FC<PropsType> = ({ title, form, children, className }) => {
  return (
    <div className={className || ''}>
      {form}
      <TypographyHeader as="h5" className="mb-2 mt-4 font-bold">
        {title}
      </TypographyHeader>
      <div className="ml-4">{children}</div>
    </div>
  )
}
