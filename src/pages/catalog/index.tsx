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
import { FiltersType } from 'store/useBasicProductsFilterStore'
import {
  initialCurrencyRatesState,
  selectSetActualRates,
  useCurrencyRatesStore,
} from 'store/useCurrencyRatesStore'
import { CostType } from 'types/costType'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const rates: CostType = initialCurrencyRatesState

  await Promise.all(
    (Object.keys(ECost) as ECost[]).map(async costKey => {
      const rate = await CurrencyAPI.getRate(costKey)

      if (costKey !== ECost.BYN) {
        rates[costKey] = rate.Cur_Scale / rate.Cur_OfficialRate
      } else {
        rates[costKey] = rate.Cur_OfficialRate
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
    queryFn: () => BasicProductsAPI.getAll(query as FiltersType),
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
  const setActualRates = useCurrencyRatesStore(selectSetActualRates)

  useEffect(() => {
    setActualRates(rates)
  }, [rates, setActualRates])

  return <Catalog />
}

CatalogPage.getLayout = MainLayout
export default CatalogPage
