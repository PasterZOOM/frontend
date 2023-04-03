import { useCallback, useState } from 'react'

export const useModal: UseModalType = (defaultState = false) => {
  const [isOpen, setIsOpen] = useState(defaultState)

  const closeModal = useCallback(() => setIsOpen(false), [])
  const openModal = useCallback(() => setIsOpen(true), [])

  return { isOpen, openModal, closeModal }
}

type UseModalType = (defaultState?: boolean) => {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}
