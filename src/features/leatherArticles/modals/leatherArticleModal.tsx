import { FC } from 'react'

import { ModalLayout } from '@/components/modals/modalLayout'
import { useGetLeatherArticle } from '@/features/leatherArticles/hooks/useGetLeatherArticle'
import { useRemoveLeatherArticle } from '@/features/leatherArticles/hooks/useRemoveLeatherArticle'
import { LeatherArticleInfo } from '@/features/leatherArticles/pages/leatherArticleInfo'

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
          <LeatherArticleInfo article={article} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
