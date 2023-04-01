import { FC } from 'react'

import { LeatherColorType } from '@/api/crm/leatherColorsApi/types'
import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { EditableSpanInput } from '@/components/common/ui/editable/editableSpanInput'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherColorRemoveConfirmModalBody } from '@/components/modals/crm/leatherColor/confirm/leatherColorRemoveConfirmModalBody'
import { useUpdateLeatherColor } from '@/hooks/crm/leatherColors/useUpdateLeatherColor'

type PropsType = {
  className?: string
  color: LeatherColorType
  onDeleteConfirm: () => void
}

export const LeatherColorInfo: FC<PropsType> = ({ className, color, onDeleteConfirm }) => {
  const {
    updateLeatherColorDescription,
    updateLeatherColorPhoto,
    updateLeatherColorName,
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
            <EditableSpanInput onChange={updateLeatherColorName}>{color.title}</EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Код цвета:">
            <EditableSpanInput onChange={updateLeatherColorCode}>{color.code}</EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Значение цвета:">{color.value}</PropertyWithUnderline>

          <PropertyWithUnderline title="Артикул:">{color.article.name}</PropertyWithUnderline>

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
