import { FC } from 'react'

import { RemoveButton } from 'components/common/ui/buttons/removeButton'
import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { PropertyInOneRow } from 'components/common/ui/properties/propertyInOneRow'
import { TableItem } from 'components/common/ui/tabel/tableItem'
import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { useUpdateLeatherArticle } from 'features/leatherArticles/hooks/useUpdateLeatherArticle'
import { LeatherArticleRemoveConfirmModalBody } from 'features/leatherArticles/modals/confirm/leatherArticleRemoveConfirmModalBody'
import { LeatherColorModal } from 'features/leatherColors/modals/leatherColorModal'
import { LeatherFactoryModal } from 'features/leatherFactories/modals/leatherFactoryModal'

type PropsType = {
  className?: string
  article: LeatherArticleType
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
                  isOpen={isOpen}
                  id={article.factory._id}
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

        <PropertyPreviewWrapper title="Цвета:" className="mt-1">
          <div className="ml-5">
            {article.colors.map(color => (
              <TableItem key={color._id} title={color.title}>
                {({ closeModal, isOpen }) => (
                  <LeatherColorModal closeModal={closeModal} isOpen={isOpen} id={color._id} />
                )}
              </TableItem>
            ))}
          </div>
        </PropertyPreviewWrapper>
      </div>
      <RemoveButton
        onConfirm={onDeleteConfirm}
        className="mt-3"
        modalChildren={<LeatherArticleRemoveConfirmModalBody article={article} />}
      />
    </div>
  )
}
