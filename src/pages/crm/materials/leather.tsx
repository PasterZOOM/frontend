import { FC, useEffect, useState } from 'react'

import { LeatherFactoryType } from '@/api/crm/leatherFactoryApi/types'
import { AddLeatherFactoryForm } from '@/components/common/forms/crm/addLeatherFactoryForm'
import { CrmMenuLayout } from '@/components/common/layouts/crmMenuLayout'
import { H1 } from '@/components/common/ui/headers/h1'
import { useSrmServiceStore } from '@/store/crmServises'

const Leather: FC = () => {
  const [factories, setFactories] = useState<LeatherFactoryType[]>([])
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  useEffect(() => {
    leatherFactoryService.getAll().then(res => setFactories(res))
  }, [])

  return (
    <CrmMenuLayout>
      <H1 className="text-center">Кожа</H1>
      <AddLeatherFactoryForm />
      <table>
        <thead>
          <tr>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {factories.map(factory => (
            <tr key={factory._id}>
              <td>{factory.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CrmMenuLayout>
  )
}

export default Leather
