import { v1 } from 'uuid'

import { EProductCategory } from '@/shared/enums/product'
import { ObjectForSelectType } from '@/shared/types/objectForSelectType'
import { SelectItemType } from '@/shared/ui/selects/defaultSelectType'

export const productCategories: ObjectForSelectType<EProductCategory> = {
  [EProductCategory.CARD_HOLDER]: {
    _id: v1(),
    value: EProductCategory.CARD_HOLDER,
    title: 'cardHolder',
  },
  [EProductCategory.PASSPORT_COVER]: {
    _id: v1(),
    value: EProductCategory.PASSPORT_COVER,
    title: 'passportCover',
  },
  [EProductCategory.BIFOLD_WALLET]: {
    _id: v1(),
    value: EProductCategory.BIFOLD_WALLET,
    title: 'bifoldWallet',
  },
  [EProductCategory.BELT]: {
    _id: v1(),
    value: EProductCategory.BELT,
    title: 'belt',
  },
  [EProductCategory.PURSE]: {
    _id: v1(),
    value: EProductCategory.PURSE,
    title: 'purse',
  },
  [EProductCategory.HOLDER_FOR_CAR_DOCS]: {
    _id: v1(),
    value: EProductCategory.HOLDER_FOR_CAR_DOCS,
    title: 'carDocHolder',
  },
  [EProductCategory.DOC_HOLDER]: {
    _id: v1(),
    value: EProductCategory.DOC_HOLDER,
    title: 'docHolder',
  },
  [EProductCategory.WATCH_STRAP]: {
    _id: v1(),
    value: EProductCategory.WATCH_STRAP,
    title: 'watchStrap',
  },
}
export const productCategoriesArray: SelectItemType<EProductCategory>[] =
  Object.values(productCategories)
