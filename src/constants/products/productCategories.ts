import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { EProductCategory } from '@/enums/product'

export const productCategoriesForSelect: SelectItemType<EProductCategory>[] = [
  { _id: v1(), value: EProductCategory.CARD_HOLDER, name: 'Кард холдер' },
  { _id: v1(), value: EProductCategory.PASSPORT_COVER, name: 'Обложка для паспорта' },
  { _id: v1(), value: EProductCategory.BIFOLD_WALLET, name: 'Би-фодл' },
  { _id: v1(), value: EProductCategory.BELT, name: 'Поясной ремень' },
  { _id: v1(), value: EProductCategory.PURSE, name: 'Кошелек' },
  { _id: v1(), value: EProductCategory.AUTODOC_HOLDER, name: 'Авто-док холдер' },
  { _id: v1(), value: EProductCategory.DOC_HOLDER, name: 'Док холдер' },
  { _id: v1(), value: EProductCategory.WATCH_STRAP, name: 'Часовой ремешок' },
]
