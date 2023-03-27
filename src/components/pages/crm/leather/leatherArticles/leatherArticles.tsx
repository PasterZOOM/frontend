import { FC } from 'react'

import { CreateFormAndListWrapper } from '@/components/common/wrappers/createFormAndListWrapper'
import { CreateLeatherArticleForm } from '@/components/forms/crm/leatherArticle/createLeatherArticleForm'
import { LeatherArticleModal } from '@/components/modals/crm/leatherArticle/leatherArticleModal'
import { TableItem } from '@/components/pages/crm/tableItem'
import { useGetAllLeatherArticles } from '@/hooks/crm/leatherArticles/useGetAllLeatherArticles'

type PropsType = {
  className?: string
}

export const LeatherArticles: FC<PropsType> = ({ className }) => {
  const articles = useGetAllLeatherArticles()

  return (
    <CreateFormAndListWrapper
      title="Список артикулов:"
      form={<CreateLeatherArticleForm />}
      className={className}
    >
      {articles.map(article => (
        <TableItem key={article._id} name={article.name}>
          {({ closeModal, isOpen }) => (
            <LeatherArticleModal closeModal={closeModal} isOpen={isOpen} id={article._id} />
          )}
        </TableItem>
      ))}
    </CreateFormAndListWrapper>
  )
}
