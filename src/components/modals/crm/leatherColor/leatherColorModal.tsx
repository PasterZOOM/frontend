import { FC } from 'react'

import { UpdateLeatherColorForm } from '@/components/forms/crm/leatherColor/updateLeatherColorForm'
import { ModalLayout } from '@/components/modals/crm/modalLayout'
import { LeatherColorInfo } from '@/components/pages/crm/leather/leatherColors/leatherColorInfo'
import { useGetLeatherColor } from '@/hooks/crm/leatherColors/useGetLeatherColor'
import { useRemoveLeatherColor } from '@/hooks/crm/leatherColors/useRemoveLeatherColor'

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
          <UpdateLeatherColorForm color={color} />

          <LeatherColorInfo color={color} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
