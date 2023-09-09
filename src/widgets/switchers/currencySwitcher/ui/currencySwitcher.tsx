import { FC, useEffect, useState } from 'react'

import { useCurrencyTitle } from '../module/lib/hooks/useCurrencyTitle'

import { currencies, currencyArray } from 'features/currancy/lib/consts/currency'
import { ECost } from 'features/currancy/lib/enum/eCost'
import { useIsFirstRender } from 'shared/lib/hooks/useFirstRender'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { Select } from 'shared/ui/selects/select'
import {
  selectCurrentCurrency,
  selectSetCurrentCurrency,
  useUserSettings,
} from 'store/useUserSettings'

const CurrencyElement: FC<SelectItemType<ECost>> = currency => {
  const title = useCurrencyTitle(currency)

  return <span>{title}</span>
}

export const CurrencySwitcher: FC = () => {
  const isFirst = useIsFirstRender()
  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const setCurrentCurrency = useUserSettings(selectSetCurrentCurrency)

  const [activeCurrency, setActiveCurrency] = useState<SelectItemType<ECost>>(currencies[ECost.BYN])

  useEffect(() => {
    if (!isFirst) {
      setCurrentCurrency(activeCurrency.value)
    }
  }, [activeCurrency, isFirst, setCurrentCurrency])

  useEffect(() => {
    setActiveCurrency(currencies[currentCurrency])
  }, [currentCurrency])

  return (
    <Select
      activeItem={activeCurrency}
      elementToLabel={CurrencyElement}
      items={currencyArray}
      setActiveItem={setActiveCurrency}
    />
  )
}
