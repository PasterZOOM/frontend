import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { NextPageWithLayout } from '@/pages/_app'
import { Leather } from '@/shared/components/pages/crm/materials/leather'
import { CrmLayout } from '@/widgets/layouts/crmLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  }
}

const LeatherPage: NextPageWithLayout = () => <Leather />

LeatherPage.getLayout = CrmLayout

export default LeatherPage
