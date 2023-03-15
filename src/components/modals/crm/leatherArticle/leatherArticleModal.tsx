import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherArticleRemoveConfirmModalBody } from '@/components/modals/crm/leatherArticle/leatherArticleRemoveConfirmModalBody'
import { ModalLayout } from '@/components/modals/crm/modalLayout'
import { useGetLeatherArticle } from '@/hooks/crm/leatherArticles/useGetLeatherArticle'
import { useRemoveLeatherArticle } from '@/hooks/crm/leatherArticles/useRemoveLeatherArticle'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherArticleModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const removeArticle = useRemoveLeatherArticle()
  const article = useGetLeatherArticle(id, isOpen)

  const onDeleteConfirm = async (): Promise<void> => {
    await removeArticle(id)
    closeModal()
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Информация об артикле ${article && article.name}`}
    >
      {article && (
        <div className="flex gap-4 p-4">
          <div className="flex w-full flex-col justify-between">
            <div>
              <div className="w-fit space-y-1">
                <PropertyWithUnderline title="Идентификационный номер:">
                  {article._id}
                </PropertyWithUnderline>

                <PropertyWithUnderline title="Название артикула:">
                  {article.name}
                </PropertyWithUnderline>

                <PropertyWithUnderline title="Фабрика производитель:">
                  {article.factory.name}
                </PropertyWithUnderline>

                <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
                  {article.description}
                </PropertyPreviewWrapper>
              </div>
              <PropertyPreviewWrapper
                title="Цвета:"
                wrapperClassName="mt-1"
                childrenClassName="ml-5"
              >
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
        </div>
      )}
    </ModalLayout>
  )
}
