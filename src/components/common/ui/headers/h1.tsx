import { FC, ReactNode } from 'react'

type PropsType = {
  className?: string
  children: ReactNode
}

export const H1: FC<PropsType> = ({ className, children }) => {
  return <h1 className={`text-6xl ${className}`}>{children}</h1>
}
