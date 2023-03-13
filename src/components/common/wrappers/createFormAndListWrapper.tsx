import { FC, ReactNode } from 'react'

import { H5 } from '@/components/common/ui/headers/h5'

type PropsType = {
  title: string
  form: ReactNode
  children: ReactNode
  className?: string
}

export const CreateFormAndListWrapper: FC<PropsType> = ({ title, form, children, className }) => {
  return (
    <div className={`${className || ''}`}>
      {form}
      <H5 className="mb-2 mt-4 font-bold">{title}</H5>
      <div className="ml-4">{children}</div>
    </div>
  )
}
