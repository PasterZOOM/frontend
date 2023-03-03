import {
  FC,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
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
}
export const ModalOverlay: FC<PropsType> = ({ children, onClose, isOpen }) => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>

  const [container, setContainer] = useState<Element | null>(null)

  const onEscape = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) onClose()
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
    setContainer(document.querySelector('#modals'))
  }, [])

  useEffect(() => {
    if (isOpen) containerRef.current?.addEventListener('keydown', onEscape)
    else containerRef.current?.removeEventListener('keydown', onEscape)

    return () => {
      containerRef.current?.removeEventListener('keydown', onEscape)
    }
  }, [isOpen])

  if (!container || !children || !isOpen) return null

  return (
    <>
      {ReactDOM.createPortal(
        <div
          role="button"
          onKeyDown={e => e.key === 'Escape' && handleClick(e)}
          tabIndex={0}
          id="modal"
          ref={containerRef}
          onClick={e => handleClick(e)}
          className="fixed inset-0 z-10 flex h-screen items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
        >
          {children}
        </div>,
        container
      )}
    </>
  )
}
