import { FC, ReactNode, useEffect } from 'react'

import { DESKTOP } from 'shared/constants/sizes/screenSizes'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize'

type PropsType = {
  bias: string
  children: ReactNode
  close: () => void
  isOpen: boolean
}

export const SubWrapper: FC<PropsType> = ({ children, close, isOpen, bias }) => {
  const { width } = useWindowSize()

  useEffect(() => {
    if (width > DESKTOP) {
      close()
    }
  }, [close, width])

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
        className={`inset-0 bg-black bg-opacity-30 transition-all xl:hidden ${
          isOpen ? 'fixed z-30' : ''
        }`}
        onClick={close}
      />
      <div
        ref={node =>
          node &&
          (isOpen || width >= DESKTOP
            ? node.removeAttribute('inert')
            : node.setAttribute('inert', ''))
        }
        className={`fixed left-0 right-0 max-h-[70vh] max-w-full overflow-auto bg-white transition-all dark:bg-anthracite-gray xl:static xl:z-auto xl:max-h-none xl:overflow-visible ${
          isOpen ? 'z-30' : ''
        } ${bias}`}
      >
        {children}
      </div>
    </>
  )
}
