import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
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

  // TODO вынести в отдельный компонент поля в разметке
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
                  <div className="flex items-end justify-between gap-10 border-b border-anthracite-gray border-opacity-20 dark:border-white">
                    <div>Идентификационный номер:</div>
                    <div>{article._id}</div>
                  </div>
                  <div className="flex items-end justify-between gap-10 border-b border-anthracite-gray border-opacity-20 dark:border-white">
                    <div>Название артикула:</div>
                    <div>{article.name}</div>
                  </div>
                  <div className="flex items-end justify-between gap-10 border-b border-anthracite-gray border-opacity-20 dark:border-white">
                    <div>Фабрика производитель:</div>
                    <div>{article.factory.name}</div>
                  </div>
                  <div>
                    <div>Описание:</div>
                    <div className="ml-5">{article.description}</div>
                  </div>
                </div>
                <div className="mt-1">
                  <div>Цвета:</div>
                  <div className="ml-5">
                    {article.colors.map(color => {
                      return (
                        <div key={color._id} className="w-fit">
                          {color.title}
                        </div>
                      )
                    })}
                  </div>
                </div>
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