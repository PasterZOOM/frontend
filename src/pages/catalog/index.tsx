import { FC, useEffect } from 'react'

import { GetStaticProps } from 'next'

import { CurrencyService } from '@/api/currency/currencyApi'
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

  return <Products />
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
