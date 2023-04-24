import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { EProductAssignment } from 'enums/product'
import { LOCALES } from 'types/localeType'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const productAssignments: Record<LOCALES, ObjectForSelectType<EProductAssignment>> = {
  en: {
    [EProductAssignment.FOR_CARDS]: {
      _id: v1(),
      value: EProductAssignment.FOR_CARDS,
      title: 'For cards',
    },
    [EProductAssignment.FOR_CASH]: {
      _id: v1(),
      value: EProductAssignment.FOR_CASH,
      title: 'For cash',
    },
    [EProductAssignment.FOR_COINS]: {
      _id: v1(),
      value: EProductAssignment.FOR_COINS,
      title: 'For coins',
    },
    [EProductAssignment.FOR_DOCUMENTS]: {
      _id: v1(),
      value: EProductAssignment.FOR_DOCUMENTS,
      title: 'For documents',
    },
    [EProductAssignment.FOR_WATCH]: {
      _id: v1(),
      value: EProductAssignment.FOR_WATCH,
      title: 'For watch',
    },
    [EProductAssignment.FOR_CLOTH]: {
      _id: v1(),
      value: EProductAssignment.FOR_CLOTH,
      title: 'For cloth',
    },
    [EProductAssignment.FOR_AIRPODS]: {
      _id: v1(),
      value: EProductAssignment.FOR_AIRPODS,
      title: 'For Air Pods',
    },
  },

  ru: {
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
  },
}
export const productAssignmentsArray = (locale: LOCALES): SelectItemType<EProductAssignment>[] =>
  Object.values(productAssignments[locale]).map(assignment => assignment)
