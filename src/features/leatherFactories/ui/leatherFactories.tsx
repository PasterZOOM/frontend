import { FC } from 'react'

import { CreateLeatherFactoryForm } from 'features/leatherFactories/forms/ui/createLeatherFactoryForm'
import { useGetAllLeatherFactories } from 'features/leatherFactories/hooks/useGetAllLeatherFactories'
import { LeatherFactoryModal } from 'features/leatherFactories/modals/leatherFactoryModal'
import { CreateFormAndListWrapper } from 'shared/components/common/wrappers/createFormAndListWrapper'
import { TableItem } from 'shared/ui/tabel/tableItem'

type PropsType = {
  className?: string
}
export const LeatherFactories: FC<PropsType> = ({ className }) => {
  const { data: factories } = useGetAllLeatherFactories()

  return (
    <CreateFormAndListWrapper
      className={className}
      form={<CreateLeatherFactoryForm />}
      title="Список фабрик:"
    >
      {factories &&
        factories.map(factory => (
          <TableItem key={factory._id} title={factory.title}>
            {({ closeModal, isOpen }) => (
              <LeatherFactoryModal closeModal={closeModal} id={factory._id} isOpen={isOpen} />
            )}
          </TableItem>
        ))}
    </CreateFormAndListWrapper>
  )
}
