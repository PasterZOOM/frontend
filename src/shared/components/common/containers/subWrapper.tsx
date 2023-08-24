import { FC, ReactNode, useEffect } from 'react'

import { useDevice } from 'shared/lib/hooks/windowSize/useDevice'

type PropsType = {
  bias: string
  children: ReactNode
  className?: string
  close: () => void
  isOpen: boolean
}

export const SubWrapper: FC<PropsType> = ({ children, close, isOpen, bias, className = '' }) => {
  const { widerLaptopS } = useDevice()

  useEffect(() => {
    if (widerLaptopS) {
      close()
    }
  }, [close, widerLaptopS])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflowY = 'visible'
      document.body.style.touchAction = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <div
        aria-hidden
        className={`inset-0 bg-black bg-opacity-50 transition-all duration-300 xl:hidden ${
          isOpen ? 'fixed z-30' : ''
        }`}
        onClick={close}
      />
      <div
        ref={node =>
          node &&
          (isOpen || widerLaptopS ? node.removeAttribute('inert') : node.setAttribute('inert', ''))
        }
        className={`fixed left-0 right-0 max-h-[70vh] max-w-full overflow-auto bg-white transition-all duration-300 dark:bg-anthracite-gray xl:static xl:z-auto xl:max-h-none xl:overflow-visible ${
          isOpen ? 'z-30' : ''
        } ${bias} ${className}`}
      >
        {children}
      </div>
    </>
  )
}
