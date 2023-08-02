import { useTranslation } from 'next-i18next'

import { ECost } from 'shared/enums/cost'
import { CurrencySign } from 'shared/enums/currencySign'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

export const useCurrencyTitle = (currency: SelectItemType<ECost>): string => {
  const { t } = useTranslation('common')

  return `${CurrencySign[currency.value]} ${t(currency.title)}`
}
