import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { BasicProducts } from 'components/pages/crm/basic-products/basic-products'
import { CrmLayout } from 'layouts/crmLayout'
import { NextPageWithLayout } from 'pages/_app'

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
