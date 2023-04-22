import { FC, useEffect, useState } from 'react'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { Select } from 'components/common/ui/selects/select'
import { ECost } from 'enums/cost'
import { currencies, currencyArray } from 'objects/currency/currency'
import {
  selectCurrentCurrency,
  selectSetCurrentCurrency,
  useUserSettings,
} from 'store/useUserSettings'

const CurrencyElement: FC<SelectItemType<ECost>> = ({ title }) => <span>{title}</span>

export const CurrentCurrencySelect: FC = () => {
  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const setCurrentCurrency = useUserSettings(selectSetCurrentCurrency)

  const [activeCurrency, setActiveCurrency] = useState<SelectItemType<ECost>>(currencies[ECost.BYN])

  useEffect(() => {
    setCurrentCurrency(activeCurrency.value)
  }, [activeCurrency])

  useEffect(() => {
    setActiveCurrency(currencies[currentCurrency])
  }, [])

  return (
    <Select
      activeItem={activeCurrency}
      setActiveItem={setActiveCurrency}
      items={currencyArray}
      elementToLabel={CurrencyElement}
    />
  )
}
