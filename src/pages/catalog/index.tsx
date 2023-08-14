import { useEffect } from 'react'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { NextPageWithLayout } from 'pages/_app'
import { CurrencyAPI } from 'shared/api/currency/currencyApi'
import { Catalog } from 'shared/components/pages/catalog/catalog'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { CostType } from 'shared/types/costType'
import { FiltersType } from 'store/useBasicProductsFilterStore'
import {
  initialCurrencyRatesState,
  selectSetActualRates,
  useCurrencyRatesStore,
} from 'store/useCurrencyRatesStore'
import { MainLayout } from 'widgets/layouts/mainLayout'
import { ECost } from 'widgets/switchers/currencySwitcher/module/enum'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const rates: CostType = initialCurrencyRatesState

  await Promise.all(
    (Object.keys(ECost) as ECost[]).map(async costKey => {
      const rate = await CurrencyAPI.getRate(costKey)

      if (costKey === ECost.RUB) {
        rates[costKey] = rate.Cur_Scale / rate.Cur_OfficialRate // * 1.1 коэффициент разницы курса нацбанка и курса в банках для росс.рубля
      } else if (costKey !== ECost.BYN) {
        rates[costKey] = rate.Cur_Scale / rate.Cur_OfficialRate //  / 1.012 коэффициент разницы курса нацбанка и курса в банках
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
