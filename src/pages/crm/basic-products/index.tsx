import { FC } from 'react'

import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'
import { BasicProducts } from '@/components/pages/crm/leather/basicProducts/basicProducts'

const BasicProductsPage: FC = () => {
  return (
    <CrmMenuLayout>
      <H1 className="mb-6 text-center">Базовые изделия</H1>
      <div className="flex gap-4">
        <BasicProducts className="w-full" />
      </div>
    </CrmMenuLayout>
  )
}

export default BasicProductsPage
