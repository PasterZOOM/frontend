import { FC } from 'react'

import { ModalLayout } from 'components/modals/modalLayout'
import { useGetLeatherFactory } from 'features/leatherFactories/hooks/useGetLeatherFactory'
import { useRemoveLeatherFactory } from 'features/leatherFactories/hooks/useRemoveLeatherFactory'
// eslint-disable-next-line import/no-cycle
import { LeatherFactoryInfo } from 'features/leatherFactories/ui/leatherFactoryInfo'
import { useRefetchAfterChangeLocale } from 'hooks/useRefetchAfterChangeLocale'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherFactoryModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const { data: factory, refetch } = useGetLeatherFactory(id, { enabled: isOpen })
  const { mutateAsync: removeFactory } = useRemoveLeatherFactory()

  useRefetchAfterChangeLocale(refetch)

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
