import { FC } from 'react'

import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'

const BasicProducts: FC = () => {
  return (
    <CrmMenuLayout>
      <H1 className="text-center">Базовые изделия</H1>
    </CrmMenuLayout>
  )
}

export default BasicProducts
