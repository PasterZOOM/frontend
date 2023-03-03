import { FC, useState } from 'react'

import { v1 } from 'uuid'

import { Select } from '@/components/common/ui/selects/select'
import { ECost, TCost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'
import { useUserSettings } from '@/store/useUserSettings'

type CurrencyType = {
  id: string
  sign: CurrencySign
  code: TCost
  title: string
}
const currency: CurrencyType[] = [
  {
    id: v1(),
    code: ECost.USD,
    sign: CurrencySign.USD,
    title: 'Доллар США',
  },
  {
    id: v1(),
    code: ECost.EUR,
    sign: CurrencySign.EUR,
    title: 'Евро',
  },
  {
    id: v1(),
    code: ECost.BYN,
    sign: CurrencySign.BYN,
    title: 'Белорусский рубль',
  },

  {
    id: v1(),
    code: ECost.RUB,
    sign: CurrencySign.RUB,
    title: 'Российский рубль',
  },
  {
    id: v1(),
    code: ECost.GBP,
    sign: CurrencySign.GBP,
    title: 'Фунт стерлингов',
  },
  {
    id: v1(),
    code: ECost.UAH,
    sign: CurrencySign.UAH,
    title: 'Гривна',
  },
  {
    id: v1(),
    code: ECost.PLN,
    sign: CurrencySign.PLN,
    title: 'Злоты',
  },
  {
    id: v1(),
    code: ECost.JPY,
    sign: CurrencySign.JPY,
    title: 'Японская иена',
  },
  {
    id: v1(),
    code: ECost.CNY,
    sign: CurrencySign.CNY,
    title: 'Китайский юань',
  },
]

const CurrencyElement: FC<Pick<CurrencyType, 'sign' | 'title'>> = ({ sign, title }) => (
  <div className="flex items-center gap-2">
    <div className="flex w-5 justify-center">{sign}</div>
    <span>{title}</span>
  </div>
)

export const CurrentCurrencySelect: FC = () => {
  const currentCurrency = useUserSettings(state => state.currentCurrency)
  const setCurrentCurrency = useUserSettings(state => state.setCurrentCurrency)

  const [activeCurrency, setActiveCurrency] = useState<CurrencyType>(
    currency.find(el => el.code === currentCurrency) || currency[0]
  )

  const setActiveItemHandler = (newActiveCurrency: CurrencyType): void => {
    setCurrentCurrency(newActiveCurrency.code)
    setActiveCurrency(newActiveCurrency)
  }

  return (
    <Select
      activeItem={activeCurrency}
      setActiveItem={setActiveItemHandler}
      items={currency}
      elementToLabel={CurrencyElement}
    />
  )
}
