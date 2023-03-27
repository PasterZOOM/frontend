import { FC } from 'react'

import { LeatherArticleType } from '@/api/crm/leatherArticlesApi/types'
import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherArticleRemoveConfirmModalBody } from '@/components/modals/crm/leatherArticle/confirm/leatherArticleRemoveConfirmModalBody'

type PropsType = {
  className?: string
  article: LeatherArticleType
  onDeleteConfirm: () => void
}

export const LeatherArticleInfo: FC<PropsType> = ({ className, article, onDeleteConfirm }) => {
  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="w-fit space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {article._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название артикула:">{article.name}</PropertyWithUnderline>

          <PropertyWithUnderline title="Фабрика производитель:">
            {article.factory.name}
          </PropertyWithUnderline>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            {article.description}
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
