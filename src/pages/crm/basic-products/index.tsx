import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { BasicProducts } from 'components/pages/crm/basic-products/basic-products'
import { NextPageWithLayout } from 'pages/_app'
import { CrmLayout } from 'widgets/layouts/crmLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['catalog', 'common'])),
    },
  }
}

const BasicProductsPage: NextPageWithLayout = () => <BasicProducts />

BasicProductsPage.getLayout = CrmLayout

export default BasicProductsPage
