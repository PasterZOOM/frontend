import { FC } from 'react'

import { TableItem } from 'components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from 'components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherColorForm } from 'features/leatherColors/forms/createLeatherColorForm'
import { useGetAllLeatherColors } from 'features/leatherColors/hooks/useGetAllLeatherColors'
import { LeatherColorModal } from 'features/leatherColors/modals/leatherColorModal'

type PropsType = {
  className?: string
}

export const LeatherColors: FC<PropsType> = ({ className }) => {
  const { data: colors } = useGetAllLeatherColors()

  // useRefetchAfterChangeLocale(refetch)

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
              <LeatherColorModal closeModal={closeModal} id={color._id} isOpen={isOpen} />
            )}
          </TableItem>
        ))}
    </CreateFormAndListWrapper>
  )
}
