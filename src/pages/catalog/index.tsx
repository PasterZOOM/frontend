import { useEffect, useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { CurrencyAPI } from 'api/currency/currencyApi'
import { MainContainer } from 'components/common/containers/mainContainer'
import Header from 'components/common/header/header'
import FilterButtons from 'components/common/ui/buttons/filterButtons'
import { CatalogFilters } from 'components/pages/catalog/filters/catalogFilters'
import Products from 'components/pages/catalog/products'
import { ECost, TCost } from 'enums/cost'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import {
  initialCurrencyState,
  selectSetActualRates,
  useCurrencyStore,
} from 'store/useCurrencyStore'
import { CostType } from 'types/costType'
import { getQueryFilters } from 'utils/filters/getQueryFilters'

type PropsType = {
  rates: CostType
}

const Catalog: NextPage<PropsType> = ({ rates }: PropsType) => {
  const setActualRates = useCurrencyStore(selectSetActualRates)
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  useEffect(() => {
    setActualRates(rates)
  }, [])

  return (
    <>
      <Header />
      <MainContainer className="min-h-[calc(100vh-9.625rem)] grid-cols-12 gap-6 py-5 md:min-h-[calc(100vh-10.625rem)] xl:grid xl:min-h-fit">
        <CatalogFilters
          isOpenFilters={isOpenFilters}
          setIsOpenFilters={setIsOpenFilters}
          className="col-span-2"
        />
        <Products className="col-span-10" />
      </MainContainer>
      {/* кнопки фильтров для мобильной версии */}
      <FilterButtons open={isOpenFilters} setOpen={setIsOpenFilters} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const rates: CostType = initialCurrencyState
  const filters = getQueryFilters(query)

  await Promise.all(
    Object.keys(ECost)
      .filter(costKey => costKey !== ECost.BYN)
      .map(async costKey => {
        const rate = await CurrencyAPI.getRate(costKey as TCost)

        rates[costKey as ECost] = +(rate.Cur_Scale / rate.Cur_OfficialRate)
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
export default Catalog
