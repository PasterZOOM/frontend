import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
import { useRedirect } from 'hooks/useRedirect'
import { CrmLayout } from 'layouts/crmLayout'
import { NextPageWithLayout } from 'pages/_app'

const Crm: NextPageWithLayout = () => {
  useRedirect()

  return (
    <TypographyHeader as="h1" className="text-center">
      CRM
    </TypographyHeader>
  )
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
