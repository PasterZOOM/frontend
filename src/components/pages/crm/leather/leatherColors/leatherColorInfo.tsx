import { FC } from 'react'

import { LeatherColorType } from '@/api/crm/leatherColorsApi/types'
import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherColorRemoveConfirmModalBody } from '@/components/modals/crm/leatherColor/confirm/leatherColorRemoveConfirmModalBody'

type PropsType = {
  className?: string
  color: LeatherColorType
  onDeleteConfirm: () => void
}

export const LeatherColorInfo: FC<PropsType> = ({ className, color, onDeleteConfirm }) => {
  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
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
  )
}
