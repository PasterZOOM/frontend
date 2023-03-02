import { FC, useEffect } from 'react'

import { GetStaticProps } from 'next'
import { Head, Html, Main, NextScript } from 'next/document'

import { TWELVE_HOURS } from '@/constants/date/time'
import { ECost, TCost } from '@/enums/cost'
import { CurrencyService } from '@/pages/api/currency/currencyApi'
import { initialCurrencyState, useCurrencyStore } from '@/store/useCurrencyStore'
import { CostType } from '@/types/costType'

const Document: FC<{ rates: CostType }> = ({ rates }) => {
  const setActualRates = useCurrencyStore(store => store.setActualRates)

  useEffect(() => {
    setActualRates(rates)
  }, [])

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
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
export default Document
