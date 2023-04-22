import { H1 } from 'components/common/ui/headers/h1'
import { BasicProducts } from 'features/basicProducts/ui/basicProducts'
import { useRedirect } from 'hooks/useRedirect'
import { CrmLayout } from 'layouts/crmLayout'
import { NextPageWithLayout } from 'pages/_app'

const BasicProductsPage: NextPageWithLayout = () => {
  useRedirect()

  return (
    <>
      <H1 className="mb-6 text-center">Базовые изделия</H1>
      <div className="flex gap-4">
        <BasicProducts className="w-full" />
      </div>
    </>
  )
}

BasicProductsPage.getLayout = CrmLayout

export default BasicProductsPage
