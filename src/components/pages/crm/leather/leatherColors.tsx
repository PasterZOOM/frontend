import { FC } from 'react'

import { CreateFormAndListWrapper } from '@/components/common/wrappers/createFormAndListWrapper'
import { AddLeatherColorForm } from '@/components/forms/crm/leatherColor/addLeatherColorForm'
import { LeatherColorModal } from '@/components/modals/crm/leatherColor/leatherColorModal'
import { TableItem } from '@/components/pages/crm/tableItem'
import { useGetAllLeatherColors } from '@/hooks/crm/leatherColors/useGetAllLeatherColors'

type PropsType = {
  className?: string
}

export const LeatherColors: FC<PropsType> = ({ className }) => {
  const colors = useGetAllLeatherColors()

  return (
    <CreateFormAndListWrapper
      title="Список артикулов:"
      form={<AddLeatherColorForm />}
      className={className}
    >
      {colors.map(color => (
        <TableItem key={color._id} name={color.title}>
          {({ closeModal, isOpen }) => (
            <LeatherColorModal closeModal={closeModal} isOpen={isOpen} id={color._id} />
          )}
        </TableItem>
      ))}
    </CreateFormAndListWrapper>
  )
}
