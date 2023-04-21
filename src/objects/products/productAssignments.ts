import { v1 } from 'uuid'

import { EProductAssignment } from 'enums/product'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const productAssignments: ObjectForSelectType<EProductAssignment> = {
  [EProductAssignment.FOR_CARDS]: {
    _id: v1(),
    value: EProductAssignment.FOR_CARDS,
    title: 'Для кард',
  },
  [EProductAssignment.FOR_CASH]: {
    _id: v1(),
    value: EProductAssignment.FOR_CASH,
    title: 'Для купюр',
  },
  [EProductAssignment.FOR_COINS]: {
    _id: v1(),
    value: EProductAssignment.FOR_COINS,
    title: 'Для монет',
  },
  [EProductAssignment.FOR_DOCUMENTS]: {
    _id: v1(),
    value: EProductAssignment.FOR_DOCUMENTS,
    title: 'Для документов',
  },
  [EProductAssignment.FOR_WATCH]: {
    _id: v1(),
    value: EProductAssignment.FOR_WATCH,
    title: 'Для часов',
  },
  [EProductAssignment.FOR_CLOTH]: {
    _id: v1(),
    value: EProductAssignment.FOR_CLOTH,
    title: 'Для одежды',
  },
  [EProductAssignment.FOR_AIRPODS]: {
    _id: v1(),
    value: EProductAssignment.FOR_AIRPODS,
    title: 'Для Air Pods',
  },
}
export const productAssignmentsArray = Object.values(productAssignments).map(
  assignment => assignment
)
