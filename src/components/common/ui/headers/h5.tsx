import { FC, ReactNode } from 'react'

type PropsType = {
  className?: string
  children: ReactNode
}

export const H5: FC<PropsType> = ({ className, children }) => {
  return <h5 className={`text-2xl ${className}`}>{children}</h5>
}
