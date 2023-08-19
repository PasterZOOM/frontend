import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { NextPageWithLayout } from 'pages/_app'
import { Catalog } from 'shared/components/pages/catalog/catalog'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { FiltersType } from 'store/useBasicProductsFilterStore'
import { MainLayout } from 'widgets/layouts/mainLayout'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_ALL_ARTICLES],
    queryFn: LeatherArticlesAPI.getAll,
  })

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS],
    queryFn: () => BasicProductsAPI.getAll(query as FiltersType),
  })

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['catalog', 'common'])),
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const CatalogPage: NextPageWithLayout = () => {
  return <Catalog />
}

CatalogPage.getLayout = MainLayout
export default CatalogPage
