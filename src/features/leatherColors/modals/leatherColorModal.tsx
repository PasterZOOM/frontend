import { FC } from 'react'

import { ModalLayout } from 'components/modals/modalLayout'
import { useGetLeatherColor } from 'features/leatherColors/hooks/useGetLeatherColor'
import { useRemoveLeatherColor } from 'features/leatherColors/hooks/useRemoveLeatherColor'
// eslint-disable-next-line import/no-cycle
import { LeatherColorInfo } from 'features/leatherColors/pages/leatherColorInfo'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherColorModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const { mutateAsync: removeColor } = useRemoveLeatherColor()
  const { data: color } = useGetLeatherColor(id, { enabled: isOpen })

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
      isOpen={isOpen}
      closeModal={closeModal}
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
