import { v1 } from 'uuid'

import { ECost } from '@/features/currancy/lib/enum/eCost'
import { ObjectForSelectType } from '@/shared/types/objectForSelectType'
import { SelectItemType } from '@/shared/ui/selects/defaultSelectType'

export const currencies: ObjectForSelectType<ECost> = {
  [ECost.USD]: {
    _id: v1(),
    value: ECost.USD,
    title: 'usd',
  },
  [ECost.EUR]: {
    _id: v1(),
    value: ECost.EUR,
    title: 'eur',
  },
  [ECost.BYN]: {
    _id: v1(),
    value: ECost.BYN,
    title: `byn`,
  },

  [ECost.RUB]: {
    _id: v1(),
    value: ECost.RUB,
    title: 'rub',
  },
  [ECost.GBP]: {
    _id: v1(),
    value: ECost.GBP,
    title: 'gbp',
  },
  [ECost.UAH]: {
    _id: v1(),
    value: ECost.UAH,
    title: 'uah',
  },
  [ECost.PLN]: {
    _id: v1(),
    value: ECost.PLN,
    title: 'pln',
  },
  [ECost.JPY]: {
    _id: v1(),
    value: ECost.JPY,
    title: 'jpn',
  },
  [ECost.CNY]: {
    _id: v1(),
    value: ECost.CNY,
    title: 'cny',
  },
}

export const currencyArray: SelectItemType<ECost>[] = Object.values(currencies)
