import { v1 } from 'uuid'

import { ECost } from '@/enums/cost'
import { EButteroCode, ELeather, ELeatherColor, EPunchPitch, EWaxCode } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'
import { LeatherColorType, LeathersType, ProductType } from '@/types/productType'

export const butteroColors: LeatherColorType<EButteroCode>[] = [
  {
    _id: v1(),
    photo: 'bg-red-700',
    article: ELeather.BUTTERO,
    code: EButteroCode.RED,
    title: 'Красная',
    value: ELeatherColor.RED,
    description: 'описание цвета',
  },
  {
    _id: v1(),
    photo: 'bg-black',
    article: ELeather.BUTTERO,
    code: EButteroCode.BLACK,
    title: 'Черный',
    value: ELeatherColor.BLACK,
    description: 'описание цвета',
  },
  {
    _id: v1(),
    photo: 'bg-green-700',
    article: ELeather.BUTTERO,
    code: EButteroCode.GREEN,
    title: 'Зеленый',
    value: ELeatherColor.GREEN,
    description: 'описание цвета',
  },
]
export const waxColors: LeatherColorType<EWaxCode>[] = [
  {
    _id: v1(),
    photo: 'bg-green-700',
    article: ELeather.WAX,
    code: EWaxCode.GREEN,
    title: 'Красный',
    value: ELeatherColor.GREEN,
    description: 'описание цвета',
  },
  {
    _id: v1(),
    photo: 'bg-yellow-700',
    article: ELeather.WAX,
    code: EWaxCode.YELLOW,
    title: 'Желтый',
    value: ELeatherColor.YELLOW,
    description: 'описание цвета',
  },
]

export const leathers: LeathersType = {
  [ELeather.BUTTERO]: butteroColors,
  [ELeather.WAX]: waxColors,
  [ELeather.PUEBLO]: [],
}

export const products: ProductType[] = [
  {
    _id: v1(),
    photos: {
      [EButteroCode.RED]: [
        { id: v1(), url: 'bg-red-200' },
        { id: v1(), url: 'bg-red-500' },
        { id: v1(), url: 'bg-red-100' },
        { id: v1(), url: 'bg-red-300' },
        { id: v1(), url: 'bg-red-700' },
        { id: v1(), url: 'bg-red-900' },
      ],
      [EButteroCode.GREEN]: [
        { id: v1(), url: 'bg-green-200' },
        { id: v1(), url: 'bg-green-500' },
        { id: v1(), url: 'bg-green-100' },
        { id: v1(), url: 'bg-green-700' },
      ],
    },
    title: 'Холдер с монетницей из кожи Buttero',
    description: 'Компактный холдер с монетницей',
    category: EProductCategory.CARD_HOLDER,
    cost: 32,
    costCurrency: ECost.USD,
    assignments: [EProductAssignment.FOR_CASH, EProductAssignment.FOR_CARDS],
    punchPitch: EPunchPitch.LARGE,
    size: '12x9x2',
    leather: ELeather.BUTTERO,
  },
  {
    _id: v1(),
    photos: {
      [EButteroCode.RED]: [
        { id: v1(), url: 'bg-red-200' },
        { id: v1(), url: 'bg-red-500' },
        { id: v1(), url: 'bg-red-700' },
      ],
      [EButteroCode.BLACK]: [
        { id: v1(), url: 'bg-gray-200' },
        { id: v1(), url: 'bg-gray-500' },
        { id: v1(), url: 'bg-gray-100' },
        { id: v1(), url: 'bg-gray-700' },
      ],
      [EButteroCode.GREEN]: [
        { id: v1(), url: 'bg-green-200' },
        { id: v1(), url: 'bg-green-500' },
        { id: v1(), url: 'bg-green-100' },
        { id: v1(), url: 'bg-green-700' },
      ],
    },
    title: 'Бифолд из кожи Buttero',
    description: 'Компактный склодной кошелек с монетницей',
    category: EProductCategory.BIFOLD_WALLET,
    cost: 61,
    costCurrency: ECost.USD,
    assignments: [EProductAssignment.FOR_CASH, EProductAssignment.FOR_CARDS],
    punchPitch: EPunchPitch.LARGE,
    size: '12x9x2',
    leather: ELeather.BUTTERO,
  },
  {
    _id: v1(),
    photos: {
      [EWaxCode.GREEN]: [
        { id: v1(), url: 'bg-green-200' },
        { id: v1(), url: 'bg-green-500' },
        { id: v1(), url: 'bg-green-100' },
        { id: v1(), url: 'bg-green-700' },
      ],
    },
    title: 'Бифолд из кожи WAX',
    description: 'Компактный склодной кошелек с монетницей',
    category: EProductCategory.BIFOLD_WALLET,
    cost: 61,
    costCurrency: ECost.USD,
    assignments: [EProductAssignment.FOR_CASH, EProductAssignment.FOR_CARDS],
    punchPitch: EPunchPitch.LARGE,
    size: '12x9x2',
    leather: ELeather.WAX,
  },
  {
    _id: v1(),
    photos: {
      [EWaxCode.GREEN]: [
        { id: v1(), url: 'bg-green-200' },
        { id: v1(), url: 'bg-green-500' },
        { id: v1(), url: 'bg-green-100' },
        { id: v1(), url: 'bg-green-700' },
      ],
      [EWaxCode.YELLOW]: [
        { id: v1(), url: 'bg-yellow-200' },
        { id: v1(), url: 'bg-yellow-500' },
        { id: v1(), url: 'bg-yellow-100' },
        { id: v1(), url: 'bg-yellow-700' },
      ],
    },
    title: 'Обложка для паспорта из кожи Wax',
    description: 'Классическая обложка для паспорта из плотной кожи',
    category: EProductCategory.PASSPORT_COVER,
    cost: 20,
    costCurrency: ECost.USD,
    assignments: [EProductAssignment.FOR_DOCUMENTS],
    punchPitch: EPunchPitch.LARGE,
    size: '12x9x2',
    leather: ELeather.WAX,
  },
]
