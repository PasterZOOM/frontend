import { FC } from 'react'

import { useGetLeatherArticle } from '@/features/leatherArticles/hooks/useGetLeatherArticle'
import { useRemoveLeatherArticle } from '@/features/leatherArticles/hooks/useRemoveLeatherArticle'
import { LeatherArticleInfo } from '@/features/leatherArticles/ui/leatherArticleInfo'
import { ModalLayout } from '@/shared/components/modals/modalLayout'

type PropsType = {
  closeModal: () => void
  id: string
  isOpen: boolean
}

export const LeatherArticleModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const { data: article } = useGetLeatherArticle(id, { enabled: isOpen })
  const { mutateAsync: removeArticle } = useRemoveLeatherArticle()

  const onDeleteConfirm = async (): Promise<void> => {
    try {
      await removeArticle({ factoryId: article?.factory._id || '', articleId: id })
      closeModal()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <ModalLayout
      closeModal={closeModal}
      isOpen={isOpen}
      title={`Информация об артикле ${article?.title}`}
    >
      {article && (
        <div className="flex gap-4 p-4">
          <LeatherArticleInfo article={article} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
