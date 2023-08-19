import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { NextPageWithLayout } from 'pages/_app'
import { CardHolder } from 'shared/components/pages/products/card_holder'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { LOCALES } from 'shared/types/localeType'
import { MainLayout } from 'widgets/layouts/mainLayout'

export const getServerSideProps: GetServerSideProps<NonNullable<unknown>, { id: string }> = async ({
  locale,
  params,
}) => {
  const { id } = params || { id: '' }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_BASIC_PRODUCT, id, locale],
    queryFn: () => BasicProductsAPI.getOne(id),
  })

  return {
    props: {
      ...(await serverSideTranslations(locale ?? LOCALES.RU, ['common'])),
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const CardHolderPage: NextPageWithLayout = () => {
  return <CardHolder />
}

CardHolderPage.getLayout = MainLayout
export default CardHolderPage
