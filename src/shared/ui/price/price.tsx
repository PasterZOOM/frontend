import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { useGetFormattedPrice } from 'features/currancy/hooks/useGetFormattedPrice'
import { DEFAULT_PRODUCT_CURRENCY } from 'features/currancy/lib/consts/defaultProductCurrency'
import { selectRate, useCurrencyRatesStore } from 'features/currancy/store/useCurrencyRatesStore'
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
  const getFormattedPrice = useGetFormattedPrice()

  return (
    <div className={`flex gap-2 pb-3 ${className}`}>
      <div>{currentCurrencyPrice.title}</div>
      {DEFAULT_PRODUCT_CURRENCY !== currentCurrency && !!rate && (
        <div className="opacity-60">{getFormattedPrice(cost, DEFAULT_PRODUCT_CURRENCY)}</div>
      )}
      {!rate && <div className="text-sm text-red-500">{t('Failed to load exchange rates')}</div>}
    </div>
  )
}
