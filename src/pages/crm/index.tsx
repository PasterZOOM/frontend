import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { H1 } from 'components/common/ui/headers/h1'
import { useRedirect } from 'hooks/useRedirect'
import { CrmLayout } from 'layouts/crmLayout'
import { NextPageWithLayout } from 'pages/_app'

const Crm: NextPageWithLayout = () => {
  useRedirect()

  return <H1 className="text-center">CRM</H1>
}

Crm.getLayout = CrmLayout

export default Crm

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  }
}
