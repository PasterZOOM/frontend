import { FC, useEffect, useState } from 'react'

import { Select } from '@/components/common/ui/selects/select'
import { currencies, CurrencyType } from '@/objects/currency/currency'
import { useUserSettings } from '@/store/useUserSettings'

const CurrencyElement: FC<Pick<CurrencyType, 'sign' | 'title'>> = ({ sign, title }) => (
  <span>
    {sign} {title}
  </span>
)

export const CurrentCurrencySelect: FC = () => {
  const currentCurrency = useUserSettings(state => state.currentCurrency)
  const setCurrentCurrency = useUserSettings(state => state.setCurrentCurrency)

  const [activeCurrency, setActiveCurrency] = useState<CurrencyType>(currencies[currentCurrency])

  useEffect(() => {
    setCurrentCurrency(activeCurrency.value)
  }, [activeCurrency])

  return (
    <Select
      activeItem={activeCurrency}
      setActiveItem={setActiveCurrency}
      items={Object.values(currencies)}
      elementToLabel={CurrencyElement}
    />
  )
}
