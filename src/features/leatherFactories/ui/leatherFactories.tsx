import { FC } from 'react'

import { TableItem } from 'components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from 'components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherFactoryForm } from 'features/leatherFactories/forms/createLeatherFactoryForm'
import { useGetAllLeatherFactories } from 'features/leatherFactories/hooks/useGetAllLeatherFactories'
import { LeatherFactoryModal } from 'features/leatherFactories/modals/leatherFactoryModal'
import { useRefetchAfterChangeLocale } from 'hooks/useRefetchAfterChangeLocale'

type PropsType = {
  className?: string
}
export const LeatherFactories: FC<PropsType> = ({ className }) => {
  const { data: factories, refetch } = useGetAllLeatherFactories()

  useRefetchAfterChangeLocale(refetch)

  return (
    <CreateFormAndListWrapper
      title="Список фабрик:"
      form={<CreateLeatherFactoryForm />}
      className={className}
    >
      {factories &&
        factories.map(factory => (
          <TableItem key={factory._id} title={factory.title}>
            {({ closeModal, isOpen }) => (
              <LeatherFactoryModal closeModal={closeModal} isOpen={isOpen} id={factory._id} />
            )}
          </TableItem>
        ))}
    </CreateFormAndListWrapper>
  )
}
