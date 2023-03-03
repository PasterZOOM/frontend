import { FC, useEffect, useState } from 'react'

import { GetStaticProps } from 'next'

import { CurrencyService } from '@/api/currency/currencyApi'
import FilterContainer from '@/components/common/containers/filterContainer'
import { MainContainer } from '@/components/common/containers/mainContainer'
import AccordionWrapper from '@/components/common/ui/accordion/accordionWrapper'
import FilterButtons from '@/components/common/ui/buttons/filterButtons'
import Products from '@/components/pages/catalog/products'
import { TWELVE_HOURS } from '@/constants/date/time'
import { ECost, TCost } from '@/enums/cost'
import { initialCurrencyState, useCurrencyStore } from '@/store/useCurrencyStore'
import { CostType } from '@/types/costType'

const Catalog: FC<{ rates: CostType }> = ({ rates }) => {
  const setActualRates = useCurrencyStore(store => store.setActualRates)
  const [isOpenFilters, setIsOpenFilters] = useState(true)

  useEffect(() => {
    setActualRates(rates)
  }, [])

  return (
    <>
      <MainContainer className="grid-cols-12 gap-6 py-5 lg:grid">
        <div className="col-span-2">
          <FilterContainer open={isOpenFilters} setOpen={setIsOpenFilters} className="lg:top-18">
            <AccordionWrapper title="Категории" classes={{ wrapper: 'px-4 md:px-6 lg:px-0' }}>
              <div className="pt-4">
                <div>Для карт</div>
                <div>Для купюр</div>
                <div>Для документов</div>
                <div>Для монет</div>
              </div>
            </AccordionWrapper>
            <AccordionWrapper title="Кожа" classes={{ wrapper: 'px-4 md:px-6 lg:px-0' }}>
              <div className="pt-4">
                <div>Buttero</div>
                <div>WAX</div>
                <div>Pueblo</div>
              </div>
            </AccordionWrapper>
            <AccordionWrapper title="Цвета" classes={{ wrapper: 'px-4 md:px-6 lg:px-0' }}>
              <div className="pt-4">
                <div>Красный</div>
                <div>Черный</div>
                <div>Зеленый</div>
              </div>
            </AccordionWrapper>
          </FilterContainer>
        </div>
        <div className="col-span-10">
          <Products />
        </div>
      </MainContainer>
      <FilterButtons open={isOpenFilters} setOpen={setIsOpenFilters} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const currencyService = new CurrencyService()

  const rates: CostType = initialCurrencyState

  await Promise.all(
    Object.keys(ECost)
      .filter(costKey => costKey !== ECost.BYN)
      .map(async costKey => {
        const rate = await currencyService.getRate(costKey as TCost)

        rates[costKey as ECost] = +(rate.Cur_Scale / rate.Cur_OfficialRate)
      })
  )

  return { props: { rates }, revalidate: TWELVE_HOURS }
}
export default Catalog
