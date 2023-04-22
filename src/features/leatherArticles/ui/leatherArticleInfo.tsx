import { FC } from 'react'

import { RemoveButton } from 'components/common/ui/buttons/removeButton'
import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { PropertyWithUnderline } from 'components/common/ui/properties/propertyWithUnderline'
import { TableItem } from 'components/common/ui/tabel/tableItem'
import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { useUpdateLeatherArticle } from 'features/leatherArticles/hooks/useUpdateLeatherArticle'
import { LeatherArticleRemoveConfirmModalBody } from 'features/leatherArticles/modals/confirm/leatherArticleRemoveConfirmModalBody'
// eslint-disable-next-line import/no-cycle
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
          <PropertyWithUnderline title="Идентификационный номер:">
            {article._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название артикула:">
            <EditableSpanInput
              onChange={title => updateLeatherArticle({ _id: article._id, params: { title } })}
            >
              {article.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Фабрика производитель:">
            <TableItem title={article.factory.title}>
              {({ closeModal, isOpen }) => (
                <LeatherFactoryModal
                  closeModal={closeModal}
                  isOpen={isOpen}
                  id={article.factory._id}
                />
              )}
            </TableItem>
          </PropertyWithUnderline>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput
              onChange={description =>
                updateLeatherArticle({ _id: article._id, params: { description } })
              }
            >
              {article.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>

        <PropertyPreviewWrapper title="Цвета:" wrapperClassName="mt-1" childrenClassName="ml-5">
          {article.colors.map(color => (
            <TableItem key={color._id} title={color.title}>
              {({ closeModal, isOpen }) => (
                <LeatherColorModal closeModal={closeModal} isOpen={isOpen} id={color._id} />
              )}
            </TableItem>
          ))}
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
