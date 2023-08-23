import { FC, ReactNode, useEffect } from 'react'

import { SCREEN } from 'features/basicProducts/enums/screen'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize'

type PropsType = {
  children: ReactNode
  className?: string
  closeFilters: () => void
  isOpen: boolean
}

const FilterContainer: FC<PropsType> = ({ children, className = '', isOpen, closeFilters }) => {
  const { width } = useWindowSize()

  useEffect(() => {
    if (width > SCREEN.LAPTOP_S) closeFilters() // TODO: написать хук для определения ширину экрана
  }, [closeFilters, width])

  return (
    <div
      className={`fixed left-0 right-0 z-10 bg-white transition-all duration-300 dark:bg-anthracite-gray xl:static
         xl:z-auto ${
           isOpen
             ? 'bottom-22 shadow-line-top dark:shadow-line-top-dark md:bottom-26'
             : '-bottom-full'
         }  ${className || ''}`}
    >
      {children}
    </div>
  )
}

export default FilterContainer
