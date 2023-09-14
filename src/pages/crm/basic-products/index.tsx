import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { NextPageWithLayout } from '@/pages/_app'
import { BasicProducts } from '@/shared/components/pages/crm/basic-products/basic-products'
import { CrmLayout } from '@/widgets/layouts/crmLayout'

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
