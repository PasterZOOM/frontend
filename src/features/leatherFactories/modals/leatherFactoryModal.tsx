import { FC } from 'react'

import { useGetLeatherFactory } from 'features/leatherFactories/hooks/useGetLeatherFactory'
import { useRemoveLeatherFactory } from 'features/leatherFactories/hooks/useRemoveLeatherFactory'
// eslint-disable-next-line import/no-cycle
import { LeatherFactoryInfo } from 'features/leatherFactories/ui/leatherFactoryInfo'
import { ModalLayout } from 'shared/components/modals/modalLayout'

type PropsType = {
  closeModal: () => void
  id: string
  isOpen: boolean
}

export const LeatherFactoryModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const { data: factory } = useGetLeatherFactory(id, { enabled: isOpen })
  const { mutateAsync: removeFactory } = useRemoveLeatherFactory()

  const onDeleteConfirm = async (): Promise<void> => {
    try {
      await removeFactory(id)
      closeModal()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <ModalLayout
      closeModal={closeModal}
      isOpen={isOpen}
      title={`Информация о фабрике ${factory?.title}`}
    >
      {factory && (
        <div className="flex gap-4 p-4">
          <LeatherFactoryInfo factory={factory} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
