import { FC } from 'react'

import { CreateLeatherArticleForm } from '@/features/leatherArticles/forms/ui/createLeatherArticleForm'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { LeatherArticleModal } from '@/features/leatherArticles/modals/leatherArticleModal'
import { CreateFormAndListWrapper } from '@/shared/components/common/wrappers/createFormAndListWrapper'
import { TableItem } from '@/shared/ui/tabel/tableItem'

type PropsType = {
  className?: string
}

export const LeatherArticles: FC<PropsType> = ({ className }) => {
  const { data: articles } = useGetAllLeatherArticles()

  return (
    <CreateFormAndListWrapper
      className={className}
      form={<CreateLeatherArticleForm />}
      title="Список артикулов:"
    >
      {articles &&
        articles.map(article => (
          <TableItem key={article._id} title={article.title}>
            {({ closeModal, isOpen }) => (
              <LeatherArticleModal closeModal={closeModal} id={article._id} isOpen={isOpen} />
            )}
          </TableItem>
        ))}
    </CreateFormAndListWrapper>
  )
}
