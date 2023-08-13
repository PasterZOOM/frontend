import { useTranslation } from 'next-i18next'

import { CurrencySign } from 'shared/enums/currencySign'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { ECost } from 'widgets/switchers/currencySwitcher/module/enum'

export const useCurrencyTitle = (currency: SelectItemType<ECost>): string => {
  const { t } = useTranslation('common')

  return `${CurrencySign[currency.value]} ${t(currency.title)}`
}
