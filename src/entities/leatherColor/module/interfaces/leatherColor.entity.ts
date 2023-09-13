import { Types } from 'mongoose'

import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'

export interface LeatherColorEntity {
  _id: Types.ObjectId
  article: Types.ObjectId
  code: string
  description: LocaleFieldEntity
  factory: Types.ObjectId
  photo: string
  title: LocaleFieldEntity
  value: string
}
