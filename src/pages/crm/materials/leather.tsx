import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Leather } from 'components/pages/crm/materials/leather'
import { CrmLayout } from 'layouts/crmLayout'
import { NextPageWithLayout } from 'pages/_app'

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
