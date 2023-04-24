import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { EProductCategory } from 'enums/product'
import { LOCALES } from 'types/localeType'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const productCategories: Record<LOCALES, ObjectForSelectType<EProductCategory>> = {
  en: {
    [EProductCategory.CARD_HOLDER]: {
      _id: v1(),
      value: EProductCategory.CARD_HOLDER,
      title: 'Card holder',
    },
    [EProductCategory.PASSPORT_COVER]: {
      _id: v1(),
      value: EProductCategory.PASSPORT_COVER,
      title: 'Passport cover',
    },
    [EProductCategory.BIFOLD_WALLET]: {
      _id: v1(),
      value: EProductCategory.BIFOLD_WALLET,
      title: 'Bifold wallet',
    },
    [EProductCategory.BELT]: {
      _id: v1(),
      value: EProductCategory.BELT,
      title: 'Belt',
    },
    [EProductCategory.PURSE]: {
      _id: v1(),
      value: EProductCategory.PURSE,
      title: 'Purse',
    },
    [EProductCategory.HOLDER_FOR_CAR_DOCS]: {
      _id: v1(),
      value: EProductCategory.HOLDER_FOR_CAR_DOCS,
      title: 'Car-doc holder',
    },
    [EProductCategory.DOC_HOLDER]: {
      _id: v1(),
      value: EProductCategory.DOC_HOLDER,
      title: 'Doc holder',
    },
    [EProductCategory.WATCH_STRAP]: {
      _id: v1(),
      value: EProductCategory.WATCH_STRAP,
      title: 'Watch strap',
    },
  },

  ru: {
    [EProductCategory.CARD_HOLDER]: {
      _id: v1(),
      value: EProductCategory.CARD_HOLDER,
      title: 'Кард холдер',
    },
    [EProductCategory.PASSPORT_COVER]: {
      _id: v1(),
      value: EProductCategory.PASSPORT_COVER,
      title: 'Обложка для паспорта',
    },
    [EProductCategory.BIFOLD_WALLET]: {
      _id: v1(),
      value: EProductCategory.BIFOLD_WALLET,
      title: 'Би-фодл',
    },
    [EProductCategory.BELT]: {
      _id: v1(),
      value: EProductCategory.BELT,
      title: 'Поясной ремень',
    },
    [EProductCategory.PURSE]: {
      _id: v1(),
      value: EProductCategory.PURSE,
      title: 'Кошелек',
    },
    [EProductCategory.HOLDER_FOR_CAR_DOCS]: {
      _id: v1(),
      value: EProductCategory.HOLDER_FOR_CAR_DOCS,
      title: 'Авто-док холдер',
    },
    [EProductCategory.DOC_HOLDER]: {
      _id: v1(),
      value: EProductCategory.DOC_HOLDER,
      title: 'Док холдер',
    },
    [EProductCategory.WATCH_STRAP]: {
      _id: v1(),
      value: EProductCategory.WATCH_STRAP,
      title: 'Часовой ремешок',
    },
  },
}
export const productCategoriesArray = (locale: LOCALES): SelectItemType<EProductCategory>[] =>
  Object.values(productCategories[locale]).map(category => category)
