import { FC } from 'react'

import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'
import { LeatherArticles } from '@/components/pages/crm/leather/leatherArticles'
import { LeatherColors } from '@/components/pages/crm/leather/leatherColors'
import LeatherFactories from '@/components/pages/crm/leather/leatherFactories'

const Leather: FC = () => {
  return (
    <CrmMenuLayout>
      <H1 className="mb-6 text-center">Кожа</H1>

      <div className="flex gap-4">
        <LeatherFactories className="w-full" />

        <LeatherArticles className="w-full" />

        <LeatherColors className="w-full" />
      </div>
    </CrmMenuLayout>
  )
}

export default Leather
