import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { selectRate, useCurrencyRatesStore } from 'features/currancy/store/useCurrencyRatesStore'
import { DEFAULT_PRODUCT_CURRENCY } from 'shared/constants/currancy/defaultProductCurrency'
import { CurrencySign } from 'shared/enums/currencySign'
import { useGetPriceInCurrency } from 'shared/lib/hooks/useGetPriceInCurrency'
import { selectCurrentCurrency, useUserSettings } from 'store/useUserSettings'

type PropsType = {
  className?: string
  cost: number
}
export const Price: FC<PropsType> = ({ cost, className = '' }) => {
  const { t } = useTranslation('catalog')

  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const rate = useCurrencyRatesStore(selectRate(currentCurrency))

  const currentCurrencyPrice = useGetPriceInCurrency(cost)

  return (
    <div className={`flex gap-2 pb-3 ${className}`}>
      <div>{currentCurrencyPrice.title}</div>
      {DEFAULT_PRODUCT_CURRENCY !== currentCurrency && !!rate && (
        <div className="opacity-60">{`${CurrencySign[DEFAULT_PRODUCT_CURRENCY]}${cost}`}</div>
      )}
      {!rate && <div className="text-sm text-red-500">{t('Failed to load exchange rates')}</div>}
    </div>
  )
}
