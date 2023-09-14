import { FC } from 'react'

import { CreateLeatherColorForm } from '@/features/leatherColors/forms/ui/createLeatherColorForm'
import { useGetAllLeatherColors } from '@/features/leatherColors/hooks/useGetAllLeatherColors'
import { LeatherColorModal } from '@/features/leatherColors/modals/leatherColorModal'
import { CreateFormAndListWrapper } from '@/shared/components/common/wrappers/createFormAndListWrapper'
import { TableItem } from '@/shared/ui/tabel/tableItem'

type PropsType = {
  className?: string
}

export const LeatherColors: FC<PropsType> = ({ className }) => {
  const { data: colors } = useGetAllLeatherColors()

  return (
    <CreateFormAndListWrapper
      className={className}
      form={<CreateLeatherColorForm />}
      title="Список артикулов:"
    >
      {colors &&
        colors.map(color => (
          <TableItem key={color._id} title={color.title}>
            {({ closeModal, isOpen }) => (
              <LeatherColorModal closeModal={closeModal} colorId={color._id} isOpen={isOpen} />
            )}
          </TableItem>
        ))}
    </CreateFormAndListWrapper>
  )
}
