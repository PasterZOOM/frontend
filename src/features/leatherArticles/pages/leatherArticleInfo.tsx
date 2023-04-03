import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { EditableSpanInput } from '@/components/common/ui/editable/editableSpanInput'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useUpdateLeatherArticle } from '@/features/leatherArticles/hooks/useUpdateLeatherArticle'
import { LeatherArticleRemoveConfirmModalBody } from '@/features/leatherArticles/modals/confirm/leatherArticleRemoveConfirmModalBody'

type PropsType = {
  className?: string
  article: LeatherArticleType
  onDeleteConfirm: () => void
}

export const LeatherArticleInfo: FC<PropsType> = ({ className, article, onDeleteConfirm }) => {
  const { updateLeatherArticleTitle, updateLeatherArticleDescription } = useUpdateLeatherArticle(
    article._id
  )

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {article._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название артикула:">
            <EditableSpanInput onChange={updateLeatherArticleTitle}>
              {article.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Фабрика производитель:">
            {article.factory.title}
          </PropertyWithUnderline>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput onChange={updateLeatherArticleDescription}>
              {article.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>

        <PropertyPreviewWrapper title="Цвета:" wrapperClassName="mt-1" childrenClassName="ml-5">
          {article.colors.map(color => (
            <div key={color._id} className="w-fit">
              {color.title}
            </div>
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
