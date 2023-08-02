import { ReactElement, ReactNode } from 'react'

type HeaderComponent = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type PropsType<T extends HeaderComponent> = {
  as: T
  children: ReactNode
  className?: string
}

const textSize = {
  h1: 'text-6xl',
  h2: 'text-5xl',
  h3: 'text-4xl',
  h4: 'text-3xl',
  h5: 'text-2xl',
  h6: 'text-xl',
}

export const TypographyHeader = <T extends HeaderComponent>(props: PropsType<T>): ReactElement => {
  const { className, children, as: Component = 'h1' } = props

  return <Component className={`${textSize[Component]} ${className}`}>{children}</Component>
}
