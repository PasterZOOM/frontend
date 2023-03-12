import { FC } from 'react'

import { Button } from '@/components/common/ui/buttons/button'
import { ConfirmDeleteModal } from '@/components/modals/confirmDeleteModal'
import { ModalOverlay } from '@/components/modals/overlay'
import { useGetLeatherArticle } from '@/hooks/crm/leatherArticles/useGetLeatherArticle'
import { useRemoveLeatherArticle } from '@/hooks/crm/leatherArticles/useRemoveLeatherArticle'
import { useModal } from '@/hooks/useModal'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  articleId: string
}

export const LeatherArticleModal: FC<PropsType> = ({ isOpen, closeModal, articleId }) => {
  const removeArticle = useRemoveLeatherArticle()
  const article = useGetLeatherArticle(articleId, isOpen)

  const {
    open: openConfirmModal,
    close: closeConfirmModal,
    isOpen: isOpenConfirmModal,
  } = useModal()

  const onConfirm = async (): Promise<void> => {
    await removeArticle(articleId)
    closeConfirmModal()
    closeModal()
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative max-w-[95%] cursor-default bg-white dark:bg-anthracite-gray">
        {article && (
          <>
            <div className="flex justify-between gap-2 border-b border-anthracite-gray border-opacity-20 p-4 dark:border-white">
              <div className="text-xl">
                Информация об артукуле <b>{article.name}</b>
              </div>
              <button type="button" onClick={closeModal} className="h-fit text-lg">
                закрыть
              </button>
            </div>

            <div className="flex gap-4 p-4">
              {/* <UpdateLeatherFactoryForm factory={factory} className="w-full" /> */}
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
                <Button variant="delete" onClick={openConfirmModal} className="mt-3">
                  удалить
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <ConfirmDeleteModal
        closeModal={closeConfirmModal}
        isOpen={isOpenConfirmModal}
        onConfirm={onConfirm}
        info={
          <>
            Вместе с артикулем <b>{article?.name}</b> будут удалены все связаные с ним цвета
          </>
        }
      />
    </ModalOverlay>
  )
}
