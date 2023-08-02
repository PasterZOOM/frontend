import { FC } from 'react'

import { TableItem } from 'components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from 'components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherFactoryForm } from 'features/leatherFactories/forms/createLeatherFactoryForm'
import { useGetAllLeatherFactories } from 'features/leatherFactories/hooks/useGetAllLeatherFactories'
import { LeatherFactoryModal } from 'features/leatherFactories/modals/leatherFactoryModal'

type PropsType = {
  className?: string
}
export const LeatherFactories: FC<PropsType> = ({ className }) => {
  const { data: factories } = useGetAllLeatherFactories()

  // useRefetchAfterChangeLocale(refetch)

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
