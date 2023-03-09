import {
  FC,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import ReactDOM from 'react-dom'

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

  const onEscape = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      onClose()
      e.stopPropagation()
    }
  }, [])

  const handleClick = useCallback(
    (e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLElement>) => {
      e.stopPropagation()

      if (e.target === containerRef.current) {
        onClose?.call(null)
      }
    },
    [onClose]
  )

  useEffect(() => {
    setContainer(document.querySelector(modalContainer))
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onEscape)
    } else {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', onEscape)
    }

    return () => {
      document.removeEventListener('keydown', onEscape)
    }
  }, [isOpen])

  if (!container || !children || !isOpen) return null

  return (
    <>
      {ReactDOM.createPortal(
        <div
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          id="modal"
          ref={containerRef}
          onClick={e => handleClick(e)}
          className="fixed inset-0 z-50 flex h-screen items-center justify-center overflow-y-auto bg-black bg-opacity-50"
        >
          {children}
        </div>,
        container
      )}
    </>
  )
}
