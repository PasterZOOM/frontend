import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { MainLayout } from 'layouts/mainLayout'
import { NextPageWithLayout } from 'pages/_app'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  }
}

const CardHolderPage: NextPageWithLayout = () => {
  return <>card holder</>
}

CardHolderPage.getLayout = MainLayout
export default CardHolderPage
