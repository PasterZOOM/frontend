import { FC } from 'react'

import { UpdateLeatherArticleForm } from '@/components/forms/crm/leatherArticle/updateLeatherArticleForm'
import { ModalLayout } from '@/components/modals/crm/modalLayout'
import { LeatherArticleInfo } from '@/components/pages/crm/leather/leatherArticles/leatherArticleInfo'
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
          <UpdateLeatherArticleForm article={article} />

          <LeatherArticleInfo article={article} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
