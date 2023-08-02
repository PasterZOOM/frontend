import { FC } from 'react'

import { DefaultSelectPropsType } from 'shared/ui/selects/defaultSelectType'

type PropsType = DefaultSelectPropsType

export const DefaultSelect: FC<PropsType> = ({ children, className, ...props }) => {
  return (
    <select className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`} {...props}>
      {children}
    </select>
  )
}
