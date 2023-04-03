import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { EditableSpanInput } from '@/components/common/ui/editable/editableSpanInput'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { useUpdateLeatherColor } from '@/features/leatherColors/hooks/useUpdateLeatherColor'
import { LeatherColorRemoveConfirmModalBody } from '@/features/leatherColors/modals/confirm/leatherColorRemoveConfirmModalBody'

type PropsType = {
  className?: string
  color: LeatherColorType
  onDeleteConfirm: () => void
}

export const LeatherColorInfo: FC<PropsType> = ({ className, color, onDeleteConfirm }) => {
  const {
    updateLeatherColorDescription,
    updateLeatherColorPhoto,
    updateLeatherColorTitle,
    updateLeatherColorCode,
  } = useUpdateLeatherColor(color._id)

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="w-fit space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {color._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название цвета:">
            <EditableSpanInput onChange={updateLeatherColorTitle}>{color.title}</EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Код цвета:">
            <EditableSpanInput onChange={updateLeatherColorCode}>{color.code}</EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Значение цвета:">{color.value}</PropertyWithUnderline>

          <PropertyWithUnderline title="Артикул:">{color.article.title}</PropertyWithUnderline>

          <PropertyWithUnderline title="Фото:">
            <EditableSpanInput onChange={updateLeatherColorPhoto}>{color.photo}</EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput onChange={updateLeatherColorDescription}>
              {color.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>
      </div>
      <RemoveButton
        onConfirm={onDeleteConfirm}
        className="mt-3"
        modalChildren={<LeatherColorRemoveConfirmModalBody color={color} />}
      />
    </div>
  )
}
