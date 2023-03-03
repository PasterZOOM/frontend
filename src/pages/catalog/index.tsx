import { FC, useEffect } from 'react'

import { GetStaticProps } from 'next'

import { CurrencyService } from '@/api/currency/currencyApi'
import { MainContainer } from '@/components/common/containers/mainContainer'
import AccordionWrapper from '@/components/common/ui/accordion/accordionWrapper'
import Products from '@/components/pages/catalog/products'
import { TWELVE_HOURS } from '@/constants/date/time'
import { ECost, TCost } from '@/enums/cost'
import { initialCurrencyState, useCurrencyStore } from '@/store/useCurrencyStore'
import { CostType } from '@/types/costType'

const Catalog: FC<{ rates: CostType }> = ({ rates }) => {
  const setActualRates = useCurrencyStore(store => store.setActualRates)

  useEffect(() => {
    setActualRates(rates)
  }, [])

  return (
    <MainContainer className="grid-cols-12 gap-6 py-5 lg:grid">
      <div className="col-span-2 hidden lg:block">
        <AccordionWrapper title="Категории">
          <div className="pt-4">
            <div>Для карт</div>
            <div>Для купюр</div>
            <div>Для документов</div>
            <div>Для монет</div>
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Кожа">
          <div className="pt-4">
            <div>Buttero</div>
            <div>WAX</div>
            <div>Pueblo</div>
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Цвета">
          <div className="pt-4">
            <div>Красный</div>
            <div>Черный</div>
            <div>Зеленый</div>
          </div>
        </AccordionWrapper>
      </div>
      <div className="col-span-10">
        <Products />
      </div>
    </MainContainer>
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
