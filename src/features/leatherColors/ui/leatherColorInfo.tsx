import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { RemoveButton } from 'components/common/ui/buttons/removeButton'
import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { EditableSpanSelect } from 'components/common/ui/editable/editableSpanSelect'
import { PropertyInOneRow } from 'components/common/ui/properties/propertyInOneRow'
import { TableItem } from 'components/common/ui/tabel/tableItem'
import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
import { LeatherArticleModal } from 'features/leatherArticles/modals/leatherArticleModal'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { useUpdateLeatherColor } from 'features/leatherColors/hooks/useUpdateLeatherColor'
import { LeatherColorRemoveConfirmModalBody } from 'features/leatherColors/modals/confirm/leatherColorRemoveConfirmModalBody'
import { leatherColorsArray, leatherColorsValues } from 'objects/colors/leatherColorsValues'

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
              title={t(leatherColorsValues[color.value].title)}
              initialValue={color.value}
              onChange={value => updateLeatherColor({ _id: color._id, params: { value } })}
            >
              {leatherColorsArray().map(leatherColor => (
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
                  isOpen={isOpen}
                  id={color.article._id}
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
        onConfirm={onDeleteConfirm}
        className="mt-3"
        modalChildren={<LeatherColorRemoveConfirmModalBody color={color} />}
      />
    </div>
  )
}
