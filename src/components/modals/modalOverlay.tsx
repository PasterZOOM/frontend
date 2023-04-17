import {
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import ReactDOM from 'react-dom'

import { getNumberOfPenultimateElement } from '@/utils/arrays/getNumberOfPenultimateElement'

type PropsType = {
  isOpen: boolean
  children: ReactNode
  onClose?: () => void
  modalContainer?: string
}
export const ModalOverlay: FC<PropsType> = ({
  children,
  onClose,
  isOpen,
  modalContainer = '#modals',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [container, setContainer] = useState<Element | null>(null)

  const onEscape: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Escape' && onClose) {
      onClose()
      e.stopPropagation()
    }
  }

  const handleClick = useCallback(
    (e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLElement>) => {
      e.stopPropagation()

      if (e.target === containerRef.current && onClose) {
        onClose.call(null)
      }
    },
    [onClose]
  )

  useEffect(() => {
    setContainer(document.querySelector(modalContainer))
  }, [])

  useEffect(() => {
    const length = container?.childNodes.length || 0
    const next = document.querySelector('#__next')

    if (containerRef.current) {
      containerRef.current.focus()
      next?.setAttribute('inert', 'true')
    }

    if (length !== 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    if (length > 1) {
      container?.children[getNumberOfPenultimateElement(length)]?.setAttribute('inert', 'true')
    }

    return () => {
      if (length === 1) {
        document.body.style.overflow = 'auto'
        next?.removeAttribute('inert')
      }
      ;(container?.lastElementChild as HTMLElement)?.removeAttribute('inert')
      ;(container?.lastElementChild as HTMLElement)?.focus()
    }
  }, [isOpen, container])

  if (!container || !children || !isOpen) return null

  return (
    <>
      {ReactDOM.createPortal(
        <div
          onKeyDown={onEscape}
          aria-hidden="true"
          tabIndex={-1}
          ref={containerRef}
          onClick={handleClick}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
        >
          {children}
        </div>,
        container
      )}
    </>
  )
}
