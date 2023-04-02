import { FC } from 'react'

import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'
import { BasicProducts } from '@/features/basicProducts/pages/basicProducts'
import { useRedirect } from '@/hooks/useRedirect'

const BasicProductsPage: FC = () => {
  useRedirect()

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
