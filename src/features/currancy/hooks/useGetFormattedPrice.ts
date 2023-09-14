import { ECost } from '../lib/enum'

import { useLocale } from '@/shared/lib/hooks/useLocale'

export const useGetFormattedPrice = (): ((price: number, currency: ECost) => string) => {
  const locale = useLocale()

  return (price: number, currency: ECost): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price)
  }
}
// return (price: number, currency: ECost): string => {
//   return new Intl.NumberFormat(locale, {
//     style: 'currency',
//     currency,
//     currencyDisplay: 'name', // Главное оставить нейм и удалить 1цу
//     maximumFractionDigits: 0,
//   }).format(price)
// }
// TODO: Применить для селектора валют
