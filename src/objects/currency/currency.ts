import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { ECost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'

export const currencyForSelect: SelectItemType<ECost>[] = [
  { _id: v1(), value: ECost.USD, name: `${CurrencySign.USD} Доллар США` },
  { _id: v1(), value: ECost.EUR, name: `${CurrencySign.EUR} Евро` },
  { _id: v1(), value: ECost.BYN, name: `${CurrencySign.BYN} Белорусский рубль` },
  { _id: v1(), value: ECost.RUB, name: `${CurrencySign.RUB} Российский рубль` },
  { _id: v1(), value: ECost.UAH, name: `${CurrencySign.UAH} Гривна` },
  { _id: v1(), value: ECost.GBP, name: `${CurrencySign.GBP} Фунт стерлингов` },
  { _id: v1(), value: ECost.PLN, name: `${CurrencySign.PLN} Злотый` },
  { _id: v1(), value: ECost.CNY, name: `${CurrencySign.CNY} Китайский юань` },
  { _id: v1(), value: ECost.JPY, name: `${CurrencySign.JPY} Японская иена` },
]
