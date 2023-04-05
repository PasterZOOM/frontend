import { FC, useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'

import { CurrencyService } from '@/api/currency/currencyApi'
import { MainContainer } from '@/components/common/containers/mainContainer'
import FilterButtons from '@/components/common/ui/buttons/filterButtons'
import { CatalogFilters } from '@/components/pages/catalog/filters/catalogFilters'
import Products from '@/components/pages/catalog/products'
import { ECost, TCost } from '@/enums/cost'
import { BasicProductsService } from '@/features/basicProducts/api/basicProductsService'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useGetAllBasicProducts } from '@/features/basicProducts/hooks/useGetAllBasicProducts'
import { LeatherArticlesService } from '@/features/leatherArticles/api/leatherArticlesService'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { initialCurrencyState, useCurrencyStore } from '@/store/useCurrencyStore'
import { CostType } from '@/types/costType'
import { getQueryFilters } from '@/utils/filters/getQueryFilters'

type PropsType = {
  rates: CostType
  articles: LeatherArticleType[]
  basicProducts: BasicProductType[]
}

const Catalog: FC<PropsType> = ({ rates, articles, basicProducts }) => {
  useGetAllLeatherArticles({ initialData: articles })
  useGetAllBasicProducts({ initialData: basicProducts })
  const setActualRates = useCurrencyStore(store => store.setActualRates)
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  useEffect(() => {
    setActualRates(rates)
  }, [])

  return (
    <>
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

/* export const getStaticProps: GetStaticProps = async () => {
  const basicProductsService = new BasicProductsService()
  const currencyService = new CurrencyService()
  const leatherArticlesService = new LeatherArticlesService()

  const rates: CostType = initialCurrencyState

  await Promise.all(
    Object.keys(ECost)
      .filter(costKey => costKey !== ECost.BYN)
      .map(async costKey => {
        const rate = await currencyService.getRate(costKey as TCost)

        rates[costKey as ECost] = +(rate.Cur_Scale / rate.Cur_OfficialRate)
      })
  )

  const articles = await leatherArticlesService.getAll()
  const basicProducts = await basicProductsService.getAll(filters)

  return { props: { basicProducts, rates, articles }, revalidate: TWELVE_HOURS }
} */

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const basicProductsService = new BasicProductsService()
  const currencyService = new CurrencyService()
  const leatherArticlesService = new LeatherArticlesService()

  const rates: CostType = initialCurrencyState
  const filters = getQueryFilters(query)

  await Promise.all(
    Object.keys(ECost)
      .filter(costKey => costKey !== ECost.BYN)
      .map(async costKey => {
        const rate = await currencyService.getRate(costKey as TCost)

        rates[costKey as ECost] = +(rate.Cur_Scale / rate.Cur_OfficialRate)
      })
  )

  const basicProducts = await basicProductsService.getAll(filters)
  const articles = await leatherArticlesService.getAll()

  return { props: { basicProducts, rates, articles } }
}
export default Catalog
