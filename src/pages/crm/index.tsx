import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { NextPageWithLayout } from '@/pages/_app'
import { useRedirect } from '@/shared/lib/hooks/useRedirect'
import { TypographyHeader } from '@/shared/ui/typographyHeader/typographyHeader'
import { CrmLayout } from '@/widgets/layouts/crmLayout'

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
