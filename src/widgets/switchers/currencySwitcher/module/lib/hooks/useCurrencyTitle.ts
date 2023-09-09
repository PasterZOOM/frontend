import { useTranslation } from 'next-i18next'

import { CurrencySign } from 'features/currancy/lib/enum/currencySign'
import { ECost } from 'features/currancy/lib/enum/eCost'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

export const useCurrencyTitle = (currency: SelectItemType<ECost>): string => {
  const { t } = useTranslation('common')

  return `${CurrencySign[currency.value]} ${t(currency.title)}`
}
