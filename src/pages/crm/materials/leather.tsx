import { FC } from 'react'

import { useQuery } from 'react-query'

import { AddLeatherArticleForm } from '@/components/common/forms/crm/addLeatherArticleForm'
import { AddLeatherFactoryForm } from '@/components/common/forms/crm/addLeatherFactoryForm'
import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'
import { LeatherArticleModal } from '@/components/modals/crm/leatherArticleModal'
import { LeatherFactoryModal } from '@/components/modals/crm/leatherFactoryModal'
import { TableItem } from '@/components/pages/crm/tableItem'
import { useSrmServiceStore } from '@/store/crmServises'

const Leather: FC = () => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const { data: factories } = useQuery('getAllFactories', leatherFactoryService.getAll)
  const { data: articles } = useQuery('getAllArticles', leatherArticlesService.getAll)

  return (
    <CrmMenuLayout>
      <H1 className="text-center">Кожа</H1>

      <div className="flex gap-4">
        <div className="space-y-2">
          <AddLeatherFactoryForm />
          <div>
            {factories &&
              factories.map(factory => (
                <TableItem key={factory._id} name={factory.name}>
                  {({ close, isOpen }) => (
                    <LeatherFactoryModal closeModal={close} isOpen={isOpen} factory={factory} />
                  )}
                </TableItem>
              ))}
          </div>
        </div>

        <div className="space-y-2">
          <AddLeatherArticleForm />
          <div>
            {articles &&
              articles.map(article => (
                <TableItem key={article._id} name={article.name}>
                  {({ close, isOpen }) => (
                    <LeatherArticleModal closeModal={close} isOpen={isOpen} article={article} />
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
