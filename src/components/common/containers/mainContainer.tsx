import { FC, ReactNode } from 'react'

type PropsType = {
  children: ReactNode
  className?: string
}

export const MainContainer: FC<PropsType> = ({ children, className }) => {
  return (
    <div className={`mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 2xl:px-4 ${className || ''}`}>
      {children}
    </div>
  )
}
