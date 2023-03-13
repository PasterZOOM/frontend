import { FC, ReactNode } from 'react'

type PropsType = {
  title: string
  children: ((name: string) => ReactNode) | ReactNode
  name: string
}

export const FieldWrapper: FC<PropsType> = ({ title, children, name = '' }) => {
  return (
    <div>
      <div>{title}</div>
      {typeof children === 'function' ? children(name) : children}
    </div>
  )
}
