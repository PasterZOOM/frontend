import { FC, useEffect, useState } from 'react'

import { GetStaticProps } from 'next'

import { CurrencyService } from '@/api/currency/currencyApi'
import { MainContainer } from '@/components/common/containers/mainContainer'
import FilterButtons from '@/components/common/ui/buttons/filterButtons'
import { CatalogFilters } from '@/components/pages/catalog/filters/catalogFilters'
import Products from '@/components/pages/catalog/products'
import { TWELVE_HOURS } from '@/constants/date/time'
import { ECost, TCost } from '@/enums/cost'
import { BasicProductsService } from '@/features/basicProducts/api/basicProductsService'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useGetAllBasicProducts } from '@/features/basicProducts/hooks/useGetAllBasicProducts'
import { LeatherArticlesService } from '@/features/leatherArticles/api/leatherArticlesService'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { initialCurrencyState, useCurrencyStore } from '@/store/useCurrencyStore'
import { CostType } from '@/types/costType'

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

export const getStaticProps: GetStaticProps = async () => {
  // TODO: добавить в запрос за изелиями фильтра
  const currencyService = new CurrencyService()
  const leatherArticlesService = new LeatherArticlesService()
  const basicProductsService = new BasicProductsService()

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
  const basicProducts = await basicProductsService.getAll() // TODO: попробовать вынести в getServerSiteProps

  return { props: { rates, articles, basicProducts }, revalidate: TWELVE_HOURS }
}
export default Catalog
