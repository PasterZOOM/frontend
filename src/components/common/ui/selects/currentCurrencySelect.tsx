import { FC, useEffect, useState } from 'react'

import { Select } from '@/components/common/ui/selects/select'
import { SelectItemType } from '@/components/forms/formikSelect'
import { ECost } from '@/enums/cost'
import { currencies, currencyArray } from '@/objects/currency/currency'
import { useUserSettings } from '@/store/useUserSettings'

const CurrencyElement: FC<SelectItemType<ECost>> = ({ title }) => <span>{title}</span>

export const CurrentCurrencySelect: FC = () => {
  const currentCurrency = useUserSettings(state => state.currentCurrency)
  const setCurrentCurrency = useUserSettings(state => state.setCurrentCurrency)

  const [activeCurrency, setActiveCurrency] = useState<SelectItemType<ECost>>(
    currencies[currentCurrency]
  )

  useEffect(() => {
    setCurrentCurrency(activeCurrency.value)
  }, [activeCurrency])

  return (
    <Select
      activeItem={activeCurrency}
      setActiveItem={setActiveCurrency}
      items={currencyArray}
      elementToLabel={CurrencyElement}
    />
  )
}
