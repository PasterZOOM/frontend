import { useEffect } from 'react'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { CurrencyAPI } from 'api/currency/currencyApi'
import { Catalog } from 'components/pages/catalog/catalog'
import { ECost } from 'enums/cost'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { MainLayout } from 'layouts/mainLayout'
import { NextPageWithLayout } from 'pages/_app'
import {
  initialCurrencyState,
  selectSetActualRates,
  useCurrencyStore,
} from 'store/useCurrencyStore'
import { CostType } from 'types/costType'
import { getQueryFilters } from 'utils/filters/getQueryFilters'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const rates: CostType = initialCurrencyState
  const filters = getQueryFilters(query)

  await Promise.all(
    (Object.keys(ECost) as ECost[]).map(async costKey => {
      if (costKey !== ECost.BYN) {
        const rate = await CurrencyAPI.getRate(costKey)

        rates[costKey] = +(rate.Cur_Scale / rate.Cur_OfficialRate)
      }
    })
  )

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_ALL_ARTICLES],
    queryFn: LeatherArticlesAPI.getAll,
  })

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS],
    queryFn: () => BasicProductsAPI.getAll(filters),
  })

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['catalog', 'common'])),
      dehydratedState: dehydrate(queryClient),
      rates,
    },
  }
}

type PropsType = {
  rates: CostType
}

const CatalogPage: NextPageWithLayout<PropsType> = ({ rates }: PropsType) => {
  const setActualRates = useCurrencyStore(selectSetActualRates)

  useEffect(() => {
    setActualRates(rates)
  }, [])

  return <Catalog />
}

CatalogPage.getLayout = MainLayout
export default CatalogPage
