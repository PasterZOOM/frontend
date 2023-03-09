import { FC, ReactNode } from 'react'

type PropsType = {
  className?: string
  children: ReactNode
}

export const H2: FC<PropsType> = ({ className, children }) => {
  return <h2 className={`text-5xl ${className}`}>{children}</h2>
}
