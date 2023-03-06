import { FC, useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'

import { CurrencyService } from '@/api/currency/currencyApi'
import { MainContainer } from '@/components/common/containers/mainContainer'
import FilterButtons from '@/components/common/ui/buttons/filterButtons'
import { CatalogFilters } from '@/components/pages/catalog/filters/catalogFilters'
import Products from '@/components/pages/catalog/products'
import { ECost, TCost } from '@/enums/cost'
import { productsMock } from '@/mocks/productsMock'
import { initialCurrencyState, useCurrencyStore } from '@/store/useCurrencyStore'
import { useProductStore } from '@/store/useProductStore'
import { CostType } from '@/types/costType'
import { ProductType } from '@/types/productType'

type PropsType = { rates: CostType; products: ProductType[] }
const Catalog: FC<PropsType> = ({ rates, products }) => {
  const setActualRates = useCurrencyStore(store => store.setActualRates)
  const setProducts = useProductStore(store => store.setProducts)
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  useEffect(() => {
    setActualRates(rates)
    setProducts(products || [])
  }, [])

  return (
    <>
      <MainContainer className="grid-cols-12 gap-6 py-5 lg:grid">
        <CatalogFilters
          isOpenFilters={isOpenFilters}
          setIsOpenFilters={setIsOpenFilters}
          className="col-span-2"
        />
        <Products className="col-span-10" />
      </MainContainer>
      {/* кнопи фильтров для мобильной версии */}
      <FilterButtons open={isOpenFilters} setOpen={setIsOpenFilters} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const currencyService = new CurrencyService()

  const products = productsMock

  const rates: CostType = initialCurrencyState

  await Promise.all(
    Object.keys(ECost)
      .filter(costKey => costKey !== ECost.BYN)
      .map(async costKey => {
        const rate = await currencyService.getRate(costKey as TCost)

        rates[costKey as ECost] = +(rate.Cur_Scale / rate.Cur_OfficialRate)
      })
  )

  return { props: { rates, products } }
}
export default Catalog
