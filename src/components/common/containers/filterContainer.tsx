import { FC, ReactNode, useEffect } from 'react'

import { DESKTOP } from '@/constants/sizes/screenSizes'
import { useWindowSize } from '@/hooks/useWindowSize'

interface FilterContainerProps {
  children: ReactNode
  className?: string
  open: boolean
  setOpen: (value: boolean) => void
}

const FilterContainer: FC<FilterContainerProps> = ({ children, className = '', open, setOpen }) => {
  const { width } = useWindowSize()

  useEffect(() => {
    if (width > DESKTOP) setOpen(false)
  }, [width])

  return (
    <div
      className={`fixed left-0 right-0 z-10 bg-white transition-all duration-300 dark:bg-anthracite-gray xl:static
         xl:z-auto ${
           open
             ? 'bottom-22 shadow-line-top dark:shadow-line-top-dark md:bottom-26'
             : '-bottom-full'
         }  ${className || ''}`}
    >
      {children}
    </div>
  )
}

export default FilterContainer
