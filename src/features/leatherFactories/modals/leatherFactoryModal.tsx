import { FC } from 'react'

import { ModalLayout } from '@/components/modals/modalLayout'
import { useGetLeatherFactory } from '@/features/leatherFactories/hooks/useGetLeatherFactory'
import { useRemoveLeatherFactory } from '@/features/leatherFactories/hooks/useRemoveLeatherFactory'
// eslint-disable-next-line import/no-cycle
import { LeatherFactoryInfo } from '@/features/leatherFactories/pages/leatherFactoryInfo'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
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
      isOpen={isOpen}
      closeModal={closeModal}
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
