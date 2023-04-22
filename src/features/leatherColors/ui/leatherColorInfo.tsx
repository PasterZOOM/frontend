import { FC } from 'react'

import { RemoveButton } from 'components/common/ui/buttons/removeButton'
import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { EditableSpanSelect } from 'components/common/ui/editable/editableSpanSelect'
import { PropertyWithUnderline } from 'components/common/ui/properties/propertyWithUnderline'
import { TableItem } from 'components/common/ui/tabel/tableItem'
import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
// eslint-disable-next-line import/no-cycle
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
  const { mutate: updateLeatherColor } = useUpdateLeatherColor()

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="w-fit space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {color._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название цвета:">
            <EditableSpanInput
              onChange={title => updateLeatherColor({ _id: color._id, params: { title } })}
            >
              {color.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Код цвета:">
            <EditableSpanInput
              onChange={code => updateLeatherColor({ _id: color._id, params: { code } })}
            >
              {color.code}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Значение цвета:">
            <EditableSpanSelect
              title={leatherColorsValues[color.value].title}
              initialValue={color.value}
              onChange={value => updateLeatherColor({ _id: color._id, params: { value } })}
            >
              {leatherColorsArray.map(leatherColor => (
                <option key={leatherColor._id} value={leatherColor.value}>
                  {leatherColor.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Артикул:">
            <TableItem title={color.article.title}>
              {({ closeModal, isOpen }) => (
                <LeatherArticleModal
                  closeModal={closeModal}
                  isOpen={isOpen}
                  id={color.article._id}
                />
              )}
            </TableItem>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Фото:">
            <EditableSpanInput
              onChange={photo => updateLeatherColor({ _id: color._id, params: { photo } })}
            >
              {color.photo}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput
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
