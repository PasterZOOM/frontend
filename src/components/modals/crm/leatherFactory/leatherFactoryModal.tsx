import { FC } from 'react'

import { ModalLayout } from '@/components/modals/crm/modalLayout'
import { LeatherFactoryInfo } from '@/components/pages/crm/leather/leatherFactories/leatherFactoryInfo'
import { useGetLeatherFactory } from '@/hooks/crm/leatherFactories/useGetLeatherFactory'
import { useRemoveLeatherFactory } from '@/hooks/crm/leatherFactories/useRemoveLeatherFactory'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherFactoryModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const factory = useGetLeatherFactory(id, isOpen)
  const removeFactory = useRemoveLeatherFactory()

  const onDeleteConfirm = async (): Promise<void> => {
    await removeFactory(id)
    closeModal()
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Информация о фабрике ${factory && factory.name}`}
    >
      {factory && (
        <div className="flex gap-4 p-4">
          <LeatherFactoryInfo factory={factory} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
