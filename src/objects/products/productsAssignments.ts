import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { EProductAssignment } from '@/enums/product'

export const productAssignmentsForSelect: SelectItemType<EProductAssignment>[] = [
  { _id: v1(), value: EProductAssignment.FOR_CARDS, name: 'Для кард' },
  { _id: v1(), value: EProductAssignment.FOR_CASH, name: 'Для купюр' },
  { _id: v1(), value: EProductAssignment.FOR_COINS, name: 'Для монет' },
  { _id: v1(), value: EProductAssignment.FOR_DOCUMENTS, name: 'Для документов' },
  { _id: v1(), value: EProductAssignment.FOR_WATCH, name: 'Для часов' },
  { _id: v1(), value: EProductAssignment.FOR_CLOTH, name: 'Для одежды' },
  { _id: v1(), value: EProductAssignment.FOR_AIRPODS, name: 'Для Air Pods' },
]
