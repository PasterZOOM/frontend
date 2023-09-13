import { FC } from 'react'

import { useGetLeatherColor } from 'features/leatherColors/hooks/useGetLeatherColor'
import { useRemoveLeatherColor } from 'features/leatherColors/hooks/useRemoveLeatherColor'
import { LeatherColorInfo } from 'features/leatherColors/ui/leatherColorInfo'
import { ModalLayout } from 'shared/components/modals/modalLayout'

type PropsType = {
  closeModal: () => void
  colorId: string
  isOpen: boolean
}

export const LeatherColorModal: FC<PropsType> = ({ isOpen, closeModal, colorId }) => {
  const { data: color } = useGetLeatherColor(colorId, { enabled: isOpen })
  const { mutateAsync: removeColor } = useRemoveLeatherColor()

  const onDeleteConfirm = async (): Promise<void> => {
    try {
      await removeColor({ colorId, articleId: color?.article._id ?? '' })
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
