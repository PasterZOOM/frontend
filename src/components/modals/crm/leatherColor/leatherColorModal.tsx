import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { UpdateLeatherColorForm } from '@/components/forms/crm/leatherColor/updateLeatherColorForm'
import { LeatherColorRemoveConfirmModalBody } from '@/components/modals/crm/leatherColor/confirm/leatherColorRemoveConfirmModalBody'
import { ModalLayout } from '@/components/modals/crm/modalLayout'
import { useGetLeatherColor } from '@/hooks/crm/leatherColors/useGetLeatherColor'
import { useRemoveLeatherColor } from '@/hooks/crm/leatherColors/useRemoveLeatherColor'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherColorModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const removeColor = useRemoveLeatherColor()
  const color = useGetLeatherColor(id, isOpen)

  const onDeleteConfirm = async (): Promise<void> => {
    await removeColor(id)
    closeModal()
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Информация об артикле ${color && color.title}`}
    >
      {color && (
        <div className="flex gap-4 p-4">
          <UpdateLeatherColorForm color={color} />
          <div className="flex w-full flex-col justify-between">
            <div>
              <div className="w-fit space-y-1">
                <PropertyWithUnderline title="Идентификационный номер:">
                  {color._id}
                </PropertyWithUnderline>

                <PropertyWithUnderline title="Название цвета:">{color.title}</PropertyWithUnderline>

                <PropertyWithUnderline title="Код цвета:">{color.code}</PropertyWithUnderline>

                <PropertyWithUnderline title="Значение цвета:">{color.value}</PropertyWithUnderline>

                <PropertyWithUnderline title="Артикул:">{color.article.name}</PropertyWithUnderline>

                <PropertyWithUnderline title="Фото:">{color.photo}</PropertyWithUnderline>

                <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
                  {color.description}
                </PropertyPreviewWrapper>
              </div>
            </div>
            <RemoveButton
              onConfirm={onDeleteConfirm}
              className="mt-3"
              modalChildren={<LeatherColorRemoveConfirmModalBody color={color} />}
            />
          </div>
        </div>
      )}
    </ModalLayout>
  )
}
