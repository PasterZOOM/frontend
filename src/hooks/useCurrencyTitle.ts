import { useTranslation } from 'next-i18next'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ECost } from 'enums/cost'
import { CurrencySign } from 'enums/currencySign'

export const useCurrencyTitle = (currency: SelectItemType<ECost>): string => {
  const { t } = useTranslation('common')

  return `${CurrencySign[currency.value]} ${t(currency.title)}`
}
