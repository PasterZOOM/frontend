import { FC } from 'react'

import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { useUpdateLeatherArticle } from 'features/leatherArticles/hooks/useUpdateLeatherArticle'
import { LeatherArticleRemoveConfirmModalBody } from 'features/leatherArticles/modals/confirm/leatherArticleRemoveConfirmModalBody'
import { LeatherColorModal } from 'features/leatherColors/modals/leatherColorModal'
import { LeatherFactoryModal } from 'features/leatherFactories/modals/leatherFactoryModal'
import { PropertyPreviewWrapper } from 'shared/components/common/wrappers/propertyPreviewWrapper'
import { RemoveButton } from 'shared/ui/buttons/removeButton'
import { EditableSpanInput } from 'shared/ui/editable/editableSpanInput'
import { PropertyInOneRow } from 'shared/ui/properties/propertyInOneRow'
import { TableItem } from 'shared/ui/tabel/tableItem'

type PropsType = {
  article: LeatherArticleType
  className?: string
  onDeleteConfirm: () => void
}

export const LeatherArticleInfo: FC<PropsType> = ({ className, article, onDeleteConfirm }) => {
  const { mutate: updateLeatherArticle } = useUpdateLeatherArticle()

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyInOneRow title="Идентификационный номер:">{article._id}</PropertyInOneRow>

          <PropertyInOneRow title="Название артикула:">
            <EditableSpanInput
              onChange={title => updateLeatherArticle({ _id: article._id, params: { title } })}
            >
              {article.title}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Значение:">
            <EditableSpanInput
              onChange={value => updateLeatherArticle({ _id: article._id, params: { value } })}
            >
              {article.value}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Фабрика производитель:">
            <TableItem title={article.factory.title}>
              {({ closeModal, isOpen }) => (
                <LeatherFactoryModal
                  closeModal={closeModal}
                  id={article.factory._id}
                  isOpen={isOpen}
                />
              )}
            </TableItem>
          </PropertyInOneRow>

          <PropertyPreviewWrapper title="Описание:">
            <EditableSpanInput
              className="ml-5"
              onChange={description =>
                updateLeatherArticle({ _id: article._id, params: { description } })
              }
            >
              {article.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>

        <PropertyPreviewWrapper className="mt-1" title="Цвета:">
          <div className="ml-5">
            {article.colors.map(color => (
              <TableItem key={color._id} title={color.title}>
                {({ closeModal, isOpen }) => (
                  <LeatherColorModal closeModal={closeModal} id={color._id} isOpen={isOpen} />
                )}
              </TableItem>
            ))}
          </div>
        </PropertyPreviewWrapper>
      </div>
      <RemoveButton
        className="mt-3"
        modalChildren={<LeatherArticleRemoveConfirmModalBody article={article} />}
        onConfirm={onDeleteConfirm}
      />
    </div>
  )
}
