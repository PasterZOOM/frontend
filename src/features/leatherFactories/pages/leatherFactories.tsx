import { FC } from 'react'

import { TableItem } from '@/components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from '@/components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherFactoryForm } from '@/features/leatherFactories/forms/createLeatherFactoryForm'
import { useGetAllLeatherFactories } from '@/features/leatherFactories/hooks/useGetAllLeatherFactories'
import { LeatherFactoryModal } from '@/features/leatherFactories/modals/leatherFactoryModal'

type PropsType = {
  className?: string
}
const LeatherFactories: FC<PropsType> = ({ className }) => {
  const factories = useGetAllLeatherFactories()

  return (
    <CreateFormAndListWrapper
      title="Список фабрик:"
      form={<CreateLeatherFactoryForm />}
      className={className}
    >
      {factories.map(factory => (
        <TableItem key={factory._id} name={factory.name}>
          {({ closeModal, isOpen }) => (
            <LeatherFactoryModal closeModal={closeModal} isOpen={isOpen} id={factory._id} />
          )}
        </TableItem>
      ))}
    </CreateFormAndListWrapper>
  )
}

export default LeatherFactories
