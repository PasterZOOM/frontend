import { FC } from 'react'

import { TableItem } from 'components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from 'components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherArticleForm } from 'features/leatherArticles/forms/createLeatherArticleForm'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { LeatherArticleModal } from 'features/leatherArticles/modals/leatherArticleModal'

type PropsType = {
  className?: string
}

export const LeatherArticles: FC<PropsType> = ({ className }) => {
  const { data: articles } = useGetAllLeatherArticles()

  // useRefetchAfterChangeLocale(refetch)

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
