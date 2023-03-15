import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherArticleRemoveConfirmModalBody } from '@/components/modals/crm/leatherArticle/leatherArticleRemoveConfirmModalBody'
import { ModalOverlay } from '@/components/modals/overlay'
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

  // TODO использовать layout
  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative max-w-[95%] cursor-default bg-white dark:bg-anthracite-gray">
        <div className="flex justify-between gap-2 border-b border-anthracite-gray border-opacity-20 p-4 dark:border-white">
          <div className="text-xl">Информация об артикле {article && article.name}</div>
          <button type="button" onClick={closeModal} className="h-fit text-lg">
            закрыть
          </button>
        </div>

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
      </div>
    </ModalOverlay>
  )
}
