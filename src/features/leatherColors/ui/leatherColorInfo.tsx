import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { LeatherArticleModal } from 'features/leatherArticles/modals/leatherArticleModal'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { useUpdateLeatherColor } from 'features/leatherColors/hooks/useUpdateLeatherColor'
import { LeatherColorRemoveConfirmModalBody } from 'features/leatherColors/modals/confirm/leatherColorRemoveConfirmModalBody'
import { PropertyPreviewWrapper } from 'shared/components/common/wrappers/propertyPreviewWrapper'
import { leatherColorsArray, leatherColors } from 'shared/objects/colors/leatherColors'
import { RemoveButton } from 'shared/ui/buttons/removeButton'
import { EditableSpanInput } from 'shared/ui/editable/editableSpanInput'
import { EditableSpanSelect } from 'shared/ui/editable/editableSpanSelect'
import { PropertyInOneRow } from 'shared/ui/properties/propertyInOneRow'
import { TableItem } from 'shared/ui/tabel/tableItem'

type PropsType = {
  className?: string
  color: LeatherColorType
  onDeleteConfirm: () => void
}

export const LeatherColorInfo: FC<PropsType> = ({ className, color, onDeleteConfirm }) => {
  const { t } = useTranslation('common')

  const { mutate: updateLeatherColor } = useUpdateLeatherColor()

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="w-fit space-y-1">
          <PropertyInOneRow title="Идентификационный номер:">{color._id}</PropertyInOneRow>

          <PropertyInOneRow title="Название цвета:">
            <EditableSpanInput
              onChange={title => updateLeatherColor({ _id: color._id, params: { title } })}
            >
              {t(color.title)}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Код цвета:">
            <EditableSpanInput
              onChange={code => updateLeatherColor({ _id: color._id, params: { code } })}
            >
              {color.code}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Значение цвета:">
            <EditableSpanSelect
              initialValue={color.value}
              title={t(leatherColors[color.value].title)}
              onChange={value => updateLeatherColor({ _id: color._id, params: { value } })}
            >
              {leatherColorsArray.map(leatherColor => (
                <option key={leatherColor._id} value={leatherColor.value}>
                  {t(leatherColor.title)}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyInOneRow>

          <PropertyInOneRow title="Артикул:">
            <TableItem title={color.article.title}>
              {({ closeModal, isOpen }) => (
                <LeatherArticleModal
                  closeModal={closeModal}
                  id={color.article._id}
                  isOpen={isOpen}
                />
              )}
            </TableItem>
          </PropertyInOneRow>

          <PropertyInOneRow title="Фото:">
            <EditableSpanInput
              onChange={photo => updateLeatherColor({ _id: color._id, params: { photo } })}
            >
              {color.photo}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyPreviewWrapper title="Описание:">
            <EditableSpanInput
              className="ml-5"
              onChange={description =>
                updateLeatherColor({ _id: color._id, params: { description } })
              }
            >
              {color.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>
      </div>
      <RemoveButton
        className="mt-3"
        modalChildren={<LeatherColorRemoveConfirmModalBody color={color} />}
        onConfirm={onDeleteConfirm}
      />
    </div>
  )
}
