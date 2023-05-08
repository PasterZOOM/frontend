import { FC } from 'react'

import { ModalLayout } from 'components/modals/modalLayout'
import { useGetLeatherArticle } from 'features/leatherArticles/hooks/useGetLeatherArticle'
import { useRemoveLeatherArticle } from 'features/leatherArticles/hooks/useRemoveLeatherArticle'
// eslint-disable-next-line import/no-cycle
import { LeatherArticleInfo } from 'features/leatherArticles/ui/leatherArticleInfo'
import { useRefetchAfterChangeLocale } from 'hooks/useRefetchAfterChangeLocale'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherArticleModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const { data: article, refetch } = useGetLeatherArticle(id, { enabled: isOpen })
  const { mutateAsync: removeArticle } = useRemoveLeatherArticle()

  useRefetchAfterChangeLocale(refetch)

  const onDeleteConfirm = async (): Promise<void> => {
    try {
      await removeArticle(id)
      closeModal()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
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
