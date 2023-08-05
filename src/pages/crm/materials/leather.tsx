import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Leather } from 'components/pages/crm/materials/leather'
import { NextPageWithLayout } from 'pages/_app'
import { CrmLayout } from 'widgets/layouts/crmLayout'

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
