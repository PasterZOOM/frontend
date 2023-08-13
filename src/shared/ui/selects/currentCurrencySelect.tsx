import { FC, useEffect, useState } from 'react'

import { ECost } from 'shared/enums/cost'
import { useCurrencyTitle } from 'shared/lib/hooks/useCurrencyTitle'
import { useIsFirstRender } from 'shared/lib/hooks/useFirstRender'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { currencies, currencyArray } from 'shared/objects/currency/currency'
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

export const CurrentCurrencySelect: FC = () => {
  const locale = useLocale()
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
  }, [currentCurrency, locale])

  return (
    <Select
      activeItem={activeCurrency}
      elementToLabel={CurrencyElement}
      items={currencyArray}
      setActiveItem={setActiveCurrency}
    />
  )
}
