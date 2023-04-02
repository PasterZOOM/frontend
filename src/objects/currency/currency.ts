import { v1 } from 'uuid'

import { ECost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'
import { EFilterKeys, FilterType } from '@/mocks/filters'

export const currencyForSelect: FilterType<ECost, EFilterKeys>[] = [
  { _id: v1(), value: ECost.USD, title: `${CurrencySign.USD} Доллар США` },
  { _id: v1(), value: ECost.EUR, title: `${CurrencySign.EUR} Евро` },
  { _id: v1(), value: ECost.BYN, title: `${CurrencySign.BYN} Белорусский рубль` },
  { _id: v1(), value: ECost.RUB, title: `${CurrencySign.RUB} Российский рубль` },
  { _id: v1(), value: ECost.UAH, title: `${CurrencySign.UAH} Гривна` },
  { _id: v1(), value: ECost.GBP, title: `${CurrencySign.GBP} Фунт стерлингов` },
  { _id: v1(), value: ECost.PLN, title: `${CurrencySign.PLN} Злотый` },
  { _id: v1(), value: ECost.CNY, title: `${CurrencySign.CNY} Китайский юань` },
  { _id: v1(), value: ECost.JPY, title: `${CurrencySign.JPY} Японская иена` },
]
