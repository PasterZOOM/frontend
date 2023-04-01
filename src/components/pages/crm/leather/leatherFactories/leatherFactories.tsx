import { FC } from 'react'

import { CreateFormAndListWrapper } from '@/components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherFactoryForm } from '@/components/forms/crm/leatherFactories/createLeatherFactoryForm'
import { LeatherFactoryModal } from '@/components/modals/crm/leatherFactory/leatherFactoryModal'
import { TableItem } from '@/components/pages/crm/tableItem'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'

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
