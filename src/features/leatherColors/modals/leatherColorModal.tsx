import { FC } from 'react'

import { ModalLayout } from 'components/modals/modalLayout'
import { useGetLeatherColor } from 'features/leatherColors/hooks/useGetLeatherColor'
import { useRemoveLeatherColor } from 'features/leatherColors/hooks/useRemoveLeatherColor'
import { LeatherColorInfo } from 'features/leatherColors/ui/leatherColorInfo'

type PropsType = {
  closeModal: () => void
  id: string
  isOpen: boolean
}

export const LeatherColorModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const { data: color } = useGetLeatherColor(id, { enabled: isOpen })
  const { mutateAsync: removeColor } = useRemoveLeatherColor()

  const onDeleteConfirm = async (): Promise<void> => {
    try {
      await removeColor(id)
      closeModal()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <ModalLayout
      closeModal={closeModal}
      isOpen={isOpen}
      title={`Информация об артикле ${color?.title}`}
    >
      {color && (
        <div className="flex gap-4 p-4">
          <LeatherColorInfo color={color} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
