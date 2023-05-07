import { FC } from 'react'

import { TableItem } from 'components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from 'components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherColorForm } from 'features/leatherColors/forms/createLeatherColorForm'
import { useGetAllLeatherColors } from 'features/leatherColors/hooks/useGetAllLeatherColors'
import { LeatherColorModal } from 'features/leatherColors/modals/leatherColorModal'
import { useRefetchAfterChangeLocale } from 'hooks/useRefetchAfterChangeLocale'

type PropsType = {
  className?: string
}

export const LeatherColors: FC<PropsType> = ({ className }) => {
  const { data: colors, refetch } = useGetAllLeatherColors()

  useRefetchAfterChangeLocale(refetch)

  return (
    <CreateFormAndListWrapper
      title="Список артикулов:"
      form={<CreateLeatherColorForm />}
      className={className}
    >
      {colors &&
        colors.map(color => (
          <TableItem key={color._id} title={color.title}>
            {({ closeModal, isOpen }) => (
              <LeatherColorModal closeModal={closeModal} isOpen={isOpen} id={color._id} />
            )}
          </TableItem>
        ))}
    </CreateFormAndListWrapper>
  )
}
