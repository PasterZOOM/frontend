import { useCallback, useState } from 'react'

export const useModal = (
  defaultState: boolean = false
): { isOpen: boolean; openModal: () => void; closeModal: () => void } => {
  const [isOpen, setIsOpen] = useState(defaultState)

  const closeModal = useCallback(() => setIsOpen(false), [])
  const openModal = useCallback(() => setIsOpen(true), [])

  return { isOpen, openModal, closeModal }
}
