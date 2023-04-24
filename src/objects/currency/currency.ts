import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ECost } from 'enums/cost'
import { CurrencySign } from 'enums/currencySign'
import { LOCALES } from 'types/localeType'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const currencies: Record<LOCALES, ObjectForSelectType<ECost>> = {
  en: {
    [ECost.USD]: {
      _id: v1(),
      value: ECost.USD,
      title: `${CurrencySign.USD} U.S. dollar`,
    },
    [ECost.EUR]: {
      _id: v1(),
      value: ECost.EUR,
      title: `${CurrencySign.EUR} Euro`,
    },
    [ECost.BYN]: {
      _id: v1(),
      value: ECost.BYN,
      title: `${CurrencySign.BYN} Belarusian ruble`,
    },

    [ECost.RUB]: {
      _id: v1(),
      value: ECost.RUB,
      title: `${CurrencySign.RUB} Russian ruble`,
    },
    [ECost.GBP]: {
      _id: v1(),
      value: ECost.GBP,
      title: `${CurrencySign.GBP} Pound sterling`,
    },
    [ECost.UAH]: {
      _id: v1(),
      value: ECost.UAH,
      title: `${CurrencySign.UAH} Hryvnia`,
    },
    [ECost.PLN]: {
      _id: v1(),
      value: ECost.PLN,
      title: `${CurrencySign.PLN} Zloty`,
    },
    [ECost.JPY]: {
      _id: v1(),
      value: ECost.JPY,
      title: `${CurrencySign.JPY} Japanese yen`,
    },
    [ECost.CNY]: {
      _id: v1(),
      value: ECost.CNY,
      title: `${CurrencySign.CNY} CNY`,
    },
  },

  ru: {
    [ECost.USD]: {
      _id: v1(),
      value: ECost.USD,
      title: `${CurrencySign.USD} Доллар США`,
    },
    [ECost.EUR]: {
      _id: v1(),
      value: ECost.EUR,
      title: `${CurrencySign.EUR} Евро`,
    },
    [ECost.BYN]: {
      _id: v1(),
      value: ECost.BYN,
      title: `${CurrencySign.BYN} Белорусский рубль>`,
    },

    [ECost.RUB]: {
      _id: v1(),
      value: ECost.RUB,
      title: `${CurrencySign.RUB} Российский рубль`,
    },
    [ECost.GBP]: {
      _id: v1(),
      value: ECost.GBP,
      title: `${CurrencySign.GBP} Фунт стерлингов`,
    },
    [ECost.UAH]: {
      _id: v1(),
      value: ECost.UAH,
      title: `${CurrencySign.UAH} Гривна`,
    },
    [ECost.PLN]: {
      _id: v1(),
      value: ECost.PLN,
      title: `${CurrencySign.PLN} Злотый`,
    },
    [ECost.JPY]: {
      _id: v1(),
      value: ECost.JPY,
      title: `${CurrencySign.JPY} Японская иена`,
    },
    [ECost.CNY]: {
      _id: v1(),
      value: ECost.CNY,
      title: `${CurrencySign.CNY} Китайский юань`,
    },
  },
}

export const currencyArray = (locale: LOCALES): SelectItemType<ECost>[] =>
  Object.values(currencies[locale]).map(currency => currency)
