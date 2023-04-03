import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { ECost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'

export type CurrencyType = {
  _id: string
  sign: CurrencySign
  value: ECost
  title: string
}
export const currencies: Record<ECost, CurrencyType> = {
  [ECost.USD]: {
    _id: v1(),
    value: ECost.USD,
    sign: CurrencySign.USD,
    title: 'Доллар США',
  },
  [ECost.EUR]: {
    _id: v1(),
    value: ECost.EUR,
    sign: CurrencySign.EUR,
    title: 'Евро',
  },
  [ECost.BYN]: {
    _id: v1(),
    value: ECost.BYN,
    sign: CurrencySign.BYN,
    title: 'Белорусский рубль',
  },

  [ECost.RUB]: {
    _id: v1(),
    value: ECost.RUB,
    sign: CurrencySign.RUB,
    title: 'Российский рубль',
  },
  [ECost.GBP]: {
    _id: v1(),
    value: ECost.GBP,
    sign: CurrencySign.GBP,
    title: 'Фунт стерлингов',
  },
  [ECost.UAH]: {
    _id: v1(),
    value: ECost.UAH,
    sign: CurrencySign.UAH,
    title: 'Гривна',
  },
  [ECost.PLN]: {
    _id: v1(),
    value: ECost.PLN,
    sign: CurrencySign.PLN,
    title: 'Злотый',
  },
  [ECost.JPY]: {
    _id: v1(),
    value: ECost.JPY,
    sign: CurrencySign.JPY,
    title: 'Японская иена',
  },
  [ECost.CNY]: {
    _id: v1(),
    value: ECost.CNY,
    sign: CurrencySign.CNY,
    title: 'Китайский юань',
  },
}

export const currencyForSelect: SelectItemType[] = Object.values(currencies).map(
  ({ _id, value, sign, title }) => ({ _id, value, title: `${sign} ${title}` })
)
