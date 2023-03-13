import { FC } from 'react'

import { AddLeatherArticleForm } from '@/components/common/forms/crm/addLeatherArticleForm'
import { AddLeatherFactoryForm } from '@/components/common/forms/crm/addLeatherFactoryForm'
import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'
import { H5 } from '@/components/common/ui/headers/h5'
import { LeatherArticleModal } from '@/components/modals/crm/leatherArticleModal'
import { LeatherFactoryModal } from '@/components/modals/crm/leatherFactoryModal'
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
        {/* TODO сделать врапер для форм и списков */}
        <div>
          <AddLeatherFactoryForm />
          <H5 className="mb-2 mt-4 font-bold">Список фабрик:</H5>
          <div className="ml-4">
            {factories.map(factory => (
              <TableItem key={factory._id} name={factory.name}>
                {({ close, isOpen }) => (
                  <LeatherFactoryModal closeModal={close} isOpen={isOpen} id={factory._id} />
                )}
              </TableItem>
            ))}
          </div>
        </div>

        <div>
          <AddLeatherArticleForm />
          <H5 className="mb-2 mt-4 font-bold">Список артикулов:</H5>
          <div className="ml-4">
            {articles.map(article => (
              <TableItem key={article._id} name={article.name}>
                {({ close, isOpen }) => (
                  <LeatherArticleModal closeModal={close} isOpen={isOpen} id={article._id} />
                )}
              </TableItem>
            ))}
          </div>
        </div>
      </div>
    </CrmMenuLayout>
  )
}

export default Leather
