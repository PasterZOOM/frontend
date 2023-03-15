import { FC } from 'react'

import { AddLeatherArticleForm } from '@/components/common/forms/crm/leatherArticle/addLeatherArticleForm'
import { AddLeatherFactoryForm } from '@/components/common/forms/crm/leatherFactory/addLeatherFactoryForm'
import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'
import { CreateFormAndListWrapper } from '@/components/common/wrappers/createFormAndListWrapper'
import { LeatherArticleModal } from '@/components/modals/crm/leatherArticle/leatherArticleModal'
import { LeatherFactoryModal } from '@/components/modals/crm/leatherFactory/leatherFactoryModal'
import { TableItem } from '@/components/pages/crm/tableItem'
import { useGetAllLeatherArticles } from '@/hooks/crm/leatherArticles/useGetAllLeatherArticles'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'

const Leather: FC = () => {
  const factories = useGetAllLeatherFactories()
  const articles = useGetAllLeatherArticles()

  return (
    <CrmMenuLayout>
      <H1 className="mb-6 text-center">Кожа</H1>

      <div className="flex gap-4">
        <CreateFormAndListWrapper
          title="Список фабрик:"
          form={<AddLeatherFactoryForm />}
          className="w-full"
        >
          {factories.map(factory => (
            <TableItem key={factory._id} name={factory.name}>
              {({ closeModal, isOpen }) => (
                <LeatherFactoryModal closeModal={closeModal} isOpen={isOpen} id={factory._id} />
              )}
            </TableItem>
          ))}
        </CreateFormAndListWrapper>

        <CreateFormAndListWrapper
          title="Список артикулов:"
          form={<AddLeatherArticleForm />}
          className="w-full"
        >
          {articles.map(article => (
            <TableItem key={article._id} name={article.name}>
              {({ closeModal, isOpen }) => (
                <LeatherArticleModal closeModal={closeModal} isOpen={isOpen} id={article._id} />
              )}
            </TableItem>
          ))}
        </CreateFormAndListWrapper>
      </div>
    </CrmMenuLayout>
  )
}

export default Leather
