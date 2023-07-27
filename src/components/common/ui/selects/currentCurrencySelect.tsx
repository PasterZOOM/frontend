import { FC, useEffect, useState } from 'react'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { Select } from 'components/common/ui/selects/select'
import { ECost } from 'enums/cost'
import { useCurrencyTitle } from 'hooks/useCurrencyTitle'
import { useLocale } from 'hooks/useLocale'
import { currencies, currencyArray } from 'objects/currency/currency'
import {
  selectCurrentCurrency,
  selectSetCurrentCurrency,
  useUserSettings,
} from 'store/useUserSettings'

const CurrencyElement: FC<SelectItemType<ECost>> = currency => {
  const title = useCurrencyTitle(currency)

  return <span>{title}</span>
}

export const CurrentCurrencySelect: FC = () => {
  const locale = useLocale()
  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const setCurrentCurrency = useUserSettings(selectSetCurrentCurrency)

  const [activeCurrency, setActiveCurrency] = useState<SelectItemType<ECost>>(currencies[ECost.BYN])

  useEffect(() => {
    setCurrentCurrency(activeCurrency.value)
  }, [activeCurrency, setCurrentCurrency])

  useEffect(() => {
    setActiveCurrency(currencies[currentCurrency])
  }, [currentCurrency, locale])

  return (
    <Select
      activeItem={activeCurrency}
      elementToLabel={CurrencyElement}
      items={currencyArray()}
      setActiveItem={setActiveCurrency}
    />
  )
}
