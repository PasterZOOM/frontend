import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { NextPageWithLayout } from 'pages/_app'
import { MainLayout } from 'widgets/layouts/mainLayout'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  }
}

const CardHolderPage: NextPageWithLayout = () => {
  const { t } = useTranslation()

  return <>{t('card holder')}</>
}

CardHolderPage.getLayout = MainLayout
export default CardHolderPage
