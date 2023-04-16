import { H1 } from '@/components/common/ui/headers/h1'
import { useRedirect } from '@/hooks/useRedirect'
import { CrmLayout } from '@/layouts/crmLayout'
import { NextPageWithLayout } from '@/pages/_app'

const Threads: NextPageWithLayout = () => {
  useRedirect()

  return <H1 className="text-center">Нитки</H1>
}

Threads.getLayout = CrmLayout

export default Threads
