import { v1 } from 'uuid'

type LeatherColorType = {
  _id: string
  article: string
  code: string
  photo: string
  name: string
  description: string
}
export const colors: LeatherColorType[] = [
  {
    _id: v1(),
    photo: 'bg-red-700',
    article: '',
    code: '102',
    name: 'red',
    description: 'описание цвета',
  },
  {
    _id: v1(),
    photo: 'bg-black',
    article: '',
    code: '100',
    name: 'black',
    description: 'описание цвета',
  },
  {
    _id: v1(),
    photo: 'bg-green-700',
    article: '',
    code: '36',
    name: 'green',
    description: 'описание цвета',
  },
]
