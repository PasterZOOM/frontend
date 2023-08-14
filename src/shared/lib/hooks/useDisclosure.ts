import { useCallback, useState } from 'react'

export const useDisclosure = (
  initialState?: boolean,
  callbacks?: {
    onClose?: () => void
    onOpen?: () => void
  }
): [
  boolean,
  {
    close: () => void
    open: () => void
    toggle: () => void
  },
] => {
  const [isDisclosure, setIsDisclosure] = useState(!!initialState)

  const open = useCallback((): void => {
    setIsDisclosure(true)
    callbacks?.onOpen?.()
  }, [callbacks])

  const close = useCallback((): void => {
    setIsDisclosure(false)
    callbacks?.onClose?.()
  }, [callbacks])

  const toggle = useCallback((): void => {
    setIsDisclosure(prev => {
      if (prev) {
        callbacks?.onClose?.()
      } else {
        callbacks?.onOpen?.()
      }

      return !prev
    })
  }, [callbacks])

  return [isDisclosure, { open, close, toggle }]
}
