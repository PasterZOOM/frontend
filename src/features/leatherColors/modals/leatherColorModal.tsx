import { FC } from 'react'

import { ModalLayout } from '@/components/modals/modalLayout'
import { useGetLeatherColor } from '@/features/leatherColors/hooks/useGetLeatherColor'
import { useRemoveLeatherColor } from '@/features/leatherColors/hooks/useRemoveLeatherColor'
import { LeatherColorInfo } from '@/features/leatherColors/pages/leatherColorInfo'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherColorModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const removeColor = useRemoveLeatherColor()
  const color = useGetLeatherColor(id, isOpen)

  const onDeleteConfirm = async (): Promise<void> => {
    await removeColor(id)
    closeModal()
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Информация об артикле ${color && color.title}`}
    >
      {color && (
        <div className="flex gap-4 p-4">
          <LeatherColorInfo color={color} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
