import { v1 } from 'uuid'

import { EProductCategory } from '@/enums/product'
import { ObjectForSelectType } from '@/types/objectForSelectType'

export const productCategories: ObjectForSelectType<EProductCategory> = {
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
  [EProductCategory.HOLDER_FOR_AUTO_DOCS]: {
    _id: v1(),
    value: EProductCategory.HOLDER_FOR_AUTO_DOCS,
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
}
export const productCategoriesArray = Object.values(productCategories).map(category => category)
