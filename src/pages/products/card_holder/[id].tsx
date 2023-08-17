import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { NextPageWithLayout } from 'pages/_app'
import { CardHolder } from 'shared/components/pages/products/card_holder'
import { MainLayout } from 'widgets/layouts/mainLayout'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  }
}

const CardHolderPage: NextPageWithLayout = () => {
  return <CardHolder />
}

CardHolderPage.getLayout = MainLayout
export default CardHolderPage
