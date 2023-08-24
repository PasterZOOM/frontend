import { FC, ReactNode, useEffect } from 'react'

import { useDevice } from 'shared/lib/hooks/windowSize/useDevice'

type PropsType = {
  children: ReactNode
  className?: string
  closeFilters: () => void
  isOpen: boolean
}

const FilterContainer: FC<PropsType> = ({ children, className = '', isOpen, closeFilters }) => {
  const { widerLaptopS } = useDevice()

  useEffect(() => {
    if (widerLaptopS) closeFilters()
  }, [closeFilters, widerLaptopS])

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
